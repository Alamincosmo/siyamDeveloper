"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Briefcase } from "lucide-react";

interface TimelineItem {
  id: number;
  period: string;
  role: string;
  company: string;
  description: string;
  logo: string;
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 1,
    period: "05/2024 - Present",
    role: "Technology Officer",
    company: "Modern Mediks",
    description: "Building the clinic management platform at Modern Mediks — digitizing prescriptions, patient records, and clinical workflows for doctors across Bangladesh.",
    logo: "/images/timeline/timeline-1.svg",
  },
  {
    id: 2,
    period: "09/2023 - Present",
    role: "IT Director",
    company: "Techfrica LLC",
    description: "Leading software development and IT strategy at Techfrica LLC — automating enterprise workflows and building secure systems for UK-based startups. Fully remote.",
    logo: "/images/timeline/timeline-2.svg",
  },
  {
    id: 3,
    period: "02/2023 - 12/2025",
    role: "Web Designer & Developer",
    company: "Fiverr (Top-Rated)",
    description: "Delivered 50+ custom web projects on Fiverr — high-converting landing pages, full-stack web apps, and CMS architectures for clients worldwide.",
    logo: "/images/timeline/timeline-3.svg",
  },
  {
    id: 4,
    period: "2022 - 08/2023",
    role: "Head Backend Developer",
    company: "House of Change Limited",
    description: "Led backend engineering at House of Change Limited — building scalable server-side systems, secure database architectures, and modernizing legacy business applications.",
    logo: "/images/timeline/timeline-4.svg",
  },
];

export default function Timeline() {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? TIMELINE_DATA : TIMELINE_DATA.slice(0, 2);

  return (
    <section id="timeline" className="py-24 md:py-36 bg-[#ECF0F3] relative">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-blue-600 text-xs font-bold uppercase tracking-wider shadow-sm mb-3">
              Journey
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-slate-900">
              Career Timeline
            </h2>
          </div>
          <div className="text-sm font-mono text-slate-500 font-semibold bg-white/80 px-4 py-2 rounded-full border border-slate-200">
            @2019 — Present
          </div>
        </div>

        {/* Timeline Flow */}
        <div className="relative pl-6 sm:pl-10 space-y-10 sm:space-y-12">
          {/* Vertical Track Rail */}
          <div className="absolute left-[11px] sm:left-[19px] top-6 bottom-6 w-0.5 border-l-2 border-dashed border-slate-300" />

          {visibleItems.map((item) => (
            <div key={item.id} className="relative flex items-start gap-4 sm:gap-8 group">
              {/* Timeline Node Icon */}
              <div className="absolute -left-[23px] sm:-left-[31px] top-1.5 size-6 sm:size-7 rounded-full bg-white border-4 border-blue-600 shadow-md flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <div className="size-1.5 rounded-full bg-blue-600" />
              </div>

              {/* Timeline Card */}
              <div className="w-full rounded-3xl p-6 sm:p-8 bg-white shadow-[6px_6px_20px_#D1D9E6,-6px_-6px_20px_#FFFFFF] border border-white/80 transition-all duration-300 hover:shadow-[8px_8px_26px_#D1D9E6,-8px_-8px_26px_#FFFFFF]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit">
                    {item.period}
                  </span>
                  <div className="h-6 w-24 relative opacity-70">
                    <Image
                      src={item.logo}
                      alt={item.company}
                      fill
                      className="object-contain object-left sm:object-right"
                    />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 mb-1">
                  {item.role}
                </h3>
                <div className="text-sm font-semibold text-slate-500 mb-3 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-slate-400" />
                  <span>{item.company}</span>
                </div>
                <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Expand / Collapse Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 shadow-[4px_4px_12px_#D1D9E6,-4px_-4px_12px_#FFFFFF] text-slate-800 text-sm font-bold hover:text-blue-600 hover:border-blue-300 transition-all active:scale-95"
          >
            <span>{showAll ? "Show Less" : "Show All Positions"}</span>
            {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </section>
  );
}
