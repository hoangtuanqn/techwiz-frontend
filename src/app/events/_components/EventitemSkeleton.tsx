"use client";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export function EventCardSkeleton() {
    return (
        <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Thumbnail */}
            <Skeleton height={160} className="!block w-full" />

            {/* Body */}
            <div className="p-4">
                {/* Title */}
                <Skeleton height={20} width="70%" />

                {/* Booked + % left + progress */}
                <div className="mt-3">
                    <div className="flex items-center justify-between text-xs">
                        <Skeleton height={14} width={130} />
                        <Skeleton height={16} width={60} />
                    </div>

                    {/* Progress bar */}
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                        <Skeleton height={8} width="55%" className="!h-2" />
                    </div>
                </div>

                {/* Description 2 lines */}
                <div className="mt-3 space-y-2">
                    <Skeleton height={14} />
                    <Skeleton height={14} width="85%" />
                </div>

                {/* Footer: category, status chip, details */}
                <div className="mt-3 flex items-center justify-between">
                    <Skeleton height={18} width={70} /> {/* category */}
                    <Skeleton height={22} width={90} /> {/* status chip */}
                    <Skeleton height={18} width={60} /> {/* details link */}
                </div>
            </div>
        </div>
    );
}

/** Optional: theme cho màu skeleton */
export function ThemedEventCardSkeleton() {
    return (
        <SkeletonTheme baseColor="#e9eef5" highlightColor="#f7fafc">
            <EventCardSkeleton />
        </SkeletonTheme>
    );
}
