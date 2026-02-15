"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { Boxes, PackageSearch, PackageX } from "lucide-react"

import { categories, products, type Product } from "@/components/pos/mock-data"
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

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <Badge variant="secondary">{row.original.category}</Badge>,
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => <div className="text-right">${row.original.price.toFixed(2)}</div>,
  },
  {
    id: "row-actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => (
      <DataTableRowAction
        label={row.original.name}
        items={[
          { label: "View Product" },
          { label: "Edit Price" },
          { label: "Restock" },
          { label: "Archive", destructive: true },
        ]}
      />
    ),
  },
]

export default function ProductsPage() {
  const [showLoading, setShowLoading] = React.useState(false)

  return (
    <div>
      <PageHeading
        title="Products"
        description="Inventory list with stock and pricing mock data."
        icon={Boxes}
        actions={
          <div className="flex items-center gap-2">
            <Switch checked={showLoading} onCheckedChange={setShowLoading} />
            <Label>Loading</Label>
          </div>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>Inventory Table</CardTitle>
          <CardDescription>Frontend-only preview for product records.</CardDescription>
        </CardHeader>
        <CardContent>
          {showLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 7 }).map((_, index) => (
                <Skeleton key={`products-table-skeleton-${index}`} className="h-10 w-full" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center gap-2 py-10 text-center">
                <PackageX className="text-muted-foreground size-9" />
                <h3 className="text-base font-medium">No products found</h3>
                <p className="text-muted-foreground text-sm">
                  There are no products available in the current dataset.
                </p>
              </CardContent>
            </Card>
          ) : (
            <DataTable
              columns={columns}
              data={products}
              searchKey="name"
              searchPlaceholder="Search product..."
              filterKey="category"
              filterLabel="Category"
              filterOptions={categories
                .filter((category) => category !== "All")
                .map((category) => ({ label: category, value: category }))}
            />
          )}
        </CardContent>
      </Card>

      <Card className="mt-4" size="sm">
        <CardContent className="flex items-start gap-3">
          <PackageSearch className="text-muted-foreground mt-0.5 size-4" />
          <p className="text-muted-foreground text-sm">
            Product edit/create behavior is intentionally omitted for now. This page
            is strictly UI scaffolding with mock records.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
