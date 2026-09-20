"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, Mail } from "lucide-react";

export default function WaitlistHero() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // API call goes here
    console.log(email);

    setJoined(true);
    setEmail("");
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
            {joined ? (
              <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-white p-5 shadow-sm">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <p className="font-semibold text-gray-900">
                    You&apos;re on the waitlist!
                  </p>
                  <p className="text-sm text-gray-500">
                    We&apos;ll notify you as soon as Cooktake launches.
                  </p>
                </div>
              </div>
            ) : (
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
                    className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-green-600 px-7 font-semibold text-white transition hover:bg-green-700"
                  >
                    Join Waitlist
                    <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            )}
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
    </section>
  );
}
