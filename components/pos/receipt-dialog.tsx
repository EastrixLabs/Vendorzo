"use client"

import { FileText, ReceiptText } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export type ReceiptLine = {
  id: string
  name: string
  qty: number
  price: number
}

type ReceiptDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  lines: ReceiptLine[]
  subtotal: number
  tax: number
  total: number
  loading?: boolean
  onPrint?: () => void
  orderNumber?: string
}

export function ReceiptDialog({
  open,
  onOpenChange,
  lines,
  subtotal,
  tax,
  total,
  loading = false,
  onPrint,
  orderNumber = "POS-4582",
}: ReceiptDialogProps) {
  const isEmpty = lines.length === 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="size-5" />
            Receipt Preview
          </DialogTitle>
          <DialogDescription>Mock print layout for POS checkout</DialogDescription>
        </DialogHeader>

        <div className="space-y-3 rounded-md border p-4 text-sm">
          <div className="text-center">
            <p className="font-semibold">Vendorzo Coffee Bar</p>
            <p className="text-muted-foreground text-xs">Order #{orderNumber}</p>
          </div>

          {isEmpty ? (
            <p className="text-muted-foreground text-center text-xs">No items in receipt.</p>
          ) : (
            <div className="space-y-1">
              {lines.map((item) => (
                <div key={item.id} className="flex justify-between gap-2">
                  <span>
                    {item.qty} x {item.name}
                  </span>
                  <span>${(item.qty * item.price).toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-1 border-t pt-2">
            <div className="flex justify-between text-xs">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <div className="w-full grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Close
            </Button>
            <Button
              className="w-full"
              onClick={() => onPrint?.()}
              disabled={isEmpty || loading}
            >
              <ReceiptText className="size-4" />
              {loading ? "Processing..." : "Print Mock Receipt"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ReceiptDialog
