"use client";

import React, { useState, useEffect, useRef } from "react";
import { Plus, X, ChevronRight } from "lucide-react";
import SectionLabel from "./SectionLabel";

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const faqs: FaqItem[] = [
    {
      question: "How long does the hardware setup and floor mapping take?",
      answer: "Setup is fast and non-disruptive. Our engineers scan a typical 3,000 sq ft dining room in under 3 hours using LiDAR mapping equipment. Once the layout is calibrated, tables are designated on the dashboard, and deliveries can begin the same afternoon.",
      category: "Setup",
    },
    {
      question: "How does the robot handle stairs, thresholds, or carpets?",
      answer: "ONOMEX delivery units are optimized for single-level commercial environments. They transit commercial-grade short-pile carpet with ease and cross thresholds up to 1.5 cm. While they cannot climb stairs, they navigate ramps and elevators automatically.",
      category: "Hardware",
    },
    {
      question: "Does the system integrate with our existing POS software?",
      answer: "Yes. ONOMEX includes direct APIs and pre-built integrations for major restaurant POS platforms, including Toast, Square, Olo, and POSist. Kitchen workflows remain unchanged; orders route from Diner Scan into the kitchen and automatically register on the Dispatch Dashboard.",
      category: "Integration",
    },
    {
      question: "What happens if our restaurant WiFi connection drops?",
      answer: "All robots execute spatial routing directly at the machine edge. If the internet drops, local operations continue safely. Robots navigate using local LiDAR matrices, while diner menus and carts fallback to a local network grid.",
      category: "Reliability",
    },
    {
      question: "How are the robot trays and shelves kept sanitary?",
      answer: "Trays are manufactured from high-durability, food-grade, hydrophobic materials that resist stains. Removable silicone liners can be popped out and ran through commercial dishwashers between shifts, keeping sanitization effortless.",
      category: "Hygiene",
    },
  ];

  // ─── Staggered scroll reveal ───────────────────────────────────
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Stagger the reveal by index
            setTimeout(() => {
              setVisibleItems((prev) => new Set(prev).add(index));
            }, index * 100);
            observer.disconnect();
          }
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );
      observer.observe(ref);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Per-item accent colors for the left border & category tag
  const accents = [
    { border: "#0d9488", bg: "rgba(13,148,136,0.06)", tag: "bg-teal-50 text-teal-700 border-teal-100", glow: "rgba(13,148,136,0.08)" },
    { border: "#8b5cf6", bg: "rgba(139,92,246,0.06)", tag: "bg-violet-50 text-violet-700 border-violet-100", glow: "rgba(139,92,246,0.08)" },
    { border: "#f59e0b", bg: "rgba(245,158,11,0.06)", tag: "bg-amber-50 text-amber-700 border-amber-100", glow: "rgba(245,158,11,0.08)" },
    { border: "#3b82f6", bg: "rgba(59,130,246,0.06)", tag: "bg-blue-50 text-blue-700 border-blue-100", glow: "rgba(59,130,246,0.08)" },
    { border: "#84cc16", bg: "rgba(132,204,22,0.06)", tag: "bg-lime-50 text-lime-700 border-lime-100", glow: "rgba(132,204,22,0.08)" },
  ];

  return (
    <section id="faq" className="relative w-full bg-[#f5f5f7] py-24 md:py-36 overflow-hidden">
      {/* Editorial Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-black/5" />
        <div className="absolute left-2/4 top-0 bottom-0 w-[1px] bg-black/5" />
        <div className="absolute left-3/4 top-0 bottom-0 w-[1px] bg-black/5" />
      </div>

      {/* ── Decorative Dot Grid (top-right) ── */}
      <div className="absolute top-32 right-8 md:right-16 pointer-events-none opacity-[0.04]">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 8 }).map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={7.5 + col * 15}
                cy={7.5 + row * 15}
                r="2"
                fill="#000"
              />
            ))
          )}
        </svg>
      </div>

      {/* ── Decorative Dot Grid (bottom-left) ── */}
      <div className="absolute bottom-24 left-4 md:left-12 pointer-events-none opacity-[0.03]">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          {Array.from({ length: 6 }).map((_, row) =>
            Array.from({ length: 6 }).map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={5 + col * 14}
                cy={5 + row * 14}
                r="1.5"
                fill="#000"
              />
            ))
          )}
        </svg>
      </div>

      {/* 3D Sliding Section Label */}
      <SectionLabel text="Frequently Asked Questions" sectionId="faq" />

      <div className="mx-auto max-w-3xl px-6 relative z-10 pt-20 sm:pt-24 md:pt-28">

        {/* ── Subtitle ── */}
        <p className="text-center text-sm md:text-base text-black/50 font-medium max-w-lg mx-auto mb-14">
          Everything you need to know about deploying ONOMEX in your restaurant.
        </p>

        {/* ── Accordion List ── */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            const isVisible = visibleItems.has(index);
            const accent = accents[index % accents.length];
            const num = String(index + 1).padStart(2, "0");

            return (
              <div
                key={index}
                ref={(el) => { itemRefs.current[index] = el; }}
                className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(24px)",
                }}
              >
                <div
                  className={`relative rounded-[20px] overflow-hidden transition-all duration-400 ${
                    isOpen
                      ? "shadow-xl"
                      : "shadow-md hover:shadow-lg"
                  }`}
                  style={{
                    background: isOpen ? "white" : "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    boxShadow: isOpen
                      ? `0 20px 40px -12px ${accent.glow}, 0 0 0 1px rgba(0,0,0,0.04)`
                      : "0 4px 16px -4px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)",
                  }}
                >
                  {/* ── Accent Left Border ── */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-500"
                    style={{
                      background: accent.border,
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? "scaleY(1)" : "scaleY(0)",
                      transformOrigin: "top",
                    }}
                  />

                  {/* ── Question Button ── */}
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center gap-4 p-5 md:p-6 text-left focus:outline-none group"
                  >
                    {/* Large Faded Number */}
                    <span
                      className="text-2xl md:text-3xl font-black leading-none flex-shrink-0 transition-colors duration-300 w-9"
                      style={{
                        color: isOpen ? accent.border : "rgba(0,0,0,0.08)",
                        fontFamily: "system-ui, -apple-system, sans-serif",
                      }}
                    >
                      {num}
                    </span>

                    {/* Question Text + Category */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${accent.tag} transition-opacity duration-300`}>
                          {faq.category}
                        </span>
                      </div>
                      <span className={`text-[13px] md:text-sm font-bold block transition-colors duration-300 ${
                        isOpen ? "text-gray-900" : "text-gray-700 group-hover:text-gray-900"
                      }`}>
                        {faq.question}
                      </span>
                    </div>

                    {/* Toggle Icon */}
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-400"
                      style={{
                        background: isOpen ? accent.border : "rgba(0,0,0,0.04)",
                        transform: isOpen ? "rotate(0deg)" : "rotate(0deg)",
                      }}
                    >
                      {isOpen ? (
                        <X className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" strokeWidth={2.5} />
                      )}
                    </div>
                  </button>

                  {/* ── Expandable Answer Panel ── */}
                  <div
                    className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      maxHeight: isOpen ? "300px" : "0px",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="px-5 md:px-6 pb-6 pt-0">
                      {/* Answer Container with tinted background */}
                      <div
                        className="rounded-2xl px-5 py-4 ml-9 md:ml-[52px]"
                        style={{
                          background: accent.bg,
                          borderLeft: `2px solid ${accent.border}20`,
                        }}
                      >
                        <p className="text-[12px] md:text-[13px] text-gray-600 leading-[1.8] font-medium">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom CTA Strip ── */}
        <div className="mt-14 text-center">
          <div
            className="inline-flex items-center gap-3 rounded-full px-6 py-3 transition-all duration-300 hover:shadow-md cursor-pointer group"
            style={{
              background: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <span className="text-xs font-bold text-gray-500 group-hover:text-gray-800 transition-colors duration-200">
              Still have questions?
            </span>
            <a
              href="#contact"
              className="text-xs font-bold text-black flex items-center gap-1 group-hover:gap-2 transition-all duration-200"
            >
              Contact us
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

