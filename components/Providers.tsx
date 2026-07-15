"use client";

import { OrderProvider } from "@/components/OrderContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <OrderProvider>{children}</OrderProvider>;
}
