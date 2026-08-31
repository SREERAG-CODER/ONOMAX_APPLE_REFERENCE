"use client";

import React, { useState } from "react";
import { ArrowRight, Check, Mail, Phone } from "lucide-react";
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
      return;
    }
    setSubmitted(true);
  };

  const fleetOptions = [
    { value: "1", label: "Starter (1)" },
    { value: "2-3", label: "Pro (2-3)" },
    { value: "4+", label: "Enterprise (4+)" },
  ];

  return (
    <section id="contact" className="relative w-full bg-[#FAFAFA] py-24 md:py-36 overflow-hidden">
      
      {/* 3D Sliding Section Label */}
      <SectionLabel text="Connect" sectionId="contact" />

      <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-16 relative z-10 pt-20 sm:pt-24 md:pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* LEFT: Elegant Typography & Details */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black leading-[1.1] tracking-tight">
                Ready to<br />deploy?
              </h2>
              <p className="text-base text-black/60 leading-relaxed font-medium max-w-md">
                Experience the future of dining operations. Request a telemetry briefing or an on-site mapping trial to see ONOMEX in action.
              </p>
            </div>

            {/* Minimalist Contact Details */}
            <div className="space-y-6 pt-4 border-t border-black/10">
              <div className="group">
                <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-1">General Inquiries</p>
                <a href="mailto:deployments@onomex.com" className="inline-flex items-center gap-2 text-sm font-semibold text-black transition-opacity hover:opacity-70">
                  <Mail className="w-4 h-4 opacity-50" />
                  deployments@onomex.com
                </a>
              </div>
              <div className="group">
                <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-1">Support & Operations</p>
                <a href="tel:1800-ONOMEX-OPS" className="inline-flex items-center gap-2 text-sm font-semibold text-black transition-opacity hover:opacity-70">
                  <Phone className="w-4 h-4 opacity-50" />
                  1800-ONOMEX-OPS
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Refined Minimalist Form */}
          {/* RIGHT: Refined Minimalist Form */}
          {/* RIGHT: Refined Minimalist Form */}
          <div className="lg:col-span-7 w-full">
            <div className="relative rounded-[2.5rem] p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden">
              
              {/* Premium Matte Dark Background */}
              <div className="absolute inset-0 bg-[#09090b] border border-white/10 rounded-[2.5rem]" />
              
              {/* Subtle top inner glow for a 3D edge effect */}
              <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              {/* Soft ambient corner glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-lime-500/10 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="relative z-10">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-500">
                    
                    {/* Form Header */}
                    <div className="mb-10">
                      <h3 className="text-2xl font-bold text-white tracking-tight mb-2">Request Briefing</h3>
                      <p className="text-sm text-white/50 font-medium">Please provide your details below.</p>
                    </div>

                    <div className="space-y-6">
                      {/* Premium Dark Input: Name */}
                      <div className="relative group">
                        <input
                          id="name"
                          type="text"
                          required
                          placeholder=" "
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="peer w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 pt-7 pb-3 text-sm text-white font-medium focus:bg-white/[0.06] focus:border-lime-500/50 focus:ring-4 focus:ring-lime-500/10 focus:outline-none transition-all shadow-inner"
                        />
                        <label 
                          htmlFor="name" 
                          className="absolute left-5 top-5 text-sm text-white/40 transition-all duration-300 peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-lime-400 peer-focus:uppercase peer-focus:tracking-widest peer-valid:top-2 peer-valid:text-[10px] peer-valid:font-bold peer-valid:text-white/60 peer-valid:uppercase peer-valid:tracking-widest cursor-text pointer-events-none"
                        >
                          Full Name
                        </label>
                      </div>

                      {/* Premium Dark Input: Email */}
                      <div className="relative group">
                        <input
                          id="email"
                          type="email"
                          required
                          placeholder=" "
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="peer w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 pt-7 pb-3 text-sm text-white font-medium focus:bg-white/[0.06] focus:border-lime-500/50 focus:ring-4 focus:ring-lime-500/10 focus:outline-none transition-all shadow-inner"
                        />
                        <label 
                          htmlFor="email" 
                          className="absolute left-5 top-5 text-sm text-white/40 transition-all duration-300 peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-lime-400 peer-focus:uppercase peer-focus:tracking-widest peer-valid:top-2 peer-valid:text-[10px] peer-valid:font-bold peer-valid:text-white/60 peer-valid:uppercase peer-valid:tracking-widest cursor-text pointer-events-none"
                        >
                          Business Email
                        </label>
                      </div>

                      {/* Premium Dark Input: Restaurant */}
                      <div className="relative group">
                        <input
                          id="restaurant"
                          type="text"
                          required
                          placeholder=" "
                          value={form.restaurant}
                          onChange={(e) => setForm({ ...form, restaurant: e.target.value })}
                          className="peer w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 pt-7 pb-3 text-sm text-white font-medium focus:bg-white/[0.06] focus:border-lime-500/50 focus:ring-4 focus:ring-lime-500/10 focus:outline-none transition-all shadow-inner"
                        />
                        <label 
                          htmlFor="restaurant" 
                          className="absolute left-5 top-5 text-sm text-white/40 transition-all duration-300 peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-lime-400 peer-focus:uppercase peer-focus:tracking-widest peer-valid:top-2 peer-valid:text-[10px] peer-valid:font-bold peer-valid:text-white/60 peer-valid:uppercase peer-valid:tracking-widest cursor-text pointer-events-none"
                        >
                          Restaurant / Group Name
                        </label>
                      </div>

                      {/* Elegant Segmented Control Container */}
                      <div className="pt-2">
                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-3 px-1">
                          Target Fleet Size
                        </label>
                        <div className="flex bg-white/[0.04] p-1.5 rounded-[1.25rem] border border-white/[0.05]">
                          {fleetOptions.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => setForm({ ...form, fleetSize: opt.value })}
                              className={`flex-1 py-3 px-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                                form.fleetSize === opt.value
                                  ? "bg-white text-black shadow-md shadow-white/10"
                                  : "text-white/50 hover:text-white hover:bg-white/[0.02]"
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                      <button
                        type="submit"
                        className="group flex items-center justify-center gap-3 w-full bg-gradient-to-r from-lime-500 to-lime-400 text-black rounded-2xl px-8 py-4 text-sm font-bold transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_20px_rgba(163,230,53,0.4)] hover:-translate-y-0.5 active:translate-y-0"
                      >
                        Submit Request
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </div>

                  </form>
                ) : (
                  <div className="py-16 text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 rounded-[1.5rem] bg-lime-500/10 border border-lime-500/20 flex items-center justify-center text-lime-400 mx-auto shadow-[0_0_30px_rgba(163,230,53,0.15)]">
                      <Check className="w-8 h-8" strokeWidth={3} />
                    </div>
                    <div className="space-y-3 max-w-sm mx-auto">
                      <h4 className="text-2xl font-bold text-white tracking-tight">Request Received</h4>
                      <p className="text-sm text-white/60 leading-relaxed font-medium">
                        Thank you, {form.name}. We've received your inquiry for <strong className="text-white">{form.restaurant}</strong>. Our deployments team will be in touch shortly.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({ name: "", email: "", restaurant: "", fleetSize: "1" });
                      }}
                      className="inline-block mt-8 text-xs font-bold text-white/40 hover:text-white uppercase tracking-widest transition-colors border-b border-transparent hover:border-white pb-1"
                    >
                      Submit Another Request
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
