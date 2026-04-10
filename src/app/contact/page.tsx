import type { Metadata } from "next";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ContactForm } from "@/components/sections/ContactForm";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us — Start Your Project",
  description:
    "Get in touch with Mapengo Innovations. Tell us about your project and we'll respond within 24 hours with a tailored proposal.",
};

export default function ContactPage() {
  return (
    <div className="pt-24">
      {/* Page hero */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <AnimatedSection className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4">
              Contact Us
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
              Let's Build Something{" "}
              <span className="gradient-text">Amazing</span>
            </h1>
            <p className="text-gray-500 text-xl leading-relaxed">
              Have a project in mind? We'd love to hear about it. Send us a message and we'll be
              in touch within 24 hours.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <ContactForm />

      {/* Location info */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="container-custom">
          <AnimatedSection className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500 text-center sm:text-left">
            <span className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent shrink-0">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Based in <strong className="text-gray-900 ml-1">{siteConfig.location}</strong>
            </span>
            <span className="hidden sm:block text-gray-300">·</span>
            <span>Serving clients across South Africa and globally</span>
            <span className="hidden sm:block text-gray-300">·</span>
            <span className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent shrink-0">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Response within <strong className="text-gray-900 ml-1">24 hours</strong>
            </span>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

