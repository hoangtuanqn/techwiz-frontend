"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

/**
 * QR Attendance page (self-contained)
 * - Participant: show personal QR to be scanned by Organizer
 * - Organizer: open camera & scan QR (BarcodeDetector)
 *
 * NOTE (prod):
 * - QR payload nên là JWT/TOTP được backend ký ( tránh giả mạo )
 * - Organizer scan xong gọi POST /attendance/checkin với token từ QR
 */

type RoleMode = "participant" | "organizer";

export default function EventAttendancePage() {
  const { eventId } = useParams() as { eventId?: string };
  const id = String(eventId || "");

  // Demo: chọn chế độ (thực tế bạn có thể dựa theo role từ JWT/user session)
  const [mode, setMode] = useState<RoleMode>("participant");

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-6 flex items-center justify-between">
        <Link href={`/events/${id}`} className="text-slate-600 hover:text-cyan-600">
          ← Back to Event
        </Link>

        <div className="flex items-center gap-2 text-sm">
          <label className="text-slate-600">Mode</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as RoleMode)}
            className="rounded-md border border-slate-300 bg-white px-2 py-1 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          >
            <option value="participant">Participant (My QR)</option>
            <option value="organizer">Organizer (Scanner)</option>
          </select>
        </div>
      </div>

      <header>
        <h1 className="text-2xl font-bold">QR Attendance</h1>
        {/* <p className="mt-1 text-sm text-slate-600">
          Event ID: <span className="font-medium">{id}</span>
        </p> */}
      </header>

      {mode === "participant" ? <ParticipantQR eventId={id} /> : <OrganizerScanner eventId={id} />}
    </main>
  );
}

