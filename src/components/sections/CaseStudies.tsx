"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { caseStudies } from "@/lib/data";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function CaseStudies() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="case-studies" className="section-padding bg-navy-950">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4">
            Our Work
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Proven Results for{" "}
            <span className="gradient-text">Real Businesses</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Here's a snapshot of the impact we've delivered for South African businesses across
            multiple industries.
          </p>
        </AnimatedSection>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-xl overflow-hidden bg-navy-800 border border-navy-700 hover:border-teal/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal/5 transition-all duration-300"
            >
              {/* Gradient image placeholder */}
              <div className={`h-48 bg-gradient-to-br ${study.gradient} bg-navy-700 flex items-center justify-center relative`}>
                <div className="text-center px-6">
                  <span className="text-4xl font-extrabold text-white/20 uppercase tracking-widest">
                    {study.client}
                  </span>
                </div>
                {/* Result badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-navy-900/80 backdrop-blur-sm border border-white/10">
                  <span className="text-teal font-bold text-sm">{study.result}</span>
                  <span className="text-slate-400 text-xs ml-1">{study.resultLabel}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    {study.industry}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{study.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{study.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-navy-700 text-slate-400 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={study.href}
                  className="inline-flex items-center gap-1 text-sm font-medium text-teal hover:text-teal-light transition-colors"
                >
                  Read case study
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatedSection className="text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-teal text-teal font-semibold hover:bg-teal hover:text-white transition-all"
          >
            View All Work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
