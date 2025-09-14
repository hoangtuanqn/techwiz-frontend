"use client";
import { Button } from "~/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import { EventDetailResponseType } from "~/types/schemaZod/event.schema";
import { useAuth } from "~/hooks/useAuth";
import {
    Calendar,
    MapPin,
    User,
    Mail,
    Phone,
    Building,
    IdCard,
    Clock,
    LogIn,
    AlertCircle,
    CalendarPlus,
    Star,
    Award,
    Users,
} from "lucide-react";
import { formatter } from "~/utils/format";
import Link from "next/link";
import { toast } from "sonner";
import eventApi from "~/apiRequest/event";
import { notificationErrorApi } from "~/libs/apis/validationResponse";
import { useMutation } from "@tanstack/react-query";
import Loading from "~/components/Loading";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { useState } from "react";
import { getGoogleCalendarLink } from "~/libs/googleCalendar";
export function ConfirmCollaborator({ event: ev }: { event: EventDetailResponseType["data"] }) {
    const { user } = useAuth();
    const [isAddToCalendar, setIsAddToCalendar] = useState(true);

    // destructure đúng theo schema: { event, seating, organizer }

    const seating = ev.seating;
    const org = ev.organizer;

    const totalSeats = seating?.total_seats ?? 0;
    const booked = ev?.booked_count ?? 0;
    const available = Math.max(totalSeats - booked, 0);

    const mutationRegisterEvent = useMutation({
        mutationFn: () => eventApi.registerVolunteer(ev.id),
        onSuccess: () => {
            toast.success("You have successfully registered for the event!");
            if (isAddToCalendar && ev.start_event && ev.end_event) {
                const gcalLink = getGoogleCalendarLink({
                    title: ev.title,
                    start: ev.start_event, // ví dụ "2025-09-28 17:15:14" hoặc "2025-09-28T17:15:14.000000Z"
                    end: ev.end_event,
                    details: ev.description ?? "",
                    location: ev.venue ?? "",
                    // timezone: "Asia/Ho_Chi_Minh",
                });
                // Mở 1 tab mới
                window.open(gcalLink, "_blank");
            }
            window.location.reload();
        },
        onError: notificationErrorApi,
    });

    const handleConfirmCollaborator = async () => {
        await mutationRegisterEvent.mutateAsync();
    };

    return (
        <div className="flex gap-3">
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        disabled={ev.is_booked || available === 0}
                        className={`inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 ${
                            ev.is_booked
                                ? "bg-gradient-to-r from-purple-500 to-indigo-600 hover:shadow-purple-500/25"
                                : "bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-orange-500/25"
                        }`}
                    >
                        {ev.is_booked ? "✓ Already Volunteering" : available === 0 ? "Event Full" : "Volunteer Now"}
                    </Button>
                </DialogTrigger>

                <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[600px]">
                    {mutationRegisterEvent.isPending && <Loading />}
                    <DialogHeader>
                        <DialogTitle className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-2xl font-bold text-transparent">
                            {!user ? "Login Required" : "Become a Volunteer"}
                        </DialogTitle>
                        <DialogDescription className="text-slate-600">
                            {!user
                                ? "Please login to your account to volunteer for this event."
                                : "Join us as a volunteer to help make this event successful. Please review the details below."}
                        </DialogDescription>
                    </DialogHeader>

                    {!user ? (
                        // ======== Login Required Section ========
                        <div className="space-y-6">
                            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-amber-50 to-orange-50 p-8 text-center">
                                <AlertCircle className="mx-auto mb-4 h-16 w-16 text-amber-500" />
                                <h3 className="mb-2 text-xl font-semibold text-slate-800">Authentication Required</h3>
                                <p className="mb-6 text-slate-600">
                                    You need to be logged in to volunteer for events. Please login to your account or
                                    create a new one if you dont have an account yet.
                                </p>

                                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                                    <DialogClose asChild>
                                        <Link href="/auth/login">
                                            <Button className="inline-flex w-full items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white transition-all duration-200 hover:scale-105 sm:w-auto">
                                                <LogIn className="h-4 w-4" />
                                                Login to Volunteer
                                            </Button>
                                        </Link>
                                    </DialogClose>
                                    <DialogClose asChild>
                                        <Link href="/auth/register">
                                            <Button variant="outline" className="w-full sm:w-auto">
                                                Create Account
                                            </Button>
                                        </Link>
                                    </DialogClose>
                                </div>
                            </div>

                            {/* Event Preview - Limited Info */}
                            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-gray-50 p-6">
                                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-800">
                                    <Calendar className="h-5 w-5 text-slate-600" />
                                    Event Preview
                                </h3>

                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-2 h-2 w-2 rounded-full bg-slate-400" />
                                        <div>
                                            <p className="font-semibold text-slate-800">{ev.title}</p>
                                            <p className="line-clamp-2 text-sm text-slate-600">{ev.description}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-1 gap-3">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-slate-500" />
                                            <span className="text-sm text-slate-600">
                                                {formatter.formatDate(ev.start_event)}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-slate-500" />
                                            <span className="text-sm text-slate-600">{ev.venue}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // ======== Authenticated User - Full Collaborator Form ========
                        <div className="space-y-6">
                            {/* Event Information */}
                            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-orange-50 to-red-50 p-6">
                                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-800">
                                    <Calendar className="h-5 w-5 text-orange-600" />
                                    Event You&apos;ll Support
                                </h3>

                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-2 h-2 w-2 rounded-full bg-orange-500" />
                                        <div>
                                            <p className="font-semibold text-slate-800">{ev.title}</p>
                                            <p className="text-sm text-slate-600">{ev.description}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-slate-500" />
                                            <span className="text-sm text-slate-600">
                                                {formatter.formatDate(ev.start_event)}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-slate-500" />
                                            <span className="text-sm text-slate-600">
                                                {formatter.formatTime(ev.start_event)} –{" "}
                                                {formatter.formatTime(ev.end_event)}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-slate-500" />
                                            <span className="text-sm text-slate-600">{ev.venue}</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-slate-500" />
                                            <span className="text-sm text-slate-600">Organized by {org.full_name}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* User Information */}
                            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-orange-50 p-6">
                                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-800">
                                    <User className="h-5 w-5 text-orange-600" />
                                    Volunteer Information
                                </h3>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="flex items-center gap-3">
                                        <User className="h-4 w-4 text-slate-500" />
                                        <div>
                                            <p className="text-xs tracking-wide text-slate-500 uppercase">Full Name</p>
                                            <p className="text-sm font-medium text-slate-800">{user.full_name}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Mail className="h-4 w-4 text-slate-500" />
                                        <div>
                                            <p className="text-xs tracking-wide text-slate-500 uppercase">Email</p>
                                            <p className="text-sm font-medium text-slate-800">{user.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Phone className="h-4 w-4 text-slate-500" />
                                        <div>
                                            <p className="text-xs tracking-wide text-slate-500 uppercase">Mobile</p>
                                            <p className="text-sm font-medium text-slate-800">{user.mobile}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Building className="h-4 w-4 text-slate-500" />
                                        <div>
                                            <p className="text-xs tracking-wide text-slate-500 uppercase">Department</p>
                                            <p className="text-sm font-medium text-slate-800">{user.department}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 md:col-span-2">
                                        <IdCard className="h-4 w-4 text-slate-500" />
                                        <div>
                                            <p className="text-xs tracking-wide text-slate-500 uppercase">
                                                Enrollment Number
                                            </p>
                                            <p className="text-sm font-medium text-slate-800">{user.enrollment_no}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Volunteer Benefits */}
                            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-amber-50 to-yellow-50 p-6">
                                <h3 className="mb-4 text-lg font-semibold text-slate-800">Volunteer Benefits</h3>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                                            <Star className="h-5 w-5 text-amber-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-800">Community Service Hours</p>
                                            <p className="text-sm text-slate-600">Earn valuable volunteer experience</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                                            <Award className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-800">Certificate of Appreciation</p>
                                            <p className="text-sm text-slate-600">Recognition for your contribution</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                            <Users className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-800">Networking Opportunities</p>
                                            <p className="text-sm text-slate-600">
                                                Connect with organizers and participants
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <Label className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 transition-colors hover:border-blue-400 hover:bg-blue-50/60 dark:border-slate-700 dark:hover:border-blue-700 dark:hover:bg-blue-950/40">
                        <Checkbox
                            id="add-to-calendar"
                            checked={isAddToCalendar}
                            onCheckedChange={(checked: boolean) => setIsAddToCalendar(checked)}
                            className="accent-blue-600"
                        />
                        <div>
                            <p className="text-base font-medium text-blue-700 dark:text-blue-300">
                                Add to Google Calendar
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Add this event to your Google Calendar for reminders and easy access.
                            </p>
                        </div>
                    </Label>

                    <DialogFooter className="flex gap-3 pt-6">
                        {!user ? (
                            <DialogClose asChild>
                                <Button variant="outline" className="w-full">
                                    Close
                                </Button>
                            </DialogClose>
                        ) : (
                            <>
                                <DialogClose asChild>
                                    <Button variant="outline" className="flex-1">
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button
                                    onClick={handleConfirmCollaborator}
                                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white transition-all duration-200 hover:scale-105"
                                >
                                    Confirm Volunteer
                                </Button>
                            </>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
