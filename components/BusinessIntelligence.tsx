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
          
          {/* Card 1: Huge Full-Width Card (Spans 12 cols) */}
          <div className="lg:col-span-12 rounded-[32px] bg-gray-200 border border-black/10 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col md:flex-row justify-between items-stretch group min-h-[420px]">
            {/* Left copy block */}
            <div className="p-8 md:p-12 flex flex-col justify-between flex-1 max-w-xl">
              <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-wider text-black/40 uppercase block">Restaurant Management</span>
                <h3 className="text-2xl md:text-3xl font-black text-black leading-tight">
                  Real-Time Insights <span className="text-black/40">& Control.</span>
                </h3>
                <p className="text-xs text-black/50 leading-relaxed font-medium">
                  Keep track of daily orders, revenue, and table turnover times instantly. Monitor robot delivery progress and battery status from your dashboard. Orders go straight from the customer to the kitchen with zero delay.
                </p>
              </div>
              <div className="pt-6">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-lime-700">
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
                className="object-cover transition-all duration-700 grayscale-0 lg:grayscale group-hover:scale-105 lg:group-hover:grayscale-0"
              />
            </div>
          </div>

          {/* Card 2: Left column card (Spans 7 cols) — Interactive Dashboard Mockup */}
          <div className="lg:col-span-7 rounded-[32px] bg-gray-200 border border-black/10 p-6 md:p-8 shadow-lg relative min-h-[500px] flex flex-col justify-between">
            
            <div>
              {/* Custom Tab Selector */}
              <div className="flex gap-2 p-1.5 rounded-2xl border border-black/5 bg-gray-100/80 self-start shadow-sm mb-6">
                <button
                  onClick={() => setActiveRole("owner")}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 ${
                    activeRole === "owner"
                      ? "bg-white border-black/5 text-black shadow-sm"
                      : "border-transparent text-black/40 hover:text-black/60"
                  }`}
                >
                  Owner View
                </button>
                <button
                  onClick={() => setActiveRole("kitchen")}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 ${
                    activeRole === "kitchen"
                      ? "bg-white border-black/5 text-black shadow-sm"
                      : "border-transparent text-black/40 hover:text-black/60"
                  }`}
                >
                  Kitchen view
                </button>
                <button
                  onClick={() => setActiveRole("staff")}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 ${
                    activeRole === "staff"
                      ? "bg-white border-black/5 text-black shadow-sm"
                      : "border-transparent text-black/40 hover:text-black/60"
                  }`}
                >
                  Staff view
                </button>
              </div>

              {/* Header Info */}
              <div className="flex justify-between items-center border-b border-black/5 pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-mono tracking-wider text-black/40 uppercase block">System Overview</span>
                  <h4 className="text-sm font-bold text-black flex items-center gap-1.5 mt-0.5">
                    <UserCheck className="w-4 h-4 text-lime-700" />
                    {activeRole === "owner" ? "Owner Dashboard" : activeRole === "kitchen" ? "Kitchen Display" : "Staff View"}
                  </h4>
                </div>
              </div>

              {/* DYNAMIC ROLE VIEWS */}
              <div className="flex-1">
                
                {/* 1. OWNER ROLE */}
                {activeRole === "owner" && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 border border-black/5 rounded-2xl bg-gray-50 flex flex-col justify-between">
                        <span className="text-[9px] font-mono text-black/40 uppercase tracking-wider">Orders Today</span>
                        <span className="text-2xl font-black text-black mt-2 font-mono">{kpis.orders}</span>
                      </div>
                      <div className="p-4 border border-black/5 rounded-2xl bg-gray-50 flex flex-col justify-between">
                        <span className="text-[9px] font-mono text-black/40 uppercase tracking-wider">Revenue Today</span>
                        <span className="text-2xl font-black text-lime-700 mt-2 font-mono">₹{(kpis.revenue / 1000).toFixed(1)}k</span>
                      </div>
                      <div className="p-4 border border-black/5 rounded-2xl bg-gray-50 flex flex-col justify-between">
                        <span className="text-[9px] font-mono text-black/40 uppercase tracking-wider">Robot Deliveries</span>
                        <span className="text-2xl font-black text-black mt-2 font-mono">{kpis.deliveries}</span>
                      </div>
                    </div>

                    {/* Fleet Health Table */}
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono tracking-wider text-black/40 uppercase block">Live Robot Delivery Status</span>
                      
                      <div className="border border-black/5 rounded-2xl overflow-hidden text-xs">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-gray-50 text-black/40 border-b border-black/5 font-mono text-[9px] uppercase">
                              <th className="p-3">Robot ID</th>
                              <th className="p-3">Battery</th>
                              <th className="p-3">Occupancy</th>
                              <th className="p-3">Current Task</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-black/5">
                              <td className="p-3 font-semibold text-black">OM-X1</td>
                              <td className="p-3">
                                <span className="flex items-center gap-1"><Battery className="w-4 h-4 text-lime-600 fill-lime-100" /> 88%</span>
                              </td>
                              <td className="p-3 text-black/70">2/3 Trays loaded</td>
                              <td className="p-3"><span className="text-lime-700 font-bold bg-lime-50 px-2 py-0.5 rounded text-[10px]">Transit to T7</span></td>
                            </tr>
                            <tr>
                              <td className="p-3 font-semibold text-black">OM-X2</td>
                              <td className="p-3">
                                <span className="flex items-center gap-1"><Battery className="w-4 h-4 text-emerald-600 fill-emerald-100 animate-pulse" /> 100%</span>
                              </td>
                              <td className="p-3 text-black/70">Empty</td>
                              <td className="p-3"><span className="text-black/40 font-mono text-[10px]">Standby (charging)</span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. KITCHEN ROLE */}
                {activeRole === "kitchen" && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <span className="text-[10px] font-mono tracking-wider text-black/40 uppercase block">Live Kitchen Orders</span>
                    
                    <div className="space-y-3">
                      <div className="p-3.5 border border-black/5 rounded-2xl bg-white shadow-sm flex items-center justify-between">
                        <div>
                          <h5 className="text-xs font-bold text-black">Truffle Crunch fries</h5>
                          <span className="text-[10px] text-black/40 block mt-0.5">Order #892 // Table 02</span>
                        </div>
                        <button
                          onClick={() => alert("Simulating dispatch: Cabinet Locked. Unit OM-X1 en route to Table 02.")}
                          className="px-4 py-2 bg-lime-600 hover:bg-lime-700 text-white rounded-xl text-[10px] font-bold uppercase transition-colors"
                        >
                          Dispatch OM-X1
                        </button>
                      </div>

                      <div className="p-3.5 border border-black/5 rounded-2xl bg-white shadow-sm flex items-center justify-between opacity-60">
                        <div>
                          <h5 className="text-xs font-bold text-black">Harvest Gourmet Bowl</h5>
                          <span className="text-[10px] text-black/40 block mt-0.5">Order #893 // Table 05</span>
                        </div>
                        <span className="text-[9px] font-mono text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full font-bold uppercase">
                          Preparing
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. STAFF ROLE */}
                {activeRole === "staff" && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <span className="text-[10px] font-mono tracking-wider text-black/40 uppercase block">Staff Notifications</span>
                    
                    <div className="space-y-3">
                      {/* Active Alert */}
                      <div className="p-4 border border-rose-100 rounded-2xl bg-rose-50/50 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h5 className="text-xs font-bold text-black">Service Call: Table 03</h5>
                          <p className="text-[10px] text-black/50 mt-1 leading-normal">
                            Diner requested water & extra napkins at Table 03.
                          </p>
                        </div>
                      </div>

                      {/* Info Alert */}
                      <div className="p-4 border border-black/5 rounded-2xl bg-gray-50 flex items-start gap-3 opacity-80">
                        <Terminal className="w-5 h-5 text-black/40 flex-shrink-0 mt-0.5" />
                        <div>
                          <h5 className="text-xs font-bold text-black">Robot OM-X2 Charging Status</h5>
                          <p className="text-[10px] text-black/50 mt-1 leading-normal">
                            Robot docked successfully. Battery charge: 94%.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* No Technical Info Footer */}

          </div>

          {/* Card 3: Right column card (Spans 5 cols) — Owner Benefits Showcase */}
          <div className="lg:col-span-5 rounded-[32px] bg-gray-200 border border-black/10 p-8 shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[500px] group">
            
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-wider text-black/40 uppercase block">Effortless Ownership</span>
              <h3 className="text-xl md:text-2xl font-black text-black leading-tight">
                Run Your Floor <span className="text-black/40">on Autopilot.</span>
              </h3>
              <p className="text-xs text-black/50 leading-relaxed font-medium">
                Focus on your food and your guests. ONOMEX handles the logistics seamlessly, boosting your bottom line with zero extra effort.
              </p>
            </div>

            {/* Interactive Benefits Grid */}
            <div className="flex flex-col gap-3 mt-6 relative z-10">
              <div className="p-4 rounded-2xl bg-white border border-black/[0.03] flex items-center gap-4 transition-all duration-300 hover:border-lime-500/30 hover:shadow-md hover:scale-[1.02] cursor-pointer group/card">
                <div className="w-10 h-10 rounded-full bg-lime-50 flex items-center justify-center text-lime-700 transition-transform duration-500 group-hover/card:scale-110">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-black">Faster Table Turnover</h5>
                  <p className="text-[10px] text-black/50 mt-0.5">Serve up to 30% more guests daily.</p>
                </div>
              </div>
              
              <div className="p-4 rounded-2xl bg-white border border-black/[0.03] flex items-center gap-4 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-md hover:scale-[1.02] cursor-pointer group/card">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 transition-transform duration-500 group-hover/card:scale-110">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-black">Zero Order Errors</h5>
                  <p className="text-[10px] text-black/50 mt-0.5">Direct from kitchen to table with perfect accuracy.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-black/[0.03] flex items-center gap-4 transition-all duration-300 hover:border-amber-500/30 hover:shadow-md hover:scale-[1.02] cursor-pointer group/card">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-700 transition-transform duration-500 group-hover/card:scale-110">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-black">Happier Staff</h5>
                  <p className="text-[10px] text-black/50 mt-0.5">Let your team focus on hospitality, not heavy lifting.</p>
                </div>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-lime-100/30 rounded-full blur-3xl pointer-events-none group-hover:bg-lime-200/40 transition-colors duration-700" />
          </div>

        </div>
      </div>
    </section>
  );
}
