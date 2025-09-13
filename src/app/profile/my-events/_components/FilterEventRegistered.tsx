"use client";
import { Search } from "lucide-react";
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
const FilterEventRegistered = () => {
    return (
        <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="relative w-full md:max-w-xs">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                    type="text"
                    placeholder="Search events..."
                    // value={searchQuery}
                    // onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full rounded-lg border-gray-300 bg-white p-3 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div className="w-full md:w-auto">
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort events" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <SelectGroup>
                            <SelectLabel>Sort by</SelectLabel>
                            <SelectItem value="newest">Newest</SelectItem>
                            <SelectItem value="oldest">Oldest</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default FilterEventRegistered;
