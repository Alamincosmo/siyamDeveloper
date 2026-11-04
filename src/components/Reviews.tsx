"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  handle: string;
  avatar: string;
  text: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Jessica Moore",
    handle: "@jessica",
    avatar: "/images/avatar/avatar-9.png",
    text: "Everything is now in one place, and the experience is incredibly smooth. Siyam turned our scattered workflows into a single cohesive platform.",
  },
  {
    name: "Sarah Head",
    handle: "@headS",
    avatar: "/images/avatar/avatar-1.png",
    text: "Professional, skilled, and fun to work with. Made complex architectural challenges feel completely effortless and delivered ahead of schedule.",
  },
  {
    name: "Emily Reed",
    handle: "@emieed",
    avatar: "/images/avatar/avatar-4.png",
    text: "A game-changer for our startup. Brought both high-level engineering strategy and pixel-perfect execution to the table.",
  },
  {
    name: "Chris Max",
    handle: "@maxicris",
    avatar: "/images/avatar/avatar-2.png",
    text: "Handled everything from responsive frontend UX to complex backend data pipelines without missing a single beat. Exceptional developer.",
  },
];

export default function Reviews() {
  return (
    <section id="review" className="py-24 md:py-36 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10 mb-16">
        {/* Header with Avatar Stack */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
              Social Proof
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-slate-900">
              Reviews That Speak Volumes
            </h2>
          </div>

          <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-2xl shadow-[4px_4px_16px_#D1D9E6,-4px_-4px_16px_#FFFFFF] border border-slate-200/60 w-fit">
            {/* Avatar Stack */}
            <div className="flex -space-x-2 overflow-hidden">
              <div className="size-9 rounded-full ring-2 ring-white relative overflow-hidden">
                <Image src="/images/avatar/avatar-1.png" alt="Client 1" fill className="object-cover" />
              </div>
              <div className="size-9 rounded-full ring-2 ring-white relative overflow-hidden">
                <Image src="/images/avatar/avatar-2.png" alt="Client 2" fill className="object-cover" />
              </div>
              <div className="size-9 rounded-full ring-2 ring-white relative overflow-hidden">
                <Image src="/images/avatar/avatar-4.png" alt="Client 3" fill className="object-cover" />
              </div>
              <div className="size-9 rounded-full ring-2 ring-white relative overflow-hidden">
                <Image src="/images/avatar/avatar-9.png" alt="Client 4" fill className="object-cover" />
              </div>
            </div>

            <div className="text-left">
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-amber-400 stroke-amber-400" />
                ))}
              </div>
              <p className="text-xs font-bold text-slate-600">Trusted by 50+ clients worldwide</p>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Track 1 (Leftward) */}
      <div className="flex gap-6 overflow-hidden select-none mb-6 -mx-4 py-2">
        <div className="flex gap-6 shrink-0 animate-marquee">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="w-80 sm:w-96 rounded-3xl p-6 bg-white shadow-[6px_6px_20px_#D1D9E6,-6px_-6px_20px_#FFFFFF] border border-white/80 shrink-0 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-full relative overflow-hidden bg-slate-100 border border-slate-200">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-sm text-slate-900">{t.name}</h4>
                    <span className="text-xs font-semibold text-slate-400">{t.handle}</span>
                  </div>
                </div>
                <Quote className="size-6 text-blue-200" />
              </div>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>
            </div>
          ))}
        </div>
        <div className="flex gap-6 shrink-0 animate-marquee" aria-hidden="true">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={`dup-${idx}`}
              className="w-80 sm:w-96 rounded-3xl p-6 bg-white shadow-[6px_6px_20px_#D1D9E6,-6px_-6px_20px_#FFFFFF] border border-white/80 shrink-0 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-full relative overflow-hidden bg-slate-100 border border-slate-200">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-sm text-slate-900">{t.name}</h4>
                    <span className="text-xs font-semibold text-slate-400">{t.handle}</span>
                  </div>
                </div>
                <Quote className="size-6 text-blue-200" />
              </div>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Track 2 (Rightward) */}
      <div className="flex gap-6 overflow-hidden select-none -mx-4 py-2">
        <div className="flex gap-6 shrink-0 animate-marquee-reverse">
          {TESTIMONIALS.slice().reverse().map((t, idx) => (
            <div
              key={idx}
              className="w-80 sm:w-96 rounded-3xl p-6 bg-white shadow-[6px_6px_20px_#D1D9E6,-6px_-6px_20px_#FFFFFF] border border-white/80 shrink-0 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-full relative overflow-hidden bg-slate-100 border border-slate-200">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-sm text-slate-900">{t.name}</h4>
                    <span className="text-xs font-semibold text-slate-400">{t.handle}</span>
                  </div>
                </div>
                <Quote className="size-6 text-blue-200" />
              </div>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>
            </div>
          ))}
        </div>
        <div className="flex gap-6 shrink-0 animate-marquee-reverse" aria-hidden="true">
          {TESTIMONIALS.slice().reverse().map((t, idx) => (
            <div
              key={`dup2-${idx}`}
              className="w-80 sm:w-96 rounded-3xl p-6 bg-white shadow-[6px_6px_20px_#D1D9E6,-6px_-6px_20px_#FFFFFF] border border-white/80 shrink-0 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-full relative overflow-hidden bg-slate-100 border border-slate-200">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-sm text-slate-900">{t.name}</h4>
                    <span className="text-xs font-semibold text-slate-400">{t.handle}</span>
                  </div>
                </div>
                <Quote className="size-6 text-blue-200" />
              </div>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
