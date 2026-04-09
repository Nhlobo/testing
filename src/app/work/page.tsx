import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { caseStudies } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Case studies and projects delivered by Mapengo Innovations for South African businesses.",
};

export default function WorkPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <AnimatedSection className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4">
              Case Studies
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
              Our{" "}
              <span className="gradient-text">Work</span>
            </h1>
            <p className="text-gray-500 text-xl leading-relaxed">
              Real projects, real results. Here's how we've helped South African businesses grow
              through technology.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Case studies */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom space-y-12">
          {caseStudies.map((study, i) => (
            <AnimatedSection
              key={study.id}
              delay={i * 0.1}
              id={study.id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 rounded-2xl bg-white border border-gray-200"
            >
              {/* Visual side */}
              <div
                className={`h-64 rounded-xl bg-gradient-to-br ${study.gradient} bg-gray-100 flex items-center justify-center ${i % 2 === 1 ? "lg:order-2" : ""}`}
              >
                <div className="text-center px-6">
                  <p className="text-6xl font-extrabold text-gray-900/10 uppercase tracking-widest">
                    {study.client}
                  </p>
                  <p className="text-4xl font-extrabold text-teal mt-2">{study.result}</p>
                  <p className="text-gray-500 text-sm">{study.resultLabel}</p>
                </div>
              </div>

              {/* Content side */}
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {study.industry}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 mb-4">
                  {study.title}
                </h2>
                <p className="text-gray-500 leading-relaxed mb-5">{study.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <span className="text-2xl font-extrabold text-teal">{study.result}</span>
                  <span className="text-gray-600 text-sm">{study.resultLabel}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Ready to Be Our Next Success Story?
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark transition-all shadow-sm"
            >
              Start Your Project
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
