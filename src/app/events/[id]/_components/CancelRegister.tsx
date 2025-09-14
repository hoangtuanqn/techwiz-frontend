"use client";

import React from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import eventApi from "~/apiRequest/event";
import { ConfirmDialog } from "~/components/ConfirmDialog";
import { Button } from "~/components/ui/button";
import { notificationErrorApi } from "~/libs/apis/validationResponse";
import { EventDetailResponseType } from "~/types/schemaZod/event.schema";

interface CancelRegisterProps {
    event: EventDetailResponseType["data"];
}

const CancelRegister: React.FC<CancelRegisterProps> = ({ event }) => {
    const cancelEventMutation = useMutation({
        mutationFn: async () => await eventApi.cancelEventRegistration(event.id),
        onSuccess: () => {
            toast.success("Your event registration has been successfully canceled.");
            window.location.reload();
        },
        onError: notificationErrorApi,
    });

    return (
        <ConfirmDialog
            message="Are you sure you want to cancel your registration for this event? This action cannot be undone."
            action={() => cancelEventMutation.mutate()}
        >
            <Button
                variant="outline"
                className="inline-flex items-center justify-center rounded-xl border-emerald-300 px-6 py-3 font-medium text-emerald-700 shadow-lg transition-all duration-200 hover:scale-105"
            >
                Cancel Registration
            </Button>
        </ConfirmDialog>
    );
};

export default CancelRegister;
