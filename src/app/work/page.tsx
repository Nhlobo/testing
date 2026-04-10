import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { caseStudies } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Work — Portfolio & Case Studies",
  description:
    "Explore Mapengo Innovations' portfolio of web apps, mobile apps and business systems delivered for South African businesses. Real projects, measurable results.",
};

export default function WorkPage() {
  return (
    <div className="pt-24">
      {/* Page hero */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <AnimatedSection className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4">
              Our Portfolio
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
              Real Projects,{" "}
              <span className="gradient-text">Real Results</span>
            </h1>
            <p className="text-gray-500 text-xl leading-relaxed">
              From e-commerce platforms to healthcare systems and mobile apps — here's how we've
              helped South African businesses transform through technology.
            </p>
          </AnimatedSection>

          {/* Quick stats bar */}
          <AnimatedSection delay={0.2} className="mt-12 flex flex-wrap gap-8">
            {[
              { value: "50+", label: "Projects Delivered" },
              { value: "6", label: "Industries Served" },
              { value: "95+", label: "Avg Lighthouse Score" },
              { value: "100%", label: "On-time Delivery" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-3xl font-extrabold text-gray-900">{stat.value}</span>
                <span className="text-gray-400 text-sm mt-0.5">{stat.label}</span>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* Portfolio grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
            {caseStudies.map((study, i) => (
              <AnimatedSection
                key={study.id}
                delay={i * 0.08}
                id={study.id}
                className="group flex flex-col rounded-2xl bg-white border border-gray-200 overflow-hidden hover:border-gray-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_0_rgb(0,0,0,0.10)] transition-all duration-300"
              >
                {/* Project visual / thumbnail */}
                <div
                  className={`relative h-52 bg-gradient-to-br ${study.gradient} flex items-center justify-center overflow-hidden`}
                >
                  {/* Decorative grid lines */}
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                  {/* Client monogram */}
                  <div className="relative text-center select-none">
                    <p
                      className="text-6xl font-extrabold tracking-widest uppercase"
                      style={{ color: study.accentColor, opacity: 0.25 }}
                    >
                      {study.client.substring(0, 3)}
                    </p>
                    <p className="text-4xl font-extrabold text-gray-900 mt-1">{study.result}</p>
                    <p className="text-gray-500 text-sm font-medium mt-0.5">{study.resultLabel}</p>
                  </div>
                  {/* Industry badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-600">
                    {study.industry}
                  </span>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/5 transition-colors duration-300" />
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-2 leading-snug">
                    {study.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
                    {study.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                    {study.liveUrl && (
                      <a
                        href={study.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent text-white text-xs font-semibold hover:bg-accent-dark transition-colors"
                        aria-label={`Live demo of ${study.title}`}
                      >
                        <ExternalLink size={13} strokeWidth={2.5} />
                        Live Demo
                      </a>
                    )}
                    {study.githubUrl && (
                      <a
                        href={study.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 text-xs font-semibold hover:border-gray-300 hover:bg-gray-50 transition-colors"
                        aria-label={`GitHub repository for ${study.title}`}
                      >
                        <Github size={13} strokeWidth={2} />
                        GitHub
                      </a>
                    )}
                    <Link
                      href={study.href}
                      className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-teal hover:text-teal-dark transition-colors"
                      aria-label={`Read case study for ${study.title}`}
                    >
                      Case Study
                      <ArrowUpRight size={13} strokeWidth={2.5} />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <AnimatedSection className="relative rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-12 md:p-16 text-center overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-accent/20 blur-3xl rounded-full pointer-events-none" />
            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-4">
                Start a Project
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
                Ready to Be Our Next<br />
                <span className="text-accent">Success Story?</span>
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
                Let's build something remarkable together. Tell us about your project and we'll
                create a tailored proposal within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark transition-all shadow-sm"
                >
                  Start Your Project
                  <ArrowUpRight size={16} strokeWidth={2.5} />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

