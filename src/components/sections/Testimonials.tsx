"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { testimonials } from "@/lib/data";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < rating ? "#FF6B35" : "none"}
          stroke="#FF6B35"
          strokeWidth="1.5"
          className={i < rating ? "text-accent" : "text-slate-600"}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="testimonials" className="section-padding bg-navy-900">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal/10 border border-teal/20 text-teal text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            What Our{" "}
            <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Don't just take our word for it — hear from the businesses we've helped grow.
          </p>
        </AnimatedSection>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex flex-col p-6 rounded-xl bg-navy-800 border border-navy-700 hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5"
            >
              {/* Quote mark */}
              <div className="text-5xl text-accent/20 font-serif leading-none mb-4 select-none">
                "
              </div>

              <StarRating rating={testimonial.rating} />
              <p className="text-slate-300 text-sm leading-relaxed my-4 flex-1 italic">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-navy-700">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-teal flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-slate-400 text-xs">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
