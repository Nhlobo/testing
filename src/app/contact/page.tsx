import type { Metadata } from "next";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ContactForm } from "@/components/sections/ContactForm";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Mapengo Innovations for your next digital project.",
};

export default function ContactPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
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
              Have a project in mind? We'd love to hear about it. Send us a message and we'll be in
              touch within 24 hours.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <ContactForm />

      {/* Map / location info */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection className="text-center">
            <p className="text-gray-500">
              📍 Based in{" "}
              <span className="text-gray-900 font-semibold">{siteConfig.location}</span>
              {" — "}
              serving clients across South Africa and globally.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
