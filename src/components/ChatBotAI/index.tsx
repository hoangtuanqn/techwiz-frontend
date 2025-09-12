"use client";
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import axios from "axios";
import { useNotificationSound } from "~/hooks/useNotificationSound";
import { notificate } from "~/libs/notification";
import { ChatHistoriesType } from "~/app/api/chat/ai/types/ChatBotType.type";
import ReactMarkdown from "react-markdown";
import DisplayEvents from "./DisplayEvents";

export const extractJSON = (input: string) => {
    const match = input.match(/{[\s\S]*}/); // tìm đoạn bắt đầu bằng { và kết thúc bằng }
    if (match) {
        try {
            return JSON.parse(match[0]); // parse ra object
        } catch (err) {
            console.error("Error when parsing JSON:", err);
            return input;
        }
    }
    return null;
};
const ChatBotAI = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [chatHistories, setChatHistories] = useState<ChatHistoriesType[]>([
        {
            role: "model",
            parts: [{ text: "Hello! How can I assist you today?" }],
            createdAt: new Date(),
        },
    ]);
    const [ids, setIds] = useState<{ id: number; event_id: number[] }[]>([]);
    const { playSound } = useNotificationSound();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistories, isOpen]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;
        const newHistories: ChatHistoriesType[] = [
            ...chatHistories,
            { role: "user", parts: [{ text: inputValue }], createdAt: new Date() },
        ];
        setChatHistories(newHistories);
        setInputValue("");
        setIsTyping(true);
        let modelReply = "Hiện tại máy chủ đang quá tải nên chưa thể hỗ trợ bạn được!";

        try {
            // Loại bỏ createdAt trước khi gửi

            const data = await axios.post("/api/chat/ai", {
                contents: newHistories.map(({ role, parts }) => ({ role, parts })), // Gửi đi mà không có createdAt
            });

            if (data.data?.candidates[0].content.parts[0].text) {
                const parse = extractJSON(data.data?.candidates[0].content.parts[0].text);
                // setDataParse(parse);
                modelReply =
                    parse?.message ||
                    data.data?.candidates[0].content.parts[0].text ||
                    "Xin lỗi, mình không hiểu câu hỏi của bạn";
                if (parse?.event_id && parse?.event_id.length > 0) {
                    setIds((prev) => [...prev, { id: chatHistories.length + 2, event_id: parse.event_id || [] }]);
                }
            }
            notificate(modelReply);
        } finally {
            playSound();
            setChatHistories((prev) => [
                ...prev,
                { role: "model", parts: [{ text: modelReply }], createdAt: new Date() },
            ]);
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <>
            {/* Chat Button */}
            <div className="fixed right-6 bottom-15 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`group relative cursor-pointer overflow-hidden rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 ${
                        isOpen
                            ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                            : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    }`}
                >
                    <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    {isOpen ? (
                        <X className="relative z-10 h-6 w-6 cursor-pointer text-white transition-transform duration-300" />
                    ) : (
                        <MessageCircle className="relative z-10 h-6 w-6 text-white transition-transform duration-300" />
                    )}

                    {/* Notification dot */}
                    {!isOpen && (
                        <div className="absolute -top-1 -right-1 h-3 w-3 animate-pulse rounded-full bg-red-500" />
                    )}
                </button>
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div className="animate-in slide-in-from-bottom-5 fade-in fixed right-6 bottom-24 z-40 w-96 max-w-[calc(100vw-3rem)] duration-300">
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-2xl backdrop-blur-sm">
                        {/* Header */}
                        <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                                    <Bot className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">AI Assistant</h3>
                                    <p className="text-xs text-white/80">Online • Ready to help</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="cursor-pointer rounded-full p-1 transition-colors hover:bg-white/20"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="h-96 space-y-4 overflow-y-auto p-4">
                            {chatHistories.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    {message.role === "model" && (
                                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                                            <Bot className="h-4 w-4" />
                                        </div>
                                    )}

                                    <div className="flex flex-col gap-2">
                                        <div
                                            className={`max-w-xs rounded-2xl px-4 py-2 ${
                                                message.role === "user"
                                                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                                                    : "bg-slate-100 text-slate-900"
                                            }`}
                                        >
                                            <div className="text-sm">
                                                <ReactMarkdown>{message.parts[0].text}</ReactMarkdown>
                                            </div>

                                            <p
                                                className={`mt-1 text-xs ${
                                                    message.role === "user" ? "text-white/70" : "text-slate-500"
                                                }`}
                                            >
                                                {formatTime(message.createdAt)}
                                            </p>
                                        </div>
                                        {message.role === "model" && (
                                            <DisplayEvents
                                                eventIds={
                                                    ids
                                                        .filter((item) => item.id === index + 1)
                                                        .flatMap((item) => item.event_id) || []
                                                }
                                            />
                                        )}
                                    </div>

                                    {message.role === "user" && (
                                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                                            <User className="h-4 w-4" />
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Typing indicator */}
                            {isTyping && (
                                <div className="flex justify-start gap-3">
                                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                                        <Bot className="h-4 w-4" />
                                    </div>
                                    <div className="max-w-xs rounded-2xl bg-slate-100 px-4 py-3">
                                        <div className="flex space-x-1">
                                            <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                                            <div
                                                className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                                                style={{ animationDelay: "0.1s" }}
                                            />
                                            <div
                                                className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                                                style={{ animationDelay: "0.2s" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="border-t border-slate-200 p-4">
                            <div className="flex gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your message..."
                                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm transition-colors focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!inputValue.trim() || isTyping}
                                    className="cursor-pointer rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 p-2 text-white transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    <Send className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Quick actions */}
                            <div className="mt-3 flex flex-wrap gap-2">
                                <button
                                    onClick={() => setInputValue("How can you help me?")}
                                    className="rounded-lg bg-slate-100 px-3 py-1 text-xs text-slate-600 transition-colors hover:bg-slate-200"
                                >
                                    How can you help?
                                </button>
                                <button
                                    onClick={() => setInputValue("Tell me about events")}
                                    className="rounded-lg bg-slate-100 px-3 py-1 text-xs text-slate-600 transition-colors hover:bg-slate-200"
                                >
                                    About events
                                </button>
                                <button
                                    onClick={() => setInputValue("Contact support")}
                                    className="rounded-lg bg-slate-100 px-3 py-1 text-xs text-slate-600 transition-colors hover:bg-slate-200"
                                >
                                    Contact support
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBotAI;
