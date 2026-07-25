"use client";

import React, { useState } from "react";
import { Calendar, Mail, Building, Users, CheckCircle2, ArrowRight } from "lucide-react";
import SectionLabel from "./SectionLabel";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    restaurant: "",
    fleetSize: "1",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.restaurant) {
      alert("Please fill in all required fields.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative w-full bg-white py-24 md:py-36 overflow-hidden">
      {/* Editorial Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-black/5" />
        <div className="absolute left-2/4 top-0 bottom-0 w-[1px] bg-black/5" />
        <div className="absolute left-3/4 top-0 bottom-0 w-[1px] bg-black/5" />
      </div>

      {/* 3D Sliding Section Label */}
      <SectionLabel text="Deploy Autonomy" sectionId="contact" />

      <div className="mx-auto w-full px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 relative z-10 pt-20 sm:pt-24 md:pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* LEFT: Text description */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-black text-black leading-tight tracking-tight">
                Step into the Future of Dining.
              </h2>
              <p className="text-lg text-black/60 leading-relaxed font-medium pt-2">
                See the ONOMAX autonomous delivery unit in action. Request a live video walkthrough of our test floor, or schedule an on-site mapping trial to witness seamless robotic routing directly in your restaurant.
              </p>
            </div>

            {/* Direct contact info */}
            <div className="space-y-4 text-xs font-semibold text-black/60">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-lime-700" />
                <span>deployments@onomex.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-lime-700" />
                <span>Support & Spares: 1800-ONOMEX-OPS</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Booking Form */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-[#0a0a0a] p-6 md:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-lime-400/50 via-lime-400 to-lime-400/50" />

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in duration-300">
                  <div className="space-y-1">

                    <h4 className="text-base font-bold text-white">Request Telemetry Briefing</h4>
                  </div>

                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-white/80 uppercase tracking-wider block" htmlFor="name">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="e.g. Rachel Green"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-white/10 rounded-2xl bg-[#1a1a1a] px-4 py-3.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-lime-500/50 shadow-inner"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-white/80 uppercase tracking-wider block" htmlFor="email">
                      Business Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="rachel@centralperk.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-white/10 rounded-2xl bg-[#1a1a1a] px-4 py-3.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-lime-500/50 shadow-inner"
                    />
                  </div>

                  {/* Restaurant Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-white/80 uppercase tracking-wider block" htmlFor="restaurant">
                      Restaurant / Group Name *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input
                        id="restaurant"
                        type="text"
                        required
                        placeholder="Central Perk Cafe"
                        value={form.restaurant}
                        onChange={(e) => setForm({ ...form, restaurant: e.target.value })}
                        className="w-full border border-white/10 rounded-2xl bg-[#1a1a1a] pl-11 pr-4 py-3.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-lime-500/50 shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Fleet size drop select */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-white/80 uppercase tracking-wider block" htmlFor="fleetSize">
                      Target Robot Fleet Count
                    </label>
                    <select
                      id="fleetSize"
                      value={form.fleetSize}
                      onChange={(e) => setForm({ ...form, fleetSize: e.target.value })}
                      className="w-full border border-white/10 rounded-2xl bg-[#1a1a1a] px-4 py-3.5 text-xs text-white focus:outline-none focus:border-lime-500/50 shadow-sm"
                    >
                      <option value="1">1 Delivery Unit (Starter)</option>
                      <option value="2-3">2-3 Delivery Units (Pro)</option>
                      <option value="4+">4+ Delivery Units (Enterprise)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-lime-500 py-3.5 text-xs font-bold text-black transition-all hover:bg-lime-400 active:scale-[0.98] shadow-lg shadow-lime-500/20"
                  >
                    Book Telemetry Demo
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-500">
                  <div className="w-12 h-12 rounded-full bg-lime-500/10 flex items-center justify-center text-lime-400 mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-base font-bold text-white">Briefing Booked Successfully!</h4>
                    <p className="text-xs text-white/60 px-4 leading-relaxed font-medium">
                      Thank you, {form.name}. Our automation deployments coordinator will email you at <strong className="text-white">{form.email}</strong> in under 12 hours to confirm your video demo for <strong className="text-white">{form.restaurant}</strong>.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", restaurant: "", fleetSize: "1" });
                    }}
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-white/40 hover:text-white/70 uppercase tracking-wider pt-4 transition-colors"
                  >
                    <Calendar className="w-4 h-4" /> Book Another Session
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
