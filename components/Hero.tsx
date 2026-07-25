"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, ArrowRight, CheckCircle2, Navigation, AlertCircle } from "lucide-react";
import ParticleField from "./ParticleField";
import { useOrders, ALL_TABLE_IDS, tableName } from "./OrderContext";

interface TableDisplay {
  id: string;
  name: string;
  status: "idle" | "preparing" | "delivering" | "unlocked";
  item: string;
  eta: string;
}

export default function Hero() {
  const { orders, dispatchTable, isDispatching } = useOrders();
  const [selectedTable, setSelectedTable] = useState<string>("T7");
  const [pulseScale, setPulseScale] = useState(1);

  // Derive table display data from shared context
  const tables: TableDisplay[] = useMemo(() =>
    ALL_TABLE_IDS.map((id) => {
      const order = orders[id];
      if (order) {
        return {
          id,
          name: order.tableName,
          status: order.status,
          item: order.items.map((i) => i.name).join(", "),
          eta: order.eta,
        };
      }
      return { id, name: tableName(id), status: "idle" as const, item: "", eta: "" };
    }),
    [orders]);

  const currentTable = tables.find((t) => t.id === selectedTable) || tables[0];
  const dispatchActive = isDispatching !== "";

  const handleDispatch = () => {
    dispatchTable(selectedTable);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseScale((prev) => (prev === 1 ? 1.08 : 1));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between bg-white pt-24 pb-12 overflow-hidden">
      {/* Moving Particle Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-100">
        <ParticleField />
      </div>

      {/* Main Content Area */}
      <div className="mx-auto flex flex-col items-center max-w-[1200px] w-full px-6 md:px-12 relative z-10 my-auto">

        {/* Editorial Text Block */}
        <div className="text-center max-w-4xl space-y-2 mb-16">

          {/* Main Headline Tagline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-black leading-[1.05] animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Autonomous Restaurant Intelligence
          </h1>

          {/* Powered by */}
          <div className="flex flex-col items-center gap-4 mt-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            <span className="text-xs md:text-sm font-medium text-black/40 tracking-widest uppercase">powered by</span>
            <Image
              src="/LOGO-NAME.svg"
              alt="ONOMEX Logo"
              width={500}
              height={120}
              priority
              className="h-5 md:h-7 lg:h-8 w-auto invert hue-rotate-180"
            />
          </div>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-black/60 font-medium leading-relaxed max-w-xl mx-auto mt-14">
            One platform. Zero food runners. Total control over your floor — front QR scan to autonomous robot delivery in under 60 seconds.
          </p>

          {/* Apple-style CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-3">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-black/85 hover:scale-[1.02] shadow-sm shadow-black/10"
            >
              Request Demo
            </Link>
            <Link
              href="#ordering"
              className="group inline-flex items-center justify-center text-sm font-semibold text-lime-700 hover:text-lime-800 transition-colors duration-200"
            >
              Explore Features
              <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Premium Product Interactive Mockup (Live Floor View) */}
        <div className="w-full max-w-4xl mx-auto rounded-3xl border border-black/5 bg-[#fafafa]/80 backdrop-blur-md p-6 md:p-8 shadow-xl shadow-black/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-lime-500/30 via-lime-500 to-lime-500/30" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">

            {/* Left Column: Grid Map */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4 border-b border-black/5 pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-wider text-black/40 uppercase">Interactive Floor Grid</span>
                  <h3 className="text-sm font-bold text-black flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-lime-600 animate-ping" />
                    Live Floor Map
                  </h3>
                </div>

                {/* Pacman Animation */}
                <div className="flex items-center gap-1 overflow-hidden w-20 opacity-70">
                  <svg className="w-5 h-5 shrink-0 text-lime-500 fill-current z-10" viewBox="0 0 100 100">
                    <mask id="pacman-mask">
                      <rect width="100" height="100" fill="white" />
                      <polygon points="50,50 100,5 100,95" fill="black">
                        <animate attributeName="points" values="50,50 100,5 100,95; 50,50 100,45 100,55; 50,50 100,5 100,95" dur="0.4s" repeatCount="indefinite" />
                      </polygon>
                    </mask>
                    <circle cx="50" cy="50" r="50" mask="url(#pacman-mask)" />
                  </svg>
                  <div className="flex items-center gap-3 animate-slide-left w-full pl-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-lime-300 shrink-0" />
                    <div className="w-1.5 h-1.5 rounded-full bg-lime-300 shrink-0" />
                    <div className="w-1.5 h-1.5 rounded-full bg-lime-300 shrink-0" />
                    <div className="w-1.5 h-1.5 rounded-full bg-lime-300 shrink-0" />
                  </div>
                </div>
              </div>

              {/* Grid of Tables */}
              <div className="grid grid-cols-4 gap-3 md:gap-4 my-2">
                {tables.map((table) => {
                  const isSelected = table.id === selectedTable;
                  let bgClass = "bg-white hover:bg-black/[0.02] border-black/5 text-black/70";

                  if (isSelected) {
                    bgClass = "bg-lime-500 border-lime-600 text-white font-semibold shadow-lg shadow-lime-500/20";
                  } else if (table.status === "delivering") {
                    bgClass = "bg-lime-50 border-lime-200 text-lime-800 font-medium hover:bg-lime-100/50";
                  } else if (table.status === "unlocked") {
                    bgClass = "bg-emerald-50 border-emerald-200 text-emerald-800 font-medium hover:bg-emerald-100/50";
                  } else if (table.status === "preparing") {
                    bgClass = "bg-amber-50 border-amber-200 text-amber-800 font-medium hover:bg-amber-100/50";
                  }

                  return (
                    <button
                      key={table.id}
                      onClick={() => setSelectedTable(table.id)}
                      className={`h-16 md:h-20 rounded-2xl border text-xs flex flex-col justify-between p-2.5 transition-all duration-300 ${bgClass}`}
                      style={{
                        transform: isSelected ? `scale(${pulseScale})` : "scale(1)",
                      }}
                    >
                      <div className="flex justify-between items-start w-full">
                        <span className="font-mono text-[10px] opacity-60">{table.id}</span>
                        {table.status === "delivering" && !isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-lime-500 animate-pulse" />
                        )}
                        {table.status === "unlocked" && !isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        )}
                        {table.status === "preparing" && !isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        )}
                      </div>
                      <span className="text-[11px] text-left leading-none font-bold">
                        {table.status === "delivering" ? "En route" : table.status === "unlocked" ? "Arrived" : table.status === "preparing" ? "Cooking" : "Idle"}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 text-[10px] font-mono text-black/40 flex items-center gap-4">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-lime-500" /> Delivering</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-emerald-500" /> Arrived</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-amber-500" /> Preparing</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-black/10" /> Idle</span>
              </div>
            </div>

            {/* Right Column: Telemetry details */}
            <div className="md:col-span-5 bg-white border border-black/5 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono tracking-wider text-lime-700 bg-lime-50 px-2 py-0.5 rounded font-bold uppercase">
                      Telemetry Node
                    </span>
                    <h4 className="text-base font-extrabold text-black mt-1">
                      {currentTable.id === "T7" ? "OM-X1 Core" : `Robot Unit ${currentTable.id}`}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-black/60 bg-black/5 px-2.5 py-1 rounded-full">
                    {currentTable.status === "idle" ? "Standby" : "Active"}
                  </div>
                </div>

                <div className="space-y-4 my-5 border-t border-b border-black/5 py-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-black/50">Current Target</span>
                    <span className="font-semibold text-black">{currentTable.name}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-black/50">Payload Item</span>
                    <span className="font-semibold text-black">
                      {currentTable.item || "None (Ready to Dispatch)"}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-black/50">Locking Status</span>
                    <span className="font-semibold text-black flex items-center gap-1">
                      {currentTable.status === "unlocked" ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Unlocked for diner
                        </>
                      ) : currentTable.status === "delivering" ? (
                        <>
                          <Navigation className="w-3.5 h-3.5 text-lime-600 animate-pulse" />
                          Trays Locked (transit)
                        </>
                      ) : currentTable.status === "preparing" ? (
                        <>
                          <AlertCircle className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                          Pending Load
                        </>
                      ) : (
                        "Locked"
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-black/50">ETA / Time-to-Table</span>
                    <span className="font-mono font-bold text-lime-700 bg-lime-50 px-2 py-0.5 rounded">
                      {currentTable.eta || "—"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleDispatch}
                  disabled={dispatchActive}
                  className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-semibold text-white transition-all duration-300 shadow-sm active:scale-[0.98] ${dispatchActive
                    ? "bg-amber-500 cursor-not-allowed animate-pulse shadow-amber-500/20"
                    : "bg-lime-600 hover:bg-lime-700 hover:scale-[1.02] shadow-lime-600/10"
                    }`}
                >
                  <Play className="w-3 h-3 fill-current" />
                  {currentTable.status !== "idle"
                    ? currentTable.status === "preparing"
                      ? "Loading Trays…"
                      : currentTable.status === "delivering"
                        ? "Robot En Route…"
                        : currentTable.status === "unlocked"
                          ? "Delivered ✓"
                          : "Dispatching…"
                    : "Override Dispatch"
                  }
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Dark Themed Moving Belt Design */}
      <div className="relative w-full overflow-hidden py-4 bg-[#111] transform -rotate-1 scale-105 mt-16 border-y border-white/10 shadow-2xl">
        <div className="flex animate-marquee shrink-0 w-max items-center">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex gap-8 px-4 items-center shrink-0">
              <span className="text-blue-400 font-black text-xl md:text-2xl tracking-[0.2em] uppercase">Autonomous Delivery</span>
              <span className="text-white/40 text-xl">✽</span>
              <span className="text-blue-400 font-black text-xl md:text-2xl tracking-[0.2em] uppercase">Zero Errors</span>
              <span className="text-white/40 text-xl">✽</span>
              <span className="text-blue-400 font-black text-xl md:text-2xl tracking-[0.2em] uppercase">100% Visibility</span>
              <span className="text-white/40 text-xl">✽</span>
              <span className="text-blue-400 font-black text-xl md:text-2xl tracking-[0.2em] uppercase">Effortless Scaling</span>
              <span className="text-white/40 text-xl">✽</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

