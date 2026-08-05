"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#111] border-t border-white/10 pt-8 pb-6 md:pt-16 md:pb-8 overflow-hidden z-10 relative">
      <div className="mx-auto w-full px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32">

        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-8 pb-6 md:pb-12 border-b border-white/10">

          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-5 space-y-3 md:space-y-4">
            <Link href="#" className="flex items-center gap-2 group">
              <Image
                src="/LOGO-ONOMAX.svg"
                alt="ONOMEX Logo"
                width={28}
                height={28}
                priority
                className="w-5 h-5 md:w-7 md:h-7 transition-transform duration-500 group-hover:rotate-[60deg]"
              />
              <span className="text-xs md:text-sm font-bold tracking-tight text-white">
                ONOMEX
              </span>
            </Link>
            <p className="hidden md:block text-xs text-white/50 leading-relaxed font-medium max-w-sm">
              ONOMEX is a hospitality automation company engineering intelligence for physical dining floors. We merge QR ordering with autonomous delivery logic.
            </p>
          </div>

          {/* Links Column 1: Product */}
          <div className="col-span-1 md:col-span-2 space-y-2 md:space-y-3">
            <h5 className="text-[9px] md:text-[10px] font-mono tracking-wider text-white/40 uppercase">Platform</h5>
            <ul className="space-y-1.5 md:space-y-2 text-[11px] md:text-xs font-semibold text-white/60">
              <li><Link href="#ordering" className="hover:text-white transition-colors">Ordering API</Link></li>
              <li><Link href="#robots" className="hover:text-white transition-colors">Robot Delivery</Link></li>
              <li><Link href="#intelligence" className="hover:text-white transition-colors">KPI Telemetry</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing Plans</Link></li>
            </ul>
          </div>

          {/* Links Column 2: Company */}
          <div className="col-span-1 md:col-span-2 space-y-2 md:space-y-3">
            <h5 className="text-[9px] md:text-[10px] font-mono tracking-wider text-white/40 uppercase">Company</h5>
            <ul className="space-y-1.5 md:space-y-2 text-[11px] md:text-xs font-semibold text-white/60">
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Press Kit</Link></li>
              <li><Link href="#contact" className="hover:text-white transition-colors">Schedule Demo</Link></li>
            </ul>
          </div>

          {/* Links Column 3: Legal */}
          <div className="col-span-2 md:col-span-3 space-y-2 md:space-y-3">
            <h5 className="text-[9px] md:text-[10px] font-mono tracking-wider text-white/40 uppercase">Legal</h5>
            <ul className="space-y-1.5 md:space-y-2 text-[11px] md:text-xs font-semibold text-white/60">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">SLA Agreement</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Safety Standards</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Fine Print */}
        <div className="pt-4 md:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 md:gap-4 text-[9px] md:text-[10px] font-mono text-white/30">
          <div>
            © 2026 ONOMEX. All rights reserved. Built to enterprise SLA standards.
          </div>

          {/* Socials */}
          <div className="flex items-center gap-5">
            <Link href="#" aria-label="X" className="hover:opacity-75 transition-opacity">
              <Image
                src="/x-logo.svg"
                alt="X"
                width={18}
                height={18}
                className="w-4.5 h-4.5 brightness-0 invert"
              />
            </Link>
            <Link href="#" aria-label="Instagram" className="hover:opacity-75 transition-opacity">
              <Image
                src="/instagram-logo.svg"
                alt="Instagram"
                width={18}
                height={18}
                className="w-4.5 h-4.5 brightness-0 invert"
              />
            </Link>
            <Link href="#" aria-label="Discord" className="hover:opacity-75 transition-opacity">
              <Image
                src="/discord-logo-white.svg"
                alt="Discord"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
