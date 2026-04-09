"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function BlogPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const preview = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="section-padding bg-white">
      <div className="container-custom">
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4">
              Insights
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
              From Our{" "}
              <span className="gradient-text">Blog</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl">
              Practical insights on building digital products for the South African market.
            </p>
          </div>
          <Link
            href="/blog"
            className="shrink-0 inline-flex items-center gap-2 text-accent font-semibold hover:text-accent-dark transition-colors"
          >
            View all articles
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </AnimatedSection>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {preview.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col p-6 rounded-xl bg-gray-50 border border-gray-200 hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg"
            >
              {/* Tag & read time */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold">
                  {post.tag}
                </span>
                <span className="text-gray-400 text-xs">{post.readTime} min read</span>
              </div>

              <h3 className="text-gray-900 font-bold text-lg leading-snug mb-3 group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{post.excerpt}</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <time className="text-gray-400 text-xs" dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent-dark transition-colors"
                >
                  Read more
                  <ArrowRight size={12} strokeWidth={2.5} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
