"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
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
import { services } from "@/lib/data";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  Globe,
  Smartphone,
  LayoutDashboard,
  Palette,
  Server,
  BarChart3,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="services" className="section-padding bg-gray-50/60">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-teal/10 border border-teal/20 text-teal text-sm font-medium mb-4">
            What We Do
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Services Built for
            <span className="gradient-text"> South Africa</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            From concept to launch, we deliver end-to-end digital solutions that perform in the
            South African market.
          </p>
        </AnimatedSection>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((service) => {
            const Icon = SERVICE_ICONS[service.icon] ?? Globe;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="group relative flex flex-col p-6 rounded-2xl bg-white border border-gray-200/80 hover:border-accent/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_0_rgb(0,0,0,0.08)]"
              >
                {/* Icon */}
                <div className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center mb-5 text-accent group-hover:bg-orange-50 group-hover:border-accent/20 transition-colors">
                  <Icon size={20} strokeWidth={1.75} />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{service.description}</p>

                {/* Feature tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <Link
                  href={service.href}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-dark transition-colors mt-auto"
                >
                  Learn more
                  <ArrowRight size={14} strokeWidth={2.5} />
                </Link>

                {/* Hover accent bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-teal rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
