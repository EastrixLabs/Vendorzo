"use client";

import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentMethodCardProps {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  selected?: boolean;
  onClick: () => void;
}

export function PaymentMethodCard({
  icon,
  label,
  sublabel,
  selected,
  onClick,
}: PaymentMethodCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 rounded-xl border-2 p-4 transition-all duration-200 w-full text-left",
        selected
          ? "border-primary bg-primary/5 shadow-md"
          : "border-border hover:border-primary/30 hover:bg-muted/50"
      )}
    >
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
          selected ? "bg-primary text-primary-foreground" : "bg-muted"
        )}
      >
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-semibold">{label}</p>
        <p className="text-sm text-muted-foreground">{sublabel}</p>
      </div>
      {selected && (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <ChevronRight className="size-4" />
        </div>
      )}
    </button>
  );
}
