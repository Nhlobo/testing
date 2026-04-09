import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { ContactForm } from "@/components/sections/ContactForm";
import { DataViz } from "@/components/sections/DataViz";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <CaseStudies />
      <DataViz />
      <Testimonials />
      <BlogPreview />
      <ContactForm />
    </>
  );
}
