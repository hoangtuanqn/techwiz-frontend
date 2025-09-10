import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

const ContactInfo = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-[#06b6d4]" aria-hidden="true" />
                <div>
                    <h3 className="font-semibold text-slate-800">Address</h3>
                    <p className="text-slate-600">
                        123 University Avenue, District 5 <br /> Ho Chi Minh City, Vietnam
                    </p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-[#06b6d4]" aria-hidden="true" />
                <div>
                    <h3 className="font-semibold text-slate-800">Email</h3>
                    <a
                        href="mailto:info@eventsphere.com"
                        className="text-slate-600 hover:text-[#06b6d4]"
                        aria-label="Send email to info@eventsphere.com"
                    >
                        info@eventsphere.com
                    </a>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-[#06b6d4]" aria-hidden="true" />
                <div>
                    <h3 className="font-semibold text-slate-800">Phone</h3>
                    <a
                        href="tel:+84123456789"
                        className="text-slate-600 hover:text-[#06b6d4]"
                        aria-label="Call +84 123 456 789"
                    >
                        +84 123 456 789
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;
