import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="pt-24">
      <article className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors mb-8"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Blog
          </Link>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold">
              {post.tag}
            </span>
            <span className="text-gray-400 text-xs">{post.readTime} min read</span>
            <time className="text-gray-400 text-xs" dateTime={post.date}>
              {formatDate(post.date)}
            </time>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-8 border-l-4 border-accent pl-4 italic">
            {post.excerpt}
          </p>

          {/* Content */}
          <div className="prose prose-gray prose-lg max-w-none">
            {post.content.split("\n").map((line, i) => {
              if (line.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                    {line.replace("## ", "")}
                  </h2>
                );
              }
              if (line.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-xl font-semibold text-gray-900 mt-8 mb-3">
                    {line.replace("### ", "")}
                  </h3>
                );
              }
              if (line.startsWith("- [ ] ")) {
                return (
                  <div key={i} className="flex items-center gap-2 text-gray-600 mb-2">
                    <span className="w-4 h-4 border border-gray-300 rounded shrink-0" />
                    {line.replace("- [ ] ", "")}
                  </div>
                );
              }
              if (line.startsWith("- ")) {
                return (
                  <li key={i} className="text-gray-600 mb-1 ml-4 list-disc">
                    {line.replace("- ", "")}
                  </li>
                );
              }
              if (line.trim() === "") return <br key={i} />;
              return (
                <p key={i} className="text-gray-600 leading-relaxed mb-4">
                  {line}
                </p>
              );
            })}
          </div>

          {/* Author */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-teal flex items-center justify-center text-white font-bold">
              MI
            </div>
            <div>
              <p className="text-gray-900 font-semibold">{post.author}</p>
              <p className="text-gray-400 text-sm">Mapengo Innovations</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 rounded-2xl bg-gray-50 border border-gray-200 text-center">
            <h3 className="text-gray-900 font-bold text-xl mb-3">Ready to Apply This to Your Business?</h3>
            <p className="text-gray-500 mb-6">
              Let's talk about how we can help you build better digital products.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
