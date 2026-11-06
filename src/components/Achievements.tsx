"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Award, Sparkles } from "lucide-react";

// ─── Helpers ─────────────────────────────────────────────────────────────────
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

// ─── Figma-Style Bounding Box ─────────────────────────────────────────────────
const BoundingBox = ({ className = "" }: { className?: string }) => (
  <div
    className={`absolute -inset-1.5 sm:-inset-2 border-[1.5px] border-dashed border-[#0C8CE9] rounded-[4px] pointer-events-none z-30 transition-all duration-200 ${className}`}
  >
    {/* 8 Node Points */}
    <div className="absolute -top-1 -left-1 size-2 bg-white border-[1.5px] border-[#0C8CE9] rounded-[1px]" />
    <div className="absolute -top-1 left-1/2 -translate-x-1/2 size-2 bg-white border-[1.5px] border-[#0C8CE9] rounded-[1px]" />
    <div className="absolute -top-1 -right-1 size-2 bg-white border-[1.5px] border-[#0C8CE9] rounded-[1px]" />
    <div className="absolute top-1/2 -left-1 -translate-y-1/2 size-2 bg-white border-[1.5px] border-[#0C8CE9] rounded-[1px]" />
    <div className="absolute top-1/2 -right-1 -translate-y-1/2 size-2 bg-white border-[1.5px] border-[#0C8CE9] rounded-[1px]" />
    <div className="absolute -bottom-1 -left-1 size-2 bg-white border-[1.5px] border-[#0C8CE9] rounded-[1px]" />
    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-2 bg-white border-[1.5px] border-[#0C8CE9] rounded-[1px]" />
    <div className="absolute -bottom-1.5 -right-1.5 size-2.5 bg-[#0C8CE9] border-[1.5px] border-white rounded-[1px]" />
  </div>
);

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

interface Achievement {
  id: number;
  titleLine1: string;
  titleLine2: string;
  context: string;
  tag: string;
  metric: string;
  image: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    titleLine1: "Digitized Prescriptions",
    titleLine2: "for 24+ Clinics",
    context: "Modern Mediks",
    tag: "Healthcare SaaS",
    metric: "10,000+ patient records processed",
    image: "/images/award/award-1.png",
  },
  {
    id: 2,
    titleLine1: "System Architecture & Automation",
    titleLine2: "for UK Startups",
    context: "Techfrica LLC",
    tag: "Systems Architecture",
    metric: "99.9% pipeline uptime automated",
    image: "/images/award/award-2.png",
  },
  {
    id: 3,
    titleLine1: "Rated 5-Star Developer",
    titleLine2: "on Fiverr",
    context: "50+ Global Projects",
    tag: "Client Satisfaction",
    metric: "100% On-time delivery rate",
    image: "/images/award/award-3.png",
  },
  {
    id: 4,
    titleLine1: "Built Microcontroller Tech",
    titleLine2: "by Age 11",
    context: "Self-Taught Engineering",
    tag: "Early Passion",
    metric: "Embedded systems & robotics roots",
    image: "/images/award/award-4.png",
  },
];

