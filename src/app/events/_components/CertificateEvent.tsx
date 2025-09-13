"use client";
import React from "react";
import Certificate from "~/components/Certificate";
import { useAuth } from "~/hooks/useAuth";

const CertificateEvent = () => {
    const { user } = useAuth();
    return (
        <Certificate
            fullName={user?.full_name || "Tuan Pham Hoang"}
            eventName="EventSphere Hackathon 2025"
            eventDate="13 September 2025"
        />
    );
};

export default CertificateEvent;
