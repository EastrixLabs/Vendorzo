"use client";

import * as React from "react";

import {
  CalendarRange,
  Download,
} from "lucide-react";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  Pie,
  PieChart as RePieChart,
  Cell,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AppSidebar } from "@/components/pos";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const trendData = [
  { month: "Jan", actual: 5200, forecast: 5000 },
  { month: "Feb", actual: 6100, forecast: 5900 },
  { month: "Mar", actual: 5800, forecast: 6100 },
  { month: "Apr", actual: 6900, forecast: 6700 },
  { month: "May", actual: 8200, forecast: 7800 },
  { month: "Jun", actual: 7600, forecast: 8000 },
];

const retentionData = [
  { name: "Returning", value: 62 },
  { name: "New", value: 38 },
];

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))"];

export default function AnalyticsPage() {
  const [granularity, setGranularity] = React.useState("monthly");

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex h-screen flex-col overflow-hidden">
          <header className="flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="hidden md:flex" />
              <h1 className="text-lg font-semibold">Analytics</h1>
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="size-4" />
              Export
            </Button>
          </header>

          <div className="flex-1 overflow-auto">
            <div className="p-4 lg:p-6 space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Sales Forecast vs Actuals</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1.5">
                      <CalendarRange className="size-4" />
                      Last 6 Months
                    </Button>
                    <ToggleGroup variant="outline" spacing={0}>
                      <ToggleGroupItem
                        value="daily"
                        aria-pressed={granularity === "daily"}
                        onClick={() => setGranularity("daily")}
                      >
                        Daily
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="weekly"
                        aria-pressed={granularity === "weekly"}
                        onClick={() => setGranularity("weekly")}
                      >
                        Weekly
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="monthly"
                        aria-pressed={granularity === "monthly"}
                        onClick={() => setGranularity("monthly")}
                      >
                        Monthly
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      actual: { label: "Actual", color: "hsl(var(--chart-1))" },
                      forecast: { label: "Forecast", color: "hsl(var(--chart-2))" },
                    }}
                  >
                    <LineChart data={trendData}>
                      <CartesianGrid vertical={false} />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="var(--color-actual)"
                        strokeWidth={2.5}
                        dot={{ r: 2, strokeWidth: 0, fill: "var(--color-actual)" }}
                        activeDot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="forecast"
                        stroke="var(--color-forecast)"
                        strokeWidth={2}
                        strokeDasharray="6 4"
                        dot={{ r: 2, strokeWidth: 0, fill: "var(--color-forecast)" }}
                        activeDot={{ r: 4 }}
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Retention</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        returning: { label: "Returning", color: "hsl(var(--chart-1))" },
                        new: { label: "New", color: "hsl(var(--chart-2))" },
                      }}
                    >
                      <RePieChart>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Pie
                          data={retentionData}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={50}
                          outerRadius={80}
                        >
                          {retentionData.map((entry, index) => (
                            <Cell
                              key={entry.name}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                      </RePieChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Regions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { region: "Downtown", value: "$18.4k" },
                      { region: "Uptown", value: "$12.9k" },
                      { region: "Midtown", value: "$9.6k" },
                    ].map((item) => (
                      <div key={item.region} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.region}</span>
                        <span className="text-sm text-muted-foreground">{item.value}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
