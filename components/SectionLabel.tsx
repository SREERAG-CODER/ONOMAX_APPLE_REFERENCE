"use client";

import { useEffect, useRef, useState } from "react";

interface SectionLabelProps {
  text: string;
  sectionId: string;
}

export default function SectionLabel({ text, sectionId }: SectionLabelProps) {
  const [isVisible, setIsVisible] = useState(false);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, // trigger early
        rootMargin: "-10% 0px -10% 0px", // trigger when section enters viewport
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionId]);

  return (
    <div
      ref={labelRef}
      className="absolute top-16 md:top-24 left-0 z-30 pointer-events-none"
      style={{
        perspective: "1200px",
      }}
    >
      {/* 3D Wrapper */}
      <div
        className="transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left"
        style={{
          transform: isVisible
            ? "translateX(0) rotateY(0deg) scale(1)"
            : "translateX(-110%) rotateY(35deg) scale(0.9)",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div className="relative flex flex-col items-start">
          {/* Main 3D Ribbon Body */}
          <h2
            className="bg-black text-white font-syne font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight py-4 sm:py-5 md:py-6 pl-8 pr-16 sm:pl-10 sm:pr-20 md:pl-12 md:pr-24 lg:pl-16 lg:pr-32 select-none border-y border-white/10"
            style={{
              clipPath: "polygon(0 0, calc(100% - 40px) 0, 100% 50%, calc(100% - 40px) 100%, 0 100%)",
              filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.35)) drop-shadow(0 4px 12px rgba(0,0,0,0.2))",
              textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            {text}
          </h2>

          {/* 3D Fold Corner Shadow effect underneath (makes it wrap around screen edge) */}
          <div 
            className="w-4 h-4 bg-black/80 origin-top-left"
            style={{
              clipPath: "polygon(0 0, 100% 0, 0 100%)",
              transform: "skewY(-45deg)",
              filter: "brightness(0.4)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
