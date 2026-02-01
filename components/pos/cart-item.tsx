"use client";

import { Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CartItem as CartItemType } from "./types";

interface CartItemRowProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItemRow({ item, onUpdateQuantity, onRemove }: CartItemRowProps) {
  return (
    <div className="group flex items-center gap-3 rounded-xl bg-muted/40 p-3 transition-colors hover:bg-muted/60">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${item.color}`}>
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
