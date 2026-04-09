import { marketingFeatures } from "@/components/landing/content"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function FeaturesGrid() {
  return (
    <section id="features" className="mx-auto w-full max-w-6xl px-6 lg:px-8 py-24 sm:py-32">
      <div className="mb-16 space-y-4 animate-vendorzo-fade-up text-center md:text-left flex flex-col md:items-start items-center">
        <Badge variant="outline" className="px-4 py-1.5 text-xs tracking-widest uppercase font-semibold text-primary/70 border-primary/20 bg-primary/5 shadow-xs">
          Built for teams who sell all day
        </Badge>
        <h2 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl leading-[1.1]">
          Purpose-built tooling for day-to-day <span className="text-primary italic">retail</span> operations.
        </h2>
        <p className="text-muted-foreground/90 max-w-2xl text-lg mt-2">
          Vendorzo combines speed at the counter with clarity in reporting, so your team can sell,
          restock, and improve without switching between fragmented tools.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {marketingFeatures.map((feature, index) => (
          <Card
            key={feature.title}
            className="h-full animate-vendorzo-fade-up group relative overflow-hidden border-border/50 shadow-xs hover:border-primary/20 transition-all duration-300"
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <CardHeader className="relative z-10">
              <span className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-muted/40 shadow-xs border border-border/50 text-foreground transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/5 group-hover:border-primary/20 group-hover:text-primary">
                <feature.icon className="size-5" />
              </span>
              <CardTitle className="text-xl font-semibold tracking-tight">
                {feature.title}
              </CardTitle>
              <CardDescription className="text-base mt-2 leading-relaxed">
                {feature.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 text-muted-foreground/80 text-sm">
              <p>Designed to feel fast on desktop and reliable on smaller screens for front-of-house teams.</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}