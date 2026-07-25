"use client";

import React, { useState } from "react";
import { Check, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import SectionLabel from "./SectionLabel";

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  const [mobileCardIndex, setMobileCardIndex] = useState(0);

  const starterPrice = billingPeriod === "monthly" ? 9999 : 7999;
  const proPrice = billingPeriod === "monthly" ? 19999 : 15999;

  const starterFeatures = [
    "1 Robot Unit included",
    "Up to 20 Tables supported",
    "Basic Restaurant Analytics",
    "Email Support (24h response)",
    "QR Ordering System",
    "Kitchen Dispatch Dashboard",
  ];

  const proFeatures = [
    "Up to 3 Robot Units included",
    "Up to 60 Tables supported",
    "Advanced Analytics & Trends",
    "Priority Support (1h response)",
    "Multi-Robot Dispatching Logic",
    "Owner Mobile App",
    "Fleet Health Monitoring",
  ];

  const enterpriseFeatures = [
    "Unlimited Robots supported",
    "Unlimited Tables supported",
    "Full Analytics Suite & Custom APIs",
    "Dedicated Account Manager",
    "Custom POS Integrations",
    "SLA Uptime Guarantee",
    "On-Site Calibration & Setup",
  ];

  return (
    <section id="pricing" className="relative w-full bg-white py-24 md:py-36 overflow-hidden">
      {/* Editorial Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-black/5" />
        <div className="absolute left-2/4 top-0 bottom-0 w-[1px] bg-black/5" />
        <div className="absolute left-3/4 top-0 bottom-0 w-[1px] bg-black/5" />
      </div>

      {/* 3D Sliding Section Label */}
      <SectionLabel text="Plans for Every Restaurant" sectionId="pricing" />

      <div className="mx-auto w-full px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 relative z-10 pt-20 sm:pt-24 md:pt-28">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <p className="text-sm md:text-base text-black/60 max-w-xl mx-auto font-medium">
            Scale your table operations smoothly. Choose a tier that matches your dining layout, fleet count, and service volume.
          </p>

          {/* Billing Switcher Toggle */}
          <div className="pt-6 flex items-center justify-center gap-4">
            <span className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${billingPeriod === "monthly" ? "text-black" : "text-black/40"}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "annual" : "monthly")}
              className="relative w-12 h-6 bg-black rounded-full p-1 transition-all duration-300 focus:outline-none"
              aria-label="Toggle Billing Period"
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                  billingPeriod === "annual" ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <div className="flex items-center gap-1.5">
              <span className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${billingPeriod === "annual" ? "text-black" : "text-black/40"}`}>
                Annual
              </span>
              <span className="bg-lime-100 text-lime-800 text-[9px] font-bold px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Grid / Mobile Carousel */}
        <div className="relative max-w-5xl mx-auto group/carousel">
          <div className="overflow-hidden md:overflow-visible">
            <div 
              className="flex md:grid md:grid-cols-3 gap-6 items-stretch transition-transform duration-500 ease-in-out md:!transform-none"
              style={{ transform: `translateX(calc(-${mobileCardIndex * 100}% - ${mobileCardIndex * 1.5}rem))` }}
            >
              
              {/* STARTER */}
              <div className="w-full flex-shrink-0 md:w-auto group rounded-[32px] border border-black/[0.06] bg-gradient-to-b from-[#fafafa] to-white p-8 flex flex-col justify-between shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-black/[0.04] hover:scale-[1.02] hover:border-black/10">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-wider text-black/40 uppercase block">Starter Plan</span>
                <h3 className="text-lg font-bold text-black">Starter</h3>
                <p className="text-xs text-black/50 leading-relaxed">
                  Best for small cafes, breakfast spots, or restaurants test-driving automated delivery.
                </p>
              </div>

              {/* Price */}
              <div className="pt-2 border-t border-black/5">
                <span className="text-3xl font-black text-black tracking-tight">₹{starterPrice.toLocaleString()}</span>
                <span className="text-xs text-black/40 font-medium ml-1">/ month</span>
                {billingPeriod === "annual" && (
                  <span className="block text-[10px] text-lime-700 font-bold mt-1">Billed annually (save ₹24,000/yr)</span>
                )}
              </div>

              {/* Features List */}
              <ul className="space-y-3.5 pt-4 text-xs text-black/70">
                {starterFeatures.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-lime-600 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <Link
                href="#contact"
                className="w-full flex items-center justify-center gap-1.5 rounded-2xl border border-black/[0.06] bg-white py-3.5 text-xs font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white hover:border-black group-hover:shadow-md"
              >
                Get Started
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* PRO (HIGHLIGHTED — Dark Premium Card) */}
          <div className="w-full flex-shrink-0 md:w-auto group relative rounded-[32px] bg-gradient-to-b from-[#1a1a1a] to-[#111] p-8 flex flex-col justify-between shadow-2xl shadow-black/20 transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_25px_60px_rgba(101,163,13,0.15)] overflow-hidden">
            {/* Lime glow bleed */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-lime-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-lime-500/5 rounded-full blur-[60px] pointer-events-none" />
            
            {/* Tag badge */}
            <div className="absolute top-6 right-6 bg-lime-500 text-black text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Most Popular
            </div>

            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-wider text-lime-400 uppercase block font-bold">Pro Plan</span>
                <h3 className="text-lg font-bold text-white">Professional</h3>
                <p className="text-xs text-white/50 leading-relaxed">
                  Engineered for high-volume dining, family restaurants, and multi-robot floor plans.
                </p>
              </div>

              {/* Price */}
              <div className="pt-2 border-t border-white/10">
                <span className="text-3xl font-black text-white tracking-tight">₹{proPrice.toLocaleString()}</span>
                <span className="text-xs text-white/40 font-medium ml-1">/ month</span>
                {billingPeriod === "annual" && (
                  <span className="block text-[10px] text-lime-400 font-bold mt-1">Billed annually (save ₹48,000/yr)</span>
                )}
              </div>

              {/* Features List */}
              <ul className="space-y-3.5 pt-4 text-xs text-white/70">
                {proFeatures.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-lime-400 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 relative z-10">
              <Link
                href="#contact"
                className="w-full flex items-center justify-center gap-1.5 rounded-2xl bg-lime-500 py-3.5 text-xs font-bold text-black transition-all duration-300 hover:bg-lime-400 hover:scale-[1.02] shadow-lg shadow-lime-500/20 active:scale-[0.98]"
              >
                Get Started
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* ENTERPRISE */}
          <div className="w-full flex-shrink-0 md:w-auto group rounded-[32px] border border-black/[0.06] bg-gradient-to-b from-[#fafafa] to-white p-8 flex flex-col justify-between shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-black/[0.04] hover:scale-[1.02] hover:border-lime-500/20">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-wider text-black/40 uppercase block">Enterprise Plan</span>
                <h3 className="text-lg font-bold text-black">Enterprise</h3>
                <p className="text-xs text-black/50 leading-relaxed">
                  Calibrated for enterprise food courts, hotel complexes, stadium suites, and chain operations.
                </p>
              </div>

              {/* Price */}
              <div className="pt-2 border-t border-black/5">
                <span className="text-2xl font-black text-black tracking-tight">Custom Pricing</span>
                <span className="block text-[10px] text-black/40 font-medium mt-1">Tailored hardware & SLA</span>
              </div>

              {/* Features List */}
              <ul className="space-y-3.5 pt-4 text-xs text-black/70">
                {enterpriseFeatures.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-lime-600 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <Link
                href="#contact"
                className="w-full flex items-center justify-center gap-1.5 rounded-2xl border border-black/[0.06] bg-white py-3.5 text-xs font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white hover:border-black group-hover:shadow-md"
              >
                Contact Sales
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

            </div>
          </div>

          {/* Mobile Next Arrow */}
          <button
            onClick={() => setMobileCardIndex((prev) => (prev + 1) % 3)}
            className="md:hidden absolute top-1/2 -right-3 -translate-y-1/2 z-20 w-10 h-10 bg-white border border-black/5 rounded-full shadow-lg flex items-center justify-center text-black hover:bg-gray-50 active:scale-95 transition-all"
            aria-label="Next Plan"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
