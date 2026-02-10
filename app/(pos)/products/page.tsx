"use client"

import * as React from "react"
import { Boxes, PackageSearch, PackageX } from "lucide-react"

import { PageHeading } from "@/components/pos/page-heading"
import { categories, products } from "@/components/pos/mock-data"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function ProductsPage() {
  const [showLoading, setShowLoading] = React.useState(false)
  const [category, setCategory] = React.useState<(typeof categories)[number]>("All")

  const filteredProducts =
    category === "All"
      ? products
      : products.filter((product) => product.category === category)

  return (
    <div>
      <PageHeading
        title="Products"
        description="Inventory list with stock and pricing mock data."
        icon={Boxes}
        actions={
          <div className="flex items-center gap-3">
            <Select
              value={category}
              onValueChange={(value) => setCategory(value as (typeof categories)[number])}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="!shadow-xs">
                {categories.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Switch checked={showLoading} onCheckedChange={setShowLoading} />
              <Label>Loading</Label>
            </div>
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
          ) : filteredProducts.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center gap-2 py-10 text-center">
                <PackageX className="text-muted-foreground size-9" />
                <h3 className="text-base font-medium">No products found</h3>
                <p className="text-muted-foreground text-sm">
                  There are no products available in the {category} category.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{product.category}</Badge>
                    </TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
