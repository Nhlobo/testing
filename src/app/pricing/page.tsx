import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { pricingTiers } from "@/lib/data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for South African businesses. Web development, mobile apps and business systems.",
};

export default function PricingPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal/10 border border-teal/20 text-teal text-sm font-medium mb-4">
              Pricing
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
              Transparent{" "}
              <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-gray-500 text-xl max-w-2xl mx-auto">
              No hidden fees. No surprises. Just great digital products at fair South African prices.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingTiers.map((tier, i) => (
              <AnimatedSection key={tier.id} delay={i * 0.1}>
                <div
                  className={cn(
                    "flex flex-col p-8 rounded-2xl border h-full",
                    tier.highlighted
                      ? "bg-white border-accent/40 shadow-lg scale-105"
                      : "bg-white border-gray-200"
                  )}
                >
                  {tier.highlighted && (
                    <div className="text-center mb-6">
                      <span className="px-4 py-1 rounded-full bg-accent text-white text-xs font-bold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h2>
                  <div className="mb-4">
                    <span className="text-4xl font-extrabold text-gray-900">{tier.price}</span>
                    {tier.price !== "Custom" && (
                      <span className="text-gray-400 text-sm ml-1">starting from</span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm mb-6">{tier.description}</p>

                  <ul className="space-y-3 flex-1 mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-gray-600">
                        <svg
                          className="w-5 h-5 text-teal shrink-0 mt-0.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="m20 6-11 11-5-5" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className={cn(
                      "w-full text-center py-3.5 rounded-xl font-semibold transition-all",
                      tier.highlighted
                        ? "bg-accent text-white hover:bg-accent-dark shadow-sm"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                    )}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-16 text-center">
            <p className="text-gray-400 text-sm">
              All prices are in South African Rand (ZAR) and exclude VAT.{" "}
              <Link href="/contact" className="text-accent hover:underline">
                Contact us
              </Link>{" "}
              for a custom quote.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
