import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { ContactForm } from "@/components/sections/ContactForm";
import { DataViz } from "@/components/sections/DataViz";
import { CTABand } from "@/components/sections/CTABand";

export const metadata: Metadata = {
  title: "Mapengo Innovations — South African Digital Agency",
  description:
    "Premium South African digital agency. We build fast websites, powerful apps and smart business systems for growing South African businesses.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <CaseStudies />
      <DataViz />
      <CTABand />
      <Testimonials />
      <BlogPreview />
      <ContactForm />
    </>
  );
}

