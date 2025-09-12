"use client";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function GalleryCardSkeleton() {
    return (
        <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm">
            {/* Thumbnail */}
            <div className="aspect-square overflow-hidden">
                <Skeleton className="h-full w-full" />
            </div>

            {/* Overlay giả (caption, title, category, buttons) */}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                <div className="space-y-2 p-4">
                    {/* Caption */}
                    <Skeleton height={20} width="70%" baseColor="#475569" highlightColor="#64748b" />
                    {/* Event title */}
                    <Skeleton height={16} width="50%" baseColor="#64748b" highlightColor="#94a3b8" />
                    <div className="flex items-center justify-between">
                        {/* Category chip */}
                        <Skeleton height={18} width={60} baseColor="#475569" highlightColor="#64748b" />
                        {/* Buttons */}
                        <div className="flex gap-2">
                            <Skeleton circle height={32} width={32} baseColor="#475569" highlightColor="#64748b" />
                            <Skeleton circle height={32} width={32} baseColor="#475569" highlightColor="#64748b" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/** Optional: bọc theme màu nhạt hơn */
export function ThemedGalleryCardSkeleton() {
    return (
        <SkeletonTheme baseColor="#e2e8f0" highlightColor="#f1f5f9">
            <GalleryCardSkeleton />
        </SkeletonTheme>
    );
}
