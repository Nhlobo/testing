import type { Metadata } from "next";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { services } from "@/lib/data";
import Link from "next/link";
import {
  Globe,
  Smartphone,
  LayoutDashboard,
  Palette,
  Server,
  BarChart3,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  Globe,
  Smartphone,
  LayoutDashboard,
  Palette,
  Server,
  BarChart3,
};

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, mobile apps, business systems, UI/UX design, DevOps and digital strategy — built for South African businesses.",
};

export default function ServicesPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <AnimatedSection className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-teal/10 border border-teal/20 text-teal text-sm font-medium mb-4">
              Our Services
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
              End-to-End{" "}
              <span className="gradient-text">Digital Services</span>
            </h1>
            <p className="text-gray-500 text-xl leading-relaxed">
              From strategy to launch and beyond, we deliver digital solutions that perform in the
              South African market.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services grid */}
      <section className="section-padding bg-gray-50/60">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => {
              const Icon = SERVICE_ICONS[service.icon] ?? Globe;
              return (
                <AnimatedSection
                  key={service.id}
                  delay={i * 0.1}
                  id={service.id}
                  className="p-8 rounded-2xl bg-white border border-gray-200/80 hover:border-accent/30 transition-all group hover:shadow-[0_8px_24px_0_rgb(0,0,0,0.08)]"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-accent shrink-0 group-hover:bg-orange-50 group-hover:border-accent/20 transition-colors">
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h2>
                      <p className="text-gray-500 leading-relaxed mb-4">{service.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {service.features.map((f) => (
                          <span
                            key={f}
                            className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
                      >
                        Start this project
                        <ArrowRight size={14} strokeWidth={2.5} />
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-gray-500 text-lg mb-8 max-w-2xl mx-auto">
              Book a free 30-minute discovery call and we'll help you figure out the best approach
              for your goals.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark transition-all shadow-sm"
            >
              Book a Free Call
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
