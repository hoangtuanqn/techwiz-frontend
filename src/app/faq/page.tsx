import React from "react";

const faqs = [
    {
        question: "What is Techwiz?",
        answer: "Techwiz is an online learning platform that helps you improve your technology skills.",
    },
    {
        question: "How do I register an account?",
        answer: "You can register by clicking the Sign Up button at the top right and filling in your personal information.",
    },
    {
        question: "Can I learn for free?",
        answer: "Some courses are free, but to access all content you need to subscribe to a paid plan.",
    },
    {
        question: "How can I contact support?",
        answer: "You can contact us via email at support@techwiz.com or through the Contact section on the website.",
    },
    {
        question: "How do I reset my password?",
        answer: "Click on 'Forgot password' at the login page and follow the instructions to reset your password.",
    },
    {
        question: "Are there certificates after completing courses?",
        answer: "Yes, you will receive a certificate after successfully completing a course.",
    },
    {
        question: "Can I access courses on mobile devices?",
        answer: "Yes, Techwiz is accessible on both desktop and mobile devices.",
    },
    {
        question: "How do I pay for a subscription?",
        answer: "You can pay via credit card, bank transfer, or e-wallets supported on our platform.",
    },
    {
        question: "Is my personal information safe?",
        answer: "We are committed to protecting your personal information and do not share it with third parties.",
    },
    {
        question: "Can I cancel my subscription anytime?",
        answer: "Yes, you can cancel your subscription at any time in your account settings.",
    },
];

export default function FAQPage() {
    return (
        <main className="mx-auto mt-10 mb-5 max-w-2xl rounded-xl bg-white px-4 py-12 shadow-lg">
            <h1 className="mb-10 text-center text-4xl font-extrabold text-blue-700">
                Frequently Asked Questions (FAQ)
            </h1>
            <div className="space-y-6">
                {faqs.map((faq, idx) => (
                    <details
                        key={idx}
                        className="group rounded-lg border border-gray-200 bg-gray-50 p-5 transition-shadow hover:shadow-md"
                    >
                        <summary className="flex cursor-pointer items-center text-lg font-semibold text-gray-800 transition-colors group-open:text-blue-700">
                            <svg
                                className="mr-2 h-5 w-5 text-blue-500 transition-transform group-open:rotate-90"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            {faq.question}
                        </summary>
                        <p className="mt-3 leading-relaxed text-gray-700">{faq.answer}</p>
                    </details>
                ))}
            </div>
        </main>
    );
}
