"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Navigation, Box, Check, ArrowRight, Sparkles, ChevronRight } from "lucide-react";
import SectionLabel from "./SectionLabel";

type MapNode = "KITCHEN" | "TABLE_A" | "TABLE_B" | "TABLE_C";
type RobotState = "docked" | "moving_to_target" | "unlocking" | "returning";

export default function RobotsThinking() {
  const [activeStep, setActiveStep] = useState(0);
  const [mobileCardIndex, setMobileCardIndex] = useState(0);

  const steps = [
    {
      title: "Fresh from the Kitchen",
      desc: "Plated hot and instantly secured. No waiting for busy runners to pick up the order.",
      icon: <Box className="w-5 h-5" />,
      image: "/restaurant-kitchen.png",
    },
    {
      title: "Seamless Transit",
      desc: "Glides through the dining room with elegance, adding a modern touch to your restaurant's ambiance.",
      icon: <Navigation className="w-5 h-5" />,
      image: "/hero-restaurant.png",
    },
    {
      title: "Diner Delight",
      desc: "Arrives exactly when needed. A premium, contactless experience that wows your guests every time.",
      icon: <Check className="w-5 h-5" />,
      image: "/dining-experience.png",
    },
  ];

  // Auto-cycle through the experience steps
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <section id="robots" className="relative w-full bg-white py-24 md:py-36 overflow-hidden">
      {/* Subtle background grids */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      {/* 3D Sliding Section Label */}
      <SectionLabel text="Robots That Think" sectionId="robots" />

      <div className="mx-auto w-full px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 relative z-10 pt-20 sm:pt-24 md:pt-28 space-y-8">
        
        {/* Section Description */}
        <div className="max-w-2xl space-y-3 mb-10">
          <p className="text-sm md:text-base text-black/50 font-medium">
            ONOMEX delivery units are built specifically for complex restaurant floor plans. They coordinate directly with kitchen and table coordinates.
          </p>
        </div>

        {/* Apple-Style Cards Grid / Mobile Carousel */}
        <div className="relative w-full group/carousel">
          <div className="overflow-hidden lg:overflow-visible">
            <div 
              className="flex lg:grid lg:grid-cols-12 gap-8 items-stretch transition-transform duration-500 ease-in-out lg:!transform-none"
              style={{ transform: `translateX(calc(-${mobileCardIndex * 100}% - ${mobileCardIndex * 2}rem))` }}
            >
              
              {/* Card 1: Huge Full-Width Card (Spans 12 cols) */}
              <div className="w-full flex-shrink-0 lg:w-auto lg:col-span-12 rounded-[32px] bg-gray-200 border border-black/10 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col md:flex-row justify-between items-stretch group min-h-[420px]">
            {/* Left copy block */}
            <div className="p-8 md:p-12 flex flex-col justify-between flex-1 max-w-xl">
              <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-wider text-black/40 uppercase block">Dispatch Origin</span>
                <h3 className="text-2xl md:text-3xl font-black text-black leading-tight">
                  Calibrated for <span className="text-black/40">Kitchen Operations.</span>
                </h3>
                <p className="text-xs text-black/50 leading-relaxed font-medium">
                  Delivery units receive secure packages directly at plating stations. Armed with multi-layered secure lockers, they traverse congested layouts safely and open only when authorized location tokens align. Kitchen crews stay focused on crafting plates while the fleet manages runners.
                </p>
              </div>
              <div className="pt-6">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-lime-700">
                  Sub-millimeter kinematics onboard
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
            {/* Right image block */}
            <div className="relative flex-1 min-h-[300px] md:min-h-auto overflow-hidden">
              <Image
                src="/kitchen-service.png"
                alt="High-volume Restaurant Kitchen"
                fill
                className={`object-cover transition-all duration-700 ${mobileCardIndex === 0 ? "grayscale-0" : "grayscale"} lg:grayscale group-hover:scale-105 lg:group-hover:grayscale-0`}
              />
            </div>
          </div>

          {/* Card 2: Interactive Experience Flow (Left side) */}
          <div className="w-full flex-shrink-0 lg:w-auto lg:col-span-6 rounded-[32px] bg-gray-200 border border-black/10 p-8 shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[500px]">
            <div className="space-y-4 mb-8">
              <span className="text-[10px] font-mono tracking-wider text-black/40 uppercase block">The Journey</span>
              <h3 className="text-xl md:text-2xl font-black text-black leading-tight">
                Experience the Magic of <span className="text-black/40">Seamless Service.</span>
              </h3>
              <p className="text-xs text-black/50 leading-relaxed font-medium">
                Watch how ONOMEX elevates your restaurant's atmosphere, delivering joy directly from your kitchen to your guests.
              </p>
            </div>

            <div className="space-y-3">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-500 flex items-start gap-4 ${
                      isActive 
                        ? "bg-white border-lime-500/30 shadow-lg shadow-lime-900/5 scale-[1.02]" 
                        : "bg-white/50 border-black/5 hover:bg-white hover:border-black/10 opacity-60"
                    }`}
                  >
                    <div className={`mt-0.5 p-2.5 rounded-full transition-colors duration-500 ${
                      isActive ? "bg-lime-100 text-lime-700" : "bg-gray-100 text-black/40"
                    }`}>
                      {step.icon}
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold transition-colors duration-500 ${isActive ? "text-black" : "text-black/60"}`}>
                        {step.title}
                      </h4>
                      <div className={`overflow-hidden transition-all duration-500 ${isActive ? "max-h-20 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"}`}>
                        <p className="text-xs text-black/60 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card 3: Dynamic Image Showcase (Right side) */}
          <div className="w-full flex-shrink-0 lg:w-auto lg:col-span-6 rounded-[32px] bg-black border border-black/20 shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[500px] group">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  activeStep === idx ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className={`object-cover ${mobileCardIndex === 2 ? "grayscale-0" : "grayscale"} lg:grayscale lg:group-hover:grayscale-0 transition-all duration-700 ease-out`}
                  style={{ transform: activeStep === idx ? 'scale(1)' : 'scale(1.05)' }}
                />
                {/* Elegant dark gradient overlay for premium feel */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
            ))}
            
            {/* Overlay Text showing the active benefit */}
            <div className="relative z-20 mt-auto p-8 md:p-12">
               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                 <Sparkles className="w-3.5 h-3.5 text-lime-400" />
                 <span className="text-[10px] font-bold uppercase tracking-wider">{steps[activeStep].title}</span>
               </div>
               <p className="text-white/90 text-sm md:text-base font-medium leading-relaxed max-w-sm animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150">
                 {steps[activeStep].desc}
               </p>
            </div>
          </div>

            </div>
          </div>

          {/* Mobile Next Arrow */}
          <button
            onClick={() => setMobileCardIndex((prev) => (prev + 1) % 3)}
            className="lg:hidden absolute top-1/2 -right-3 -translate-y-1/2 z-20 w-10 h-10 bg-white border border-black/5 rounded-full shadow-lg flex items-center justify-center text-black hover:bg-gray-50 active:scale-95 transition-all"
            aria-label="Next Card"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