/* =========================
   PARTICIPANT VIEW (My QR)
========================= */
function ParticipantQR({ eventId }: { eventId: string }) {
  // Giả lập thông tin user; thực tế lấy từ auth
  const user = { id: "u12345", name: "Demo User", enrollment_no: "SE2005-001" };

  // Payload QR (DEMO). Prod: dùng JWT được ký bởi backend
  const payload = useMemo(() => {
    const data = {
      typ: "ATTEND_QR",
      event_id: eventId,
      user_id: user.id,
      enrollment_no: user.enrollment_no,
      ts: Date.now(), // timestamp phát QR
      sig: "SIGNATURE_PLACEHOLDER", // chữ ký số / HMAC từ server (prod)
    };
    return JSON.stringify(data);
  }, [eventId]);

  // Tạo ảnh QR miễn phí (demo) — không cần lib
  const qrUrl = useMemo(() => {
    const size = 240;
    const encoded = encodeURIComponent(payload);
    // Dịch vụ QR public cho demo; production: render server-side hoặc dùng lib local
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}`;
  }, [payload]);

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 p-6">
      <h2 className="text-lg font-semibold">Your Check-in QR</h2>
      <p className="mt-1 text-sm text-slate-600">
        Show this QR to the organizer at the entrance to check in.
      </p>

      <div className="mt-6 flex flex-col items-center gap-4">
        <img
          src={qrUrl}
          alt="Attendance QR"
          className="h-60 w-60 rounded-xl border border-slate-200 bg-white p-3 shadow"
        />
        <details className="w-full max-w-xl">
          <summary className="cursor-pointer text-sm text-slate-500 hover:text-slate-700">
            Show QR payload (debug)
          </summary>
          <pre className="mt-2 overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
            {payload}
          </pre>
        </details>

        <div className="mt-2 text-xs text-slate-500">
          Tip: Keep this page open; the QR includes a timestamp to reduce reuse.
        </div>
      </div>
    </section>
  );
}

/* =========================
   ORGANIZER VIEW (Scanner)
========================= */
// Add BarcodeDetector type for TypeScript
declare global {
  interface Window {
    BarcodeDetector?: typeof BarcodeDetector;
  }
  // Minimal BarcodeDetector type definition
  // Remove if you have @types/wicg-barcode-detector installed
  // or if your tsconfig lib includes "dom" with BarcodeDetector
  class BarcodeDetector {
    constructor(options?: { formats?: string[] });
    detect(image: CanvasImageSource): Promise<Array<{ rawValue: string }>>;
  }
}

function OrganizerScanner({ eventId }: { eventId: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check support
  useEffect(() => {
    const ok = typeof window !== "undefined" && "BarcodeDetector" in window;
    setSupported(ok);
  }, []);

  useEffect(() => {
    if (!supported || !scanning) return;
    let stream: MediaStream | null = null;
    let raf = 0;
    let detector: BarcodeDetector | null = null;

    async function start() {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        detector = new window.BarcodeDetector({ formats: ["qr_code"] }) as BarcodeDetector;
      } catch {
        setError("BarcodeDetector is not available.");
        setSupported(false);
        return;
      }

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err: unknown) {
        const errorMessage =
          typeof err === "object" && err !== null && "message" in err && typeof (err as { message?: unknown }).message === "string"
            ? (err as { message: string }).message
            : "Cannot access camera.";
        setError(errorMessage);
        return;
      }

      const scanLoop = async () => {
        try {
          if (videoRef.current && detector) {
            const bitmap = await createImageBitmap(videoRef.current);
            const codes = await detector.detect(bitmap);
            bitmap.close?.();

            if (codes && codes.length) {
              const raw = codes[0].rawValue as string;
              setResult(raw);
              setScanning(false);

              // TODO: Call backend to mark attendance
              // await fetch("/api/attendance/checkin", { method: "POST", body: JSON.stringify({ event_id: eventId, token: raw }) })
            }
          }
        } catch (e) {
          // ignore frame errors
        }
        if (scanning) raf = requestAnimationFrame(scanLoop);
      };

      raf = requestAnimationFrame(scanLoop);
    }

    start();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [supported, scanning, eventId]);

  const handleStart = () => {
    setResult(null);
    setError(null);
    setScanning(true);
  };

  const handleStop = () => setScanning(false);

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 p-6">
      <h2 className="text-lg font-semibold">Scan Participant QR</h2>
      <p className="mt-1 text-sm text-slate-600">
        Point the camera at the participant’s QR to mark attendance for event{" "}
        <span className="font-medium">{eventId}</span>.
      </p>

      {/* Capability banner */}
      {supported === false && (
        <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          Your browser doesn’t support <code>BarcodeDetector</code>. Use the latest Chrome/Edge/Safari
          on mobile/desktop, or implement a fallback using a QR library like <code>jsQR</code>.
        </div>
      )}

      {/* Controls */}
      <div className="mt-4 flex gap-3">
        <button
          onClick={handleStart}
          disabled={scanning || supported === false}
          className="rounded-md bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-700 disabled:opacity-50"
        >
          {scanning ? "Scanning..." : "Start Scanner"}
        </button>
        <button
          onClick={handleStop}
          disabled={!scanning}
          className="rounded-md border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          Stop
        </button>
      </div>

      {/* Video preview */}
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
        <video
          ref={videoRef}
          className="aspect-video w-full bg-black object-cover"
          muted
          playsInline
        />
      </div>

      {/* Result & actions */}
      {result && (
        <div className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
          <p className="font-medium">QR detected</p>
          <pre className="mt-2 overflow-auto rounded bg-white/60 p-2 text-xs text-emerald-900">
            {result}
          </pre>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={async () => {
                try {
                  // TODO: replace with real API call to mark attendance
                  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/attendance/checkin`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ event_id: eventId, token: result }) });
                  // const json = await res.json();
                  // if (!res.ok) throw new Error(json?.message || "Check-in failed");
                  alert("Check-in success (demo). See console for payload.");
                  console.log("Check-in payload:", { event_id: eventId, token: result });
                } catch (e: unknown) {
                  const errorMessage =
                    typeof e === "object" && e !== null && "message" in e && typeof (e as { message?: unknown }).message === "string"
                      ? (e as { message: string }).message
                      : "Check-in failed";
                  alert(errorMessage);
                }
              }}
              className="rounded-md bg-emerald-600 px-3 py-1.5 text-white hover:bg-emerald-700"
            >
              Confirm Check-in
            </button>

            <button
              onClick={() => {
                setResult(null);
                setScanning(true);
              }}
              className="rounded-md border border-slate-300 px-3 py-1.5 text-slate-700 hover:bg-slate-50"
            >
              Scan Next
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Manual fallback (optional) */}
      <ManualEntry eventId={eventId} />
    </section>
  );
}

/* =========================
   Manual fallback (organizer)
========================= */
function ManualEntry({ eventId }: { eventId: string }) {
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!token.trim()) return;
    try {
      setBusy(true);
      // TODO: Replace with real API
      // await fetch("/attendance/checkin", { method: "POST", body: JSON.stringify({ event_id: eventId, token }) })
      alert("Manual check-in success (demo).");
      console.log("Manual check-in:", { event_id: eventId, token });
      setToken("");
    } catch (e: unknown) {
      const errorMessage =
        typeof e === "object" && e !== null && "message" in e && typeof (e as { message?: unknown }).message === "string"
          ? (e as { message: string }).message
          : "Manual check-in failed";
      alert(errorMessage);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-6 rounded-xl border border-slate-200 p-4">
      <h3 className="text-sm font-semibold">Manual Token Entry (Fallback)</h3>
      <p className="mt-1 text-xs text-slate-500">
        If the QR cannot be scanned, paste the token string here.
      </p>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder='{"typ":"ATTEND_QR","event_id":"...","user_id":"...","ts":...,"sig":"..."}'
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
        />
        <button
          onClick={submit}
          disabled={busy || !token.trim()}
          className="shrink-0 rounded-md bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-700 disabled:opacity-50"
        >
          {busy ? "Processing..." : "Confirm"}
        </button>
      </div>
    </div>
  );
}
