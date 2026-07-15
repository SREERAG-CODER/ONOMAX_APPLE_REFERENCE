"use client";

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
export type OrderStatus = "idle" | "preparing" | "delivering" | "unlocked";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
}

export interface TableOrder {
  tableId: string;
  tableName: string;
  status: OrderStatus;
  items: OrderItem[];
  eta: string;
}

interface OrderContextType {
  orders: Record<string, TableOrder>;
  placeOrder: (tableId: string, items: OrderItem[]) => void;
  clearOrder: (tableId: string) => void;
  dispatchTable: (tableId: string) => void;
  isDispatching: string; // tableId currently being dispatched, or ""
}

const OrderContext = createContext<OrderContextType | null>(null);

// ─── Seed Data (pre-existing orders on the floor map) ────────────────────────
const SEED_ORDERS: Record<string, TableOrder> = {
  T2: { tableId: "T2", tableName: "Table 02", status: "preparing", items: [{ id: "seed1", name: "Truffle Burger", price: 449 }], eta: "4m" },
  T5: { tableId: "T5", tableName: "Table 05", status: "preparing", items: [{ id: "seed2", name: "Avocado Salad", price: 399 }], eta: "2m" },
  T7: { tableId: "T7", tableName: "Table 07", status: "delivering", items: [{ id: "seed3", name: "Gourmet Bowl", price: 499 }], eta: "18s" },
  T8: { tableId: "T8", tableName: "Table 08", status: "unlocked", items: [{ id: "seed4", name: "Matcha Latte", price: 289 }], eta: "Arrived" },
};

// ─── All table IDs ───────────────────────────────────────────────────────────
export const ALL_TABLE_IDS = Array.from({ length: 12 }, (_, i) => `T${i + 1}`);

export function tableName(id: string): string {
  const num = id.replace("T", "");
  return `Table ${num.padStart(2, "0")}`;
}

// ─── Provider ────────────────────────────────────────────────────────────────
export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Record<string, TableOrder>>(SEED_ORDERS);
  const [isDispatching, setIsDispatching] = useState("");
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const placeOrder = useCallback((tableId: string, items: OrderItem[]) => {
    // Set table to "preparing" immediately
    setOrders((prev) => ({
      ...prev,
      [tableId]: {
        tableId,
        tableName: tableName(tableId),
        status: "preparing",
        items,
        eta: "3m",
      },
    }));

    // Auto-cycle: preparing → delivering → unlocked → clear
    const t1 = setTimeout(() => {
      setOrders((prev) => prev[tableId] ? ({
        ...prev,
        [tableId]: { ...prev[tableId], status: "delivering", eta: "18s" },
      }) : prev);
    }, 5000);

    const t2 = setTimeout(() => {
      setOrders((prev) => prev[tableId] ? ({
        ...prev,
        [tableId]: { ...prev[tableId], status: "unlocked", eta: "Arrived" },
      }) : prev);
    }, 9000);

    const t3 = setTimeout(() => {
      setOrders((prev) => {
        const next = { ...prev };
        delete next[tableId];
        return next;
      });
    }, 14000);

    timeoutsRef.current.push(t1, t2, t3);
  }, []);

  const clearOrder = useCallback((tableId: string) => {
    setOrders((prev) => {
      const next = { ...prev };
      delete next[tableId];
      return next;
    });
  }, []);

  const dispatchTable = useCallback((tableId: string) => {
    if (isDispatching) return;
    setIsDispatching(tableId);

    setOrders((prev) => {
      const existing = prev[tableId];
      if (existing) {
        return { ...prev, [tableId]: { ...existing, status: "preparing", eta: "3m" } };
      }
      return {
        ...prev,
        [tableId]: {
          tableId,
          tableName: tableName(tableId),
          status: "preparing",
          items: [{ id: "dispatch", name: "Override Payload", price: 0 }],
          eta: "3m",
        },
      };
    });

    const t1 = setTimeout(() => {
      setOrders((prev) => prev[tableId] ? ({
        ...prev,
        [tableId]: { ...prev[tableId], status: "delivering", eta: "18s" },
      }) : prev);
    }, 2000);

    const t2 = setTimeout(() => {
      setOrders((prev) => prev[tableId] ? ({
        ...prev,
        [tableId]: { ...prev[tableId], status: "unlocked", eta: "Arrived" },
      }) : prev);
    }, 4500);

    const t3 = setTimeout(() => {
      setIsDispatching("");
    }, 7000);

    timeoutsRef.current.push(t1, t2, t3);
  }, [isDispatching]);

  return (
    <OrderContext.Provider value={{ orders, placeOrder, clearOrder, dispatchTable, isDispatching }}>
      {children}
    </OrderContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────
export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
}
