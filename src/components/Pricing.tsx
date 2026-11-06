"use client";

import { useState } from "react";
import { Check, ArrowRight, Sparkles } from "lucide-react";

export default function Pricing() {
  const [hasBackendAddon, setHasBackendAddon] = useState(false);

  return (
    <section id="pricing" className="py-24 md:py-36 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
            Investment
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-slate-900 mb-4">
            Let&apos;s Talk Pricing
          </h2>
          <p className="text-slate-600 font-medium text-sm sm:text-base">
            Simple, transparent, and tailored to your product milestones. Choose what works best for your team.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-2 rounded-2xl border border-slate-200/80 inline-flex items-center gap-4">
            <span className={`text-sm font-bold ${!hasBackendAddon ? "text-slate-900" : "text-slate-500"}`}>
              Standard Frontend
            </span>

            <button
              type="button"
              onClick={() => setHasBackendAddon(!hasBackendAddon)}
              className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none ${
                hasBackendAddon ? "bg-blue-600" : "bg-slate-200"
              }`}
            >
              <div
                className={`bg-white size-6 rounded-full transform transition-transform duration-300 ${
                  hasBackendAddon ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>

            <span className={`text-sm font-bold flex items-center gap-1.5 ${hasBackendAddon ? "text-blue-600" : "text-slate-500"}`}>
              <span>With Backend Architecture</span>
              <span className="text-[10px] uppercase font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                Add-on
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Starter Plan */}
          <div className="rounded-3xl p-8 sm:p-10 bg-white border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-heading font-extrabold text-slate-900">Starter Plan</h3>
                <span className="text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200/60 px-3 py-1 rounded-full">
                  MVP Ready
                </span>
              </div>
              <p className="text-sm text-slate-600 font-medium mb-6">
                Perfect for launching a single focused web product or high-conversion landing app.
              </p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl sm:text-5xl font-black font-heading text-slate-900">
                  ${hasBackendAddon ? "900" : "799"}
                </span>
                <span className="text-sm font-bold text-slate-500">/project</span>
              </div>

              <div className="space-y-3.5 mb-8">
                {[
                  "1 Full Project Delivery",
                  "Up to 5 Pages / Interactive Screens",
                  "Fully Responsive & Mobile Optimized",
                  "Basic SEO & Semantic Meta Setup",
                  "2-Week Fast Delivery",
                  hasBackendAddon ? "Database & API Endpoints Included" : "Frontend Only Delivery",
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <div className="size-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-blue-600 stroke-[2.5]" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#contact"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-slate-100 text-slate-900 font-bold hover:bg-slate-200 transition-colors active:scale-95 text-sm border border-slate-200/70"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 text-slate-700" />
            </a>
          </div>

          {/* Pro Plan */}
          <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-blue-50/50 via-white to-white border-2 border-blue-600 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-heading font-extrabold text-slate-900">Pro Plan</h3>
              <div className="bg-blue-100 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Recommended</span>
              </div>
            </div>

            <div>
              <p className="text-sm text-slate-600 font-medium mb-6">
                Complete full-stack architecture, multiple screens, and complex backend integration.
              </p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl sm:text-5xl font-black font-heading text-slate-900">
                  ${hasBackendAddon ? "1,100" : "899"}
                </span>
                <span className="text-sm font-bold text-slate-500">/project</span>
              </div>

              <div className="space-y-3.5 mb-8">
                {[
                  "Up to 5 Projects / Modules",
                  "Up to 15 Pages & Dashboard Screens",
                  "Full Responsive Design & Animation",
                  "Advanced SEO, Analytics & Security",
                  "5-Week Staged Production Delivery",
                  hasBackendAddon ? "Full Cloud DB, Auth & Custom APIs" : "Robust API Integration Layer",
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <div className="size-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-blue-600 stroke-[2.5]" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#contact"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors active:scale-95 text-sm"
            >
              <span>Get Started Pro</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
