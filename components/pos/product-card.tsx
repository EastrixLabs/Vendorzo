"use client";

import { Plus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product, ViewMode } from "./types";

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
  viewMode?: ViewMode;
}

export function ProductCard({ product, onAdd, viewMode = "grid" }: ProductCardProps) {
  const isGrid = viewMode === "grid";

  return (
    <button
      type="button"
      onClick={() => onAdd(product)}
      className={cn(
        "group relative flex border border-border/50 transition-all duration-200 hover:shadow-lg hover:border-primary/20 active:scale-[0.98] text-left w-full overflow-hidden",
        product.color,
        isGrid 
          ? "flex-col rounded-2xl p-3 sm:p-4 aspect-square" 
          : "flex-row items-center rounded-xl p-3 gap-3"
      )}
    >
      {/* HOT Badge - positioned inside the card */}
      {product.popular && (
        <div className={cn(
          "absolute z-10 flex items-center gap-1 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm",
          isGrid ? "top-2 right-2" : "top-1.5 right-2"
        )}>
          <Sparkles className="size-2.5" />
          HOT
        </div>
      )}

      {/* Discount Badge */}
      {product.discount && (
        <div className={cn(
          "absolute z-10 flex items-center gap-0.5 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm",
          isGrid ? "top-2 left-2" : "top-1.5 left-2"
        )}>
          -{product.discount}%
        </div>
      )}

      {/* Icon */}
      <div className={cn(
        "flex items-center justify-center rounded-xl bg-background/60 backdrop-blur-sm shrink-0",
        isGrid 
          ? "h-12 w-12 sm:h-14 sm:w-14 mx-auto mb-2" 
          : "h-10 w-10"
      )}>
        <span className={cn(isGrid ? "text-2xl sm:text-3xl" : "text-xl")}>
          {product.category === "coffee" && "☕"}
          {product.category === "food" && "🍕"}
          {product.category === "sandwich" && "🥪"}
          {product.category === "dessert" && "🍰"}
          {product.category === "drinks" && "🥤"}
          {product.category === "meals" && "🍽️"}
        </span>
      </div>

      {/* Content */}
      <div className={cn(
        "flex min-w-0",
        isGrid ? "flex-1 flex-col" : "flex-1 flex-row items-center justify-between"
      )}>
        <span className={cn(
          "font-medium text-foreground leading-tight",
          isGrid ? "text-xs sm:text-sm line-clamp-2" : "text-sm truncate"
        )}>
          {product.name}
        </span>
        <span className={cn(
          "font-bold text-foreground",
          isGrid ? "mt-auto pt-1 text-sm sm:text-base" : "text-sm shrink-0 ml-2"
        )}>
          ${product.price.toFixed(2)}
        </span>
      </div>

      {/* Add Button - Grid only */}
      {isGrid && (
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
            <Plus className="size-3.5" />
          </div>
        </div>
      )}

      {/* Add Button - List only */}
      {!isGrid && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Plus className="size-4" />
        </div>
      )}
    </button>
  );
}
