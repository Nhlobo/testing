"use client";

/**
 * Members Area — Password-gated page.
 *
 * Gating approach:
 * - A password form is shown initially.
 * - On correct password entry, a token is saved to localStorage.
 * - On mount, if the token exists, the gated content is shown immediately.
 * - The password check is client-side (suitable for lightweight content gating).
 * - For production, replace with a proper auth solution (NextAuth, Clerk, etc.).
 *
 * Demo password: "members2024"
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Lock,
  BarChart3,
  ShieldCheck,
  Zap,
  Smartphone,
  Rocket,
  Mail,
  ArrowRight,
  Download,
  CheckCircle,
  XCircle,
} from "lucide-react";

const MEMBERS_TOKEN_KEY = "mi_members_token";
// In production, use an environment variable and server-side validation
const MEMBERS_PASSWORD = "members2024";

function MembersContent() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 p-5 rounded-xl bg-teal/5 border border-teal/20">
        <div className="w-9 h-9 rounded-xl bg-teal/10 flex items-center justify-center text-teal shrink-0">
          <CheckCircle size={18} strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-gray-900 font-bold text-base">Welcome, Member!</h2>
          <p className="text-gray-500 text-sm">
            You have exclusive access to the resources below.
          </p>
        </div>
      </div>

      {/* Resource downloads */}
      <section>
        <h3 className="text-gray-900 font-bold text-lg mb-4">Downloads</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "South African Digital Market Report 2024",
              desc: "50-page in-depth analysis of SA digital trends",
              size: "4.2 MB PDF",
              Icon: BarChart3,
            },
            {
              title: "POPIA Compliance Checklist for Web Apps",
              desc: "Developer-ready checklist for POPIA compliance",
              size: "1.1 MB PDF",
              Icon: ShieldCheck,
            },
            {
              title: "Next.js Performance Optimization Guide",
              desc: "Our internal playbook for 95+ Lighthouse scores",
              size: "2.8 MB PDF",
              Icon: Zap,
            },
            {
              title: "React Native Offline-First Template",
              desc: "Starter template with SQLite and sync engine",
              size: "GitHub Repository",
              Icon: Smartphone,
            },
          ].map((resource) => (
            <div
              key={resource.title}
              className="flex items-start gap-4 p-5 rounded-xl bg-white border border-gray-200 hover:border-teal/30 transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-accent shrink-0">
                <resource.Icon size={17} strokeWidth={1.75} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 font-semibold text-sm mb-1">{resource.title}</p>
                <p className="text-gray-500 text-xs mb-2">{resource.desc}</p>
                <span className="text-teal text-xs">{resource.size}</span>
              </div>
              <button
                className="shrink-0 p-2 rounded-lg bg-teal/10 border border-teal/30 text-teal hover:bg-teal hover:text-white transition-all"
                aria-label={`Download ${resource.title}`}
              >
                <Download size={14} strokeWidth={2} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Early access */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Rocket size={18} strokeWidth={1.75} className="text-accent" />
          <h3 className="text-gray-900 font-bold text-lg">Early Access</h3>
        </div>
        <div className="space-y-3">
          {[
            {
              title: "AI-Powered SEO Tool (Beta)",
              status: "Launching Q2 2024",
              badge: "Coming Soon",
            },
            {
              title: "SA Business Analytics Dashboard",
              status: "Members get 30% off at launch",
              badge: "Pre-order",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center justify-between p-4 rounded-xl bg-white border border-gray-200"
            >
              <div>
                <p className="text-gray-900 font-semibold text-sm">{item.title}</p>
                <p className="text-gray-500 text-xs mt-0.5">{item.status}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold">
                {item.badge}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="flex items-start gap-4 p-6 rounded-xl bg-orange-50 border border-accent/20">
        <div className="w-10 h-10 rounded-xl bg-white border border-accent/20 flex items-center justify-center text-accent shrink-0">
          <Mail size={18} strokeWidth={1.75} />
        </div>
        <div className="flex-1">
          <h3 className="text-gray-900 font-bold text-base mb-1">Members Newsletter</h3>
          <p className="text-gray-500 text-sm mb-4">
            Get monthly exclusive insights, tutorials and early-access invites straight to your inbox.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent-dark transition-all"
          >
            Subscribe Now
            <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function MembersPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session token on mount
    const token = localStorage.getItem(MEMBERS_TOKEN_KEY);
    if (token === "authenticated") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === MEMBERS_PASSWORD) {
      localStorage.setItem(MEMBERS_TOKEN_KEY, "authenticated");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  }

  function handleLogout() {
    localStorage.removeItem(MEMBERS_TOKEN_KEY);
    setIsAuthenticated(false);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-white">
        <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="container-custom py-16 max-w-2xl mx-auto">
        {!isAuthenticated ? (
          // Password gate
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center mx-auto mb-6 text-gray-400">
              <Lock size={28} strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Members Area</h1>
            <p className="text-gray-500 mb-8">
              This area is for Mapengo Innovations clients and partners.
            </p>

            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl bg-gray-50 border border-gray-200 text-left"
            >
              <label
                htmlFor="password"
                className="block text-sm text-gray-700 font-medium mb-2"
              >
                Access Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter your password…"
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-accent transition-colors mb-4"
              />
              {error && (
                <div className="mb-4 flex items-start gap-2.5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                  <XCircle size={16} strokeWidth={2} className="shrink-0 mt-0.5" />
                  {error}
                </div>
              )}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark transition-all"
              >
                Enter Members Area
              </button>

              <p className="mt-4 text-center text-gray-400 text-xs">
                Don&apos;t have access?{" "}
                <Link href="/contact" className="text-accent hover:underline">
                  Contact us
                </Link>{" "}
                to become a member.
              </p>
            </form>
          </div>
        ) : (
          // Authenticated content
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900">Members Area</h1>
                <p className="text-gray-500 text-sm mt-1">Exclusive resources for members</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-500 text-sm hover:border-red-300 hover:text-red-500 transition-colors"
              >
                Sign Out
              </button>
            </div>
            <MembersContent />
          </div>
        )}
      </div>
    </div>
  );
}
