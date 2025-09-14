"use client";

import React from "react";
import { Image as ImageIcon, UploadCloud, X } from "lucide-react";

export type CoverUploaderProps = {
    /** base64 data URL (hoặc null nếu chưa có) */
    value: string | null;
    /** set base64 (null để xoá) */
    onChange: (val: string | null) => void;
    /** hiện tên + dung lượng (tuỳ chọn) */
    info?: { name: string; size: string } | null;
    setInfo?: (info: { name: string; size: string } | null) => void;
    /** giới hạn MB (mặc định 5MB) */
    maxMB?: number;
    /** className container (tuỳ chọn) */
    className?: string;
};

function formatSize(size: number) {
    if (size < 1024) return size + " B";
    if (size < 1024 * 1024) return (size / 1024).toFixed(1) + " KB";
    return (size / (1024 * 1024)).toFixed(1) + " MB";
}

export default function CoverUploader({
    value,
    onChange,
    info,
    setInfo,
    maxMB = 5,
    className = "",
}: CoverUploaderProps) {
    const inputId = React.useId();

    function handleFile(file: File) {
        if (!file) return;
        if (file.size > maxMB * 1024 * 1024) {
            alert(`Ảnh quá lớn (> ${maxMB}MB). Vui lòng chọn ảnh khác.`);
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            onChange(reader.result as string);
            setInfo?.({ name: file.name, size: formatSize(file.size) });
        };
        reader.readAsDataURL(file);
    }

    return (
        <div className={`space-y-3 ${className}`}>
            <div className="text-sm font-medium text-slate-700">Cover Image</div>

            {!value ? (
                <label
                    htmlFor={inputId}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files?.[0];
                        if (file) handleFile(file);
                    }}
                    className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/60 p-4 transition hover:border-slate-300 hover:bg-slate-50"
                >
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-white p-2 shadow-sm ring-1 ring-slate-200">
                            <ImageIcon className="h-5 w-5 text-slate-500" />
                        </div>
                        <div className="text-sm">
                            <div className="font-medium text-slate-800">Drag & drop an image here.</div>
                            <div className="text-xs text-slate-500">or click to select. (PNG/JPG, &lt; {maxMB}MB)</div>
                        </div>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white">
                        <UploadCloud className="h-4 w-4" />
                        Select Image
                    </div>
                    <input
                        id={inputId}
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => {
                            const file = e.currentTarget.files?.[0];
                            if (file) handleFile(file);
                        }}
                    />
                </label>
            ) : (
                <div className="space-y-2">
                    <div className="overflow-hidden rounded-xl border border-slate-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={value} alt="cover" className="max-h-56 w-full object-cover" />
                    </div>
                    {!!info && (
                        <div className="text-xs text-slate-500">
                            {info.name} • {info.size}
                        </div>
                    )}
                    <div className="flex flex-wrap items-center gap-2">
                        <label
                            htmlFor={inputId}
                            className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
                        >
                            <UploadCloud className="h-4 w-4" />
                            Change Image
                            <input
                                id={inputId}
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={(e) => {
                                    const file = e.currentTarget.files?.[0];
                                    if (file) handleFile(file);
                                }}
                            />
                        </label>
                        <button
                            type="button"
                            onClick={() => {
                                onChange(null);
                                setInfo?.(null);
                            }}
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                        >
                            <X className="h-4 w-4" />
                            Delete Image
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
