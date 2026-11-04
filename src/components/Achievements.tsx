"use client";

import { useState } from "react";
import Image from "next/image";
import { Award, Sparkles } from "lucide-react";

interface Achievement {
  id: number;
  title: string;
  context: string;
  tag: string;
  image: string;
  iconSvg: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    title: "Digitized prescriptions for 50+ clinics",
    context: "Modern Mediks",
    tag: "Healthcare SaaS",
    image: "/images/award/award-1.png",
    iconSvg: "/images/client/client-1.svg",
  },
  {
    id: 2,
    title: "Enterprise automation for UK startups",
    context: "Techfrica LLC",
    tag: "Systems Architecture",
    image: "/images/award/award-2.png",
    iconSvg: "/images/client/client-17.svg",
  },
  {
    id: 3,
    title: "Rated 5-star developer on Fiverr",
    context: "50+ Global Projects",
    tag: "Client Satisfaction",
    image: "/images/award/award-3.png",
    iconSvg: "/images/client/client-5.svg",
  },
  {
    id: 4,
    title: "Built microcontroller tech by age 11",
    context: "Self-taught Engineering",
    tag: "Early Passion",
    image: "/images/award/award-4.png",
    iconSvg: "/images/client/client-4.svg",
  },
];

export default function Achievements() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="award" className="py-24 md:py-36 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="relative mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
            Milestones
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-slate-900">
            Key Achievements
          </h2>
          <div className="absolute right-0 top-0 hidden sm:block -rotate-6 text-sm font-semibold text-blue-600 bg-blue-50/80 px-4 py-1.5 rounded-full border border-blue-200/60 shadow-xs">
            The “I made this” moments ✨
          </div>
        </div>

        {/* Milestones List */}
        <div className="flex flex-col divide-y divide-slate-200">
          {ACHIEVEMENTS.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group relative cursor-default transition-all duration-300 hover:px-4 rounded-2xl hover:bg-white hover:shadow-[4px_4px_16px_#D1D9E6,-4px_-4px_16px_#FFFFFF]"
            >
              <div className="flex items-center gap-5">
                <div className="size-11 rounded-2xl bg-[#ECF0F3] flex items-center justify-center shrink-0 border border-slate-200/60 group-hover:border-blue-400 group-hover:bg-blue-50 transition-colors">
                  <Award className="w-5 h-5 text-slate-700 group-hover:text-blue-600 transition-colors" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-heading font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-auto">
                <span className="text-sm font-bold text-slate-600 bg-slate-100 px-3.5 py-1.5 rounded-full">
                  {item.context}
                </span>

                {/* Floating Preview Thumbnail */}
                <div
                  className={`w-16 h-20 rounded-xl overflow-hidden shadow-lg border-2 border-white transition-all duration-500 transform ${
                    hoveredId === item.id
                      ? "opacity-100 scale-100 rotate-6"
                      : "opacity-0 scale-75 rotate-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={64}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
