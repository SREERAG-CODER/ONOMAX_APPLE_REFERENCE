"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TrendingUp, Battery, Layers, Lock, ShieldCheck, UserCheck, Terminal, AlertCircle, ArrowRight, CheckCircle2, Users } from "lucide-react";
import SectionLabel from "./SectionLabel";

type Role = "owner" | "kitchen" | "staff";

export default function BusinessIntelligence() {
  const [activeRole, setActiveRole] = useState<Role>("owner");
  const [kpis, setKpis] = useState({
    orders: 247,
    revenue: 84320,
    deliveries: 241,
  });

  // Telemetry updates for Owner stats
  useEffect(() => {
    const interval = setInterval(() => {
      setKpis((prev) => {
        const orderInc = Math.random() > 0.7 ? 1 : 0;
        const revInc = orderInc ? Math.floor(250 + Math.random() * 400) : 0;
        const delInc = orderInc && Math.random() > 0.5 ? 1 : 0;
        return {
          orders: prev.orders + orderInc,
          revenue: prev.revenue + revInc,
          deliveries: prev.deliveries + delInc,
        };
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="intelligence" className="relative w-full bg-[#f5f5f7] py-24 md:py-36 overflow-hidden">
      {/* Subtle background grids */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      {/* 3D Sliding Section Label */}
      <SectionLabel text="Your Restaurant at a Glance" sectionId="intelligence" />

      <div className="mx-auto w-full px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 relative z-10 pt-20 sm:pt-24 md:pt-28 space-y-8">
        
        {/* Section Description */}
        <div className="max-w-2xl space-y-3 mb-10">
          <p className="text-sm md:text-base text-black/50 font-medium">
            ONOMEX syncs the entire floor. Staff, kitchen, and administration share one real-time dashboard that keeps operations moving without delays.
          </p>
        </div>

        {/* Apple-Style Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Card 1: Huge Full-Width Card (Spans 12 cols) — Dark Premium Command Center */}
          <div className="lg:col-span-12 rounded-[32px] bg-[#09090b] border border-white/[0.06] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row justify-between items-stretch group min-h-[420px] relative">
            
            {/* Top edge glow */}
            <div className="absolute top-0 inset-x-12 h-px bg-gradient-to-r from-transparent via-lime-500/30 to-transparent" />

            {/* Left copy block */}
            <div className="p-8 md:p-12 flex flex-col justify-between flex-1 max-w-xl relative z-10">
              <div className="space-y-5">
                <span className="text-[10px] font-mono tracking-[0.2em] text-lime-400 uppercase block font-bold">Restaurant Management</span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-[1.1] tracking-tight">
                  Real-Time Insights <br/><span className="bg-gradient-to-r from-lime-400 to-teal-400 bg-clip-text text-transparent">& Control.</span>
                </h3>
                <p className="text-sm text-white/40 leading-relaxed font-medium max-w-md">
                  Keep track of daily orders, revenue, and table turnover times instantly. Monitor robot delivery progress and battery status from your dashboard.
                </p>

                {/* Live Metric Pills */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <div className="flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.06] rounded-2xl px-4 py-2.5">
                    <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                    <span className="text-[11px] text-white/50 font-medium">Orders</span>
                    <span className="text-sm font-black text-white font-mono">{kpis.orders}</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.06] rounded-2xl px-4 py-2.5">
                    <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                    <span className="text-[11px] text-white/50 font-medium">Revenue</span>
                    <span className="text-sm font-black text-teal-400 font-mono">₹{(kpis.revenue / 1000).toFixed(1)}k</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.06] rounded-2xl px-4 py-2.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] text-white/50 font-medium">Deliveries</span>
                    <span className="text-sm font-black text-white font-mono">{kpis.deliveries}</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <span className="inline-flex items-center gap-2 text-xs font-bold text-lime-400 bg-lime-400/[0.08] border border-lime-400/20 rounded-full px-4 py-2 transition-all duration-300 group-hover:bg-lime-400/[0.15]">
                  Works with your existing POS systems
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>

            {/* Right image block */}
            <div className="relative flex-1 min-h-[300px] md:min-h-auto overflow-hidden">
              <Image
                src="/analytics-dashboard.png"
                alt="ONOMEX Analytics Dashboard on Tablet"
                fill
                className="object-cover transition-all duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay for seamless blend */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-[#09090b]/60 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/40 to-transparent pointer-events-none" />
            </div>

            {/* Ambient glow */}
            <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-lime-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
          </div>

          {/* Card 2: Left column card (Spans 7 cols) — ROI & Profit Calculator */}
          <div className="lg:col-span-7 rounded-[32px] bg-gray-200 border border-black/10 p-6 md:p-8 shadow-lg relative min-h-[500px] flex flex-col group">
            
            {/* Header Info */}
            <div className="flex justify-between items-center border-b border-black/5 pb-4 mb-8">
              <div>
                <span className="text-[10px] font-mono tracking-wider text-black/40 uppercase block">Financial Impact</span>
                <h4 className="text-lg font-bold text-black flex items-center gap-2 mt-1">
                  <TrendingUp className="w-5 h-5 text-lime-700" />
                  Estimated Monthly Profit
                </h4>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center space-y-10 relative z-10">
              {/* Massive Profit Number */}
              <div className="text-center relative">
                {/* Subtle glow behind number */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-lime-400/20 blur-3xl rounded-full" />
                
                <span className="text-[10px] font-mono tracking-wider text-black/40 uppercase block mb-2 relative z-10">Net Increase in Revenue</span>
                <div className="flex items-baseline justify-center gap-1 relative z-10">
                  <span className="text-2xl font-bold text-lime-700">₹</span>
                  <span className="text-6xl md:text-7xl lg:text-8xl font-black text-black tracking-tighter">73,500</span>
                  <span className="text-sm font-bold text-black/40">/mo</span>
                </div>
              </div>

              {/* Profit Breakdown Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Savings Card */}
                <div className="bg-white p-5 md:p-6 rounded-[24px] border border-black/5 shadow-sm relative overflow-hidden group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-black/40 group-hover:scale-110 transition-transform">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-black/50 uppercase tracking-wider">Labor Savings</span>
                  </div>
                  <div className="text-3xl lg:text-4xl font-black text-black tracking-tighter mb-2">+₹45k</div>
                  <div className="text-[11px] text-black/40 font-medium">Monthly efficiency gain</div>
                  
                  {/* Decorative indicator line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-100">
                    <div className="h-full bg-black transition-all duration-1000 ease-out" style={{ width: '60%' }} />
                  </div>
                </div>

                {/* Turnover Card */}
                <div className="bg-lime-50/50 p-5 md:p-6 rounded-[24px] border border-lime-100 shadow-sm relative overflow-hidden group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-lime-100 flex items-center justify-center text-lime-700 group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-lime-900/50 uppercase tracking-wider">Table Turnover</span>
                  </div>
                  <div className="text-3xl lg:text-4xl font-black text-lime-600 tracking-tighter mb-2">+₹28.5k</div>
                  <div className="text-[11px] text-lime-900/40 font-medium">Increased daily capacity</div>
                  
                  {/* Decorative indicator line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-lime-100">
                    <div className="h-full bg-lime-500 transition-all duration-1000 ease-out" style={{ width: '40%' }} />
                  </div>
                </div>

              </div>

              {/* Note */}
              <div className="bg-lime-50/50 border border-lime-200/50 rounded-2xl p-4 flex gap-3 items-start backdrop-blur-sm">
                <CheckCircle2 className="w-5 h-5 text-lime-700 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-lime-900/70 font-medium leading-relaxed">
                  Based on a typical 50-seat restaurant upgrading to a 2-robot ONOMEX fleet. Most partners see a full return on investment in under <strong className="text-lime-900">4 months</strong>.
                </p>
              </div>

            </div>
          </div>

          {/* Card 3: Right column card (Spans 5 cols) — Owner Benefits Showcase */}
          <div className="lg:col-span-5 rounded-[32px] bg-[#09090b] border border-white/10 p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col justify-between min-h-[500px] group">
            
            {/* Top Glow for 3D effect */}
            <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <div className="space-y-4 relative z-10">
              <span className="text-[10px] font-mono tracking-wider text-lime-400 uppercase block">Effortless Ownership</span>
              <h3 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight">
                Run Your Floor <br/><span className="text-white/40">on Autopilot.</span>
              </h3>
              <p className="text-sm text-white/50 leading-relaxed font-medium">
                Focus on your food and your guests. ONOMEX handles the logistics seamlessly, boosting your bottom line with zero extra effort.
              </p>
            </div>

            {/* Metric-Driven UX Grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 mt-8 relative z-10">
              
              {/* Metric 1 */}
              <div>
                <div className="text-5xl font-black text-lime-400 mb-2 tracking-tighter">30%</div>
                <div className="text-[10px] font-bold text-white uppercase tracking-wider mb-1.5">Faster Turnover</div>
                <p className="text-[11px] text-white/40 leading-relaxed">Serve more guests daily without expanding your floor plan.</p>
              </div>

              {/* Metric 2 */}
              <div>
                <div className="text-5xl font-black text-emerald-400 mb-2 tracking-tighter">100%</div>
                <div className="text-[10px] font-bold text-white uppercase tracking-wider mb-1.5">Order Accuracy</div>
                <p className="text-[11px] text-white/40 leading-relaxed">Direct from kitchen to table. Zero dropped plates or delays.</p>
              </div>

              {/* Metric 3 (Spans 2 columns) */}
              <div className="col-span-2 bg-white/[0.03] border border-white/5 rounded-2xl p-5 mt-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <Users className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider">Happier, Retained Staff</span>
                </div>
                <p className="text-xs text-white/50 leading-relaxed">
                  Waitstaff walk an average of <strong className="text-white">4 fewer miles</strong> per shift. Your team focuses on hospitality and upselling, while robots do the heavy lifting.
                </p>
              </div>

            </div>

            {/* Ambient Background glow */}
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-lime-500/10 rounded-full blur-[100px] pointer-events-none transition-opacity duration-700 group-hover:opacity-100 opacity-60" />
          </div>

        </div>
      </div>
    </section>
  );
}
