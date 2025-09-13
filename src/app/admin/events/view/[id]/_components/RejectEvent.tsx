import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { XCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { notificationErrorApi } from "~/libs/apis/validationResponse";
import { toast } from "sonner";
import Loading from "~/components/Loading";
import eventApi from "~/apiRequest/event";

export function RejectEvent({ id }: { id: number }) {
    const [reason, setReason] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();
    const router = useRouter();

    const eventMutation = useMutation({
        mutationFn: async (data: { id: number; reason: string }) => {
            const res = await eventApi.updateEventStatus(data.id, "rejected", data.reason);
            return res;
        },
        onSuccess: () => {
            toast.success("Event rejected successfully");
            setReason(""); // Reset form
            setIsOpen(false); // Close dialog
            queryClient.invalidateQueries({ queryKey: ["event", id] }); // Refresh data
            router.refresh();
        },
        onError: notificationErrorApi,
    });

    const handleReject = async () => {
        const trimmedReason = reason.trim();

        if (!trimmedReason) {
            toast.error("Please provide a reason for rejection");
            return;
        }

        if (trimmedReason.length < 10) {
            toast.error("Please provide a more detailed reason (at least 10 characters)");
            return;
        }

        eventMutation.mutate({
            id: id,
            reason: trimmedReason,
        });
    };

    return (
        <>
            {eventMutation.isPending && <Loading />}
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogTrigger asChild>
                    <Button
                        className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100"
                        variant="outline"
                        onClick={() => setIsOpen(true)}
                    >
                        <XCircle className="h-4 w-4" />
                        Reject
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Reject Event</AlertDialogTitle>
                        <AlertDialogDescription>
                            Please provide a reason for rejecting this event. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="my-4">
                        <label htmlFor="rejection-reason" className="mb-2 block text-sm font-medium text-gray-700">
                            Rejection Reason *
                        </label>
                        <Textarea
                            id="rejection-reason"
                            placeholder="Please provide a detailed reason for rejecting this event..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full"
                            rows={4}
                            maxLength={500}
                        />
                        <div className="mt-1 flex justify-between text-xs text-gray-500">
                            <span>Be specific and constructive in your feedback</span>
                            <span>{reason.length}/500</span>
                        </div>
                        {reason.trim().length > 0 && reason.trim().length < 10 && (
                            <p className="mt-1 text-xs text-red-600">
                                Please provide a more detailed reason (at least 10 characters)
                            </p>
                        )}
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={eventMutation.isPending}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            disabled={!reason.trim() || reason.trim().length < 10 || eventMutation.isPending}
                            onClick={handleReject}
                            className="bg-red-600 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {eventMutation.isPending ? "Rejecting..." : "Reject Event"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
