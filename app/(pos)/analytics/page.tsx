"use client"

import { type ColumnDef } from "@tanstack/react-table"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  RadarChart,
  RadialBar,
  RadialBarChart,
  Radar as RadarShape,
  XAxis,
} from "recharts"
import {
  ChartArea,
  ChartBar,
  ChartLine,
  ChartPie,
  CircleGauge,
  Radar,
} from "lucide-react"

import { PageHeading } from "@/components/pos/page-heading"
import {
  areaData,
  barData,
  lineData,
  pieData,
  radarData,
  radialData,
} from "@/components/pos/mock-data"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DataTable, DataTableRowAction } from "@/components/ui/data-table"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const areaConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

const barConfig = {
  qty: {
    label: "Units",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

const lineConfig = {
  tickets: {
    label: "Tickets",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

const pieConfig = {
  drinks: {
    label: "Drinks",
    color: "var(--chart-1)",
  },
  snacks: {
    label: "Snacks",
    color: "var(--chart-2)",
  },
  meals: {
    label: "Meals",
    color: "var(--chart-3)",
  },
  desserts: {
    label: "Desserts",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

const radarConfig = {
  current: {
    label: "Current",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

const radialConfig = {
  inStore: {
    label: "In-store",
    color: "var(--chart-2)",
  },
  online: {
    label: "Online",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

type AnalyticsRow = {
  metric: string
  category: "Revenue" | "Sales" | "Operations"
  value: number
}

const analyticsColumns: ColumnDef<AnalyticsRow>[] = [
  {
    accessorKey: "metric",
    header: "Metric",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "value",
    header: () => <div className="text-right">Value</div>,
    cell: ({ row }) => <div className="text-right">{row.original.value}</div>,
  },
  {
    id: "row-actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => (
      <DataTableRowAction
        label={row.original.metric}
        items={[{ label: "Inspect Trend" }, { label: "Export Metric" }]}
      />
    ),
  },
]

const analyticsTableData: AnalyticsRow[] = [
  {
    metric: "Weekly Revenue Peak",
    category: "Revenue",
    value: Math.max(...areaData.map((point) => point.revenue)),
  },
  {
    metric: "Best Selling Product Qty",
    category: "Sales",
    value: Math.max(...barData.map((point) => point.qty)),
  },
  {
    metric: "Highest Hourly Tickets",
    category: "Operations",
    value: Math.max(...lineData.map((point) => point.tickets)),
  },
  {
    metric: "Top Category Share",
    category: "Sales",
    value: Math.max(...pieData.map((point) => point.value)),
  },
]

export default function AnalyticsPage() {
  return (
    <div>
      <PageHeading
        title="Analytics"
        description="Six chart variants using shadcn chart wrappers and mock data."
        icon={ChartBar}
      />

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChartArea className="size-4" />
              Area Chart
            </CardTitle>
            <CardDescription>Weekly revenue movement</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={areaConfig} className="h-60 w-full">
              <AreaChart data={areaData} margin={{ left: 0, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent className="!shadow-xs" indicator="line" />} />
                <Area
                  dataKey="revenue"
                  type="monotone"
                  fill="var(--color-revenue)"
                  fillOpacity={0.18}
                  stroke="var(--color-revenue)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChartBar className="size-4" />
              Bar Chart
            </CardTitle>
            <CardDescription>Top product volume</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={barConfig} className="h-60 w-full">
              <BarChart data={barData} margin={{ left: 0, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="product" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent className="!shadow-xs" />} />
                <Bar dataKey="qty" fill="var(--color-qty)" radius={6} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChartLine className="size-4" />
              Line Chart
            </CardTitle>
            <CardDescription>Hourly ticket count</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={lineConfig} className="h-60 w-full">
              <LineChart data={lineData} margin={{ left: 0, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent className="!shadow-xs" indicator="dot" />} />
                <Line
                  dataKey="tickets"
                  type="monotone"
                  stroke="var(--color-tickets)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-tickets)", strokeWidth: 0 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChartPie className="size-4" />
              Pie Chart
            </CardTitle>
            <CardDescription>Category contribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={pieConfig} className="h-60 w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent className="!shadow-xs" nameKey="category" />} />
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="category"
                  innerRadius={50}
                  outerRadius={84}
                  strokeWidth={2}
                />
                <ChartLegend
                  content={<ChartLegendContent nameKey="category" />}
                  verticalAlign="bottom"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Radar className="size-4" />
              Radar Chart
            </CardTitle>
            <CardDescription>Cashier performance dimensions</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={radarConfig} className="h-60 w-full">
              <RadarChart data={radarData}>
                <ChartTooltip content={<ChartTooltipContent className="!shadow-xs" />} />
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <RadarShape
                  dataKey="current"
                  stroke="var(--color-current)"
                  fill="var(--color-current)"
                  fillOpacity={0.25}
                />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CircleGauge className="size-4" />
              Radial Chart
            </CardTitle>
            <CardDescription>In-store vs online mix</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={radialConfig} className="h-60 w-full">
              <RadialBarChart data={radialData} innerRadius={32} outerRadius={110}>
                <ChartTooltip content={<ChartTooltipContent className="!shadow-xs" nameKey="name" />} />
                <RadialBar
                  dataKey="value"
                  background
                  cornerRadius={8}
                  label={{ position: "insideStart", fill: "var(--background)", fontSize: 10 }}
                />
                <ChartLegend
                  content={<ChartLegendContent nameKey="name" />}
                  verticalAlign="bottom"
                />
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Analytics Data Table</CardTitle>
          <CardDescription>Compact KPI snapshot for quick comparison.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={analyticsColumns}
            data={analyticsTableData}
            searchKey="metric"
            searchPlaceholder="Search metric..."
            filterKey="category"
            filterLabel="Category"
            filterOptions={[
              { label: "Revenue", value: "Revenue" },
              { label: "Sales", value: "Sales" },
              { label: "Operations", value: "Operations" },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  )
}
