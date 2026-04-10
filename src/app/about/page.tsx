import type { Metadata } from "next";
import Link from "next/link";
import { Flag, Zap, ShieldCheck, Handshake, ArrowRight, CheckCircle } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { teamMembers, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us — Our Story, Mission & Team",
  description:
    "Learn about Mapengo Innovations — a South African digital agency building high-performance web apps, mobile apps and business systems for growing businesses.",
};

const techStack = [
  { category: "Frontend", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { category: "Mobile", skills: ["React Native", "Expo", "iOS", "Android"] },
  { category: "Backend", skills: ["Node.js", "Python", "REST APIs", "GraphQL", "PostgreSQL"] },
  { category: "Cloud & DevOps", skills: ["AWS", "Vercel", "Docker", "CI/CD", "GitHub Actions"] },
  { category: "Design", skills: ["Figma", "Design Systems", "Usability Testing", "Prototyping"] },
  { category: "Analytics", skills: ["GA4", "Hotjar", "Sentry", "Performance Monitoring"] },
];

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
                    className="p-6 rounded-xl bg-gray-50 border border-gray-200 text-center hover:border-teal/30 transition-colors"
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

      {/* Mission & Vision */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection direction="left">
              <div className="h-full p-8 md:p-10 rounded-2xl bg-white border border-gray-200">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-5">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">
                  Our <span className="gradient-text">Mission</span>
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  To democratise access to world-class digital technology for South African businesses
                  of all sizes — helping them compete locally and globally with tools that actually work
                  in the South African context.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="h-full p-8 md:p-10 rounded-2xl bg-gray-900 border border-gray-800">
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-5">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
                  Our <span className="text-accent">Vision</span>
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  To be the most trusted digital partner for South African SMEs — recognised not just
                  for the quality of our code, but for the measurable growth we enable for every
                  client we work with.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Skills & Technologies */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal/10 border border-teal/20 text-teal text-sm font-medium mb-4">
              Our Stack
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Skills &{" "}
              <span className="gradient-text">Technologies</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              We stay current with modern technology to deliver fast, maintainable and scalable
              digital products.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {techStack.map((stack, i) => (
              <AnimatedSection key={stack.category} delay={i * 0.08}>
                <div className="p-6 rounded-xl bg-gray-50 border border-gray-200 hover:border-teal/30 hover:-translate-y-0.5 transition-all duration-300">
                  <h3 className="text-gray-900 font-bold text-sm uppercase tracking-wider mb-4">
                    {stack.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {stack.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 text-xs font-medium"
                      >
                        <CheckCircle size={10} className="text-teal shrink-0" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4">
              Our Team
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Meet the <span className="gradient-text">Team</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              A small, tight-knit team of South African engineers and designers who care deeply about
              craft and client outcomes.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, i) => (
              <AnimatedSection key={member.id} delay={i * 0.1}>
                <div className="p-6 rounded-xl bg-white border border-gray-200 hover:border-teal/30 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
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
                        aria-label={`${member.name} on GitHub`}
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
                        aria-label={`${member.name} on LinkedIn`}
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
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Let's Work Together
            </h2>
            <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
              We'd love to learn about your business and explore how we can help you grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark transition-all shadow-sm"
              >
                Get in Touch
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all"
              >
                View Our Work
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

