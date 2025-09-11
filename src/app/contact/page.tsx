import Map from "./_components/Map";
import ContactInfo from "./_components/ContactInfo";
import FormContact from "./_components/FormContact";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with us for any inquiries or support.",
};
export default function ContactPage() {
    return (
        <section id="contact" className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-3xl font-bold text-slate-800 md:text-4xl">Contact Us</h1>
                    <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                        Have questions about events, registration, or partnership opportunities? Reach out to our team
                        and we’ll respond as soon as possible.
                    </p>
                </div>

                <div className="grid gap-12 md:grid-cols-2">
                    {/* Left: Contact Info */}
                    <ContactInfo />

                    {/* Right: Form */}
                    <FormContact />
                </div>

                {/* Map */}
                <Map />
            </div>
        </section>
    );
}
