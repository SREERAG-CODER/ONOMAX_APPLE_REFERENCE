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
              
              {/* Card 1: Full-Width — Luxury Editorial Kitchen Card */}
              <div className="w-full flex-shrink-0 lg:w-auto lg:col-span-12 rounded-[32px] bg-[#F5F4F0] border border-black/[0.04] shadow-sm overflow-hidden flex flex-col md:flex-row justify-between items-stretch group min-h-[460px] relative">
                
                {/* Left copy block — Alabaster aesthetic */}
                <div className="p-8 md:p-14 flex flex-col justify-between flex-1 max-w-xl relative z-10">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-[1px] bg-black/20" />
                      <span className="text-[10px] font-mono tracking-[0.25em] text-black/40 uppercase font-bold">Dispatch Origin</span>
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl lg:text-[42px] font-black text-[#1A2E27] leading-[1.05] tracking-tight">
                      Calibrated for <br/>
                      <span className="text-lime-700 italic font-medium pr-2">Kitchen</span>
                      Operations.
                    </h3>
                    
                    <p className="text-sm text-[#1A2E27]/60 leading-relaxed font-medium max-w-md pt-2">
                      Delivery units receive secure packages directly at plating stations. Armed with multi-layered secure lockers, they traverse congested layouts safely and open only when authorized location tokens align.
                    </p>

                    {/* Sophisticated minimal feature list */}
                    <div className="flex flex-col gap-3 pt-6 border-t border-black/5 mt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#1A2E27]/80 uppercase tracking-wider">Secure Lockers</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-lime-600" />
                      </div>
                      <div className="w-full h-px bg-black/[0.03]" />
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#1A2E27]/80 uppercase tracking-wider">Location Tokens</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-lime-600" />
                      </div>
                      <div className="w-full h-px bg-black/[0.03]" />
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#1A2E27]/80 uppercase tracking-wider">Auto Dispatch</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-lime-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right image block — Edge to edge, cinematic */}
                <div className="relative flex-1 min-h-[350px] md:min-h-auto overflow-hidden rounded-l-[32px] border-l border-black/5 shadow-[-10px_0_30px_rgba(0,0,0,0.05)]">
                  <Image
                    src="/kitchen-service.png"
                    alt="High-volume Restaurant Kitchen"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-[1.03] grayscale-[20%]"
                  />
                  {/* Elegant warm overlay to match the alabaster */}
                  <div className="absolute inset-0 bg-[#F5F4F0]/10 mix-blend-multiply pointer-events-none" />
                </div>
              </div>

          {/* Card 2: Interactive Experience Flow — Sharp & Minimal */}
          <div className="w-full flex-shrink-0 lg:w-auto lg:col-span-6 rounded-[32px] bg-white border border-black/[0.04] p-8 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[500px]">
            
            <div className="space-y-5 mb-8 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-black/20" />
                <span className="text-[10px] font-mono tracking-[0.25em] text-black/40 uppercase font-bold">The Journey</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-[#1A2E27] leading-tight tracking-tight">
                Experience the Magic of <br/>
                <span className="text-lime-700 italic font-medium">Seamless Service.</span>
              </h3>
              <p className="text-sm text-[#1A2E27]/50 leading-relaxed font-medium">
                Watch how ONOMEX elevates your restaurant's atmosphere, delivering joy directly from your kitchen to your guests.
              </p>
            </div>

            <div className="space-y-0 relative z-10">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left py-5 border-t border-black/5 transition-all duration-500 flex items-start gap-5 group/btn ${
                      idx === steps.length - 1 ? 'border-b' : ''
                    }`}
                  >
                    <div className={`mt-0.5 p-2 rounded-lg transition-colors duration-500 ${
                      isActive ? "bg-[#1A2E27] text-white" : "bg-black/5 text-black/30 group-hover/btn:bg-black/10"
                    }`}>
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-sm font-bold uppercase tracking-wider transition-colors duration-500 ${isActive ? "text-[#1A2E27]" : "text-black/40"}`}>
                        {step.title}
                      </h4>
                      <div className={`overflow-hidden transition-all duration-500 ${isActive ? "max-h-24 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"}`}>
                        <p className="text-xs text-[#1A2E27]/60 leading-relaxed font-medium">{step.desc}</p>
                      </div>
                    </div>
                    {/* Active Indicator */}
                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 mt-2 ${isActive ? "bg-lime-600 scale-100" : "bg-transparent scale-0"}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card 3: Dynamic Image Showcase — Museum Frame */}
          <div className="w-full flex-shrink-0 lg:w-auto lg:col-span-6 rounded-[32px] bg-white border border-black/[0.04] p-3 shadow-sm relative overflow-hidden flex flex-col min-h-[500px]">
            
            {/* The Image Canvas */}
            <div className="relative flex-1 rounded-[24px] overflow-hidden bg-black">
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
                    className={`object-cover ${mobileCardIndex === 2 ? "grayscale-0" : "grayscale"} lg:grayscale lg:hover:grayscale-0 transition-all duration-1000 ease-out`}
                    style={{ transform: activeStep === idx ? 'scale(1)' : 'scale(1.05)' }}
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
                </div>
              ))}
              
              {/* Floating Minimal Info Card */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                 <div className="bg-white/95 backdrop-blur-xl p-6 rounded-2xl shadow-xl shadow-black/10 border border-white">
                   <div className="flex items-center gap-2 mb-3">
                     <Sparkles className="w-3.5 h-3.5 text-lime-600" />
                     <span className="text-[10px] font-bold text-[#1A2E27] uppercase tracking-[0.2em]">{steps[activeStep].title}</span>
                   </div>
                   <p className="text-[#1A2E27]/70 text-xs font-medium leading-relaxed">
                     {steps[activeStep].desc}
                   </p>
                 </div>
              </div>
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
