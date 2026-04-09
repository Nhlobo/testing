"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { blogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function BlogPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const preview = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="section-padding bg-navy-950">
      <div className="container-custom">
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4">
              Insights
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              From Our{" "}
              <span className="gradient-text">Blog</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl">
              Practical insights on building digital products for the South African market.
            </p>
          </div>
          <Link
            href="/blog"
            className="shrink-0 inline-flex items-center gap-2 text-accent font-semibold hover:text-accent-light transition-colors"
          >
            View all articles
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </AnimatedSection>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {preview.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col p-6 rounded-xl bg-navy-800 border border-navy-700 hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5"
            >
              {/* Tag & read time */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold">
                  {post.tag}
                </span>
                <span className="text-slate-500 text-xs">{post.readTime} min read</span>
              </div>

              <h3 className="text-white font-bold text-lg leading-snug mb-3 group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">{post.excerpt}</p>

              <div className="flex items-center justify-between pt-4 border-t border-navy-700">
                <time className="text-slate-500 text-xs" dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-semibold text-accent hover:text-accent-light transition-colors"
                >
                  Read more →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
