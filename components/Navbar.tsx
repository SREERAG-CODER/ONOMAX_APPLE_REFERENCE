"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 z-50 w-full flex justify-center pointer-events-none pt-4 px-4">
      <div
        className={`pointer-events-auto flex items-center justify-between transition-all duration-500 ease-out bg-black/90 backdrop-blur-xl border border-white/[0.08] shadow-lg shadow-black/20 ${
          isScrolled
            ? "rounded-full px-4 py-2 max-w-[840px] w-full"
            : "rounded-[28px] px-6 py-3 max-w-[980px] w-full"
        }`}
      >
        {/* Logo */}
        <Link href="#" className="flex items-center gap-2 group shrink-0">
          <Image
            src="/LOGO-ONOMAX.svg"
            alt="ONOMEX Logo"
            width={500}
            height={500}
            priority
            className="w-6 h-6 object-contain transition-transform duration-500 group-hover:rotate-[60deg]"
          />
          <span className="text-[13px] font-bold tracking-tight text-white">
            ONOMEX
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#ordering"
            className="text-[12px] font-medium text-white/60 hover:text-white transition-colors duration-200"
          >
            Ordering
          </Link>
          <Link
            href="#robots"
            className="text-[12px] font-medium text-white/60 hover:text-white transition-colors duration-200"
          >
            Delivery
          </Link>
          <Link
            href="#intelligence"
            className="text-[12px] font-medium text-white/60 hover:text-white transition-colors duration-200"
          >
            Intelligence
          </Link>
          <Link
            href="#pricing"
            className="text-[12px] font-medium text-white/60 hover:text-white transition-colors duration-200"
          >
            Pricing
          </Link>
          <Link
            href="#faq"
            className="text-[12px] font-medium text-white/60 hover:text-white transition-colors duration-200"
          >
            FAQ
          </Link>
        </nav>

        {/* Action Button */}
        <div className="hidden md:block shrink-0">
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-white px-4 py-1.5 text-[11px] font-semibold text-black transition-all duration-300 hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98]"
          >
            Request Demo
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="block md:hidden text-white hover:text-white/70 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto absolute top-[72px] left-4 right-4 bg-black/95 backdrop-blur-xl rounded-[24px] border border-white/[0.08] shadow-xl md:hidden flex flex-col px-6 py-5 space-y-3 animate-in fade-in slide-in-from-top-3 duration-200">
          <Link
            href="#ordering"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-white/70 hover:text-white py-1"
          >
            Ordering
          </Link>
          <Link
            href="#robots"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-white/70 hover:text-white py-1"
          >
            Autonomous Delivery
          </Link>
          <Link
            href="#intelligence"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-white/70 hover:text-white py-1"
          >
            Intelligence
          </Link>
          <Link
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-white/70 hover:text-white py-1"
          >
            Pricing
          </Link>
          <Link
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-white/70 hover:text-white py-1"
          >
            FAQ
          </Link>
          <Link
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black transition-colors duration-200 hover:bg-white/90 w-full mt-2"
          >
            Request Demo
          </Link>
        </div>
      )}
    </header>
  );
}
