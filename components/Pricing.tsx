"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Check, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import SectionLabel from "./SectionLabel";

// ─── Card Data Types ─────────────────────────────────────────────
interface PlanCard {
  label: string;
  name: string;
  description: string;
  price: string | number;
  priceSuffix: string;
  annualNote?: string;
  features: string[];
  ctaText: string;
  variant: "light" | "dark" | "premium";
  badge?: string;
  tierNumber: string;
  accentColor: string;        // Tailwind-compatible accent
  accentGradient: string;     // CSS gradient for accent strip
  glowColor: string;          // Glow blob color
  checkColor: string;         // Checkmark icon color
  ctaGradient: string;        // CTA button gradient
}

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isDragLocked = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalCards = 3;

  const starterPrice = billingPeriod === "monthly" ? 9999 : 7999;
  const proPrice = billingPeriod === "monthly" ? 19999 : 15999;

  const cards: PlanCard[] = [
    {
      label: "Starter Plan",
      name: "Starter",
      description: "Best for small cafes, breakfast spots, or restaurants test-driving automated delivery.",
      price: starterPrice,
      priceSuffix: "/ month",
      annualNote: billingPeriod === "annual" ? "Billed annually (save ₹24,000/yr)" : undefined,
      features: [
        "1 Robot Unit included",
        "Up to 20 Tables supported",
        "Basic Restaurant Analytics",
        "Email Support (24h response)",
        "QR Ordering System",
        "Kitchen Dispatch Dashboard",
      ],
      ctaText: "Get Started",
      variant: "light",
      tierNumber: "01",
      accentColor: "teal",
      accentGradient: "linear-gradient(135deg, #0d9488, #2dd4bf, #99f6e4)",
      glowColor: "rgba(13, 148, 136, 0.08)",
      checkColor: "text-teal-500",
      ctaGradient: "linear-gradient(135deg, #0d9488, #14b8a6)",
    },
    {
      label: "Pro Plan",
      name: "Professional",
      description: "Engineered for high-volume dining, family restaurants, and multi-robot floor plans.",
      price: proPrice,
      priceSuffix: "/ month",
      annualNote: billingPeriod === "annual" ? "Billed annually (save ₹48,000/yr)" : undefined,
      features: [
        "Up to 3 Robot Units included",
        "Up to 60 Tables supported",
        "Advanced Analytics & Trends",
        "Priority Support (1h response)",
        "Multi-Robot Dispatching Logic",
        "Owner Mobile App",
        "Fleet Health Monitoring",
      ],
      ctaText: "Get Started",
      variant: "dark",
      badge: "Most Popular",
      tierNumber: "02",
      accentColor: "lime",
      accentGradient: "linear-gradient(135deg, #65a30d, #84cc16, #bef264)",
      glowColor: "rgba(132, 204, 22, 0.12)",
      checkColor: "text-lime-400",
      ctaGradient: "linear-gradient(135deg, #84cc16, #a3e635)",
    },
    {
      label: "Enterprise Plan",
      name: "Enterprise",
      description: "Calibrated for enterprise food courts, hotel complexes, stadium suites, and chain operations.",
      price: "Custom Pricing",
      priceSuffix: "",
      annualNote: "Tailored hardware & SLA",
      features: [
        "Unlimited Robots supported",
        "Unlimited Tables supported",
        "Full Analytics Suite & Custom APIs",
        "Dedicated Account Manager",
        "Custom POS Integrations",
        "SLA Uptime Guarantee",
        "On-Site Calibration & Setup",
      ],
      ctaText: "Contact Sales",
      variant: "premium",
      tierNumber: "03",
      accentColor: "amber",
      accentGradient: "linear-gradient(135deg, #b45309, #f59e0b, #fde68a)",
      glowColor: "rgba(245, 158, 11, 0.08)",
      checkColor: "text-amber-500",
      ctaGradient: "linear-gradient(135deg, #d97706, #f59e0b)",
    },
  ];

  // ─── Swipe Navigation ─────────────────────────────────────────
  const goTo = useCallback((index: number) => {
    setActiveIndex(Math.max(0, Math.min(totalCards - 1, index)));
    setDragOffset(0);
  }, []);

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // ─── Touch Handlers ────────────────────────────────────────────
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDragLocked.current = false;
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - touchStartX.current;
    const deltaY = e.touches[0].clientY - touchStartY.current;

    // Lock direction on first significant move
    if (!isDragLocked.current && (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8)) {
      isDragLocked.current = true;
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        // Vertical scroll — bail out
        setIsDragging(false);
        setDragOffset(0);
        return;
      }
    }

    if (isDragLocked.current) {
      // Apply rubber-band resistance at edges
      let clamped = deltaX;
      if ((activeIndex === 0 && deltaX > 0) || (activeIndex === totalCards - 1 && deltaX < 0)) {
        clamped = deltaX * 0.25;
      }
      setDragOffset(clamped);
    }
  }, [isDragging, activeIndex]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 60;
    if (dragOffset < -threshold && activeIndex < totalCards - 1) {
      goNext();
    } else if (dragOffset > threshold && activeIndex > 0) {
      goPrev();
    } else {
      setDragOffset(0);
    }
  }, [isDragging, dragOffset, activeIndex, goNext, goPrev]);

  // ─── Mouse Handlers (for desktop testing) ──────────────────────
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    touchStartX.current = e.clientX;
    setIsDragging(true);
    isDragLocked.current = true;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - touchStartX.current;
    let clamped = deltaX;
    if ((activeIndex === 0 && deltaX > 0) || (activeIndex === totalCards - 1 && deltaX < 0)) {
      clamped = deltaX * 0.25;
    }
    setDragOffset(clamped);
  }, [isDragging, activeIndex]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 60;
    if (dragOffset < -threshold && activeIndex < totalCards - 1) {
      goNext();
    } else if (dragOffset > threshold && activeIndex > 0) {
      goPrev();
    } else {
      setDragOffset(0);
    }
  }, [isDragging, dragOffset, activeIndex, goNext, goPrev]);

  // Cleanup mouse if released outside
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleMouseUp();
      }
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, [isDragging, handleMouseUp]);

  // ─── Card Style Calculator (mobile stacked carousel) ──────────
  const getCardStyle = (index: number): React.CSSProperties => {
    const diff = index - activeIndex;
    const absDiff = Math.abs(diff);

    // Normalize drag to a 0-1 progress toward the next/prev card
    const dragProgress = dragOffset / (containerRef.current?.offsetWidth || 360);

    if (absDiff > 2) {
      return { opacity: 0, pointerEvents: "none", transform: "scale(0.85) translateX(100%)", zIndex: 0 };
    }

    let translateX = 0;
    let scale = 1;
    let opacity = 1;
    let zIndex = totalCards - absDiff;

    if (diff === 0) {
      // Active card — follows drag
      translateX = dragOffset;
      scale = 1;
      opacity = 1;
      zIndex = totalCards + 1;
    } else if (diff === 1) {
      // Next card — peeking from the right
      const baseOffset = 28; // peek distance in px
      const baseScale = 0.94;
      // As user drags left (negative), this card comes forward
      const progress = Math.max(0, Math.min(1, -dragProgress));
      translateX = baseOffset + ((-baseOffset) * progress) + (dragOffset * 0.15);
      scale = baseScale + ((1 - baseScale) * progress);
      opacity = 0.7 + (0.3 * progress);
      zIndex = totalCards;
    } else if (diff === -1) {
      // Previous card — hidden to the left
      const progress = Math.max(0, Math.min(1, dragProgress));
      translateX = -60 + (60 * progress) + (dragOffset * 0.15);
      scale = 0.92 + ((1 - 0.92) * progress);
      opacity = 0.3 + (0.7 * progress);
      zIndex = totalCards;
    } else if (diff === 2) {
      // Card behind the next
      translateX = 48;
      scale = 0.88;
      opacity = 0.4;
      zIndex = totalCards - 2;
    } else {
      translateX = -100;
      scale = 0.88;
      opacity = 0;
      zIndex = 0;
    }

    return {
      transform: `translateX(${translateX}px) scale(${scale})`,
      opacity,
      zIndex,
      transition: isDragging ? "none" : "all 0.45s cubic-bezier(0.32, 0.72, 0, 1)",
      pointerEvents: diff === 0 ? "auto" : "none",
    };
  };

  // ─── Render a Single Mobile Card (Premium Design) ──────────────
  const renderCard = (card: PlanCard, index: number) => {
    const isDark = card.variant === "dark";
    const isPremium = card.variant === "premium";

    // Background classes
    const bgClass = isDark
      ? "bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0d0d0d]"
      : isPremium
        ? "bg-gradient-to-br from-[#fffbeb] via-[#fef3c7] to-[#fff7ed]"
        : "bg-gradient-to-br from-white via-[#f8fafb] to-[#f0fdfa]";

    // Border
    const borderClass = isDark
      ? "border border-white/[0.08]"
      : isPremium
        ? "border border-amber-200/60"
        : "border border-teal-100/60";

    // Text colors
    const titleColor = isDark ? "text-white" : "text-gray-900";
    const descColor = isDark ? "text-white/45" : "text-gray-500";
    const labelColor = isDark ? "text-lime-400" : isPremium ? "text-amber-600" : "text-teal-600";
    const priceColor = isDark ? "text-white" : "text-gray-900";
    const priceSuffixColor = isDark ? "text-white/35" : "text-gray-400";
    const featColor = isDark ? "text-white/65" : "text-gray-600";
    const annualColor = isDark ? "text-lime-400" : isPremium ? "text-amber-600" : "text-teal-600";

    return (
      <div
        key={card.name}
        className={`absolute inset-0 rounded-[28px] overflow-hidden flex flex-col select-none ${bgClass} ${borderClass} shadow-2xl`}
        style={{
          ...getCardStyle(index),
          boxShadow: isDark
            ? "0 25px 60px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset"
            : isPremium
              ? "0 25px 50px -12px rgba(180, 83, 9, 0.12), 0 0 0 1px rgba(251, 191, 36, 0.1) inset"
              : "0 25px 50px -12px rgba(13, 148, 136, 0.08), 0 0 0 1px rgba(153, 246, 228, 0.15) inset",
        }}
      >
        {/* ── Accent Gradient Strip at Top ── */}
        <div
          className="w-full h-[3px] flex-shrink-0"
          style={{ background: card.accentGradient }}
        />

        {/* ── Large Decorative Tier Number Watermark ── */}
        <div
          className="absolute -right-3 -top-4 text-[140px] font-black leading-none pointer-events-none select-none"
          style={{
            opacity: isDark ? 0.04 : 0.045,
            color: isDark ? "#fff" : isPremium ? "#92400e" : "#0d9488",
            fontFamily: "system-ui, -apple-system, sans-serif",
            letterSpacing: "-0.05em",
          }}
        >
          {card.tierNumber}
        </div>

        {/* ── Ambient Glow Blobs ── */}
        <div
          className="absolute -top-16 -right-16 w-52 h-52 rounded-full blur-[80px] pointer-events-none"
          style={{ background: card.glowColor }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-44 h-44 rounded-full blur-[70px] pointer-events-none"
          style={{ background: card.glowColor }}
        />

        {/* ── Dot Grid Texture (bottom-right corner) ── */}
        <div className="absolute bottom-16 right-4 pointer-events-none" style={{ opacity: isDark ? 0.06 : 0.08 }}>
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            {Array.from({ length: 5 }).map((_, row) =>
              Array.from({ length: 5 }).map((_, col) => (
                <circle
                  key={`${row}-${col}`}
                  cx={6 + col * 12}
                  cy={6 + row * 12}
                  r="1.5"
                  fill={isDark ? "white" : isPremium ? "#92400e" : "#0d9488"}
                />
              ))
            )}
          </svg>
        </div>

        {/* ── Badge ── */}
        {card.badge && (
          <div
            className="absolute top-5 right-5 text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider z-10 shadow-lg"
            style={{
              background: card.accentGradient,
              color: isDark ? "#000" : "#000",
              boxShadow: `0 4px 14px -2px ${card.glowColor}`,
            }}
          >
            {card.badge}
          </div>
        )}

        {/* ── Card Body ── */}
        <div className="flex-1 flex flex-col justify-between p-7 pt-5 relative z-10">
          <div className="space-y-5">
            {/* Label & Title */}
            <div className="space-y-1">
              <span className={`text-[10px] font-mono tracking-[0.18em] uppercase block font-bold ${labelColor}`}>
                {card.label}
              </span>
              <h3 className={`text-xl font-extrabold tracking-tight ${titleColor}`}>{card.name}</h3>
              <p className={`text-[11px] leading-relaxed mt-1 ${descColor}`}>
                {card.description}
              </p>
            </div>

            {/* ── Frosted Glass Price Container ── */}
            <div
              className="rounded-2xl px-5 py-4 relative overflow-hidden"
              style={{
                background: isDark
                  ? "rgba(255,255,255,0.04)"
                  : isPremium
                    ? "rgba(245, 158, 11, 0.06)"
                    : "rgba(13, 148, 136, 0.04)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: isDark
                  ? "1px solid rgba(255,255,255,0.06)"
                  : isPremium
                    ? "1px solid rgba(245, 158, 11, 0.12)"
                    : "1px solid rgba(13, 148, 136, 0.08)",
              }}
            >
              {/* Subtle shimmer line */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: card.accentGradient, opacity: 0.3 }}
              />
              <div className="flex items-baseline gap-1">
                <span className={`${typeof card.price === "number" ? "text-[34px]" : "text-2xl"} font-black tracking-tight leading-none ${priceColor}`}>
                  {typeof card.price === "number" ? `₹${card.price.toLocaleString()}` : card.price}
                </span>
                {card.priceSuffix && (
                  <span className={`text-xs font-medium ${priceSuffixColor}`}>{card.priceSuffix}</span>
                )}
              </div>
              {card.annualNote && (
                <span className={`block text-[10px] font-bold mt-1.5 ${annualColor}`}>
                  {card.annualNote}
                </span>
              )}
            </div>

            {/* ── Features List ── */}
            <ul className="space-y-2.5 pt-1">
              {card.features.map((feat, fi) => (
                <li key={feat} className="flex items-center gap-3">
                  {/* Pill-shaped check icon */}
                  <div
                    className="w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: isDark
                        ? "rgba(132, 204, 22, 0.12)"
                        : isPremium
                          ? "rgba(245, 158, 11, 0.1)"
                          : "rgba(13, 148, 136, 0.08)",
                    }}
                  >
                    <Check className={`w-3 h-3 ${card.checkColor}`} strokeWidth={3} />
                  </div>
                  <span className={`text-[11.5px] font-medium leading-tight ${featColor}`}>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── CTA Button ── */}
          <div className="pt-5">
            <Link
              href="#contact"
              className="w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 text-[12px] font-bold tracking-wide transition-all duration-300 active:scale-[0.97]"
              style={{
                background: isDark
                  ? card.ctaGradient
                  : isPremium
                    ? card.ctaGradient
                    : card.ctaGradient,
                color: isDark ? "#000" : "#fff",
                boxShadow: isDark
                  ? "0 8px 24px -4px rgba(132, 204, 22, 0.3)"
                  : isPremium
                    ? "0 8px 24px -4px rgba(217, 119, 6, 0.25)"
                    : "0 8px 24px -4px rgba(13, 148, 136, 0.25)",
              }}
            >
              {card.ctaText}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  };

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

        {/* ═══════════════════════════════════════════════════════════
            MOBILE: Stacked Swipable Carousel
            ═══════════════════════════════════════════════════════════ */}
        <div className="md:hidden">
          <div
            ref={containerRef}
            className="relative w-full mx-auto"
            style={{ height: 600, maxWidth: 400 }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {cards.map((card, i) => renderCard(card, i))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-5 mt-8">
            {/* Prev Arrow */}
            <button
              onClick={goPrev}
              disabled={activeIndex === 0}
              className="w-10 h-10 rounded-full bg-black/[0.04] border border-black/[0.06] flex items-center justify-center text-black/60 transition-all duration-200 hover:bg-black/[0.08] disabled:opacity-30 disabled:cursor-not-allowed active:scale-90"
              aria-label="Previous Plan"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dot Indicators */}
            <div className="flex items-center gap-2.5">
              {cards.map((card, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="rounded-full transition-all duration-400"
                  style={{
                    width: i === activeIndex ? 28 : 10,
                    height: 10,
                    background: i === activeIndex ? card.accentGradient : "rgba(0,0,0,0.1)",
                  }}
                  aria-label={`Go to plan ${i + 1}`}
                />
              ))}
            </div>

            {/* Next Arrow */}
            <button
              onClick={goNext}
              disabled={activeIndex === totalCards - 1}
              className="w-10 h-10 rounded-full bg-black/[0.04] border border-black/[0.06] flex items-center justify-center text-black/60 transition-all duration-200 hover:bg-black/[0.08] disabled:opacity-30 disabled:cursor-not-allowed active:scale-90"
              aria-label="Next Plan"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Swipe Hint */}
          <p className="text-center text-[10px] text-black/30 mt-3 font-medium tracking-wide uppercase">
            Swipe to explore plans
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            DESKTOP: Standard 3-Column Grid — matching Mobile design
            ═══════════════════════════════════════════════════════════ */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto">
          
          {cards.map((card) => {
            const isDark = card.variant === "dark";
            const isPremium = card.variant === "premium";

            const bgClass = isDark
              ? "bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0d0d0d]"
              : isPremium
                ? "bg-gradient-to-br from-[#fffbeb] via-[#fef3c7] to-[#fff7ed]"
                : "bg-gradient-to-br from-white via-[#f8fafb] to-[#f0fdfa]";

            const borderClass = isDark
              ? "border border-white/[0.08]"
              : isPremium
                ? "border border-amber-200/60"
                : "border border-teal-100/60";

            const titleColor = isDark ? "text-white" : "text-gray-900";
            const descColor = isDark ? "text-white/45" : "text-gray-500";
            const labelColor = isDark ? "text-lime-400" : isPremium ? "text-amber-600" : "text-teal-600";
            const priceColor = isDark ? "text-white" : "text-gray-900";
            const priceSuffixColor = isDark ? "text-white/35" : "text-gray-400";
            const featColor = isDark ? "text-white/65" : "text-gray-600";
            const annualColor = isDark ? "text-lime-400" : isPremium ? "text-amber-600" : "text-teal-600";

            return (
              <div
                key={card.name}
                className={`group relative rounded-[28px] overflow-hidden flex flex-col ${bgClass} ${borderClass} transition-all duration-500 hover:scale-[1.02]`}
                style={{
                  boxShadow: isDark
                    ? "0 25px 60px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset"
                    : isPremium
                      ? "0 25px 50px -12px rgba(180, 83, 9, 0.12), 0 0 0 1px rgba(251, 191, 36, 0.1) inset"
                      : "0 25px 50px -12px rgba(13, 148, 136, 0.08), 0 0 0 1px rgba(153, 246, 228, 0.15) inset",
                }}
              >
                {/* ── Accent Gradient Strip at Top ── */}
                <div
                  className="w-full h-[3px] flex-shrink-0"
                  style={{ background: card.accentGradient }}
                />

                {/* ── Large Decorative Tier Number Watermark ── */}
                <div
                  className="absolute -right-3 -top-4 text-[140px] font-black leading-none pointer-events-none select-none"
                  style={{
                    opacity: isDark ? 0.04 : 0.045,
                    color: isDark ? "#fff" : isPremium ? "#92400e" : "#0d9488",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    letterSpacing: "-0.05em",
                  }}
                >
                  {card.tierNumber}
                </div>

                {/* ── Ambient Glow Blobs ── */}
                <div
                  className="absolute -top-16 -right-16 w-52 h-52 rounded-full blur-[80px] pointer-events-none"
                  style={{ background: card.glowColor }}
                />
                <div
                  className="absolute -bottom-20 -left-20 w-44 h-44 rounded-full blur-[70px] pointer-events-none"
                  style={{ background: card.glowColor }}
                />

                {/* ── Dot Grid Texture ── */}
                <div className="absolute bottom-16 right-4 pointer-events-none" style={{ opacity: isDark ? 0.06 : 0.08 }}>
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    {Array.from({ length: 5 }).map((_, row) =>
                      Array.from({ length: 5 }).map((_, col) => (
                        <circle
                          key={`${row}-${col}`}
                          cx={6 + col * 12}
                          cy={6 + row * 12}
                          r="1.5"
                          fill={isDark ? "white" : isPremium ? "#92400e" : "#0d9488"}
                        />
                      ))
                    )}
                  </svg>
                </div>

                {/* ── Badge ── */}
                {card.badge && (
                  <div
                    className="absolute top-5 right-5 text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider z-10 shadow-lg"
                    style={{
                      background: card.accentGradient,
                      color: "#000",
                      boxShadow: `0 4px 14px -2px ${card.glowColor}`,
                    }}
                  >
                    {card.badge}
                  </div>
                )}

                {/* ── Card Body ── */}
                <div className="flex-1 flex flex-col justify-between p-7 pt-5 relative z-10">
                  <div className="space-y-5">
                    {/* Label & Title */}
                    <div className="space-y-1">
                      <span className={`text-[10px] font-mono tracking-[0.18em] uppercase block font-bold ${labelColor}`}>
                        {card.label}
                      </span>
                      <h3 className={`text-xl font-extrabold tracking-tight ${titleColor}`}>{card.name}</h3>
                      <p className={`text-[11px] leading-relaxed mt-1 ${descColor}`}>
                        {card.description}
                      </p>
                    </div>

                    {/* ── Frosted Glass Price Container ── */}
                    <div
                      className="rounded-2xl px-5 py-4 relative overflow-hidden"
                      style={{
                        background: isDark
                          ? "rgba(255,255,255,0.04)"
                          : isPremium
                            ? "rgba(245, 158, 11, 0.06)"
                            : "rgba(13, 148, 136, 0.04)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        border: isDark
                          ? "1px solid rgba(255,255,255,0.06)"
                          : isPremium
                            ? "1px solid rgba(245, 158, 11, 0.12)"
                            : "1px solid rgba(13, 148, 136, 0.08)",
                      }}
                    >
                      {/* Subtle shimmer line */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[1px]"
                        style={{ background: card.accentGradient, opacity: 0.3 }}
                      />
                      <div className="flex items-baseline gap-1">
                        <span className={`${typeof card.price === "number" ? "text-[34px]" : "text-2xl"} font-black tracking-tight leading-none ${priceColor}`}>
                          {typeof card.price === "number" ? `₹${card.price.toLocaleString()}` : card.price}
                        </span>
                        {card.priceSuffix && (
                          <span className={`text-xs font-medium ${priceSuffixColor}`}>{card.priceSuffix}</span>
                        )}
                      </div>
                      {card.annualNote && (
                        <span className={`block text-[10px] font-bold mt-1.5 ${annualColor}`}>
                          {card.annualNote}
                        </span>
                      )}
                    </div>

                    {/* ── Features List ── */}
                    <ul className="space-y-2.5 pt-1">
                      {card.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-3">
                          <div
                            className="w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{
                              background: isDark
                                ? "rgba(132, 204, 22, 0.12)"
                                : isPremium
                                  ? "rgba(245, 158, 11, 0.1)"
                                  : "rgba(13, 148, 136, 0.08)",
                            }}
                          >
                            <Check className={`w-3 h-3 ${card.checkColor}`} strokeWidth={3} />
                          </div>
                          <span className={`text-[11.5px] font-medium leading-tight ${featColor}`}>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* ── CTA Button ── */}
                  <div className="pt-5">
                    <Link
                      href="#contact"
                      className="w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 text-[12px] font-bold tracking-wide transition-all duration-300 active:scale-[0.97] hover:scale-[1.02]"
                      style={{
                        background: card.ctaGradient,
                        color: isDark ? "#000" : "#fff",
                        boxShadow: isDark
                          ? "0 8px 24px -4px rgba(132, 204, 22, 0.3)"
                          : isPremium
                            ? "0 8px 24px -4px rgba(217, 119, 6, 0.25)"
                            : "0 8px 24px -4px rgba(13, 148, 136, 0.25)",
                      }}
                    >
                      {card.ctaText}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
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
