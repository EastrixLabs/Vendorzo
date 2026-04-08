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
    <section id="features" className="mx-auto w-full max-w-6xl mx-4 py-14 sm:px-6 md:py-20 lg:px-8">
      <div className="mb-8 space-y-3 animate-vendorzo-fade-up">
        <Badge variant="secondary">Built for teams who sell all day</Badge>
        <h2 className="max-w-2xl text-2xl font-semibold sm:text-3xl">
          Purpose-built tooling for day-to-day retail and POS operations.
        </h2>
        <p className="text-muted-foreground max-w-3xl text-sm sm:text-base">
          Vendorzo combines speed at the counter with clarity in reporting, so your team can sell,
          restock, and improve without switching between fragmented tools.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {marketingFeatures.map((feature, index) => (
          <Card
            key={feature.title}
            className="h-full animate-vendorzo-fade-up"
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <span className="bg-muted inline-flex size-8 items-center justify-center rounded-md border">
                  <feature.icon className="text-primary size-4" />
                </span>
                {feature.title}
              </CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Designed to feel fast on desktop and reliable on smaller screens for front-of-house
                teams.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}