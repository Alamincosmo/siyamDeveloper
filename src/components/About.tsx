"use client";

import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-36 bg-[#F8FAFC] relative overflow-hidden">
      {/* Subtle ambient gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="flex flex-col gap-12 md:gap-16">
          {/* Top Visual: Photo + Years Badge */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8">
            {/* Portrait Card */}
            <div className="relative group">
              <div className="w-56 h-64 sm:w-64 sm:h-72 rounded-3xl overflow-hidden shadow-[8px_8px_24px_#D1D9E6,-8px_-8px_24px_#FFFFFF] border border-white/80 p-2 bg-white transition-transform duration-500 group-hover:rotate-1">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-100">
                  <Image
                    src="/freepik_generate-9-different-angl_2857194394.png"
                    alt="Md Siyam"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 224px, 256px"
                  />
                </div>
              </div>

              {/* Cursive Fun Sticker */}
              <div className="absolute -top-5 -left-6 sm:-left-10 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full shadow-md border border-slate-200 text-slate-800 text-sm font-semibold -rotate-12 select-none">
                Call me just <span className="text-blue-600 font-bold">&quot;Siyam&quot;</span> ✌️
              </div>
            </div>

            {/* Stat Pill Badge */}
            <div className="w-full sm:w-56 h-auto sm:h-72 rounded-3xl p-6 sm:p-7 flex flex-col justify-between bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-500/20 sm:rotate-3 transition-transform duration-500 hover:rotate-0">
              <div className="flex items-center justify-between">
                <Sparkles className="w-6 h-6 text-blue-200" />
                <span className="text-xs font-mono uppercase tracking-widest text-blue-200">Experience</span>
              </div>
              <div>
                <h3 className="text-5xl sm:text-6xl font-black font-heading tracking-tight mb-1">6+</h3>
                <p className="text-sm sm:text-base text-blue-100 font-medium leading-snug">
                  Years of building scalable systems that matter.
                </p>
              </div>
            </div>
          </div>

          {/* Core Bio Statement */}
          <div className="max-w-3xl mx-auto text-center flex flex-col gap-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-slate-900 leading-tight">
              I build software that actually changes how things work. From HealthTech platforms in Bangladesh to enterprise systems for UK companies, I focus on solving problems that create real impact.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto">
              Full-stack developer, system architect, and the guy who coded a microcontroller at age 11. I merge deep engineering rigor with pragmatic business strategy.
            </p>

            <div className="pt-2 flex justify-center items-center gap-4">
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 shadow-[4px_4px_12px_#D1D9E6,-4px_-4px_12px_#FFFFFF] text-slate-900 font-semibold hover:text-blue-600 hover:border-blue-300 transition-all active:scale-95"
              >
                <span>See My Work</span>
                <ArrowUpRight className="w-4 h-4 text-blue-600" />
              </a>
            </div>

            {/* Signature Graphic */}
            <div className="pt-4 flex justify-center">
              <img
                src="/images/svg/sign.svg"
                alt="Siyam Signature"
                className="h-10 opacity-75 grayscale hover:grayscale-0 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
