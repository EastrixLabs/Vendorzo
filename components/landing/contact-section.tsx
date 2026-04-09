"use client"

import { ArrowRight, Mail, MessageSquare, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

export function ContactSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-16 lg:grid-cols-2 text-center lg:text-left">
          {/* Left Column: Content */}
          <div className="flex flex-col justify-center items-center lg:items-start">
            <Badge variant="outline" className="w-fit mb-6 px-4 py-1.5 border-primary/20 bg-primary/5 text-primary gap-2 transition-colors hover:bg-primary/10">
              <Sparkles className="size-3.5 animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Connect with us</span>
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.1]">
              Ready to <span className="text-primary italic">elevate</span> your retail game?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground/90 max-w-md">
              Whether you're scaling a boutique or managing a national chain, Vendorzo provides the tools you need to thrive.
            </p>

            <div className="mt-10 space-y-6 w-full max-w-sm">
              <div className="group flex items-start gap-4 cursor-default">
                <div className="flex-none rounded-2xl bg-muted p-2.5 transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                  <Mail className="size-6 transition-transform group-hover:scale-110" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground underline decoration-primary/30 underline-offset-4 transition-colors group-hover:text-primary">Direct Email</h3>
                  <p className="mt-1 text-sm text-muted-foreground">hello@vendorzo.app</p>
                </div>
              </div>
              <div className="group flex items-start gap-4 cursor-default">
                <div className="flex-none rounded-2xl bg-muted p-2.5 transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                  <MessageSquare className="size-6 transition-transform group-hover:scale-110" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground underline decoration-primary/30 underline-offset-4 transition-colors group-hover:text-primary">Live Support</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Available Mon-Fri, 9am - 6pm EST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="relative">
            <div className="relative rounded-[2rem] border border-border/60 bg-background/60 p-8 shadow-sm backdrop-blur-sm sm:p-10">
              <form className="space-y-8">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                  <Field>
                    <FieldLabel className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80">
                      Full Name
                    </FieldLabel>
                    <FieldContent>
                      <Input
                        type="text"
                        placeholder="Jean-Luc Picard"
                        className="bg-muted/30 border-none h-12 focus-visible:ring-1 focus-visible:ring-primary/40 transition-all duration-300"
                      />
                    </FieldContent>
                  </Field>
                  <Field>
                    <FieldLabel className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80">
                      Business URL
                    </FieldLabel>
                    <FieldContent>
                      <Input
                        type="url"
                        placeholder="enterprise-ships.com"
                        className="bg-muted/30 border-none h-12 focus-visible:ring-1 focus-visible:ring-primary/40 transition-all duration-300"
                      />
                    </FieldContent>
                  </Field>
                </div>

                <Field>
                  <FieldLabel className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80">
                    Email address
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      type="email"
                      placeholder="captain@starfleet.gov"
                      className="bg-muted/30 border-none h-12 focus-visible:ring-1 focus-visible:ring-primary/40 transition-all duration-300"
                    />
                    <FieldDescription className="text-xs">
                      We'll respond to this email within 24 hours.
                    </FieldDescription>
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80">
                    How can we help?
                  </FieldLabel>
                  <FieldContent>
                    <Textarea
                      placeholder="Tell us about your team and what you're looking for in a POS..."
                      className="bg-muted/30 border-none min-h-[120px] focus-visible:ring-1 focus-visible:ring-primary/40 transition-all duration-300 resize-none"
                    />
                  </FieldContent>
                </Field>

                <Button size="lg" className="w-full rounded-2xl h-14 text-base font-semibold transition-all duration-300 group">
                  Send Message
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Button>

                <p className="text-center text-xs text-muted-foreground mt-4">
                  By submitting this form, you agree to our <span className="underline cursor-pointer hover:text-foreground">Privacy Policy</span>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
