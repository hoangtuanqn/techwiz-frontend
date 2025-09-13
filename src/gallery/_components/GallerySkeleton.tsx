// app/gallery/_components/GallerySkeleton.tsx

export default function GallerySkeleton({ count = 9 }: { count?: number }) {
    return (
        <div className="mx-auto w-full max-w-[1600px] px-3 sm:px-4 lg:px-6 2xl:max-w-[1760px]">
            {/* Heading skeleton */}
            <div className="py-8">
                <div className="h-7 w-56 animate-pulse rounded bg-slate-200" />
                <div className="mt-3 h-4 w-2/3 animate-pulse rounded bg-slate-200" />
            </div>

            {/* Grid skeleton */}
            <section className="py-8">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {Array.from({ length: count }).map((_, i) => (
                        <div key={i} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <div className="h-56 w-full animate-pulse bg-slate-200" />
                            <div className="p-4 text-center">
                                <div className="mx-auto h-4 w-40 animate-pulse rounded bg-slate-200" />
                                <div className="mx-auto mt-2 h-3 w-56 animate-pulse rounded bg-slate-200" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
