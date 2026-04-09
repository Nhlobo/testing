"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Smartphone, ShieldCheck, Clock } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

interface DataPoint {
  label: string;
  value: number;
  color: string;
}

const industryData: DataPoint[] = [
  { label: "Retail & E-com", value: 35, color: "#FF6B35" },
  { label: "Healthcare", value: 20, color: "#00C9A7" },
  { label: "Agriculture", value: 15, color: "#4ADE80" },
  { label: "Finance", value: 18, color: "#60A5FA" },
  { label: "Education", value: 12, color: "#A78BFA" },
];

const growthData: DataPoint[] = [
  { label: "2021", value: 40, color: "#FF6B35" },
  { label: "2022", value: 60, color: "#FF6B35" },
  { label: "2023", value: 80, color: "#FF6B35" },
  { label: "2024", value: 100, color: "#00C9A7" },
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
      <span className="text-xs font-bold text-gray-700">{point.value}%</span>
      <div className="relative w-full flex items-end justify-center" style={{ height: "140px" }}>
        <motion.div
          className="w-full rounded-t-lg max-w-[48px]"
          style={{ backgroundColor: point.color }}
          initial={{ height: 0 }}
          animate={isInView ? { height: `${heightPct}%` } : { height: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
        />
      </div>
      <span className="text-xs text-gray-500 text-center leading-tight">
        {point.label}
      </span>
    </div>
  );
}

const kpiItems = [
  { Icon: Zap, label: "Avg Lighthouse Score", value: "97" },
  { Icon: Smartphone, label: "Mobile-First Projects", value: "100%" },
  { Icon: ShieldCheck, label: "POPIA Compliant", value: "All" },
  { Icon: Clock, label: "Avg Time to Launch", value: "8 wks" },
];

export function DataViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="data-viz" className="section-padding bg-gray-50/60">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-teal/10 border border-teal/20 text-teal text-sm font-medium mb-4">
            Our Impact
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Delivering Results{" "}
            <span className="gradient-text">By The Numbers</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Our work spans multiple industries with measurable impact across South Africa.
          </p>
        </AnimatedSection>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Industry distribution chart */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200/80">
            <h3 className="text-gray-900 font-bold text-lg mb-6">Projects by Industry</h3>
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
          <div className="p-6 rounded-2xl bg-white border border-gray-200/80">
            <h3 className="text-gray-900 font-bold text-lg mb-2">Revenue Growth Trend</h3>
            <p className="text-gray-400 text-sm mb-6">Client revenue enabled (indexed to 2024)</p>
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
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {kpiItems.map(({ Icon, label, value }) => (
              <div
                key={label}
                className="p-5 rounded-2xl bg-white border border-gray-200/80 text-center"
              >
                <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center mx-auto mb-3 text-accent">
                  <Icon size={18} strokeWidth={1.75} />
                </div>
                <div className="text-2xl font-extrabold text-gray-900 mb-1 tabular-nums">{value}</div>
                <div className="text-xs text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
