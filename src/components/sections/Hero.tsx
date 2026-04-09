"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { stats, siteConfig } from "@/lib/data";

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#374151 1px, transparent 1px), linear-gradient(90deg, #374151 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Soft accent glow top-right */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-orange-50 via-transparent to-transparent" />

      <div className="container-custom relative z-10 py-32 md:py-40">
        <div className="max-w-4xl">
          {/* Tag line badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-accent text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              South African Digital Agency
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            We Build{" "}
            <span className="gradient-text">Digital Products</span>
            <br />
            That Drive Growth
          </motion.h1>

          {/* Sub-heading */}
          <motion.p
            className="text-lg md:text-xl text-gray-500 max-w-2xl mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {siteConfig.subTagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent text-white font-semibold text-base hover:bg-accent-dark transition-all shadow-sm hover:shadow-md"
            >
              Start Your Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold text-base hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              View Our Work
            </Link>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-start p-4 rounded-xl bg-gray-50 border border-gray-200"
              >
                <span className="text-2xl mb-1">{stat.icon}</span>
                <span className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-none">
                  {stat.value.startsWith("R") ? (
                    <>
                      R<AnimatedCounter target={stat.numericValue} suffix="M+" />
                    </>
                  ) : (
                    <AnimatedCounter target={stat.numericValue} suffix={stat.suffix} />
                  )}
                </span>
                <span className="text-gray-500 text-sm mt-1">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="text-xs text-gray-400 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-400 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
