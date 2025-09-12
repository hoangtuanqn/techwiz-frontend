import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "aos/dist/aos.css";
import "react-loading-skeleton/dist/skeleton.css";
import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";
import QueryProvider from "~/wrapper/QueryProvider";
import LayoutGetInfoMe from "~/components/layout/LayoutGetInfoMe";
import { ReduxProvider } from "~/wrapper/ReduxProvider";
import ChatBotAI from "~/components/ChatBotAI";
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        template: "%s | University Event Information System",
        default: "University Event Information System", // a default is required when creating a template
    },
    description: "University Event Information System - The platform for managing and accessing university events!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ReduxProvider>
                    <QueryProvider>
                        <LayoutGetInfoMe>
                            <Header />
                            {children}
                            <Footer />
                            <ChatBotAI />
                        </LayoutGetInfoMe>
                    </QueryProvider>
                </ReduxProvider>
            </body>
        </html>
    );
}
