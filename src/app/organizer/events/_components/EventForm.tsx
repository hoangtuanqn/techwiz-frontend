"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar as CalendarIcon, Image as ImageIcon, MapPin } from "lucide-react";

import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { eventSchema } from "../schema/event.schema";
import { useMutation } from "@tanstack/react-query";
import { notificationErrorApi } from "~/libs/apis/validationResponse";
import eventApi from "~/apiRequest/event";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import Loading from "~/components/Loading";
import { uploadFile } from "~/libs/upload";
import { Description } from "@radix-ui/react-dialog";
type EventFormValues = z.infer<typeof eventSchema>;

export default function EventForm() {
    const form = useForm<EventFormValues>({
        resolver: zodResolver(eventSchema),
        mode: "onBlur",
        defaultValues: {
            title: "",
            summary: "",
            thumbnail: "",
            description: "",
            start_event: "",
            end_event: "",
            capacity: 20,
            mode: "onsite",
            venue: "",
            note: "",
            category: "other",
        },
    });
    const [file, setFile] = React.useState<File | null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            // Gửi file lên server hoặc preview
        }
    };

    // Khai báo mutation
    const eventMutation = useMutation({
        mutationFn: async (data: EventFormValues) => {
            if (file) {
                // Thực hiện upload ảnh
                const uploadPromise = await uploadFile(file);
                data.thumbnail = uploadPromise; // gán link ảnh đã upload vào data
                // setFile(null);
            }
            eventApi.createEvent(data);
        },

        onSuccess: (data) => {
            console.log(data);

            toast.success("Event created successfully!");
            // form.reset();
        },
        onError: notificationErrorApi,
    });

    const onSubmit = (data: EventFormValues) => {
        eventMutation.mutate(data);
    };

    return (
        <>
            {eventMutation.isPending && <Loading />}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto w-full space-y-8">
                    {/* OVERVIEW */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-7">
                        <div className="mb-5 flex items-start gap-3">
                            <div>
                                <h2 className="text-sm font-semibold tracking-wide text-slate-700">OVERVIEW</h2>
                                <p className="mt-1 text-xs text-slate-500">Basic information about your event.</p>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-2">
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Event title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="summary"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-2">
                                        <FormLabel>Summary</FormLabel>
                                        <FormControl>
                                            <Textarea rows={5} placeholder="Summary" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is a brief summary of your event (under 300 words).
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-2">
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                rows={40}
                                                cols={40}
                                                placeholder="Detailed description"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* MEDIA */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-7">
                        <div className="mb-5 flex items-start gap-3">
                            <ImageIcon className="h-4 w-4 text-slate-400" />
                            <div>
                                <h2 className="text-sm font-semibold tracking-wide text-slate-700">MEDIA</h2>
                                <p className="mt-1 text-xs text-slate-500">Upload a banner image for your event.</p>
                            </div>
                        </div>

                        <Label className="mb-1.5 block text-xs font-medium text-slate-600">Banner image</Label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-slate-700 hover:file:bg-slate-200"
                        />
                        <p className="mt-2 text-xs text-slate-500">Recommended: JPG/PNG, ≤ 3MB.</p>
                    </div>

                    {/* DETAILS */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-7">
                        <div className="mb-5 flex items-start gap-3">
                            <CalendarIcon className="h-4 w-4 text-slate-400" />
                            <div>
                                <h2 className="text-sm font-semibold tracking-wide text-slate-700">DETAILS</h2>
                                <p className="mt-1 text-xs text-slate-500">Schedule and capacity.</p>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-4">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Categories</SelectLabel>
                                                        <SelectItem value="technical">Technical</SelectItem>
                                                        <SelectItem value="business">Business</SelectItem>
                                                        <SelectItem value="cultural">Cultural</SelectItem>
                                                        <SelectItem value="sports">Sports</SelectItem>
                                                        <SelectItem value="workshop">Workshop</SelectItem>
                                                        <SelectItem value="academic">Academic</SelectItem>
                                                        <SelectItem value="annual">Annual</SelectItem>
                                                        <SelectItem value="community">Community</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="capacity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Capacity</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                inputMode="numeric"
                                                placeholder="Number of attendees"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="start_event"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Start datetime</FormLabel>
                                        <FormControl>
                                            <Input type="datetime-local" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="end_event"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>End datetime</FormLabel>
                                        <FormControl>
                                            <Input type="datetime-local" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* LOGISTICS */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-7">
                        <div className="mb-5 flex items-start gap-3">
                            <MapPin className="h-4 w-4 text-slate-400" />
                            <div>
                                <h2 className="text-sm font-semibold tracking-wide text-slate-700">LOGISTICS</h2>
                                <p className="mt-1 text-xs text-slate-500">Location, mode, and map notes.</p>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="mode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mode</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                className="flex flex-wrap gap-6 text-sm"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <RadioGroupItem value="onsite" id="mode-onsite" />
                                                    <Label htmlFor="mode-onsite" className="cursor-pointer">
                                                        Onsite
                                                    </Label>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <RadioGroupItem value="online" id="mode-online" />
                                                    <Label htmlFor="mode-online" className="cursor-pointer">
                                                        Online
                                                    </Label>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <RadioGroupItem value="hybrid" id="mode-hybrid" />
                                                    <Label htmlFor="mode-hybrid" className="cursor-pointer">
                                                        Hybrid
                                                    </Label>
                                                </div>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="venue"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Venue / Online link</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Physical venue or online meeting link" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="note"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-2">
                                        <FormLabel>Map note</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Extra directions or map notes" rows={4} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3">
                        <Button
                            type="submit"
                            // onClick={form.handleSubmit(onSubmit)}
                            className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Create
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
}
