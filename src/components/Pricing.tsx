"use client";

import { useState } from "react";
import { Check, ArrowRight, Sparkles } from "lucide-react";

export default function Pricing() {
  const [hasBackendAddon, setHasBackendAddon] = useState(false);

  return (
    <section id="pricing" className="py-24 md:py-36 bg-[#ECF0F3] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-blue-600 text-xs font-bold uppercase tracking-wider shadow-sm mb-3">
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
          <div className="bg-white p-2 rounded-2xl shadow-[4px_4px_16px_#D1D9E6,-4px_-4px_16px_#FFFFFF] border border-slate-200/60 inline-flex items-center gap-4">
            <span className={`text-sm font-bold ${!hasBackendAddon ? "text-slate-900" : "text-slate-500"}`}>
              Standard Frontend
            </span>

            <button
              type="button"
              onClick={() => setHasBackendAddon(!hasBackendAddon)}
              className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none ${
                hasBackendAddon ? "bg-blue-600" : "bg-slate-300"
              }`}
            >
              <div
                className={`bg-white size-6 rounded-full shadow-md transform transition-transform duration-300 ${
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
          <div className="rounded-3xl p-8 sm:p-10 bg-white shadow-[8px_8px_24px_#D1D9E6,-8px_-8px_24px_#FFFFFF] border border-white/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-heading font-extrabold text-slate-900">Starter Plan</h3>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  MVP Ready
                </span>
              </div>
              <p className="text-sm text-slate-500 font-medium mb-6">
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
                    <Check className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#contact"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#ECF0F3] text-slate-800 font-bold hover:bg-slate-200 transition-all active:scale-95 text-sm shadow-[3px_3px_8px_#D1D9E6,-3px_-3px_8px_#FFFFFF]"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </a>
          </div>

          {/* Pro Plan */}
          <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 text-white shadow-xl shadow-blue-500/20 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-blue-200 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Recommended</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-heading font-extrabold text-white">Pro Plan</h3>
              </div>
              <p className="text-sm text-blue-100 font-medium mb-6">
                Complete full-stack architecture, multiple screens, and complex backend integration.
              </p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl sm:text-5xl font-black font-heading text-white">
                  ${hasBackendAddon ? "1,100" : "899"}
                </span>
                <span className="text-sm font-bold text-blue-200">/project</span>
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
                  <div key={i} className="flex items-center gap-3 text-sm font-medium text-white">
                    <Check className="w-4 h-4 text-blue-300 shrink-0 stroke-[3]" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#contact"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-white text-slate-900 font-bold hover:bg-blue-50 transition-all shadow-md active:scale-95 text-sm"
            >
              <span>Get Started Pro</span>
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
