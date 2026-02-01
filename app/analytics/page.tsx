"use client";

import * as React from "react";

import {
  CalendarRange,
  Download,
} from "lucide-react";
import {
  Line,
  LineChart,
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  Pie,
  PieChart as RePieChart,
  Cell,
} from "recharts";
import { cn } from "@/lib/utils";
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

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-4))"];

export default function AnalyticsPage() {
  const [granularity, setGranularity] = React.useState(["monthly"]);

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

          <div className="flex-1 overflow-auto bg-muted/5">
            <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
              {/* Main Forecast Chart */}
              <Card className="shadow-sm border-muted/60">
                <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-8">
                  <div className="space-y-1">
                    <CardTitle className="text-2xl font-bold tracking-tight">Sales Forecast vs Actuals</CardTitle>
                    <p className="text-sm text-muted-foreground">Detailed revenue projection analysis for the current fiscal period.</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="outline" size="sm" className="gap-2 font-medium">
                      <CalendarRange className="size-4" />
                      Last 6 Months
                    </Button>
                    <div className="h-8 w-[1px] bg-border mx-1 hidden sm:block" />
                    <ToggleGroup variant="outline" value={granularity} onValueChange={(v) => v.length > 0 && setGranularity(v)}>
                      <ToggleGroupItem value="daily" className="text-xs px-3">Daily</ToggleGroupItem>
                      <ToggleGroupItem value="weekly" className="text-xs px-3">Weekly</ToggleGroupItem>
                      <ToggleGroupItem value="monthly" className="text-xs px-3">Monthly</ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      actual: { label: "Actual Sales", color: "hsl(var(--chart-1))" },
                      forecast: { label: "Forecasted", color: "hsl(var(--chart-4))" },
                    }}
                    className="aspect-auto h-[280px] w-full"
                  >
                    <AreaChart data={trendData}>
                      <defs>
                        <linearGradient id="fillActual" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-actual)" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="var(--color-actual)" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="fillForecast" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-forecast)" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="var(--color-forecast)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted/40" />
                      <XAxis 
                        dataKey="month" 
                        tickLine={false} 
                        axisLine={false} 
                        tickMargin={12}
                        className="text-muted-foreground font-medium"
                      />
                      <ChartTooltip content={<ChartTooltipContent className="w-[200px] shadow-2xl border-none" />} />
                      <Area
                        type="monotone"
                        dataKey="actual"
                        stroke="var(--color-actual)"
                        strokeWidth={3}
                        fill="url(#fillActual)"
                        animationDuration={900}
                      />
                      <Area
                        type="monotone"
                        dataKey="forecast"
                        stroke="var(--color-forecast)"
                        strokeWidth={2}
                        strokeDasharray="8 6"
                        fill="url(#fillForecast)"
                        animationDuration={900}
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Bottom Grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(0,1fr)]">
                {/* Customer Retention - Circular Chart */}
                <Card className="md:col-span-1 lg:col-span-1 border-muted/60">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">Customer Retention</CardTitle>
                    <p className="text-sm text-muted-foreground">New vs. returning customer split</p>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <ChartContainer
                      config={{
                        returning: { label: "Returning", color: "hsl(var(--chart-1))" },
                        new: { label: "New", color: "hsl(var(--chart-2))" },
                      }}
                      className="h-[200px] w-full"
                    >
                      <RePieChart>
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie
                          data={retentionData}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={60}
                          outerRadius={88}
                          strokeWidth={8}
                          stroke="hsl(var(--background))"
                          paddingAngle={4}
                        >
                          {retentionData.map((entry, index) => (
                            <Cell
                              key={entry.name}
                              fill={COLORS[index % COLORS.length]}
                              className="outline-none"
                            />
                          ))}
                        </Pie>
                      </RePieChart>
                    </ChartContainer>
                    <div className="grid grid-cols-2 gap-6 w-full mt-4 border-t pt-5">
                      <div className="text-center">
                        <div className="text-2xl font-black text-[hsl(var(--chart-1))]">62%</div>
                        <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Returning</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-black text-[hsl(var(--chart-2))]">38%</div>
                        <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">New</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Top Regions - List */}
                <Card className="md:col-span-1 lg:col-span-3 border-muted/60">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold">Regional Performance</CardTitle>
                      <p className="text-sm text-muted-foreground">Market penetration by district</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary font-bold">View Heatmap</Button>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {[
                      { region: "Downtown", value: 18400, target: 20000, color: "bg-chart-1" },
                      { region: "Uptown", value: 12900, target: 15000, color: "bg-chart-2" },
                      { region: "Midtown", value: 9600, target: 10000, color: "bg-chart-3" },
                      { region: "Eastside", value: 7200, target: 12000, color: "bg-chart-4" },
                    ].map((item) => (
                      <div key={item.region} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-bold">{item.region}</span>
                          <span className="font-mono text-muted-foreground">
                            ${(item.value / 1000).toFixed(1)}k <span className="mx-1">/</span> ${(item.target / 1000).toFixed(1)}k
                          </span>
                        </div>
                        <div className="h-3 w-full rounded-full bg-muted/50 overflow-hidden relative">
                           <div 
                            className={cn("h-full rounded-full transition-all duration-1000", item.color)} 
                            style={{ width: `${(item.value / item.target) * 100}%` }}
                          />
                        </div>
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
