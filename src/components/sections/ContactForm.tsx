"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { siteConfig } from "@/lib/data";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const serviceOptions = [
  "Web Development",
  "Mobile App",
  "Business System",
  "UI/UX Design",
  "DevOps & Cloud",
  "Digital Strategy",
  "Other",
];

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (formData.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      // POST to Formspree — replace YOUR_FORM_ID with your actual Formspree form ID
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  const inputClass = (hasError?: string) =>
    `w-full px-4 py-3 rounded-lg bg-white border ${
      hasError ? "border-red-400" : "border-gray-200"
    } text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-accent transition-colors`;

  return (
    <section id="contact" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Info side */}
          <AnimatedSection direction="left">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4">
              Get in Touch
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Ready to Start Your{" "}
              <span className="gradient-text">Project?</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              Tell us about your project and we'll get back to you within 24 hours with a
              tailored proposal.
            </p>

            <div className="space-y-4">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-200 hover:border-accent/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">Email</p>
                  <p className="text-gray-900 text-sm font-medium group-hover:text-accent transition-colors">
                    {siteConfig.email}
                  </p>
                </div>
              </a>

              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-200 hover:border-accent/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.65 5.65l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16h.92z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">Phone</p>
                  <p className="text-gray-900 text-sm font-medium group-hover:text-accent transition-colors">
                    {siteConfig.phone}
                  </p>
                </div>
              </a>

              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-200 hover:border-green-400/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">WhatsApp</p>
                  <p className="text-gray-900 text-sm font-medium group-hover:text-green-600 transition-colors">
                    Chat with us
                  </p>
                </div>
              </a>
            </div>
          </AnimatedSection>

          {/* Form side */}
          <AnimatedSection direction="right">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="p-8 rounded-2xl bg-white border border-gray-200"
            >
              <h3 className="text-gray-900 font-bold text-xl mb-6">Send Us a Message</h3>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-700 font-medium mb-1.5">
                    Full Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Thabo Nkosi"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass(errors.name)}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-700 font-medium mb-1.5">
                    Email Address <span className="text-accent">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.co.za"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass(errors.email)}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Phone (optional) */}
                <div>
                  <label htmlFor="phone" className="block text-sm text-gray-700 font-medium mb-1.5">
                    Phone Number{" "}
                    <span className="text-gray-400 text-xs font-normal">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+27 66 552 0197"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClass()}
                  />
                </div>

                {/* Service */}
                <div>
                  <label htmlFor="service" className="block text-sm text-gray-700 font-medium mb-1.5">
                    Service Needed
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`${inputClass()} appearance-none cursor-pointer`}
                  >
                    <option value="">Select a service…</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm text-gray-700 font-medium mb-1.5">
                    Message <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us about your project…"
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputClass(errors.message)} resize-none`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                  )}
                </div>
              </div>

              {/* Success / Error messages */}
              {status === "success" && (
                <div className="mt-4 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
                  ✅ Message sent! We'll get back to you within 24 hours.
                </div>
              )}
              {status === "error" && (
                <div className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                  ❌ Something went wrong. Please try again or email us directly.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
              >
                {status === "loading" ? (
                  <>
                    <svg
                      className="animate-spin w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  "Send Message"
                )}
              </button>

              <p className="mt-4 text-center text-gray-400 text-xs">
                We respect your privacy. No spam, ever.
              </p>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
