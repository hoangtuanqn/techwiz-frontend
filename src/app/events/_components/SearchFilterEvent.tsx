"use client";
import React from "react";
import { Search, RotateCcw } from "lucide-react";
import { Input } from "~/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";

import { useFilterQuery } from "~/hooks/useFilterQuery";
const fields = ["search", "category", "status"] as const;
const SearchFilterEvent = () => {
    const { formValues, setFieldValue, handleSubmit, isFiltered, resetFields } = useFilterQuery(fields);

    return (
        <div className="mb-8 flex flex-col items-center gap-4">
            <div className="flex w-full flex-wrap justify-center gap-3">
                <div className="relative max-w-md min-w-[250px] flex-1">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                        type="text"
                        placeholder="Search events…"
                        className="w-full rounded-xl border border-slate-200 py-2 pr-3 pl-10 text-sm focus:ring-2 focus:ring-[#06b6d4]/50 focus:outline-none"
                        value={formValues.filter.search || ""}
                        onChange={(e) => setFieldValue("search", e.target.value, "filter")}
                    />
                </div>

                <Select
                    value={formValues.filter.category || ""}
                    onValueChange={(value) => setFieldValue("category", value, "filter")}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Category</SelectLabel>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="technical">Technical</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="cultural">Cultural</SelectItem>
                            <SelectItem value="sports">Sports</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select
                    value={formValues.filter.status || ""}
                    onValueChange={(value) => setFieldValue("status", value, "filter")}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value="available">Available</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                            <SelectItem value="hot">Hot</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {/* Xác nhận lọc */}
                <button
                    className="inline-flex cursor-pointer items-center gap-1 rounded-xl bg-cyan-500 px-3 py-2 text-sm text-white hover:bg-cyan-600"
                    onClick={handleSubmit}
                >
                    <Search className="h-4 w-4" /> Apply
                </button>
                {/* Reset */}
                <button
                    onClick={resetFields}
                    className="inline-flex cursor-pointer items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={!isFiltered}
                >
                    <RotateCcw className="h-4 w-4" /> Reset
                </button>
            </div>
        </div>
    );
};

export default SearchFilterEvent;
