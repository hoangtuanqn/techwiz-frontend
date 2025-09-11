"use client";
import React, { useState } from "react";
import {
    ChevronDown,
    HelpCircle,
    Search,
    BookOpen,
    Shield,
    CreditCard,
    Smartphone,
    Award,
    Users,
    Mail,
} from "lucide-react";
const faqs = [
    {
        question: "What is Techwiz?",
        answer: "Techwiz is a cutting-edge online learning platform designed to accelerate your technology career. We offer interactive courses, hands-on projects, and industry-recognized certifications to help you master the latest tech skills.",
        icon: BookOpen,
        category: "General",
    },
    {
        question: "How do I register an account?",
        answer: "Getting started is simple! Click the 'Sign Up' button in the top navigation, choose your learning path, and complete the registration form. You'll receive a welcome email with next steps to begin your learning journey.",
        icon: Users,
        category: "Account",
    },
    {
        question: "Can I learn for free?",
        answer: "Yes! We offer a comprehensive free tier with access to introductory courses and community features. For unlimited access to our premium content, expert mentorship, and certification programs, consider upgrading to our Pro plan.",
        icon: Award,
        category: "Pricing",
    },
    {
        question: "How can I contact support?",
        answer: "Our dedicated support team is here to help! Reach us at support@techwiz.com, use the live chat feature in your dashboard, or visit our Contact page. We typically respond within 2-4 hours during business days.",
        icon: Mail,
        category: "Support",
    },
    {
        question: "How do I reset my password?",
        answer: "No worries! Click 'Forgot Password' on the login page, enter your email address, and we'll send you a secure reset link. Follow the instructions in the email to create a new password and regain access to your account.",
        icon: Shield,
        category: "Account",
    },
    {
        question: "Are there certificates after completing courses?",
        answer: "Absolutely! Upon successful completion of our courses, you'll receive industry-recognized digital certificates that you can add to your LinkedIn profile, resume, or portfolio to showcase your new skills to employers.",
        icon: Award,
        category: "Certification",
    },
    {
        question: "Can I access courses on mobile devices?",
        answer: "Yes! Techwiz is fully optimized for mobile learning. Access your courses, track progress, and continue learning seamlessly across desktop, tablet, and smartphone devices with our responsive web platform.",
        icon: Smartphone,
        category: "Technical",
    },
    {
        question: "How do I pay for a subscription?",
        answer: "We accept all major payment methods including credit/debit cards, PayPal, bank transfers, and popular e-wallets. All transactions are secured with industry-standard encryption for your peace of mind.",
        icon: CreditCard,
        category: "Pricing",
    },
    {
        question: "Is my personal information safe?",
        answer: "Your privacy and security are our top priorities. We use enterprise-grade encryption, comply with GDPR regulations, and never share your personal information with third parties without your explicit consent.",
        icon: Shield,
        category: "Security",
    },
    {
        question: "Can I cancel my subscription anytime?",
        answer: "Of course! You have complete control over your subscription. Cancel anytime from your account settings with just a few clicks. You'll retain access until the end of your current billing period.",
        icon: Users,
        category: "Account",
    },
];

const categories = ["All", "General", "Account", "Pricing", "Support", "Certification", "Technical", "Security"];

export default function FAQPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [openItems, setOpenItems] = useState<number[]>([]);

    const filteredFaqs = faqs.filter((faq) => {
        const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
        const matchesSearch =
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const toggleItem = (index: number) => {
        setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Background Elements */}
            <div
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(circle at 20% 30%, rgba(6,182,212,0.15) 0%, transparent 50%), 
                           radial-gradient(circle at 80% 70%, rgba(217,70,239,0.15) 0%, transparent 50%)`,
                }}
            ></div>

            {/* Animated background orbs */}
            <div className="absolute top-20 left-10 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 blur-3xl"></div>
            <div className="absolute right-10 bottom-20 h-96 w-96 animate-pulse rounded-full bg-gradient-to-r from-fuchsia-500/10 to-cyan-500/10 blur-3xl delay-1000"></div>

            <div className="relative z-10 container mx-auto px-6 py-16 sm:px-8 lg:px-12">
                {/* Header Section */}
                <div className="mb-16 text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 px-4 py-2">
                        <HelpCircle className="h-4 w-4 text-cyan-400" />
                        <span className="text-sm font-medium text-cyan-300">Support Center</span>
                    </div>

                    <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                        Frequently Asked{" "}
                        <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
                            Questions
                        </span>
                    </h1>

                    <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-slate-300">
                        Find answers to common questions about Techwiz. Can&apos;t find what you&apos;re looking for?
                        Our support team is here to help!
                    </p>

                    {/* Search Bar */}
                    <div className="relative mx-auto max-w-2xl">
                        <div className="relative">
                            <Search className="absolute top-1/2 left-4 z-20 h-5 w-5 -translate-y-1/2 transform text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search FAQ..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-2xl border border-white/20 bg-white/10 py-4 pr-6 pl-12 text-white placeholder-slate-400 backdrop-blur-sm transition-all duration-300 focus:border-cyan-400/50 focus:bg-white/20 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="mb-12">
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`rounded-2xl px-6 py-3 font-medium transition-all duration-300 ${
                                    activeCategory === category
                                        ? "scale-105 transform bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white shadow-lg"
                                        : "border border-white/20 bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* FAQ List */}
                <div className="mx-auto max-w-4xl">
                    <div className="space-y-6">
                        {filteredFaqs.map((faq, index) => {
                            const IconComponent = faq.icon;
                            const isOpen = openItems.includes(index);

                            return (
                                <div
                                    key={index}
                                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/30 hover:bg-white/10"
                                >
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-fuchsia-500/0 transition-all duration-500 group-hover:from-cyan-500/5 group-hover:to-fuchsia-500/5"></div>

                                    <div className="relative p-6">
                                        <button
                                            onClick={() => toggleItem(index)}
                                            className="flex w-full items-center justify-between text-left"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20">
                                                    <IconComponent className="h-6 w-6 text-cyan-400" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-cyan-300 md:text-xl">
                                                        {faq.question}
                                                    </h3>
                                                    <span className="text-sm font-medium text-slate-400">
                                                        {faq.category}
                                                    </span>
                                                </div>
                                            </div>

                                            <ChevronDown
                                                className={`h-6 w-6 text-slate-400 transition-transform duration-300 ${
                                                    isOpen ? "rotate-180 text-cyan-400" : ""
                                                }`}
                                            />
                                        </button>

                                        <div
                                            className={`mt-4 overflow-hidden transition-all duration-500 ${
                                                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                            }`}
                                        >
                                            <div className="pr-4 pl-16">
                                                <div className="mb-4 h-px bg-gradient-to-r from-cyan-500/30 to-fuchsia-500/30"></div>
                                                <p className="leading-relaxed text-slate-300">{faq.answer}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* No results */}
                    {filteredFaqs.length === 0 && (
                        <div className="py-16 text-center">
                            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20">
                                <Search className="h-12 w-12 text-cyan-400" />
                            </div>
                            <h3 className="mb-4 text-2xl font-semibold text-white">No results found</h3>
                            <p className="text-slate-400">Try adjusting your search or browse different categories.</p>
                        </div>
                    )}
                </div>

                {/* Contact Support Section */}
                <div className="mt-20 text-center">
                    <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                        <h3 className="mb-4 text-2xl font-bold text-white">Still have questions?</h3>
                        <p className="mb-6 text-slate-300">
                            Can&apos;t find the answer you&apos;re looking for? Our friendly support team is here to
                            help.
                        </p>
                        <button className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/25">
                            <Mail className="h-5 w-5" />
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
