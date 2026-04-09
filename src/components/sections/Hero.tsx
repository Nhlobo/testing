"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket, TrendingUp, Zap, Globe, ArrowRight } from "lucide-react";
import { stats, siteConfig } from "@/lib/data";

// Map icon name string → Lucide component
const STAT_ICONS: Record<string, React.ElementType> = {
  Rocket,
  TrendingUp,
  Zap,
  Globe,
};

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
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#374151 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Soft accent glow top-right */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-gradient-to-bl from-orange-50/80 via-transparent to-transparent -translate-y-1/4 translate-x-1/4 pointer-events-none" />

      <div className="container-custom relative z-10 py-32 md:py-40">
        <div className="max-w-4xl">
          {/* Tag line badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-accent text-sm font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              South African Digital Agency
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold text-gray-900 leading-[1.08] tracking-tight mb-6"
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
            className="flex flex-col sm:flex-row gap-3 mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-dark transition-all shadow-sm hover:shadow-md"
            >
              Start Your Project
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold text-sm hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              View Our Work
            </Link>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {stats.map((stat) => {
              const Icon = STAT_ICONS[stat.icon];
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-start p-5 rounded-xl bg-gray-50/80 border border-gray-200/80"
                >
                  {Icon && (
                    <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center mb-3 text-accent">
                      <Icon size={16} strokeWidth={2} />
                    </div>
                  )}
                  <span className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-none tabular-nums">
                    {stat.value.startsWith("R") ? (
                      <>
                        R<AnimatedCounter target={stat.numericValue} suffix="M+" />
                      </>
                    ) : (
                      <AnimatedCounter target={stat.numericValue} suffix={stat.suffix} />
                    )}
                  </span>
                  <span className="text-gray-500 text-xs mt-1.5 font-medium">{stat.label}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25">
        <span className="text-xs text-gray-400 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-400 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
