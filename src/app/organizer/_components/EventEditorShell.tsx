"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EventForm, { EventFormValues } from "./EventForm";

type Mode = "create" | "review" | "edit";
type ReviewToolbar = "full" | "viewOnly";

export default function EventEditorShell({
    initialValues,
    mode: initialMode,
    title = "Event",
    onCreate,
    onUpdate,
    onApprove,
    onReject,
    reviewToolbar = "full",
}: {
    initialValues: EventFormValues;
    mode: Mode;
    title?: string;
    onCreate?: (v: EventFormValues) => Promise<void> | void;
    onUpdate?: (v: EventFormValues) => Promise<void> | void;
    onApprove?: (v: EventFormValues) => Promise<void> | void;
    onReject?: (v: EventFormValues) => Promise<void> | void;
    reviewToolbar?: ReviewToolbar;
}) {
    const router = useRouter();
    const [values, setValues] = useState<EventFormValues>(initialValues);
    const [mode, setMode] = useState<Mode>(initialMode);
    const [isBusy, setIsBusy] = useState(false);

    // 1) Sync values khi initialValues đổi (ví dụ khi đổi id)
    useEffect(() => {
        setValues(initialValues);
    }, [initialValues]);

    const readOnly = mode === "review";

    const handleSave = async () => {
        try {
            setIsBusy(true);
            if (mode === "create") {
                await onCreate?.(values);
                router.push("/organizer/approvals/pending");
            } else {
                await onUpdate?.(values);
                setMode("review");
            }
        } finally {
            setIsBusy(false);
        }
    };

    const handleApprove = async () => {
        try {
            setIsBusy(true);
            await onApprove?.(values);
            router.push("/organizer/approvals/pending");
        } finally {
            setIsBusy(false);
        }
    };

    const handleReject = async () => {
        try {
            setIsBusy(true);
            await onReject?.(values);
            router.push("/organizer/approvals/pending");
        } finally {
            setIsBusy(false);
        }
    };

    const handleReset = () => {
        // tuỳ chọn confirm; bỏ nếu muốn reset thẳng
        if (confirm("Reset về dữ liệu ban đầu?")) {
            setValues(initialValues);
        }
    };

    return (
        <div className="mx-auto max-w space-y-6 p-6">
            <header className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">
                    {title} {mode === "create" ? "(Create)" : mode === "edit" ? "(Edit)" : "(Review)"}
                </h1>

                {mode === "review" ? (
                    reviewToolbar === "viewOnly" ? (
                        <button onClick={() => router.back()} className="rounded-lg border px-3 py-2">
                            Close
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={() => setMode("edit")}
                                className="rounded-lg border px-3 py-2"
                                disabled={isBusy}
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleReject}
                                className="rounded-lg border px-3 py-2 text-rose-700 ring-1 ring-rose-200 hover:bg-rose-50 disabled:opacity-60"
                                disabled={isBusy}
                            >
                                Reject
                            </button>
                            <button
                                onClick={handleApprove}
                                className="rounded-lg bg-emerald-600 px-3 py-2 text-white disabled:opacity-60"
                                disabled={isBusy}
                            >
                                Approve
                            </button>
                        </div>
                    )
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={() => (mode === "create" ? router.back() : setMode("review"))}
                            className="rounded-lg border px-3 py-2"
                            disabled={isBusy}
                        >
                            Cancel
                        </button>

                        {/* Reset */}
                        <button
                            type="button"
                            onClick={handleReset}
                            className="rounded-lg border px-3 py-2 text-slate-600 hover:bg-slate-50 disabled:opacity-60"
                            disabled={isBusy}
                        >
                            Reset
                        </button>

                        <button
                            onClick={handleSave}
                            className="rounded-lg bg-cyan-600 px-3 py-2 text-white disabled:opacity-60"
                            disabled={isBusy}
                        >
                            Save
                        </button>
                    </div>
                )}
            </header>

            <EventForm values={values} onChange={setValues} readOnly={readOnly} />
        </div>
    );
}
