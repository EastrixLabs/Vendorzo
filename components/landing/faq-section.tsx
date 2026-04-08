"use client"

import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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
    <section className="mx-auto w-full max-w-6xl mx-4 py-14 sm:px-6 md:py-20 lg:px-8">
      <div className="mb-8 text-center animate-vendorzo-fade-up">
        <Badge variant="secondary" className="mb-3">
          FAQ
        </Badge>
        <h2 className="text-3xl font-bold tracking-tight">Common questions</h2>
      </div>

      <Accordion className="w-full animate-vendorzo-fade-up" style={{ animationDelay: "120ms" }}>
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left text-base font-semibold">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