// ─── Individual Achievement Row ──────────────────────────────────────────────
function AchievementRow({ item }: { item: Achievement }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Left Side State: "idle" -> "line1" -> "line2" -> "sub" -> "done"
  const [textStep, setTextStep] = useState<"idle" | "line1" | "line2" | "sub" | "done">("idle");
  const [typedL1, setTypedL1] = useState("");
  const [typedL2, setTypedL2] = useState("");
  const [typedSub, setTypedSub] = useState("");

  // Right Side Image State: "idle" -> "tiny" -> "dragging" -> "done"
  const [imageStep, setImageStep] = useState<"idle" | "tiny" | "dragging" | "done">("idle");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          startAnimation();
        }
      },
      { threshold: 0.2 }
    );

    if (rowRef.current) observer.observe(rowRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  const startAnimation = async () => {
    await sleep(150);

    // Run Left and Right streams in parallel
    await Promise.all([
      // Worker 1: Headline Line 1 -> Line 2 -> Subheadline
      (async () => {
        setTextStep("line1");
        await sleep(180);
        for (let i = 1; i <= item.titleLine1.length; i++) {
          setTypedL1(item.titleLine1.slice(0, i));
          await sleep(28);
        }
        setTypedL1(item.titleLine1);
        await sleep(150);

        setTextStep("line2");
        await sleep(150);
        for (let i = 1; i <= item.titleLine2.length; i++) {
          setTypedL2(item.titleLine2.slice(0, i));
          await sleep(28);
        }
        setTypedL2(item.titleLine2);
        await sleep(200);

        setTextStep("sub");
        await sleep(160);
        for (let i = 1; i <= item.context.length; i++) {
          setTypedSub(item.context.slice(0, i));
          await sleep(26);
        }
        setTypedSub(item.context);
        await sleep(250);

        setTextStep("done");
      })(),

      // Worker 2: Right Side Image Corner Drag Expansion
      (async () => {
        await sleep(250);
        // 1. Tiny handle at top-left
        setImageStep("tiny");
        await sleep(220);

        // 2. Drag to expand down-right
        setImageStep("dragging");
        await sleep(850);

        // 3. Completed
        await sleep(400);
        setImageStep("done");
      })(),
    ]);

    setIsCompleted(true);
  };

  const isImageDrawn = imageStep === "dragging" || imageStep === "done";
  const isImageBoxActive = imageStep === "tiny" || imageStep === "dragging";

  return (
    <div
      ref={rowRef}
      className={`group py-12 sm:py-16 transition-opacity duration-700 ${
        hasStarted ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* ──────────────────────────────────────────────────────────── */}
        {/* LEFT COLUMN: Metadata, Main Headline, Subheadline (7 Cols)   */}
        {/* ──────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-7 flex flex-col justify-start">
          {/* Tag & Metric Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-600 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              {item.tag}
            </span>
            <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/60">
              {item.metric}
            </span>
          </div>

          {/* 1. Main Headline (Split 2-line layout: NO text cut-off, NO mid-typing word breaks) */}
          <div className="relative inline-block mb-3 w-fit max-w-full">
            {/* Ghost text for layout reservation */}
            <h3
              className="text-xl xs:text-2xl sm:text-3xl lg:text-[32px] font-heading font-black tracking-tight text-slate-950 leading-[1.18] invisible select-none pointer-events-none"
              aria-hidden="true"
            >
              <span className="block sm:whitespace-nowrap">{item.titleLine1}</span>
              <span className="block sm:whitespace-nowrap">{item.titleLine2}</span>
            </h3>

            {/* Active typed text layer */}
            <h3 className="text-xl xs:text-2xl sm:text-3xl lg:text-[32px] font-heading font-black tracking-tight text-slate-950 leading-[1.18] group-hover:text-blue-600 transition-colors absolute inset-0">
              <span className="block sm:whitespace-nowrap">
                {isCompleted || textStep === "line2" || textStep === "sub" || textStep === "done"
                  ? item.titleLine1
                  : textStep === "line1"
                  ? typedL1
                  : ""}
                {textStep === "line1" && <InlineCaret />}
              </span>
              <span className="block sm:whitespace-nowrap">
                {isCompleted || textStep === "sub" || textStep === "done"
                  ? item.titleLine2
                  : textStep === "line2"
                  ? typedL2
                  : ""}
                {textStep === "line2" && <InlineCaret />}
              </span>
            </h3>

            {/* Visible Figma Bounding Box with 8 nodes & black cursor during headline typing OR on hover */}
            <BoundingBox
              className={`transition-opacity duration-200 ${
                textStep === "line1" || textStep === "line2"
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              }`}
            />
            {(textStep === "line1" || textStep === "line2") && (
              <div className="absolute -bottom-2 -right-2 pointer-events-none z-40">
                <BlackCursor />
              </div>
            )}
          </div>

          {/* 2. Subheadline (e.g. Modern Mediks, Techfrica LLC - never line breaks) */}
          <div className="relative inline-block w-fit">
            {/* Ghost container with pr-2 buffer and whitespace-nowrap */}
            <div
              className="flex items-center gap-2 text-slate-700 font-semibold text-base sm:text-lg font-heading tracking-tight invisible select-none pointer-events-none whitespace-nowrap pr-2"
              aria-hidden="true"
            >
              <Award className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{item.context}</span>
            </div>

            {/* Active typed layer */}
            <div className="flex items-center gap-2 text-slate-700 font-semibold text-base sm:text-lg font-heading tracking-tight absolute inset-0 whitespace-nowrap">
              <Award className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                {isCompleted || textStep === "done"
                  ? item.context
                  : textStep === "sub"
                  ? typedSub
                  : ""}
              </span>
              {textStep === "sub" && <InlineCaret />}
            </div>

            {/* Visible Figma Bounding Box with 8 nodes & black cursor during subheadline typing OR on hover */}
            <BoundingBox
              className={`transition-opacity duration-200 ${
                textStep === "sub"
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              }`}
            />
            {textStep === "sub" && (
              <div className="absolute -bottom-2 -right-2 pointer-events-none z-40">
                <BlackCursor />
              </div>
            )}
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────── */}
        {/* RIGHT COLUMN: Image with Figma Corner Drag Animation (5 Cols)*/}
        {/* ──────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-5 flex justify-start lg:justify-end items-center min-h-[180px] sm:min-h-[220px]">
          <div className="relative w-72 sm:w-80 md:w-[350px] h-44 sm:h-48 md:h-[210px]">
            {/* Expanding Frame pinned to top-left */}
            <div
              className="absolute top-0 left-0 rounded-2xl border border-slate-200/90 bg-white shadow-md p-1.5 overflow-hidden z-20"
              style={{
                width: isImageDrawn ? "100%" : imageStep === "tiny" ? "20px" : "0px",
                height: isImageDrawn ? "100%" : imageStep === "tiny" ? "20px" : "0px",
                opacity: imageStep === "idle" ? 0 : 1,
                transitionProperty: "width, height, opacity",
                transitionDuration: imageStep === "dragging" ? "850ms" : "200ms",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-100 min-w-[280px] min-h-[160px]">
                <Image
                  src={item.image}
                  alt={`${item.titleLine1} ${item.titleLine2}`}
                  fill
                  className="object-cover object-center transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>

            {/* Figma Bounding Box tracking the expanding frame */}
            {isImageBoxActive && (
              <div
                className="absolute top-0 left-0 border-[1.5px] border-dashed border-[#0C8CE9] rounded-2xl pointer-events-none z-30 overflow-visible"
                style={{
                  width: isImageDrawn ? "calc(100% + 4px)" : "24px",
                  height: isImageDrawn ? "calc(100% + 4px)" : "24px",
                  top: "-2px",
                  left: "-2px",
                  transitionProperty: "width, height",
                  transitionDuration: "850ms",
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
                <div className="absolute -bottom-1.5 -right-1.5 size-2.5 bg-[#0C8CE9] border-[1.5px] border-white rounded-[1px] scale-140 ring-2 ring-[#0C8CE9]/40" />

                {/* Black Figma Cursor pinned to bottom-right handle */}
                <div className="absolute -bottom-2.5 -right-2.5 pointer-events-none z-40">
                  <BlackCursor />
                  {/* Live dimension badge */}
                  <div className="absolute top-5 left-4 bg-[#0C8CE9] text-white text-[10px] font-mono px-1.5 py-0.5 rounded shadow-md whitespace-nowrap">
                    350 × 210
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Achievements Section ───────────────────────────────────────────────
export default function Achievements() {
  const [headerStarted, setHeaderStarted] = useState(false);
  const [headerTyped, setHeaderTyped] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const fullTitle = "Key Achievements";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !headerStarted) {
          setHeaderStarted(true);
          (async () => {
            await sleep(200);
            setIsTyping(true);
            for (let i = 1; i <= fullTitle.length; i++) {
              setHeaderTyped(fullTitle.slice(0, i));
              await sleep(35);
            }
            setHeaderTyped(fullTitle);
            await sleep(200);
            setIsTyping(false);
            setIsDone(true);
          })();
        }
      },
      { threshold: 0.25 }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, [headerStarted]);

  return (
    <section id="award" className="py-24 md:py-36 bg-[#F8FAFC] relative overflow-hidden">
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
      `}</style>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="relative mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            Milestones
          </div>

          <div className="relative inline-block w-fit">
            <h2
              className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-slate-900 invisible select-none pointer-events-none whitespace-nowrap pr-2"
              aria-hidden="true"
            >
              {fullTitle}
            </h2>
            <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-slate-900 absolute inset-0 whitespace-nowrap">
              {isDone ? fullTitle : headerTyped}
              {isTyping && <InlineCaret />}
            </h2>
            {isTyping && <BoundingBox />}
            {isTyping && (
              <div className="absolute -bottom-2 -right-2 pointer-events-none z-40">
                <BlackCursor />
              </div>
            )}
          </div>

          <div className="absolute right-0 top-0 hidden sm:block -rotate-6 text-sm font-semibold text-blue-600 bg-blue-50/80 px-4 py-1.5 rounded-full border border-blue-200/60 shadow-2xs">
            The “I made this” moments ✨
          </div>
        </div>

        {/* Milestones List */}
        <div className="flex flex-col divide-y divide-slate-200/90 border-t border-b border-slate-200/90">
          {ACHIEVEMENTS.map((item) => (
            <AchievementRow key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
