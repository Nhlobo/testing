import type { Metadata } from "next";
import Link from "next/link";
import { Flag, Zap, ShieldCheck, Handshake, ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { teamMembers, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Mapengo Innovations — a South African digital agency building high-performance digital products.",
};

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-teal/10 border border-teal/20 text-teal text-sm font-medium mb-4">
                About Us
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
                Built in South Africa,{" "}
                <span className="gradient-text">Built for Growth</span>
              </h1>
              <p className="text-gray-500 text-xl leading-relaxed mb-6">
                Mapengo Innovations is a Johannesburg-based digital agency that builds premium web
                and mobile products for South African businesses ready to grow.
              </p>
              <p className="text-gray-500 leading-relaxed">
                We understand the unique challenges of the South African market — from load shedding
                to mobile-first users and POPIA compliance — and we build products that are resilient,
                fast and effective in this context.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { Icon: Flag, label: "South African", desc: "100% local team" },
                  { Icon: Zap, label: "Fast", desc: "95+ Lighthouse avg" },
                  { Icon: ShieldCheck, label: "Compliant", desc: "POPIA by default" },
                  { Icon: Handshake, label: "Committed", desc: "Long-term partners" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-6 rounded-xl bg-gray-50 border border-gray-200 text-center"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center mx-auto mb-3 text-accent">
                      <item.Icon size={20} strokeWidth={1.75} />
                    </div>
                    <p className="text-gray-900 font-bold">{item.label}</p>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Our <span className="gradient-text">Mission</span>
            </h2>
            <p className="text-gray-600 text-xl leading-relaxed">
              To democratise access to world-class digital technology for South African businesses
              of all sizes — helping them compete locally and globally with tools that actually work
              in the South African context.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Meet the <span className="gradient-text">Team</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, i) => (
              <AnimatedSection key={member.id} delay={i * 0.1}>
                <div className="p-6 rounded-xl bg-gray-50 border border-gray-200 hover:border-teal/30 transition-all">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-teal flex items-center justify-center text-white font-bold text-xl mb-4">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <h3 className="text-gray-900 font-bold text-lg mb-1">{member.name}</h3>
                  <p className="text-accent text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{member.bio}</p>
                  <div className="flex items-center gap-3">
                    {member.github && (
                      <a
                        href={`https://github.com/${member.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-700 transition-colors"
                        aria-label="GitHub"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={siteConfig.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-accent transition-colors"
                        aria-label="LinkedIn"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Ready to Work With Us?
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark transition-all shadow-sm"
            >
              Get in Touch
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
