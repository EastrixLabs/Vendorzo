"use client"

import { ArrowRight, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactSection() {
  return (
    <section className="mx-auto w-full max-w-6xl mx-4 border-t py-16 sm:py-24">
      <div className="rounded-[2rem] border border-white/10 bg-background/80 px-4 py-10 shadow-xl shadow-black/10 backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="bg-primary/10 inline-flex size-16 items-center justify-center rounded-3xl mb-6">
            <Mail className="size-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to streamline your storefront?
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Share your business details and we’ll connect you with a demo tailored to your retail workflow.
          </p>
        </div>

        <form className="mt-12 grid gap-6 md:grid-cols-[1fr_320px]">
          <div className="space-y-5">
            <Field>
              <FieldLabel>Email address</FieldLabel>
              <FieldContent>
                <Input type="email" placeholder="you@company.com" />
                <FieldDescription>We’ll only use this to reach out about your demo.</FieldDescription>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Company name</FieldLabel>
              <FieldContent>
                <Input type="text" placeholder="Vendor Store Co." />
                <FieldDescription>Use your legal or storefront name.</FieldDescription>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>What would you like to discuss?</FieldLabel>
              <FieldContent>
                <Textarea placeholder="Tell us about your store size, team, and goals." />
                <FieldDescription>Short note for the sales team.</FieldDescription>
              </FieldContent>
            </Field>
          </div>

          <div className="rounded-[1.5rem] border border-border/80 bg-muted/40 p-6 shadow-lg shadow-black/10">
            <h3 className="text-xl font-semibold">Book a live demo</h3>
            <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
              Demo sessions include a walkthrough of product setup, checkout flows, and reporting so your team can evaluate Vendorzo quickly.
            </p>
            <div className="mt-8 flex flex-col gap-4">
              <Button size="lg" className="rounded-full h-12 px-8">
                Contact Sales
                <ArrowRight className="size-4" />
              </Button>
              <p className="text-muted-foreground text-sm">
                Prefer to explore first? We’ll follow up with next steps and a tailored agenda.
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
