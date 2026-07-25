"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { QrCode, ShoppingBag, CreditCard, ChevronRight, CheckCircle2, Loader2, Sparkles, MapPin, ArrowRight } from "lucide-react";
import SectionLabel from "./SectionLabel";
import { useOrders, ALL_TABLE_IDS, tableName, OrderStatus } from "./OrderContext";

type SimStep = "scan" | "menu" | "cart" | "tracking";
type TrackStage = "Received" | "Preparing" | "Ready" | "Assigned" | "Delivering" | "Delivered";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  tag: string;
}

export default function DinerExperience() {
  const { orders, placeOrder, clearOrder } = useOrders();
  const [selectedTableId, setSelectedTableId] = useState<string>("T7");
  const [step, setStep] = useState<SimStep>("scan");
  const [mobileCardIndex, setMobileCardIndex] = useState(0);
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [activeStage, setActiveStage] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("popular");

  const menuItems: MenuItem[] = [
    { id: "m1", name: "Truffle Crunch fries", price: 349, description: "Hand-cut sea salt fries tossed in premium black truffle oil & parmigiano.", tag: "popular" },
    { id: "m2", name: "Harvest Gourmet Bowl", price: 499, description: "Warm quinoa, roasted sweet potatoes, avocado, wild mushrooms, ginger miso dressing.", tag: "popular" },
    { id: "m3", name: "Smoked Salmon Croissant", price: 429, description: "Toasted flaky croissant, dill cream cheese, capers, organic smoked salmon.", tag: "breakfast" },
    { id: "m4", name: "Kyoto Matcha Latte", price: 289, description: "Stone-ground ceremonial Uji matcha, organic oat milk, touch of raw agave.", tag: "drinks" },
  ];

  // Sync phone simulator state with the selected table's order status from context
  useEffect(() => {
    const activeOrder = orders[selectedTableId];
    if (activeOrder) {
      // Sync cart with order items
      setCart(activeOrder.items as MenuItem[]);
      setStep("tracking");

      // Determine active stage from order status
      const statusToStageMap: Record<OrderStatus, number> = {
        preparing: 1,
        delivering: 4,
        unlocked: 5,
        idle: 0
      };

      const mappedStage = statusToStageMap[activeOrder.status] ?? 0;

      // Keep smooth incremental progression for stages 0-3 while in preparing phase
      setActiveStage((prev) => {
        if (activeOrder.status === "preparing" && prev <= 3) {
          return prev;
        }
        return mappedStage;
      });
    } else {
      // If table becomes idle, reset if we were previously tracking
      if (step === "tracking") {
        setCart([]);
        setStep("scan");
        setActiveStage(0);
      }
    }
  }, [selectedTableId, orders]);

  // Auto-advance tracking stages in simulation
  useEffect(() => {
    if (step === "tracking") {
      const interval = setInterval(() => {
        setActiveStage((prev) => {
          if (prev < 5) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 4000);
      return () => clearInterval(interval);
    } else {
      setActiveStage(0);
    }
  }, [step]);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartTotal = cart.reduce((acc, curr) => acc + curr.price, 0);

  const trackingStages: { title: TrackStage; label: string; desc: string }[] = [
    { title: "Received", label: "Order Received", desc: "Sent straight to kitchen dashboard" },
    { title: "Preparing", label: "Preparing", desc: "Chef is crafting your selection" },
    { title: "Ready", label: "Ready", desc: "Plated and loaded into Robot tray" },
    { title: "Assigned", label: "Robot Assigned", desc: "Unit OM-X1 lock-secured" },
    { title: "Delivering", label: "Delivering", desc: "Robot navigating restaurant floor" },
    { title: "Delivered", label: "Delivered & Unlocked", desc: "Arrived! Tap tray to unlock" },
  ];

  return (
    <section id="ordering" className="relative w-full bg-[#f5f5f7] py-24 md:py-36 overflow-hidden">
      {/* Subtle background grids */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      {/* 3D Sliding Section Label */}
      <SectionLabel text="Frictionless Ordering" sectionId="ordering" />

      <div className="mx-auto w-full px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 relative z-10 pt-20 sm:pt-24 md:pt-28 space-y-8">
        
        {/* Section Description */}
        <div className="max-w-2xl space-y-3 mb-10">
          <p className="text-sm md:text-base text-black/50 font-medium">
            ONOMEX streamlines the dining journey by merging zero-download ordering with automated delivery. Diners stay completely in control.
          </p>
        </div>

        {/* Cards: shared 12-col grid on desktop, carousel + static card on mobile */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">

          {/* Carousel wrapper — slides Cards 1 & 2 on mobile, transparent on desktop */}
          <div className="relative lg:contents group/carousel">
            <div className="overflow-hidden lg:contents">
              <div 
                className="flex lg:contents gap-8 items-stretch transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(calc(-${mobileCardIndex * 100}% - ${mobileCardIndex * 2}rem))` }}
              >
              
                {/* Card 1: Huge Full-Width Card (Spans 12 cols) */}
                <div className="w-full flex-shrink-0 lg:col-span-12 rounded-[32px] bg-white border border-black/[0.04] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col md:flex-row justify-between items-stretch group min-h-[420px]">
            {/* Left copy block */}
            <div className="p-8 md:p-12 flex flex-col justify-between flex-1 max-w-xl">
              <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-wider text-black/40 uppercase block">Instant Digital Menu</span>
                <h3 className="text-2xl md:text-3xl font-black text-black leading-tight">
                  Zero-App QR Ordering. <span className="text-black/40">No downloads.</span>
                </h3>
                <p className="text-xs text-black/50 leading-relaxed font-medium">
                  Diners scan a sleek table-specific QR code to launch the menu instantly. No app store downloads, registrations, or login friction. Allergen-filtering categories and high-impact culinary food visuals make selections fast, direct, and satisfying.
                </p>
              </div>
              <div className="pt-6">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-lime-700">
                  Ready to deploy on any floor 
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
            {/* Right image block */}
            <div className="relative flex-1 min-h-[300px] md:min-h-auto overflow-hidden">
              <Image
                src="/qr-menu-scanning.png"
                alt="Scanning QR code to view digital menu"
                fill
                className={`object-cover transition-all duration-700 ${mobileCardIndex === 0 ? "grayscale-0" : "grayscale"} lg:grayscale group-hover:scale-105 lg:group-hover:grayscale-0`}
              />
            </div>
          </div>

          {/* Card 2: Left column card (Spans 6 cols) */}
          <div className="w-full flex-shrink-0 lg:col-span-6 rounded-[32px] bg-white border border-black/[0.04] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col justify-between group min-h-[500px] mb-8 lg:mb-0">
            <div className="p-8 space-y-4">
              <span className="text-[10px] font-mono tracking-wider text-black/40 uppercase block">Instant Scan & Checkout</span>
              <h3 className="text-xl md:text-2xl font-black text-black leading-tight">
                Scan. Select. <span className="text-black/40">Pay. Done.</span>
              </h3>
              <p className="text-xs text-black/50 leading-relaxed font-medium">
                Accepts Apple Pay, instant credit cards, and local payment methods natively. Payments authorize instantly and route immediately to the kitchen station.
              </p>
            </div>
            
            {/* Realistic visual overlay showing hand scanning QR code */}
            <div className="relative flex-1 w-full mt-8 overflow-hidden rounded-b-[32px]">
              <Image
                src="/qr-ordering.png"
                alt="Scanning table QR code"
                fill
                className={`object-cover transition-all duration-700 ${mobileCardIndex === 1 ? "grayscale-0" : "grayscale"} lg:grayscale group-hover:scale-105 lg:group-hover:grayscale-0`}
              />
            </div>
          </div>

              </div>
            </div>

            {/* Mobile Next Arrow */}
            <button
              onClick={() => setMobileCardIndex((prev) => (prev + 1) % 2)}
              className="lg:hidden absolute top-1/2 -right-3 -translate-y-1/2 z-20 w-10 h-10 bg-white border border-black/5 rounded-full shadow-lg flex items-center justify-center text-black hover:bg-gray-50 active:scale-95 transition-all"
              aria-label="Next Card"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Card 3: Phone Simulator — always visible, participates in desktop grid */}
          <div className="lg:col-span-6 rounded-[32px] bg-[#fafafa] border border-black/[0.04] p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[500px]">
            <div className="absolute top-6 left-8 text-left">
              <span className="text-[10px] font-mono tracking-wider text-black/40 uppercase block">Live Demo</span>
              <h4 className="text-xs font-bold text-black uppercase tracking-wider mt-0.5">Diner Ordering Flow</h4>
            </div>
            
            {/* Phone Case Frame */}
            <div className="relative w-[340px] h-[670px] rounded-[48px] border-[10px] border-black bg-white shadow-2xl overflow-hidden flex flex-col justify-between mt-14 scale-90 origin-top">
              
              {/* Phone Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-30 flex items-center justify-center">
                <div className="w-12 h-1 bg-white/20 rounded-full" />
              </div>

              {/* Status Header */}
              <div className="pt-8 px-6 pb-2 border-b border-black/5 bg-gray-50 flex items-center justify-between text-[11px] font-semibold text-black/40 z-10">
                <span>ONOMEX Cafe</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] uppercase tracking-wider text-black/30">Table:</span>
                  <select
                    value={selectedTableId}
                    onChange={(e) => setSelectedTableId(e.target.value)}
                    className="font-mono bg-lime-100 text-lime-800 px-2 py-0.5 rounded border border-lime-200 outline-none cursor-pointer hover:bg-lime-200 transition-colors font-bold text-xs"
                  >
                    {ALL_TABLE_IDS.map((id) => (
                      <option key={id} value={id}>
                        {id} {orders[id] ? "•" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* SIMULATOR SCREEN CONTENT */}
              <div className="flex-1 overflow-y-auto p-5 relative z-10">
                
                {/* STEP 1: SCAN QR */}
                {step === "scan" && (
                  <div className="h-full flex flex-col justify-between items-center py-6 text-center">
                    <div className="my-auto space-y-6">
                      <div className="relative w-28 h-28 mx-auto border-2 border-dashed border-lime-600 rounded-3xl flex items-center justify-center bg-lime-50/50">
                        <QrCode className="w-14 h-14 text-lime-700 animate-pulse" />
                        <div className="absolute inset-x-2 h-0.5 bg-lime-500 top-1/2 -translate-y-1/2 animate-[bounce_2.5s_infinite]" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-base font-bold text-black">Scan QR to View Menu</h4>
                        <p className="text-xs text-black/50 px-4 leading-relaxed">
                          To simulate the diner experience at Table {selectedTableId.replace("T", "")}, click the button below to scan.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setStep("menu")}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-black py-3.5 text-xs font-semibold text-white transition-all hover:bg-black/80 active:scale-[0.98]"
                    >
                      Scan QR Code
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* STEP 2: MENU BROWSE */}
                {step === "menu" && (
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      {/* Filter Pills */}
                      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
                        {["popular", "breakfast", "drinks"].map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all duration-300 ${
                              selectedCategory === cat
                                ? "bg-black border-black text-white"
                                : "bg-white border-black/5 text-black/50 hover:text-black"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>

                      {/* Items Grid */}
                      <div className="space-y-4">
                        {menuItems
                          .filter((item) => item.tag === selectedCategory)
                          .map((item) => (
                            <div key={item.id} className="p-3 border border-black/5 rounded-2xl bg-white shadow-sm flex flex-col justify-between gap-2.5">
                              <div>
                                <div className="flex justify-between items-baseline">
                                  <h5 className="text-xs font-bold text-black">{item.name}</h5>
                                  <span className="font-mono text-xs font-bold text-lime-700">₹{item.price}</span>
                                </div>
                                <p className="text-[10px] text-black/50 leading-normal mt-1">{item.description}</p>
                              </div>
                              <button
                                onClick={() => addToCart(item)}
                                className="self-end px-3 py-1 rounded-full bg-lime-50 hover:bg-lime-100 text-[10px] font-bold text-lime-800 transition-colors"
                              >
                                {cart.some((c) => c.id === item.id) ? "Add Another" : "+ Add to Cart"}
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Cart Status Bar */}
                    {cart.length > 0 && (
                      <button
                        onClick={() => setStep("cart")}
                        className="mt-6 flex items-center justify-between rounded-2xl bg-black px-4 py-3 text-xs font-semibold text-white transition-all hover:bg-black/80 animate-in fade-in slide-in-from-bottom-2 duration-300"
                      >
                        <div className="flex items-center gap-2">
                          <ShoppingBag className="w-4 h-4" />
                          <span>{cart.length} item{cart.length > 1 ? "s" : ""}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span>View Cart (₹{cartTotal})</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </button>
                    )}
                  </div>
                )}

                {/* STEP 3: CART CHECKOUT */}
                {step === "cart" && (
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-black mb-4">Your Order</h4>
                      <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
                        {cart.map((item, index) => (
                          <div key={`${item.id}-${index}`} className="flex justify-between items-center border-b border-black/5 pb-2 text-xs">
                            <div>
                              <span className="font-bold text-black">{item.name}</span>
                              <span className="block text-[10px] text-black/40">Table {selectedTableId.replace("T", "")} Delivery</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-mono font-bold text-black">₹{item.price}</span>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-[10px] text-red-600 hover:underline"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Payment summary */}
                      <div className="mt-5 space-y-2 border-t border-black/5 pt-4 text-xs">
                        <div className="flex justify-between text-black/50">
                          <span>Subtotal</span>
                          <span>₹{cartTotal}</span>
                        </div>
                        <div className="flex justify-between text-black/50">
                          <span>Robot Delivery Service</span>
                          <span className="text-lime-700 font-bold">FREE</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold text-black pt-1">
                          <span>Total</span>
                          <span>₹{cartTotal}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          placeOrder(selectedTableId, cart);
                          setStep("tracking");
                        }}
                        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-lime-600 py-3.5 text-xs font-semibold text-white transition-all hover:bg-lime-700 active:scale-[0.98]"
                      >
                        <CreditCard className="w-4 h-4" />
                        Pay with Card / UPI
                      </button>
                      <button
                        onClick={() => setStep("menu")}
                        className="w-full text-center py-2 text-[10px] font-bold text-black/40 hover:text-black/60 uppercase tracking-wider"
                      >
                        Back to Menu
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: TRACKING TIMELINE */}
                {step === "tracking" && (
                  <div className="h-full flex flex-col justify-between py-2">
                    <div>
                      <div className="flex items-center gap-2 bg-lime-50 border border-lime-100 rounded-2xl p-3 mb-5">
                        <Loader2 className="w-4 h-4 text-lime-700 animate-spin" />
                        <span className="text-[11px] font-bold text-lime-800 leading-none">
                          {activeStage < 5 ? "Robot routing in progress" : "Your meal has arrived!"}
                        </span>
                      </div>

                      <h4 className="text-xs font-mono font-bold tracking-wider text-black/40 uppercase mb-4">
                        Live Tracking Timeline
                      </h4>

                      {/* Timeline */}
                      <div className="relative pl-6 space-y-6">
                        {/* Vertical line connecting nodes */}
                        <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-black/5 z-0" />
                        
                        {trackingStages.map((stage, index) => {
                          const isDone = index < activeStage;
                          const isActive = index === activeStage;
                          
                          let nodeColor = "bg-white border-black/10 text-black/30";
                          let textOpacity = "opacity-40";
                          
                          if (isDone) {
                            nodeColor = "bg-lime-600 border-lime-600 text-white";
                            textOpacity = "opacity-60";
                          } else if (isActive) {
                            nodeColor = "bg-white border-lime-600 text-lime-700 ring-4 ring-lime-100";
                            textOpacity = "opacity-100 font-bold";
                          }

                          return (
                            <div key={stage.title} className={`relative flex gap-4 transition-all duration-300 ${textOpacity}`}>
                              {/* Node Circle */}
                              <div className={`absolute -left-[24px] top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center text-[8px] z-10 transition-all duration-300 ${nodeColor}`}>
                                {isDone && <CheckCircle2 className="w-2.5 h-2.5 fill-white stroke-lime-600" />}
                              </div>
                              
                              <div>
                                <h5 className="text-[11px] uppercase tracking-wider">{stage.label}</h5>
                                <p className="text-[9px] text-black/50 mt-0.5 leading-normal">{stage.desc}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {activeStage === 5 && (
                      <button
                        onClick={() => {
                          clearOrder(selectedTableId);
                          setStep("scan");
                          setCart([]);
                        }}
                        className="w-full flex items-center justify-center gap-1.5 rounded-2xl bg-black py-3.5 text-xs font-semibold text-white transition-all hover:bg-black/85 animate-in fade-in duration-300"
                      >
                        <MapPin className="w-4 h-4" />
                        Complete Order & Reset
                      </button>
                    )}
                  </div>
                )}

              </div>

              {/* Home Indicator bar */}
              <div className="h-6 w-full flex items-center justify-center pb-2 z-10 bg-white">
                <div className="w-32 h-1 bg-black/20 rounded-full" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
