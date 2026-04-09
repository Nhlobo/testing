import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { blogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical insights on web development, mobile apps and digital strategy for South African businesses.",
};

export default function BlogPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <AnimatedSection className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal/10 border border-teal/20 text-teal text-sm font-medium mb-4">
              Insights
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
              The Mapengo{" "}
              <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-gray-500 text-xl leading-relaxed">
              Practical guides, tutorials and insights on building digital products for South
              Africa.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Posts */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <AnimatedSection key={post.id} delay={i * 0.1}>
                <article className="group flex flex-col h-full p-6 rounded-xl bg-white border border-gray-200 hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold">
                      {post.tag}
                    </span>
                    <span className="text-gray-400 text-xs">{post.readTime} min read</span>
                  </div>

                  <h2 className="text-gray-900 font-bold text-xl leading-snug mb-3 group-hover:text-accent transition-colors flex-1">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{post.excerpt}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                    <time className="text-gray-400 text-xs" dateTime={post.date}>
                      {formatDate(post.date)}
                    </time>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs font-semibold text-accent hover:text-accent-dark transition-colors"
                    >
                      Read article →
                    </Link>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
