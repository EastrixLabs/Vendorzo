"use client";

import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ViewMode } from "./types";

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg border bg-muted/50 p-1">
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        onClick={() => onViewModeChange("grid")}
        className={cn(
          "rounded-md",
          viewMode === "grid" && "bg-background shadow-sm"
        )}
        aria-pressed={viewMode === "grid"}
      >
        <LayoutGrid className="size-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        onClick={() => onViewModeChange("list")}
        className={cn(
          "rounded-md",
          viewMode === "list" && "bg-background shadow-sm"
        )}
        aria-pressed={viewMode === "list"}
      >
        <List className="size-4" />
      </Button>
    </div>
  );
}
