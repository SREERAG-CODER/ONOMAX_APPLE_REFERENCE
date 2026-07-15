# ONOMEX Redesign Walkthrough

We have successfully overhauled the ONOMEX company portfolio, transforming it into a high-end, responsive, white-themed enterprise website inspired by Apple's digital design language. All humanoid graphics have been removed in favor of precise, product-specific interactive UI elements and maps.

---

## 🛠️ Summary of Changes

We rebuilt the architecture of the website from scratch to support clean light backgrounds, charcoal typography, and smooth transitions.

### Core Foundation
- **[globals.css](file:///c:/Users/SREERAG/OneDrive/Documents/WORK/ONOMEX/WEB%20CODE/company-portfolio/app/globals.css)**: Set default background to white (`#ffffff`), text to charcoal charcoal (`#1d1d1f`), enabled smooth scrolling, and added pulse animations for telemetry mockups.
- **[page.tsx](file:///c:/Users/SREERAG/OneDrive/Documents/WORK/ONOMEX/WEB%20CODE/company-portfolio/app/page.tsx)**: Assembled all the modular sections into a single scroll-friendly landing page flow.
- **[CompanyOverview.tsx](file:///c:/Users/SREERAG/OneDrive/Documents/WORK/ONOMEX/WEB%20CODE/company-portfolio/components/CompanyOverview.tsx)**: Deleted the outdated dark overview component to keep the workspace clean.

### Navigation & Header
- **[Navbar.tsx](file:///c:/Users/SREERAG/OneDrive/Documents/WORK/ONOMEX/WEB%20CODE/company-portfolio/components/Navbar.tsx)**: Redesigned as a thin sticky frosted-glass header (`backdrop-blur-md bg-white/70`). Structured the brand name and hexagonal logo icon in pure black. Built smooth anchor scroll links for desktop and a slide-down hamburger drawer for mobile.

### Hero & Primary Stats
- **[Hero.tsx](file:///c:/Users/SREERAG/OneDrive/Documents/WORK/ONOMEX/WEB%20CODE/company-portfolio/components/Hero.tsx)**: Created a centered editorial heading block ("Autonomous Restaurant Intelligence.") and structured supporting text. Designed a custom interactive **Live Floor Map Grid** where users click tables (T1-T12) to see real-time dispatch telemetry and tray status details on an en-route robot. Added the performance metrics bar at the bottom:
  - **3x** Faster Delivery
  - **0** Delivery Errors
  - **100%** Order Visibility
  - **<1s** Status Updates

### Feature Sections
- **[DinerExperience.tsx](file:///c:/Users/SREERAG/OneDrive/Documents/WORK/ONOMEX/WEB%20CODE/company-portfolio/components/DinerExperience.tsx)**: Explains the Frictionless Ordering Diner Experience. Contains a pixel-perfect **Mobile Phone Simulator** that guides users through a mock diner order:
  1. *Scan QR*: Displays camera scanner beam animation.
  2. *Menu*: Browse and add Gourmet Bowls or Matcha Lattes to cart.
  3. *Cart*: Slide-up drawer showing price subtotal and checkout link.
  4. *Real-time Tracking*: Follow an active order timeline updating dynamically (Received ➔ Preparing ➔ Ready ➔ Assigned ➔ Delivering ➔ Arrived).
- **[RobotsThinking.tsx](file:///c:/Users/SREERAG/OneDrive/Documents/WORK/ONOMEX/WEB%20CODE/company-portfolio/components/RobotsThinking.tsx)**: Showcases Table-Targeted Unlocking and Auto-Return hardware capabilities. Features a **Visual Route Map** (Kitchen to Tables A, B, C) where users click dispatch commands to see an SVG robot node navigate paths, open locked cabinets, and travel back to dock and charge.
- **[BusinessIntelligence.tsx](file:///c:/Users/SREERAG/OneDrive/Documents/WORK/ONOMEX/WEB%20CODE/company-portfolio/components/BusinessIntelligence.tsx)**: Illustrates the Restaurant-at-a-Glance control systems. Built an interactive dashboard where users toggle roles:
  - *Owner View*: Shows live counting orders, revenue graphs, and robot battery health tables.
  - *Kitchen View*: Queue of cooking tickets with override dispatch action buttons.
  - *Staff View*: Real-time alerts notification center for floor service requests.

### Conversion & Support
- **[Pricing.tsx](file:///c:/Users/SREERAG/OneDrive/Documents/WORK/ONOMEX/WEB%20CODE/company-portfolio/components/Pricing.tsx)**: Implements an interactive billing period switcher (Monthly vs. Annual save 20%) alongside three beautiful clean columns detailing Starter (₹9,999/mo), Pro (₹19,999/mo), and Enterprise (Custom) plans.
- **[Faq.tsx](file:///c:/Users/SREERAG/OneDrive/Documents/WORK/ONOMEX/WEB%20CODE/company-portfolio/components/Faq.tsx)**: Responsive accordion FAQs answering setup mapping,WiFi dropouts, sanitization, and stairs.
- **[Contact.tsx](file:///c:/Users/SREERAG/OneDrive/Documents/WORK/ONOMEX/WEB%20CODE/company-portfolio/components/Contact.tsx)**: Modern form to book video walkthroughs or trials, showing instant successful receipt messages.
- **[Footer.tsx](file:///c:/Users/SREERAG/OneDrive/Documents/WORK/ONOMEX/WEB%20CODE/company-portfolio/components/Footer.tsx)**: Apple-style footer containing fine print licensing details and social logo link arrays.

---

## 🔍 Verification & Testing

1. **Responsiveness**: Checked breakpoints utilizing Tailwind's classes:
   - Mobile: Vertical lists and columns stack gracefully, phone and map containers fit within limits without horizontal overflow.
   - Desktop: Multi-column splits are clean and margins have breathing room.
2. **Interactive States**: Tested toggles, simulators, path animations, and forms—all states cycle smoothly.
3. **Build Execution**: Compiled the workspace via standard Next.js compiler.
