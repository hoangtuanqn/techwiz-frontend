"use client";

import React, { useState } from "react";
import { Search, Grid3X3, Grid as GridIcon, Eye, Download, ImageIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import eventApi from "~/apiRequest/event";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import { formatter } from "~/utils/format";
import { GalleryCardSkeleton } from "./GallerySkeleton";
import { PaginationNav } from "~/components/Pagination";
import { Input } from "~/components/ui/input";
import { useFilterQuery } from "~/hooks/useFilterQuery";
import useGetSearchQuery from "~/hooks/useGetSearchQuery";
import { buildLaravelFilterQuery } from "~/utils/helpers";
const fields = ["search", "category", "page"] as const;
export default function GalleryPage() {
    const { formValues, setFieldValue, handleSubmit } = useFilterQuery(fields);
    const { search, category, page } = useGetSearchQuery(fields);

    const [gridSize, setGridSize] = useState<"small" | "medium" | "large">("medium");

    const {
        data: imagesResponse,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["gallery-images", { search, category, page }],
        queryFn: async () => {
            const res = await eventApi.getAllEventImages(
                +page || 1,
                16,
                search || "",
                buildLaravelFilterQuery({ category }),
            );
            return res.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const totalImages: number = imagesResponse?.total ?? 0;

    const getGridClasses = () => {
        switch (gridSize) {
            case "small":
                return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5";
            case "large":
                return "grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2";
            default:
                return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
        }
    };

    const downloadImage = (img: { thumbnail: string; caption?: string }) => {
        const link = document.createElement("a");
        link.href = img.thumbnail;
        const name = (img.caption || "photo").replace(/[\\/:*?"<>|]/g, "_");
        const hasExt = /\.[a-z0-9]{2,4}$/i.test(link.href);
        link.download = hasExt ? name : `${name}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (error) {
        return (
            <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
                <div className="mx-auto max-w-3xl px-4 py-16 text-center">
                    <h2 className="text-xl font-semibold text-red-600">Không tải được thư viện ảnh</h2>
                    <p className="mt-2 text-slate-600">Vui lòng thử lại sau.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <section className="mb-12 text-center">
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                            📸 Event Gallery
                        </h1>
                        <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-slate-600">
                            Explore our most memorable moments captured during events, seminars, workshops, and
                            competitions.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-2">
                            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                                {isLoading ? "…" : totalImages} Photos
                            </span>
                            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                                Multiple Categories
                            </span>
                            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                                High Quality
                            </span>
                        </div>
                    </div>
                </section>

                {/* Controls */}
                <section className="mb-8">
                    <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            {/* Search */}
                            <div className="relative max-w-md flex-1">
                                <Input
                                    type="text"
                                    placeholder="Search photos or events..."
                                    value={formValues.filter.search || ""}
                                    onChange={(e) => setFieldValue("search", e.target.value, "filter")}
                                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-sm focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 focus:outline-none"
                                />
                                <span className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400">
                                    <Search className="h-4 w-4" />
                                </span>
                            </div>

                            {/* Category + Grid size + Filter */}
                            <div className="flex flex-wrap items-center gap-3">
                                <Select
                                    value={formValues.filter.category || ""}
                                    onValueChange={(value) => setFieldValue("category", value, "filter")}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Category</SelectLabel>
                                            <SelectItem value="all">All</SelectItem>
                                            <SelectItem value="technical">Technical</SelectItem>
                                            <SelectItem value="business">Business</SelectItem>
                                            <SelectItem value="cultural">Cultural</SelectItem>
                                            <SelectItem value="sports">Sports</SelectItem>
                                            <SelectItem value="workshop">Workshops &amp; Seminars</SelectItem>
                                            <SelectItem value="academic">Academic</SelectItem>
                                            <SelectItem value="annual">Annual Functions</SelectItem>
                                            <SelectItem value="community">Community &amp; Social</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                {/* Button filter */}
                                <button
                                    className="inline-flex cursor-pointer items-center gap-1 rounded-xl bg-cyan-500 px-3 py-2 text-sm text-white hover:bg-cyan-600"
                                    onClick={handleSubmit}
                                >
                                    <Search className="h-4 w-4" /> Apply
                                </button>

                                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-1">
                                    <button
                                        onClick={() => setGridSize("small")}
                                        className={`rounded p-2 transition-colors ${
                                            gridSize === "small"
                                                ? "bg-slate-100 text-slate-700"
                                                : "text-slate-400 hover:text-slate-600"
                                        }`}
                                        title="Small grid"
                                    >
                                        <Grid3X3 className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => setGridSize("medium")}
                                        className={`rounded p-2 transition-colors ${
                                            gridSize === "medium"
                                                ? "bg-slate-100 text-slate-700"
                                                : "text-slate-400 hover:text-slate-600"
                                        }`}
                                        title="Medium grid"
                                    >
                                        <GridIcon className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => setGridSize("large")}
                                        className={`rounded p-2 transition-colors ${
                                            gridSize === "large"
                                                ? "bg-slate-100 text-slate-700"
                                                : "text-slate-400 hover:text-slate-600"
                                        }`}
                                        title="Large grid"
                                    >
                                        <ImageIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Results count */}
                        <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                            <span>
                                Showing {isLoading ? "…" : (imagesResponse?.data.length ?? 0)} of{" "}
                                {isLoading ? "…" : totalImages}{" "}
                                {formValues.filter.category !== "all" && ` in ${formValues.filter.category}`}
                            </span>
                        </div>
                    </div>
                </section>

                {/* Loading skeleton */}
                {isLoading && (
                    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                        {[...Array(16)].map((_, i) => (
                            <GalleryCardSkeleton key={i} />
                        ))}
                    </section>
                )}

                {/* Gallery Grid */}
                {!isLoading && (
                    <section className={`grid gap-4 sm:gap-6 ${getGridClasses()}`}>
                        {imagesResponse?.data.map((img) => (
                            <div
                                key={img.id}
                                className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="aspect-square overflow-hidden">
                                    <img
                                        src={img.thumbnail}
                                        alt={img.caption}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <div className="absolute right-4 bottom-4 left-4">
                                        <h3 className="mb-1 line-clamp-1 text-lg font-semibold text-white">
                                            {img.caption}
                                        </h3>
                                        <p className="mb-2 line-clamp-1 text-sm text-white/80">
                                            {img.event?.title ?? "Untitled event"}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="inline-flex items-center rounded-full bg-white/20 px-2 py-1 text-xs font-medium text-white backdrop-blur">
                                                {formatter.capitalize(img.event?.category) ?? "other"}
                                            </span>
                                            <div className="flex gap-2">
                                                <button
                                                    className="cursor-pointer rounded-full bg-white/20 p-2 text-white backdrop-blur transition-colors hover:bg-white/30"
                                                    title="Preview"
                                                    onClick={() => window.open(img.thumbnail, "_blank")}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                                <button
                                                    className="cursor-pointer rounded-full bg-white/20 p-2 text-white backdrop-blur transition-colors hover:bg-white/30"
                                                    title="Download"
                                                    onClick={() => downloadImage(img)}
                                                >
                                                    <Download className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                {/* Empty State */}
                {!isLoading && imagesResponse?.data.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100">
                            <Search className="h-8 w-8 text-slate-400" />
                        </div>
                        <h3 className="mb-2 text-lg font-medium text-slate-900">No photos found</h3>
                        <p className="mb-4 text-slate-600">Try adjusting your search or filter criteria</p>
                    </div>
                )}

                <PaginationNav totalPages={imagesResponse?.total || 16} basePath="/gallery" />

                {/* Footer */}
                <footer className="mt-16 text-center">
                    <div className="rounded-2xl border border-slate-200 bg-white/50 p-8 backdrop-blur">
                        <h3 className="mb-2 text-lg font-semibold text-slate-900">Want to contribute?</h3>
                        <p className="mb-4 text-slate-600">
                            Share your own event moments with our community. Contact us to feature your images in the
                            gallery.
                        </p>
                        <button className="inline-flex items-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-cyan-500/25">
                            Submit Your Photos
                        </button>
                    </div>
                </footer>
            </div>
        </main>
    );
}
