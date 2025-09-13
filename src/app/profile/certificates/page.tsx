"use client";

import { useState, useMemo } from "react";
import { Award, Download, Building, Calendar, Search, Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import Image from "next/image";

// Mock data for demonstration with different certificate statuses
const certificatesData = [
    {
        id: 1,
        title: "Certified JavaScript Developer",
        issuer: "Tech Academy",
        date: "2024-08-16",
        expiryDate: "2026-08-16",
        category: "Technology",
        level: "Advanced",
        imageUrl: "/certificates/sample.jpg",
        skills: ["JavaScript", "ES6+", "Node.js"],
        credentialId: "TEC-JS-2024-001",
        status: "received", // received, pending, expired, available
        completionPercentage: 100,
    },
    {
        id: 2,
        title: "Advanced UI/UX Principles",
        issuer: "Design Institute",
        date: "2024-07-22",
        expiryDate: "2025-07-22",
        category: "Design",
        level: "Expert",
        imageUrl: "/certificates/sample.jpg",
        skills: ["UI Design", "UX Research", "Prototyping"],
        credentialId: "DES-UX-2024-002",
        status: "received",
        completionPercentage: 100,
    },
    {
        id: 3,
        title: "Public Speaking Mastery",
        issuer: "Communication Experts",
        date: "2024-06-06",
        expiryDate: "2024-06-06",
        category: "Soft Skills",
        level: "Intermediate",
        imageUrl: "/certificates/sample.jpg",
        skills: ["Presentation", "Communication", "Leadership"],
        credentialId: "COM-PS-2024-003",
        status: "expired",
        completionPercentage: 100,
    },
    {
        id: 4,
        title: "React Development Specialist",
        issuer: "Frontend Academy",
        date: "2024-09-01",
        expiryDate: "2026-09-01",
        category: "Technology",
        level: "Advanced",
        imageUrl: "/certificates/sample.jpg",
        skills: ["React", "Redux", "TypeScript"],
        credentialId: "FE-REACT-2024-004",
        status: "pending",
        completionPercentage: 85,
    },
    {
        id: 5,
        title: "Digital Marketing Strategy",
        issuer: "Marketing Pro",
        date: "2024-05-15",
        expiryDate: "2026-05-15",
        category: "Marketing",
        level: "Intermediate",
        imageUrl: "/certificates/sample.jpg",
        skills: ["SEO", "Social Media", "Analytics"],
        credentialId: "MKT-DIG-2024-005",
        status: "available",
        completionPercentage: 0,
    },
    {
        id: 6,
        title: "Cloud Computing Fundamentals",
        issuer: "Cloud Academy",
        date: "2024-10-01",
        expiryDate: "2025-10-01",
        category: "Technology",
        level: "Beginner",
        imageUrl: "/certificates/sample.jpg",
        skills: ["AWS", "Azure", "Cloud Architecture"],
        credentialId: "CLD-FUN-2024-006",
        status: "expired",
        completionPercentage: 75,
    },
];

export default function CertificatesReceivedPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredCertificates = useMemo(() => {
        const certificates = certificatesData.filter((cert) => {
            const matchesSearch =
                cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                cert.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesCategory = categoryFilter === "all" || cert.category === categoryFilter;
            const matchesStatus = statusFilter === "all" || cert.status === statusFilter;

            return matchesSearch && matchesCategory && matchesStatus;
        });

        certificates.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return sortBy === "newest" ? dateB - dateA : dateA - dateB;
        });

        return certificates;
    }, [searchQuery, sortBy, categoryFilter, statusFilter]);

    const getStatusInfo = (status: string) => {
        switch (status) {
            case "received":
                return {
                    label: "Received",
                    color: "bg-green-100 text-green-700 border-green-200",
                    icon: CheckCircle,
                    bgColor: "bg-green-50",
                };
            case "pending":
                return {
                    label: "Pending",
                    color: "bg-orange-100 text-orange-700 border-orange-200",
                    icon: Clock,
                    bgColor: "bg-orange-50",
                };
            case "expired":
                return {
                    label: "Expired",
                    color: "bg-red-100 text-red-700 border-red-200",
                    icon: XCircle,
                    bgColor: "bg-red-50",
                };
            case "available":
                return {
                    label: "Available",
                    color: "bg-blue-100 text-blue-700 border-blue-200",
                    icon: AlertTriangle,
                    bgColor: "bg-blue-50",
                };
            default:
                return {
                    label: "Unknown",
                    color: "bg-gray-100 text-gray-700 border-gray-200",
                    icon: AlertTriangle,
                    bgColor: "bg-gray-50",
                };
        }
    };

    const getLevelColor = (level: string) => {
        switch (level) {
            case "Expert":
                return "bg-purple-100 text-purple-700 border-purple-200";
            case "Advanced":
                return "bg-emerald-100 text-emerald-700 border-emerald-200";
            case "Intermediate":
                return "bg-cyan-100 text-cyan-700 border-cyan-200";
            default:
                return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    const categories = ["all", "Technology", "Design", "Soft Skills", "Marketing"];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50">
            {/* Animated Background Elements */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-10 -right-10 h-40 w-40 animate-pulse rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 opacity-20 blur-3xl" />
                <div className="absolute top-1/2 -left-10 h-32 w-32 animate-pulse rounded-full bg-gradient-to-br from-fuchsia-400 to-purple-400 opacity-20 blur-3xl delay-1000" />
                <div className="absolute right-1/4 bottom-20 h-24 w-24 animate-pulse rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 opacity-20 blur-2xl delay-2000" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="mb-12 text-center">
                    <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/70 px-6 py-3 shadow-lg backdrop-blur-sm">
                        <Award className="h-8 w-8 text-amber-500" />
                        <h1 className="bg-gradient-to-r from-cyan-600 to-fuchsia-600 bg-clip-text text-4xl font-bold text-transparent">
                            My Certificates
                        </h1>
                    </div>
                    <p className="mx-auto max-w-2xl text-lg text-slate-600">
                        A showcase of professional achievements and continuous learning milestones
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-4">
                    <div className="rounded-2xl border border-white/20 bg-white/60 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 p-3">
                                <CheckCircle className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">
                                    {certificatesData.filter((cert) => cert.status === "received").length}
                                </p>
                                <p className="text-slate-600">Received</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-white/20 bg-white/60 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 p-3">
                                <Clock className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">
                                    {certificatesData.filter((cert) => cert.status === "pending").length}
                                </p>
                                <p className="text-slate-600">Pending</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-white/20 bg-white/60 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-gradient-to-r from-red-500 to-pink-500 p-3">
                                <XCircle className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">
                                    {certificatesData.filter((cert) => cert.status === "expired").length}
                                </p>
                                <p className="text-slate-600">Expired</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-white/20 bg-white/60 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-3">
                                <AlertTriangle className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">
                                    {certificatesData.filter((cert) => cert.status === "available").length}
                                </p>
                                <p className="text-slate-600">Available</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter and Search Controls */}
                <div className="mb-8 rounded-2xl border border-white/20 bg-white/60 p-6 shadow-lg backdrop-blur-sm">
                    <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
                        {/* Search */}
                        <div className="relative w-full lg:max-w-md">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                                <Search className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search certificates, skills, or issuers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-xl border-0 bg-white/80 py-3 pr-4 pl-12 placeholder-slate-400 shadow-sm backdrop-blur-sm transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap gap-3">
                            {/* Category Filter */}
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="rounded-xl border-0 bg-white/80 px-4 py-3 text-slate-700 shadow-sm backdrop-blur-sm transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-cyan-500"
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category === "all" ? "All Categories" : category}
                                    </option>
                                ))}
                            </select>

                            {/* Status Filter */}
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="rounded-xl border-0 bg-white/80 px-4 py-3 text-slate-700 shadow-sm backdrop-blur-sm transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-cyan-500"
                            >
                                <option value="all">All Statuses</option>
                                <option value="received">Received</option>
                                <option value="pending">Pending</option>
                                <option value="expired">Expired</option>
                                <option value="available">Available</option>
                            </select>

                            {/* Sort Filter */}
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="rounded-xl border-0 bg-white/80 px-4 py-3 text-slate-700 shadow-sm backdrop-blur-sm transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-cyan-500"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                            </select>
                        </div>
                    </div>

                    {/* Active Filters */}
                    {(searchQuery || categoryFilter !== "all" || statusFilter !== "all") && (
                        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-4">
                            <span className="text-sm font-medium text-slate-700">Active filters:</span>
                            {searchQuery && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-cyan-100 px-3 py-1 text-xs font-medium text-cyan-700">
                                    Search: {searchQuery}
                                </span>
                            )}
                            {categoryFilter !== "all" && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                                    Category: {categoryFilter}
                                </span>
                            )}
                            {statusFilter !== "all" && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                                    Status: {statusFilter}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-slate-600">
                        {filteredCertificates.length === certificatesData.length
                            ? `Showing all ${filteredCertificates.length} certificates`
                            : `Found ${filteredCertificates.length} of ${certificatesData.length} certificates`}
                    </p>
                </div>

                {/* Certificate Grid */}
                {filteredCertificates.length > 0 ? (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                        {filteredCertificates.map((cert, index) => (
                            <div
                                key={cert.id}
                                className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/70 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Certificate Image */}
                                <div className="relative h-48 overflow-hidden rounded-t-2xl">
                                    <Image
                                        src={cert.imageUrl}
                                        alt={cert.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                                    {/* Status Badge */}
                                    <div className="absolute top-4 left-4">
                                        {(() => {
                                            const statusInfo = getStatusInfo(cert.status);
                                            const StatusIcon = statusInfo.icon;
                                            return (
                                                <span
                                                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusInfo.color} flex items-center gap-1 backdrop-blur-sm`}
                                                >
                                                    <StatusIcon className="h-3 w-3" />
                                                    {statusInfo.label}
                                                </span>
                                            );
                                        })()}
                                    </div>

                                    {/* Level Badge */}
                                    <div className="absolute top-4 right-4">
                                        <span
                                            className={`rounded-full border px-3 py-1 text-xs font-semibold ${getLevelColor(cert.level)} backdrop-blur-sm`}
                                        >
                                            {cert.level}
                                        </span>
                                    </div>
                                </div>

                                {/* Certificate Content */}
                                <div className="p-6">
                                    {/* Progress Bar for Pending Certificates */}
                                    {cert.status === "pending" && (
                                        <div className="mb-4 rounded-lg border border-orange-200 bg-orange-50 p-3">
                                            <div className="mb-2 flex items-center justify-between">
                                                <span className="text-sm font-medium text-orange-700">
                                                    Completion Progress
                                                </span>
                                                <span className="text-sm font-bold text-orange-700">
                                                    {cert.completionPercentage}%
                                                </span>
                                            </div>
                                            <div className="h-2 w-full rounded-full bg-orange-200">
                                                <div
                                                    className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-300"
                                                    style={{ width: `${cert.completionPercentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Header */}
                                    <div className="mb-4">
                                        <div className="mb-3 flex items-start gap-3">
                                            <div className="flex-shrink-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 p-2">
                                                <Award className="h-5 w-5 text-white" />
                                            </div>
                                            <h3 className="text-lg leading-tight font-bold text-slate-800 transition-colors duration-300 group-hover:text-cyan-600">
                                                {cert.title}
                                            </h3>
                                        </div>

                                        {/* Issuer */}
                                        <div className="mb-2 flex items-center gap-2 text-slate-600">
                                            <Building className="h-4 w-4 flex-shrink-0" />
                                            <span className="text-sm font-medium">{cert.issuer}</span>
                                        </div>

                                        {/* Date */}
                                        <div className="mb-2 flex items-center gap-2 text-slate-500">
                                            <Calendar className="h-4 w-4 flex-shrink-0" />
                                            <span className="text-sm">
                                                {cert.status === "available" ? "Available from: " : "Issued: "}
                                                {new Date(cert.date).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </span>
                                        </div>

                                        {/* Expiry Date */}
                                        {cert.expiryDate && (
                                            <div className="mb-3 flex items-center gap-2 text-slate-500">
                                                <Clock className="h-4 w-4 flex-shrink-0" />
                                                <span className="text-sm">
                                                    Expires:{" "}
                                                    {new Date(cert.expiryDate).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}
                                                </span>
                                            </div>
                                        )}

                                        {/* Credential ID */}
                                        {cert.status === "received" && (
                                            <div className="mb-4 text-xs text-slate-400">ID: {cert.credentialId}</div>
                                        )}
                                    </div>

                                    {/* Skills */}
                                    <div className="mb-5">
                                        <h4 className="mb-2 text-sm font-semibold text-slate-700">Skills Earned:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {cert.skills.map((skill, skillIndex) => (
                                                <span
                                                    key={skillIndex}
                                                    className="rounded-lg border border-cyan-200 bg-gradient-to-r from-cyan-50 to-emerald-50 px-2 py-1 text-xs font-medium text-cyan-700"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="space-y-3">
                                        {cert.status === "received" && (
                                            <>
                                                <button className="flex w-full transform items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-4 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-cyan-600 hover:to-emerald-600 hover:shadow-lg">
                                                    <Download className="h-4 w-4" />
                                                    Download Certificate
                                                </button>
                                                <button className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-600 transition-all duration-300 hover:bg-slate-50">
                                                    View Verification
                                                </button>
                                            </>
                                        )}
                                        {cert.status === "pending" && (
                                            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3 font-semibold text-white transition-all duration-300 hover:from-orange-600 hover:to-amber-600">
                                                <Clock className="h-4 w-4" />
                                                Continue Learning
                                            </button>
                                        )}
                                        {cert.status === "available" && (
                                            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-3 font-semibold text-white transition-all duration-300 hover:from-blue-600 hover:to-cyan-600">
                                                <Award className="h-4 w-4" />
                                                Start Learning
                                            </button>
                                        )}
                                        {cert.status === "expired" && (
                                            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 px-4 py-3 font-semibold text-white transition-all duration-300 hover:from-red-600 hover:to-pink-600">
                                                <XCircle className="h-4 w-4" />
                                                Renew Certificate
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-16 text-center">
                        <div className="mx-auto max-w-md rounded-2xl border border-white/20 bg-white/70 p-12 shadow-lg backdrop-blur-sm">
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-slate-200 to-slate-300">
                                <Award className="h-10 w-10 text-slate-400" />
                            </div>
                            <h3 className="mb-3 text-xl font-semibold text-slate-800">No Certificates Found</h3>
                            <p className="mb-6 text-slate-500">
                                {searchQuery || categoryFilter !== "all" || statusFilter !== "all"
                                    ? "Try adjusting your search or filter criteria to find certificates."
                                    : "You haven't earned any certificates yet. Start learning to earn your first certificate!"}
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setCategoryFilter("all");
                                    setStatusFilter("all");
                                }}
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:from-cyan-600 hover:to-emerald-600"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
