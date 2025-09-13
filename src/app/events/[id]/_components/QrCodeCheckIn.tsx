"use client";
import React from "react";
import QRCode from "react-qr-code";
import { APP } from "~/config/env";
import { useAuth } from "~/hooks/useAuth";

const QrCodeCheckIn = ({ id_event }: { id_event: number }) => {
    const { user } = useAuth();
    return (
        <div className="mt-8 flex flex-col items-center justify-center">
            <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-6 shadow">
                <div className="mb-3 text-center text-lg font-semibold text-cyan-700">Check-in QR Code</div>
                <QRCode
                    value={APP.API.FULL_URL + `/events/${user?.id}/${id_event}/check-in`}
                    size={160}
                    className="mx-auto rounded-lg border border-cyan-100 bg-white p-2"
                />
                <div className="mt-3 text-center text-sm text-cyan-600">
                    Please present this QR code at the event check-in desk.
                </div>
            </div>
        </div>
    );
};

export default QrCodeCheckIn;
