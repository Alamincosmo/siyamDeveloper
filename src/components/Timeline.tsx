"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Briefcase, ArrowUpRight, Sparkles } from "lucide-react";

// ─── Helpers ─────────────────────────────────────────────────────────────────
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

// ─── Crisp Black Figma Cursor ────────────────────────────────────────────────
const BlackCursor = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="#1a1a1a"
    stroke="#ffffff"
    strokeWidth="1.4"
    style={{ display: "block" }}
  >
    <path d="M3 3l7 18 3-7 7-3L3 3z" />
  </svg>
);

// ─── Inline Text Caret ───────────────────────────────────────────────────────
const InlineCaret = () => (
  <span
    aria-hidden="true"
    className="inline-block w-[1.5px] h-[1em] bg-[#1a1a1a] ml-[2px] align-text-bottom select-none pointer-events-none shrink-0"
    style={{
      animation: "caretBlink 0.85s step-end infinite",
    }}
  />
);

// ─── Figma Top-Left Drag-to-Size Text Box Component ──────────────────────────
function FigmaDrawnText({
  text,
  className = "",
  ghostClassName = "",
  active,
  onDone,
  typeSpeed = 26,
  drawDuration = 400,
  icon,
  noWrap = true,
}: {
  text: string;
  className?: string;
  ghostClassName?: string;
  active: boolean;
  onDone?: () => void;
  typeSpeed?: number;
  drawDuration?: number;
  icon?: React.ReactNode;
  noWrap?: boolean;
}) {
  const [phase, setPhase] = useState<"idle" | "tiny" | "drawing" | "typing" | "done">("idle");
  const [typed, setTyped] = useState("");
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (!active || hasRunRef.current) return;
    hasRunRef.current = true;

    (async () => {
      // 1. Tiny dot/handle at top-left
      setPhase("tiny");
      await sleep(100);

      // 2. Drag box from top-left to full size
      setPhase("drawing");
      await sleep(drawDuration);

      // 3. Start typing text
      setPhase("typing");
      for (let i = 1; i <= text.length; i++) {
        setTyped(text.slice(0, i));
        await sleep(typeSpeed);
      }
      setTyped(text);
      await sleep(150);

      // 4. Completed
      setPhase("done");
      if (onDone) onDone();
    })();
  }, [active, text, typeSpeed, drawDuration, onDone]);

  const isDrawn = phase === "drawing" || phase === "typing" || phase === "done";
  const isBoxActive = phase === "tiny" || phase === "drawing" || phase === "typing";
  const wrapClass = noWrap ? "whitespace-nowrap" : "";

  return (
    <div className={`relative inline-block w-fit ${wrapClass}`}>
      {/* Ghost text for layout reservation with pr-3 buffer */}
      <div
        className={`invisible select-none pointer-events-none flex items-center pr-3 ${wrapClass} ${
          ghostClassName || className
        }`}
        aria-hidden="true"
      >
        {icon}
        <span className={wrapClass}>{text}</span>
      </div>

      {/* Active text layer with strict nowrap */}
      <div className={`absolute inset-0 flex items-center ${wrapClass} ${className}`}>
        {icon && isDrawn && icon}
        <span className={wrapClass}>{phase === "done" ? text : typed}</span>
        {phase === "typing" && <InlineCaret />}
      </div>

      {/* Figma Bounding Box dragged from top-left */}
      {isBoxActive && (
        <div
          className="absolute border-[1.5px] border-dashed border-[#0C8CE9] rounded-[3px] pointer-events-none z-30 overflow-visible"
          style={{
            top: isDrawn ? "-6px" : "0px",
            left: isDrawn ? "-8px" : "0px",
            width: isDrawn ? "calc(100% + 16px)" : "14px",
            height: isDrawn ? "calc(100% + 12px)" : "14px",
            transitionProperty: "width, height, top, left",
            transitionDuration: `${drawDuration}ms`,
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* 8 Node Points */}
          <div className="absolute -top-1 -left-1 size-2 bg-white border-[1.5px] border-[#0C8CE9] rounded-[1px]" />
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 size-2 bg-white border-[1.5px] border-[#0C8CE9] rounded-[1px]" />
          <div className="absolute -top-1 -right-1 size-2 bg-white border-[1.5px] border-[#0C8CE9] rounded-[1px]" />
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 size-2 bg-white border-[1.5px] border-[#0C8CE9] rounded-[1px]" />
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 size-2 bg-white border-[1.5px] border-[#0C8CE9] rounded-[1px]" />
          <div className="absolute -bottom-1 -left-1 size-2 bg-white border-[1.5px] border-[#0C8CE9] rounded-[1px]" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-2 bg-white border-[1.5px] border-[#0C8CE9] rounded-[1px]" />
          <div
            className={`absolute -bottom-1.5 -right-1.5 size-2.5 bg-[#0C8CE9] border-[1.5px] border-white rounded-[1px] ${
              phase === "tiny" || phase === "drawing" ? "scale-140 ring-2 ring-[#0C8CE9]/40" : ""
            }`}
          />

          {/* Black Figma Cursor pinned to bottom-right handle */}
          <div className="absolute -bottom-2 -right-2 pointer-events-none z-40">
            <BlackCursor />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Figma Multiline Paragraph Drag-and-Type ─────────────────────────────────
function FigmaDrawnParagraph({
  text,
  className = "",
  active,
  drawDuration = 450,
  typeSpeed = 16,
}: {
  text: string;
  className?: string;
  active: boolean;
  drawDuration?: number;
  typeSpeed?: number;
}) {
  const [phase, setPhase] = useState<"idle" | "tiny" | "drawing" | "typing" | "done">("idle");
  const [typed, setTyped] = useState("");
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (!active || hasRunRef.current) return;
    hasRunRef.current = true;

    (async () => {
      await sleep(150);
      setPhase("tiny");
      await sleep(100);

      setPhase("drawing");
      await sleep(drawDuration);

      setPhase("typing");
      for (let i = 2; i <= text.length; i += 2) {
        setTyped(text.slice(0, i));
        await sleep(typeSpeed);
      }
      setTyped(text);
      await sleep(200);

      setPhase("done");
    })();
  }, [active, text, drawDuration, typeSpeed]);

  const isDrawn = phase === "drawing" || phase === "typing" || phase === "done";
  const isBoxActive = phase === "tiny" || phase === "drawing" || phase === "typing";

  return (
    <div className="relative inline-block w-full max-w-xl">
      {/* Ghost text */}
      <p className={`invisible select-none pointer-events-none pr-2 ${className}`} aria-hidden="true">
        {text}
      </p>

      {/* Active layer */}
      <p className={`absolute inset-0 ${className}`}>
        {phase === "done" ? text : typed}
        {phase === "typing" && <InlineCaret />}
      </p>

      {/* Figma Bounding Box dragged from top-left */}
      {isBoxActive && (
        <div
          className="absolute border-[1.5px] border-dashed border-[#0C8CE9] rounded-[3px] pointer-events-none z-30 overflow-visible"
          style={{
            top: isDrawn ? "-6px" : "0px",
            left: isDrawn ? "-8px" : "0px",
            width: isDrawn ? "calc(100% + 16px)" : "16px",
            height: isDrawn ? "calc(100% + 12px)" : "16px",
            transitionProperty: "width, height, top, left",
            transitionDuration: `${drawDuration}ms`,
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* 8 Node Handles */}
          <div className="absolute -top-1 -left-1 size-2 bg-white border-[1.5px] border-[#0C8CE9] rounded-[1px]" />
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 size-2 bg-white border-[1.5px] border-[#0C8CE9] rounded-[1px]" />
          <div className="absolute -top-1 -right-1 size-2 bg-white border-[1.5px] border-[#0C8CE9] rounded-[1px]" />
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 size-2 bg-white border-[1.5px] border-[#0C8CE9] rounded-[1px]" />
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 size-2 bg-white border-[1.5px] border-[#0C8CE9] rounded-[1px]" />
          <div className="absolute -bottom-1 -left-1 size-2 bg-white border-[1.5px] border-[#0C8CE9] rounded-[1px]" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-2 bg-white border-[1.5px] border-[#0C8CE9] rounded-[1px]" />
          <div
            className={`absolute -bottom-1.5 -right-1.5 size-2.5 bg-[#0C8CE9] border-[1.5px] border-white rounded-[1px] ${
              phase === "tiny" || phase === "drawing" ? "scale-140 ring-2 ring-[#0C8CE9]/40" : ""
            }`}
          />

          <div className="absolute -bottom-2 -right-2 pointer-events-none z-40">
            <BlackCursor />
          </div>
        </div>
      )}
    </div>
  );
}

interface TimelineItem {
  id: number;
  period: string;
  role: string;
  company: string;
  brandName: string;
  description: string;
  logo: string;
  highlightColor: string;
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 1,
    period: "05/2024 — Present",
    role: "Technology Officer",
    company: "Modern Mediks",
    brandName: "Technova",
    description:
      "Building the clinic management platform at Modern Mediks — digitizing prescriptions, patient records, and clinical workflows for doctors across Bangladesh.",
    logo: "/images/timeline/timeline-1.svg",
    highlightColor: "#FEF08A", // Chalk Yellow
  },
  {
    id: 2,
    period: "09/2023 — Present",
    role: "IT Director",
    company: "Techfrica LLC",
    brandName: "Creative Pixel",
    description:
      "Leading software development and IT strategy at Techfrica LLC — automating enterprise workflows and building secure systems for UK-based startups. Fully remote.",
    logo: "/images/timeline/timeline-2.svg",
    highlightColor: "#BAE6FD", // Chalk Sky Blue
  },
  {
    id: 3,
    period: "02/2023 — 12/2025",
    role: "Web Designer & Developer",
    company: "Fiverr (Top-Rated)",
    brandName: "Bright Code",
    description:
      "Delivered 50+ custom web projects on Fiverr — high-converting landing pages, full-stack web apps, and CMS architectures for clients worldwide.",
    logo: "/images/timeline/timeline-3.svg",
    highlightColor: "#BBF7D0", // Chalk Lime Green
  },
  {
    id: 4,
    period: "2022 — 08/2023",
    role: "Head Backend Developer",
    company: "House of Change Limited",
    brandName: "Bycraft",
    description:
      "Led backend engineering at House of Change Limited — building scalable server-side systems, secure database architectures, and modernizing legacy business applications.",
    logo: "/images/timeline/timeline-4.svg",
    highlightColor: "#FED7AA", // Chalk Peach
  },
];

// ─── Timeline Row Component ──────────────────────────────────────────────────
function TimelineRow({ item }: { item: TimelineItem }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [rowVisible, setRowVisible] = useState(false);

  // Staggered sequential steps: role -> company -> period
  const [companyActive, setCompanyActive] = useState(false);
  const [periodActive, setPeriodActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRowVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (rowRef.current) observer.observe(rowRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rowRef}
      className={`group py-12 sm:py-16 transition-opacity duration-700 ${
        rowVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* ──────────────────────────────────────────────────────────── */}
        {/* LEFT COLUMN: Role Headline, Company Subheadline, Date (5 Cols)*/}
        {/* ──────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-5 flex flex-col justify-start">
          {/* 1. Main Headline: Role Title */}
          <div className="relative mb-1.5 w-fit max-w-full overflow-hidden">
            <FigmaDrawnText
              text={item.role}
              active={rowVisible}
              onDone={() => setCompanyActive(true)}
              className="text-2xl sm:text-3xl lg:text-[32px] font-heading font-black tracking-tight text-slate-950 leading-[1.18] group-hover:text-blue-600 transition-colors"
              ghostClassName="text-2xl sm:text-3xl lg:text-[32px] font-heading font-black tracking-tight leading-[1.18]"
              drawDuration={420}
              typeSpeed={30}
              noWrap={true}
            />

            {/* Chalk Marker Underline */}
            <svg
              className="w-full h-3 overflow-visible pointer-events-none -mt-1"
              viewBox="0 0 300 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="chalk-line"
                d="M 2 8 C 70 2, 180 12, 298 6"
                stroke={item.highlightColor}
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* 2. Subheadline: Company Name */}
          <div className="mb-2">
            <FigmaDrawnText
              text={item.company}
              active={companyActive}
              onDone={() => setPeriodActive(true)}
              className="text-slate-800 font-semibold text-base sm:text-lg font-heading tracking-tight"
              ghostClassName="text-base sm:text-lg font-heading tracking-tight"
              icon={<Briefcase className="w-4 h-4 text-blue-600/80 shrink-0 mr-2" />}
              drawDuration={360}
              typeSpeed={28}
              noWrap={true}
            />
          </div>

          {/* 3. Period / Date: cleanly below Company Name */}
          <div>
            <FigmaDrawnText
              text={item.period}
              active={periodActive}
              className="font-mono text-xs sm:text-sm font-semibold text-blue-600 tracking-wider"
              ghostClassName="font-mono text-xs sm:text-sm font-semibold tracking-wider"
              drawDuration={320}
              typeSpeed={24}
              noWrap={true}
            />
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────── */}
        {/* RIGHT COLUMN: Company Logo & Headline + Description (7 Cols) */}
        {/* ──────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-7 flex flex-col justify-start">
          {/* Company Brand Logo at top of right column */}
          <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-200/80">
            <div className="flex items-center gap-3">
              <div className="h-8 sm:h-9 w-36 sm:w-44 relative opacity-95 group-hover:opacity-100 transition-opacity">
                <Image
                  src={item.logo}
                  alt={item.brandName || item.company}
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>

            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>

          {/* Detailed Description with Figma Draw-and-Type */}
          <FigmaDrawnParagraph
            text={item.description}
            active={rowVisible}
            className="text-slate-600 font-normal text-sm sm:text-base leading-relaxed"
            drawDuration={480}
            typeSpeed={16}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Main Timeline Section ───────────────────────────────────────────────────
export default function Timeline() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHeaderVisible(true);
        }
      },
      { threshold: 0.25 }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="timeline" className="py-24 md:py-36 bg-[#F8FAFC] relative overflow-hidden">
      {/* Background Architectural Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 select-none z-0"
        style={{
          backgroundImage: `
            radial-gradient(at 15% 15%, rgba(56, 189, 248, 0.08) 0px, transparent 50%),
            radial-gradient(at 85% 85%, rgba(99, 102, 241, 0.06) 0px, transparent 50%),
            radial-gradient(circle, #CBD5E1 0.75px, transparent 0.75px)
          `,
          backgroundSize: "100% 100%, 100% 100%, 28px 28px",
        }}
      />

      <style>{`
        @keyframes caretBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .chalk-line {
          stroke-dasharray: 450;
          stroke-dashoffset: 450;
          transition: stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .group:hover .chalk-line {
          stroke-dashoffset: 0;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 md:mb-20"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/60 text-blue-600 text-xs font-bold font-sans uppercase tracking-wider mb-3 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Journey</span>
            </div>

            {/* Figma-animated Header */}
            <div>
              <FigmaDrawnText
                text="Career Timeline"
                active={headerVisible}
                className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-slate-900"
                ghostClassName="text-3xl sm:text-5xl font-black font-heading tracking-tight"
                drawDuration={440}
                typeSpeed={35}
                noWrap={true}
              />
            </div>
          </div>

          <div className="text-sm font-mono text-slate-500 font-semibold bg-white px-4 py-2 rounded-full border border-slate-200 shadow-2xs w-fit">
            @2019 — Present
          </div>
        </div>

        {/* Open Timeline Rows */}
        <div className="divide-y divide-slate-200/90 border-t border-b border-slate-200/90">
          {TIMELINE_DATA.map((item) => (
            <TimelineRow key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
