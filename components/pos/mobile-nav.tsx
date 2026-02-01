"use client";

import { LayoutGrid, ShoppingCart, Receipt, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  cartCount: number;
}

const navItems = [
  { id: "products", label: "Products", icon: LayoutGrid },
  { id: "cart", label: "Cart", icon: ShoppingCart },
  { id: "orders", label: "Orders", icon: Receipt },
  { id: "more", label: "More", icon: MoreHorizontal },
];

export function MobileNav({ activeTab, onTabChange, cartCount }: MobileNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-lg md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isCart = item.id === "cart";
          
          return (
            <button
              type="button"
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "relative flex flex-col items-center gap-1 px-4 py-2 transition-colors",
                activeTab === item.id ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="size-5" />
              {isCart && cartCount > 0 && (
                <span className="absolute -top-0.5 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
