// app/gallery/_components/GalleryDetailSkeleton.tsx
export default function GalleryDetailSkeleton() {
    return (
        <div className="mx-auto w-full max-w-[1600px] px-3 sm:px-4 lg:px-6 2xl:max-w-[1760px]">
            {/* page header skeleton */}
            <div className="py-6">
                <div className="h-3 w-40 animate-pulse rounded bg-slate-200" />
                <div className="mt-2 h-7 w-72 animate-pulse rounded bg-slate-200" />
                <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-slate-200" />
            </div>

            {/* video hero skeleton */}
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="h-[min(86vh,820px)] w-full animate-pulse bg-slate-200" />
                <div className="space-y-2 p-4">
                    <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
                    <div className="h-5 w-64 animate-pulse rounded bg-slate-200" />
                    <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
                </div>
            </div>

            {/* grid skeleton */}
            <div className="my-7 grid grid-cols-1 gap-6 md:grid-cols-2">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="h-[min(58vh,560px)] w-full animate-pulse bg-slate-200" />
                        <div className="space-y-2 p-4">
                            <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
                            <div className="h-5 w-48 animate-pulse rounded bg-slate-200" />
                            <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
