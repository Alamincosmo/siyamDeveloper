"use client";

import Image from "next/image";
import { Check, ChevronRight, Calendar, Globe, Sparkles } from "lucide-react";

export default function StatsPreview() {
  const marquee1 = [
    "/images/marquee/marquee-1.png",
    "/images/marquee/marquee-2.png",
    "/images/marquee/marquee-3.png",
    "/images/marquee/marquee-4.png",
  ];

  const marquee2 = [
    "/images/marquee/marquee-5.png",
    "/images/marquee/marquee-6.png",
    "/images/marquee/marquee-7.png",
    "/images/marquee/marquee-8.png",
  ];

  const currentTasks = [
    "Modern Mediks v2 prescription & clinical features",
    "Techfrica workflow automation tools & cloud scrapers",
    "HealthTech compliance & HIPAA security module",
    "Open source PHP & TypeScript developer tools",
    "Technical architectural deep dives on scaleos.co.uk",
    "Clinical AI diagnostic assistant prototyping & R&D",
  ];

  return (
    <section id="demo" className="py-24 md:py-36 bg-[#ECF0F3] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Top Split Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Left Card: 20+ Projects Shipped with Marquee Ribbons */}
          <div className="rounded-3xl p-8 bg-white shadow-[8px_8px_24px_#D1D9E6,-8px_-8px_24px_#FFFFFF] border border-white/80 flex flex-col justify-between overflow-hidden">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
                <Globe className="w-4 h-4" />
                <span>Global Footprint</span>
              </div>
              <h3 className="text-4xl sm:text-5xl font-black font-heading text-slate-900 tracking-tight mb-2">
                20<span className="text-blue-600">+</span>
              </h3>
              <p className="text-slate-600 font-medium text-base">
                Production-ready projects shipped across 5 countries worldwide.
              </p>
            </div>

            {/* Marquee Ribbons Container */}
            <div className="space-y-3 -mx-4 -rotate-3 overflow-hidden py-2">
              {/* Row 1 */}
              <div className="flex gap-3 overflow-hidden select-none">
                <div className="flex gap-3 shrink-0 animate-marquee">
                  {marquee1.map((src, i) => (
                    <div key={i} className="w-28 h-18 sm:w-36 sm:h-22 relative rounded-xl overflow-hidden shadow-sm shrink-0 border border-slate-200">
                      <Image src={src} alt="project thumbnail" fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 shrink-0 animate-marquee" aria-hidden="true">
                  {marquee1.map((src, i) => (
                    <div key={`dup-${i}`} className="w-28 h-18 sm:w-36 sm:h-22 relative rounded-xl overflow-hidden shadow-sm shrink-0 border border-slate-200">
                      <Image src={src} alt="project thumbnail" fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex gap-3 overflow-hidden select-none">
                <div className="flex gap-3 shrink-0 animate-marquee-reverse">
                  {marquee2.map((src, i) => (
                    <div key={i} className="w-28 h-18 sm:w-36 sm:h-22 relative rounded-xl overflow-hidden shadow-sm shrink-0 border border-slate-200">
                      <Image src={src} alt="project thumbnail" fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 shrink-0 animate-marquee-reverse" aria-hidden="true">
                  {marquee2.map((src, i) => (
                    <div key={`dup-${i}`} className="w-28 h-18 sm:w-36 sm:h-22 relative rounded-xl overflow-hidden shadow-sm shrink-0 border border-slate-200">
                      <Image src={src} alt="project thumbnail" fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Card: Book 30-min intro call */}
          <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 text-white shadow-xl shadow-blue-500/20 flex flex-col justify-between">
            <div>
              <div className="size-11 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight mb-3">
                Book a 30-Min Intro Call
              </h3>
              <p className="text-blue-100 text-sm sm:text-base font-medium mb-6">
                What we achieve in our 30-minute discovery session:
              </p>

              <div className="space-y-3.5 mb-8">
                <div className="flex items-center gap-3">
                  <div className="size-5 rounded-full bg-blue-400/20 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-blue-300 stroke-[3]" />
                  </div>
                  <span className="text-sm font-semibold text-white">Short introduction & mutual alignment</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-5 rounded-full bg-blue-400/20 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-blue-300 stroke-[3]" />
                  </div>
                  <span className="text-sm font-semibold text-white">Dig into your project architecture & goals</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-5 rounded-full bg-blue-400/20 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-blue-300 stroke-[3]" />
                  </div>
                  <span className="text-sm font-semibold text-white">Clear, actionable technical delivery plan</span>
                </div>
              </div>
            </div>

            <div>
              <a
                href="#contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-white text-slate-900 font-bold hover:bg-blue-50 transition-all shadow-md active:scale-95 text-sm"
              >
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>Schedule a Call Now</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Currently Working On */}
        <div className="rounded-3xl p-8 sm:p-10 bg-white shadow-[8px_8px_24px_#D1D9E6,-8px_-8px_24px_#FFFFFF] border border-white/80">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h4 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
              Currently Working On:
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentTasks.map((task, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200/60 text-slate-700 font-medium text-sm hover:border-blue-400 hover:bg-blue-50/50 transition-all"
              >
                <ChevronRight className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{task}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
