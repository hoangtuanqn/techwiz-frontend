"use client";
import { Search, Filter, X } from "lucide-react";
import React from "react";
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
import { Button } from "~/components/ui/button";
import { useFilterQuery } from "~/hooks/useFilterQuery";

const fields = ["search", "category", "status", "page"] as const;

const FilterEventRegistered = () => {
    const { formValues, setFieldValue, handleSubmit, isFiltered, resetFields } = useFilterQuery(fields);

    const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    return (
        <div className="mb-8 space-y-4">
            {/* Search and Filters Row */}
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                {/* Search Input */}
                <div className="relative w-full md:max-w-xs">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                        type="text"
                        placeholder="Search events..."
                        value={formValues.filter.search || ""}
                        onChange={(e) => setFieldValue("search", e.target.value, "filter")}
                        onKeyPress={handleSearchKeyPress}
                        className="block w-full rounded-lg border-gray-300 bg-white p-3 pl-10 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                    />
                </div>

                {/* Filters */}
                <div className="flex w-full flex-wrap items-center gap-3 md:w-auto">
                    {/* Category Filter */}
                    <Select
                        value={formValues.filter.category || ""}
                        onValueChange={(value) => setFieldValue("category", value, "filter")}
                    >
                        <SelectTrigger className="w-[160px] bg-white">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                            <SelectGroup>
                                <SelectLabel>Category</SelectLabel>
                                <SelectItem value="technical">Technical</SelectItem>
                                <SelectItem value="business">Business</SelectItem>
                                <SelectItem value="cultural">Cultural</SelectItem>
                                <SelectItem value="sports">Sports</SelectItem>
                                <SelectItem value="workshop">Workshops & Seminars</SelectItem>
                                <SelectItem value="academic">Academic</SelectItem>
                                <SelectItem value="annual">Annual Functions</SelectItem>
                                <SelectItem value="community">Community & Social</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {/* Status Filter */}
                    <Select
                        value={formValues.filter.status || ""}
                        onValueChange={(value) => setFieldValue("status", value, "filter")}
                    >
                        <SelectTrigger className="w-[160px] bg-white">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                            <SelectGroup>
                                <SelectLabel>Status</SelectLabel>
                                <SelectItem value="upcoming">Upcoming</SelectItem>
                                <SelectItem value="missed">Missed</SelectItem>
                                <SelectItem value="checked_in">Checked In</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {/* Apply Filter Button */}
                    <Button
                        onClick={handleSubmit}
                        className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-white hover:from-cyan-600 hover:to-emerald-600"
                    >
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                    </Button>

                    {/* Reset Filter Button */}
                    {isFiltered && (
                        <Button
                            onClick={resetFields}
                            variant="outline"
                            className="border-gray-300 text-gray-600 hover:bg-gray-50"
                        >
                            <X className="mr-2 h-4 w-4" />
                            Clear
                        </Button>
                    )}
                </div>
            </div>

            {/* Active Filters Display */}
            {isFiltered && (
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">Active filters:</span>
                    {formValues.filter.search && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-cyan-100 px-3 py-1 text-xs font-medium text-cyan-700">
                            Search: {formValues.filter.search}
                        </span>
                    )}
                    {formValues.filter.category && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                            Category: {formValues.filter.category}
                        </span>
                    )}
                    {formValues.filter.status && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                            Status: {formValues.filter.status}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default FilterEventRegistered;
