"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import SectionLabel from "./SectionLabel";

interface FaqItem {
  question: string;
  answer: string;
}

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      question: "How long does the hardware setup and floor mapping take?",
      answer: "Setup is fast and non-disruptive. Our engineers scan a typical 3,000 sq ft dining room in under 3 hours using LiDAR mapping equipment. Once the layout is calibrated, tables are designated on the dashboard, and deliveries can begin the same afternoon.",
    },
    {
      question: "How does the robot handle stairs, thresholds, or carpets?",
      answer: "ONOMEX delivery units are optimized for single-level commercial environments. They transit commercial-grade short-pile carpet with ease and cross thresholds up to 1.5 cm. While they cannot climb stairs, they navigate ramps and elevators automatically.",
    },
    {
      question: "Does the system integrate with our existing POS software?",
      answer: "Yes. ONOMEX includes direct APIs and pre-built integrations for major restaurant POS platforms, including Toast, Square, Olo, and POSist. Kitchen workflows remain unchanged; orders route from Diner Scan into the kitchen and automatically register on the Dispatch Dashboard.",
    },
    {
      question: "What happens if our restaurant WiFi connection drops?",
      answer: "All robots execute spatial routing directly at the machine edge. If the internet drops, local operations continue safely. Robots navigate using local LiDAR matrices, while diner menus and carts fallback to a local network grid.",
    },
    {
      question: "How are the robot trays and shelves kept sanitary?",
      answer: "Trays are manufactured from high-durability, food-grade, hydrophobic materials that resist stains. Removable silicone liners can be popped out and ran through commercial dishwashers between shifts, keeping sanitization effortless.",
    },
  ];

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative w-full bg-[#f5f5f7] py-24 md:py-36 overflow-hidden">
      {/* Editorial Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-black/5" />
        <div className="absolute left-2/4 top-0 bottom-0 w-[1px] bg-black/5" />
        <div className="absolute left-3/4 top-0 bottom-0 w-[1px] bg-black/5" />
      </div>

      {/* 3D Sliding Section Label */}
      <SectionLabel text="Frequently Asked Questions" sectionId="faq" />

      <div className="mx-auto max-w-4xl px-6 relative z-10 pt-20 sm:pt-24 md:pt-28">

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className={`rounded-[24px] border bg-white overflow-hidden transition-all duration-400 ${
                  isOpen ? "border-lime-500/20 shadow-lg shadow-lime-500/[0.04]" : "border-black/[0.06] shadow-sm hover:border-black/10 hover:shadow-md"
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
                >
                  <span className="text-sm font-bold text-black pr-4 group-hover:text-lime-800 transition-colors duration-200">{faq.question}</span>
                  <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isOpen ? "bg-lime-500 text-white rotate-0" : "bg-gray-100 text-black/40 group-hover:bg-gray-200"
                  }`}>
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>
                
                {/* Expandable Panel */}
                <div
                  className={`transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    isOpen ? "max-h-[250px] opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <div className="px-6 pb-6 pt-0">
                    <div className="border-t border-black/5 pt-4">
                      <p className="text-xs text-black/60 leading-relaxed font-medium">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
