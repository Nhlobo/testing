import type { Metadata } from "next";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { services } from "@/lib/data";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import {
  Globe,
  Smartphone,
  LayoutDashboard,
  Palette,
  Server,
  BarChart3,
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
  title: "Services — Web, Mobile & Digital Strategy",
  description:
    "Web development, mobile apps, business systems, UI/UX design, DevOps and digital strategy — end-to-end digital services built for South African businesses.",
};

export default function ServicesPage() {
  return (
    <div className="pt-24">
      {/* Page hero */}
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

      {/* Services — detailed cards */}
      <section className="section-padding bg-gray-50/60">
        <div className="container-custom space-y-6">
          {services.map((service, i) => {
            const Icon = SERVICE_ICONS[service.icon] ?? Globe;
            return (
              <AnimatedSection
                key={service.id}
                delay={i * 0.08}
                id={service.id}
                className="group p-8 rounded-2xl bg-white border border-gray-200/80 hover:border-accent/30 transition-all hover:shadow-[0_8px_24px_0_rgb(0,0,0,0.08)]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_1fr] gap-8 items-start">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-accent group-hover:bg-orange-50 group-hover:border-accent/20 transition-colors shrink-0">
                    <Icon size={24} strokeWidth={1.75} />
                  </div>

                  {/* Description & tech */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h2>
                    <p className="text-gray-500 leading-relaxed mb-4">{service.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {service.features.map((f) => (
                        <span
                          key={f}
                          className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      Key Benefits
                    </p>
                    <ul className="space-y-2">
                      {service.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle
                            size={15}
                            className="text-teal shrink-0 mt-0.5"
                            strokeWidth={2}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-dark transition-colors mt-5"
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
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark transition-all shadow-sm"
              >
                Book a Free Call
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all"
              >
                View Our Work
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

