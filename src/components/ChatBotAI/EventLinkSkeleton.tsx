"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function EventLinkSkeleton() {
    return (
        <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-3 text-xs text-slate-700">
            {/* Thumbnail skeleton */}
            <Skeleton
                className="h-12 w-12 rounded-lg border border-blue-300 object-cover"
                containerClassName="shrink-0"
            />

            <div className="flex-1 space-y-1">
                {/* Title */}
                <Skeleton height={16} width="60%" baseColor="#93c5fd" highlightColor="#bfdbfe" />
                {/* Date */}
                <Skeleton height={14} width="50%" baseColor="#cbd5e1" highlightColor="#e2e8f0" />
                {/* Seats left */}
                <Skeleton height={14} width="40%" baseColor="#86efac" highlightColor="#bbf7d0" />
            </div>
        </div>
    );
}
