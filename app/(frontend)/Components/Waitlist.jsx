"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, Mail, X } from "lucide-react";

export default function WaitlistHero() {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Unable to join the waitlist.");
      }

      setSuccessMessage(
        result.message || "Congratulations! You are on the CookReady waitlist."
      );
      setEmail("");
    } catch (submissionError) {
      setError(
        submissionError.name === "AbortError"
          ? "The request took too long. Please try again."
          : submissionError.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F8FFF8] via-white to-[#EEFBEF]">
      <div className="absolute -top-32 right-0 h-72 w-72 rounded-full bg-green-200/30 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-lime-100/40 blur-3xl" />

      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-20">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-4 py-1 text-sm font-medium text-green-700">
            🌿 Bangalore Launching Soon
          </span>

          <h1 className="mt-6 text-5xl font-black leading-tight text-gray-900 md:text-7xl">
            Skip the chopping.
            <span className="block text-green-600">Start cooking.</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Freshly cut vegetables, sprouts, soaked dals & meal-prep ingredients
            delivered to your doorstep. Save time, cook healthier.
          </p>

          <div className="mt-8">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-gray-200 bg-white p-3 shadow-xl"
            >
              <div className="flex flex-col gap-3 md:flex-row">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 w-full rounded-2xl border-none bg-gray-50 pl-12 pr-4 outline-none ring-0 focus:bg-white"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-green-600 px-7 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Joining..." : "Join Waitlist"}
                  <ArrowRight size={18} />
                </button>
              </div>
              {error && <p className="px-3 pt-3 text-sm text-red-600">{error}</p>}
            </form>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" />
              ₹99 launch discount
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" />
              No spam, ever
            </div>
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#003b17]/45 p-6 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="waitlist-success-title"
            className="relative w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setSuccessMessage("")}
              aria-label="Close confirmation"
              className="absolute right-4 top-4 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
            >
              <X size={20} />
            </button>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle size={38} />
            </div>
            <h2 id="waitlist-success-title" className="mt-5 text-2xl font-bold text-[#004d1c]">
              Congratulations!
            </h2>
            <p className="mt-3 text-gray-600">{successMessage}</p>
            <p className="mt-2 text-sm text-gray-500">
              We&apos;ll let you know as soon as CookReady launches.
            </p>
            <button
              type="button"
              onClick={() => setSuccessMessage("")}
              className="mt-6 rounded-full bg-[#ff5a00] px-6 py-3 font-semibold text-white transition hover:bg-[#e95000]"
            >
              Great, thanks!
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
