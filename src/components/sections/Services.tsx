"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { services } from "@/lib/data";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

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
    <section id="services" className="section-padding bg-gray-50">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal/10 border border-teal/20 text-teal text-sm font-medium mb-4">
            What We Do
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Services Built for
            <span className="gradient-text"> South Africa</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From concept to launch, we deliver end-to-end digital solutions that perform in the
            South African market.
          </p>
        </AnimatedSection>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className="group relative p-6 rounded-xl bg-white border border-gray-200 hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl mb-5 group-hover:bg-orange-50 transition-colors">
                {service.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">{service.description}</p>

              {/* Feature tags */}
              <div className="flex flex-wrap gap-2 mb-5">
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
                className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-dark transition-colors"
              >
                Learn more
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>

              {/* Hover accent bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-teal rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
