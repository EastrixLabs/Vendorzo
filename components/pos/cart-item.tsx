"use client";

import { Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CartItem as CartItemType } from "./types";

const categoryTone: Record<string, string> = {
  coffee: "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200",
  food: "bg-red-100 text-red-900 dark:bg-red-900/30 dark:text-red-200",
  sandwich: "bg-yellow-100 text-yellow-900 dark:bg-yellow-900/30 dark:text-yellow-200",
  dessert: "bg-pink-100 text-pink-900 dark:bg-pink-900/30 dark:text-pink-200",
  drinks: "bg-cyan-100 text-cyan-900 dark:bg-cyan-900/30 dark:text-cyan-200",
  meals: "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-200",
};

interface CartItemRowProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItemRow({ item, onUpdateQuantity, onRemove }: CartItemRowProps) {
  return (
    <div className="group flex items-center gap-3 rounded-xl bg-muted/40 p-3 transition-colors hover:bg-muted/60">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${categoryTone[item.category] || "bg-muted text-foreground"}`}>
        <span className="text-lg">
          {item.category === "coffee" && "☕"}
          {item.category === "food" && "🍕"}
          {item.category === "sandwich" && "🥪"}
          {item.category === "dessert" && "🍰"}
          {item.category === "drinks" && "🥤"}
          {item.category === "meals" && "🍽️"}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{item.name}</p>
        <p className="text-xs text-muted-foreground">
          ${item.price.toFixed(2)} each
        </p>
      </div>

      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="icon-xs"
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
        >
          <Minus className="size-3" />
        </Button>
        <span className="w-6 text-center text-sm font-semibold tabular-nums">
          {item.quantity}
        </span>
        <Button
          variant="outline"
          size="icon-xs"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        >
          <Plus className="size-3" />
        </Button>
      </div>

      <div className="w-16 text-right">
        <span className="text-sm font-semibold">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
      </div>

      <Button
        variant="ghost"
        size="icon-xs"
        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
        onClick={() => onRemove(item.id)}
      >
        <Trash2 className="size-3.5" />
      </Button>
    </div>
  );
}
