"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { ClipboardList, FileX2 } from "lucide-react"

import { orderHistory, type Order } from "@/components/pos/mock-data"
import { PageHeading } from "@/components/pos/page-heading"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DataTable, DataTableRowAction } from "@/components/ui/data-table"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"

const statusFilters = ["Completed", "Pending", "Refunded"] as const

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => <span className="font-medium">{row.original.id}</span>,
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "items",
    header: "Items",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "payment",
    header: "Payment",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.status === "Completed" ? "secondary" : "outline"}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "total",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => <div className="text-right">${row.original.total.toFixed(2)}</div>,
  },
  {
    id: "row-actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => (
      <DataTableRowAction
        label={row.original.id}
        items={[
          { label: "View Receipt" },
          { label: "Duplicate Order" },
          { label: "Refund Order", destructive: true },
        ]}
      />
    ),
  },
]

export default function OrdersPage() {
  const [showLoading, setShowLoading] = React.useState(false)

  return (
    <div>
      <PageHeading
        title="Orders"
        description="Order history table with statuses and payment channels."
        icon={ClipboardList}
        actions={
          <div className="flex items-center gap-2">
            <Switch checked={showLoading} onCheckedChange={setShowLoading} />
            <Label>Loading</Label>
          </div>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>Order History Table</CardTitle>
          <CardDescription>Latest mock transactions from this store.</CardDescription>
        </CardHeader>
        <CardContent>
          {showLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={`orders-table-skeleton-${index}`} className="h-10 w-full" />
              ))}
            </div>
          ) : orderHistory.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center gap-2 py-12 text-center">
                <FileX2 className="text-muted-foreground size-9" />
                <h3 className="text-base font-medium">No orders to display</h3>
                <p className="text-muted-foreground text-sm">
                  No entries exist for the selected status in this mock dataset.
                </p>
              </CardContent>
            </Card>
          ) : (
            <DataTable
              columns={columns}
              data={orderHistory}
              searchKey="customer"
              searchPlaceholder="Search customer..."
              filterKey="status"
              filterLabel="Status"
              filterOptions={statusFilters.map((status) => ({
                label: status,
                value: status,
              }))}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
