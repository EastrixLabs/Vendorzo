"use client"

import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "Do I need special hardware to run Vendorzo?",
    answer:
      "No. Vendorzo runs directly in your browser. You can use any modern tablet, laptop, or mobile phone at your front counter. It integrates cleanly with standard USB or Bluetooth barcode scanners.",
  },
  {
    question: "Does the POS work if my internet goes down?",
    answer:
      "Yes. Our offline-safe checkout allows you to continue processing cash and wallet transactions. Once your connection is restored, all data automatically syncs back to the cloud.",
  },
  {
    question: "How fast is the inventory synchronization?",
    answer:
      "Inventory updates in real-time across all active terminals. When a cashier completes a transaction, stock levels immediately reflect the change on every other device connected to the workspace.",
  },
  {
    question: "Is there a limit to the number of products I can add?",
    answer:
      "No. Even on our Starter plan, you can add an unlimited number of products, variants, and categories to your catalog.",
  },
  {
    question: "How do I migrate from my current POS system?",
    answer:
      "We provide a straightforward CSV import tool. You can export your product catalog and customer list from your existing provider and map them directly into Vendorzo in minutes.",
  },
]

export function FAQSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 lg:px-8 py-24 sm:py-32">
      <div className="mb-16 flex flex-col items-center text-center animate-vendorzo-fade-up">
        <Badge variant="outline" className="px-4 py-1.5 text-xs tracking-widest uppercase font-semibold text-primary/70 border-primary/20 bg-primary/5 shadow-xs mb-6 gap-2">
          <HelpCircle className="size-3.5" />
          Support
        </Badge>
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl leading-[1.1]">
          Common <span className="text-primary italic font-thin">questions</span>
        </h2>
        <p className="text-muted-foreground/90 max-w-2xl text-lg mt-4">
          Everything you need to know about setting up and running Vendorzo for your business.
        </p>
      </div>

      <div className="rounded-[2rem] border border-border/50 bg-muted/10 p-4 sm:p-8 shadow-xs animate-vendorzo-fade-up" style={{ animationDelay: "120ms" }}>
        <Accordion className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/30 last:border-0 px-2 py-1">
              <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary transition-colors hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6 pr-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
