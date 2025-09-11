"use client";

import React from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* ===========================
  Zod schema & types
=========================== */
const RegisterSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email"),
  department: z.string().min(1, "Department is required"),
  enrollment_no: z.string().min(2, "Enrollment no is required"),
});
type RegisterForm = z.infer<typeof RegisterSchema>;

/* ===========================
  Page
=========================== */
export default function RegisterEventPage() {
  const router = useRouter();
  const params = useParams();
  const search = useSearchParams();

  const eventId = (params?.eventId as string) || "";

  // Option B: read from URL ?left=...
  // Example: /events/123/register?left=0
  const seatsLeft = Number(search.get("left") ?? "0"); // default to 0 seats left
  const waitlistEnabled = true; // assume the system has a waitlist
  const showWaitlistNotice = seatsLeft === 0;

  const {
   register,
   handleSubmit,
   formState: { errors, isSubmitting },
   reset,
  } = useForm<RegisterForm>({
   resolver: zodResolver(RegisterSchema),
   defaultValues: {
    full_name: "",
    email: "",
    department: "",
    enrollment_no: "",
   },
   mode: "onBlur",
  });

  const onSubmit = async (data: RegisterForm) => {
   // demo payload: if no seats left, send waitlist=true
   const payload = { event_id: eventId, ...data, waitlist: showWaitlistNotice && waitlistEnabled };
   console.log("payload:", payload);

   // TODO: replace with real API call
   // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/registrations`, { method: "POST", headers: {...}, body: JSON.stringify(payload) })

   alert(
    showWaitlistNotice && waitlistEnabled
      ? "Currently, there are no available seats. After registering, you will be added to the waitlist."
      : "Registration successful!"
   );

   reset();
   router.push("/dashboard/registrations");
  };

  return (
   <main className="mx-auto max-w-2xl px-4 py-12">
    <h1 className="mb-1 text-2xl font-bold">Register for Event</h1>
    <p className="mb-6 text-sm text-slate-600">Please fill in your details to complete the registration.</p>

    {/* Alert when no seats left */}
    {showWaitlistNotice && (
      <div
       className="mb-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900"
       role="alert"
       aria-live="polite"
      >
       <b>Currently, there are no available seats.</b> After registering, you will be added to the <b>waitlist</b>.
      </div>
    )}

    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Full Name */}
      <div>
       <label htmlFor="full_name" className="block text-sm font-medium text-slate-700">
        Full Name
       </label>
       <input
        id="full_name"
        type="text"
        placeholder="Your full name"
        {...register("full_name")}
        className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
       />
       {errors.full_name && <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>}
      </div>

      {/* Email */}
      <div>
       <label htmlFor="email" className="block text-sm font-medium text-slate-700">
        Email
       </label>
       <input
        id="email"
        type="email"
        placeholder="you@example.com"
        {...register("email")}
        className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
       />
       {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      {/* Department */}
      <div>
       <label htmlFor="department" className="block text-sm font-medium text-slate-700">
        Department
       </label>
       <select
        id="department"
        {...register("department")}
        className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
       >
        <option value="">Select department</option>
        <option value="CSE">CSE</option>
        <option value="IT">IT</option>
        <option value="Business">Business</option>
        <option value="Design">Design</option>
        <option value="Other">Other</option>
       </select>
       {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>}
      </div>

      {/* Enrollment No */}
      <div>
       <label htmlFor="enrollment_no" className="block text-sm font-medium text-slate-700">
        Enrollment No
       </label>
       <input
        id="enrollment_no"
        type="text"
        placeholder="Roll number"
        {...register("enrollment_no")}
        className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
       />
       {errors.enrollment_no && <p className="mt-1 text-sm text-red-600">{errors.enrollment_no.message}</p>}
      </div>

      <button
       type="submit"
       disabled={isSubmitting}
       className="w-full rounded-md bg-cyan-600 px-4 py-2 text-white transition hover:bg-cyan-700 disabled:opacity-60"
      >
       {isSubmitting ? "Submitting..." : showWaitlistNotice && waitlistEnabled ? "Join Waitlist" : "Register"}
      </button>

      <p className="text-center text-sm text-slate-500">
       Changed your mind?{" "}
       <a href={`/events/${eventId}`} className="text-cyan-600 hover:underline">
        Back to event details
       </a>
      </p>
    </form>
   </main>
  );
}
