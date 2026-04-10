import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/data";

export function CTABand() {
  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal/20 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="text-center lg:text-left max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/70 text-sm font-medium mb-4">
              Ready to Get Started?
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
              Let's Work Together to Build
              <br />
              <span className="text-accent">Something That Drives Growth</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Tell us about your project. We'll respond within 24 hours with a tailored proposal —
              no generic quotes, no long sales calls.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark transition-all shadow-sm whitespace-nowrap"
            >
              Start a Project
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all whitespace-nowrap"
            >
              <MessageCircle size={16} strokeWidth={2} />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
