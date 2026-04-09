"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

interface DataPoint {
  label: string;
  value: number;
  color: string;
  icon: string;
}

const industryData: DataPoint[] = [
  { label: "Retail & E-com", value: 35, color: "#FF6B35", icon: "🛍️" },
  { label: "Healthcare", value: 20, color: "#00C9A7", icon: "🏥" },
  { label: "Agriculture", value: 15, color: "#4ADE80", icon: "🌾" },
  { label: "Finance", value: 18, color: "#60A5FA", icon: "💼" },
  { label: "Education", value: 12, color: "#A78BFA", icon: "📚" },
];

const growthData: DataPoint[] = [
  { label: "2021", value: 40, color: "#FF6B35", icon: "" },
  { label: "2022", value: 60, color: "#FF6B35", icon: "" },
  { label: "2023", value: 80, color: "#FF6B35", icon: "" },
  { label: "2024", value: 100, color: "#00C9A7", icon: "" },
];

function Bar({ point, maxValue, index, isInView }: {
  point: DataPoint;
  maxValue: number;
  index: number;
  isInView: boolean;
}) {
  const heightPct = (point.value / maxValue) * 100;

  return (
    <div className="flex flex-col items-center gap-2 flex-1">
      <span className="text-xs font-bold text-white">{point.value}%</span>
      <div className="relative w-full flex items-end justify-center" style={{ height: "140px" }}>
        <motion.div
          className="w-full rounded-t-lg max-w-[48px]"
          style={{ backgroundColor: point.color }}
          initial={{ height: 0 }}
          animate={isInView ? { height: `${heightPct}%` } : { height: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
        />
      </div>
      <span className="text-xs text-slate-400 text-center leading-tight">
        {point.icon && <span className="block text-base">{point.icon}</span>}
        {point.label}
      </span>
    </div>
  );
}

export function DataViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="data-viz" className="section-padding bg-navy-900">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal/10 border border-teal/20 text-teal text-sm font-medium mb-4">
            Our Impact
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Delivering Results{" "}
            <span className="gradient-text">By The Numbers</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Our work spans multiple industries with measurable impact across South Africa.
          </p>
        </AnimatedSection>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Industry distribution chart */}
          <div className="p-6 rounded-xl bg-navy-800 border border-navy-700">
            <h3 className="text-white font-bold text-lg mb-6">Projects by Industry</h3>
            <div className="flex items-end gap-3 h-[200px] px-4">
              {industryData.map((point, i) => (
                <Bar
                  key={point.label}
                  point={point}
                  maxValue={Math.max(...industryData.map((d) => d.value))}
                  index={i}
                  isInView={isInView}
                />
              ))}
            </div>
          </div>

          {/* Growth chart */}
          <div className="p-6 rounded-xl bg-navy-800 border border-navy-700">
            <h3 className="text-white font-bold text-lg mb-2">Revenue Growth Trend</h3>
            <p className="text-slate-400 text-sm mb-6">Client revenue enabled (indexed to 2024)</p>
            <div className="flex items-end gap-3 h-[200px] px-4">
              {growthData.map((point, i) => (
                <Bar
                  key={point.label}
                  point={point}
                  maxValue={Math.max(...growthData.map((d) => d.value))}
                  index={i}
                  isInView={isInView}
                />
              ))}
            </div>
          </div>
        </div>

        {/* KPI row */}
        <AnimatedSection delay={0.3}>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "⚡", label: "Avg Lighthouse Score", value: "97" },
              { icon: "📱", label: "Mobile-First Projects", value: "100%" },
              { icon: "🛡️", label: "POPIA Compliant", value: "All" },
              { icon: "⏱️", label: "Avg Time to Launch", value: "8 wks" },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="p-4 rounded-xl bg-navy-800 border border-navy-700 text-center"
              >
                <div className="text-2xl mb-2">{kpi.icon}</div>
                <div className="text-2xl font-extrabold text-white mb-1">{kpi.value}</div>
                <div className="text-xs text-slate-400">{kpi.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
