"use client";
import { useEffect, useMemo, useRef } from "react";
import "plyr/dist/plyr.css";

type Props = {
    src: string;
    type?: "video/mp4" | "youtube";
    poster?: string;
    ratio?: string;
    /** Time (in seconds) retrieved from the database */
    defaultTime?: number;
    /** Callback to persist playback time to the database */
    onTimeUpdate?: (time: number) => void;
    /** Callback when the video is completed */
    onCompleted?: () => void;
    /** Time interval (in seconds) to throttle `onTimeUpdate`, default is 10s */
    timeUpdateIntervalSec?: number;
};

const VideoPlayer = ({
    src,
    type = "video/mp4",
    poster,
    ratio,
    defaultTime = 0,
    onTimeUpdate,
    onCompleted,
    timeUpdateIntervalSec = 10,
}: Props) => {
    const elementRef = useRef<HTMLVideoElement | HTMLDivElement | null>(null);
    const playerRef = useRef<any>(null);
    const callbacksRef = useRef<{ onTimeUpdate?: Props["onTimeUpdate"]; onCompleted?: Props["onCompleted"] }>({});
    const lastPersistedRef = useRef(0); // Last saved time (for throttling)
    const appliedDefaultTimeRef = useRef<number | null>(null); // Track if default time was applied

    // Always keep the latest version of callbacks without triggering re-init
    callbacksRef.current.onTimeUpdate = onTimeUpdate;
    callbacksRef.current.onCompleted = onCompleted;

    // Stable Plyr options to avoid unnecessary re-initialization
    const plyrOptions = useMemo(
        () => ({
            ratio,
            keyboard: { focused: true, global: true },
        }),
        [ratio],
    );

    // Helper: construct source for Plyr
    const buildSource = () => {
        if (type === "youtube") {
            return {
                type: "video",
                sources: [{ src, provider: "youtube" as const }],
                poster,
            };
        }
        return {
            type: "video",
            sources: [{ src, type: "video/mp4" }],
            poster,
        };
    };

    // Initialize Plyr once
    useEffect(() => {
        let isMounted = true;

        (async () => {
            const { default: Plyr } = await import("plyr");
            if (!isMounted || !elementRef.current) return;

            // For YouTube, Plyr works on <div data-plyr-provider="youtube" />
            playerRef.current = new Plyr(elementRef.current as any, plyrOptions);

            const player = playerRef.current;

            // Set default playback time when player is ready
            player.once("ready", () => {
                if (defaultTime > 0) {
                    try {
                        player.currentTime = defaultTime;
                        appliedDefaultTimeRef.current = defaultTime;
                    } catch {
                        // Ignore seek errors
                    }
                }
            });

            // Throttle time updates based on `timeUpdateIntervalSec`
            const onTimeUpdateHandler = () => {
                const now = player.currentTime as number;
                const last = lastPersistedRef.current;
                if (now - last >= timeUpdateIntervalSec) {
                    lastPersistedRef.current = Math.floor(now);
                    callbacksRef.current.onTimeUpdate?.(Math.floor(now));
                }
            };
            player.on("timeupdate", onTimeUpdateHandler);

            // When video ends, persist final progress and trigger completion callback
            const onEndedHandler = () => {
                callbacksRef.current.onTimeUpdate?.(Math.floor(player.duration || 0));
                callbacksRef.current.onCompleted?.();
            };
            player.on("ended", onEndedHandler);
        })();

        return () => {
            isMounted = false;
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
        };

        // Only initialize once — don't include callbacks or defaultTime in deps
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [plyrOptions]);

    // Update video source dynamically when src/type/poster changes — no need to re-init
    useEffect(() => {
        const player = playerRef.current;
        if (!player) return;

        const newSource = buildSource();

        try {
            // Reset throttling marker when changing source
            lastPersistedRef.current = 0;
            appliedDefaultTimeRef.current = null;

            player.source = newSource;
        } catch {
            // Fallback: if setting source fails (very rare), destroy player
            player.destroy?.();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [src, type, poster]);

    // Apply defaultTime if the prop changes (e.g. user resumed elsewhere)
    useEffect(() => {
        const player = playerRef.current;
        if (!player) return;

        // Only seek if this value hasn't already been applied
        if (typeof defaultTime === "number" && defaultTime > 0 && defaultTime !== appliedDefaultTimeRef.current) {
            try {
                player.currentTime = defaultTime;
                appliedDefaultTimeRef.current = defaultTime;
            } catch {
                // Ignore errors if seek fails
            }
        }
    }, [defaultTime]);

    return (
        <div className="h-full w-full">
            {type === "youtube" ? (
                // For YouTube, Plyr works on a <div> with data-plyr attributes
                <div
                    ref={elementRef as any}
                    className="plyr-react plyr"
                    data-plyr-provider="youtube"
                    data-plyr-embed-id={src}
                />
            ) : (
                <video ref={elementRef as any} className="plyr-react plyr" playsInline controls poster={poster}>
                    <source src={src} type="video/mp4" />
                </video>
            )}
        </div>
    );
};

export default VideoPlayer;
