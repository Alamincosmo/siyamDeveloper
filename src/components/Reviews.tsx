"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  handle: string;
  avatar: string;
  text: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 0,
    name: "Jessic Moore",
    role: "Founder, Apex Labs",
    handle: "@jessicm",
    avatar: "/images/avatar/aidem-2.jpg",
    text: "Everything is now in one place, and the experience is incredibly smooth. Siyam turned our scattered workflows into a single cohesive platform.",
    rating: 5,
  },
  {
    id: 1,
    name: "Chris Max",
    role: "VP of Engineering, CloudScale",
    handle: "@maxicris",
    avatar: "/images/avatar/avatar-2.png",
    text: "Handled everything from responsive frontend UX to complex backend data pipelines without missing a single beat. Exceptional developer.",
    rating: 5,
  },
  {
    id: 2,
    name: "Aiden Vance",
    role: "Product Lead, MedTech Systems",
    handle: "@aiden_v",
    avatar: "/images/avatar/aiden.jpg",
    text: "Professional, skilled, and fun to work with. Made complex architectural challenges feel completely effortless and delivered ahead of schedule.",
    rating: 5,
  },
  {
    id: 3,
    name: "Alex Rivera",
    role: "CTO, NextGen Media",
    handle: "@alex_riv",
    avatar: "/images/avatar/avata3.png",
    text: "A game-changer for our startup. Brought both high-level engineering strategy and pixel-perfect execution to the table.",
    rating: 5,
  },
];

export default function Reviews() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1200);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Measure window width for responsive arc calculation
  useEffect(() => {
    const updateDimensions = () => {
      setWindowWidth(window.innerWidth);
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // GSAP ScrollTrigger setup for pinned scrubbed arc animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=2200",
        pin: trackRef.current,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Calculate current active index based on scrollProgress
  const currentFocus = scrollProgress * (TESTIMONIALS.length - 1);
  const activeIndex = Math.min(
    Math.max(Math.round(currentFocus), 0),
    TESTIMONIALS.length - 1
  );
  const activeReview = TESTIMONIALS[activeIndex];

  // Manual Jump for arrow buttons
  const goToReview = (index: number) => {
    const targetIdx = (index + TESTIMONIALS.length) % TESTIMONIALS.length;
    const targetProgress = targetIdx / (TESTIMONIALS.length - 1);
    setScrollProgress(targetProgress);

    // If ScrollTrigger is active, scroll to the corresponding position
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const targetScroll = scrollTop + rect.top + targetProgress * 2200;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  // Cohesive orbital dimensions (cards feel gravitationally connected around the central profile)
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  const arcWidth = isMobile ? 300 : isTablet ? 390 : 480;
  const arcDrop = isMobile ? 60 : isTablet ? 78 : 95;

  return (
    <section
      id="review"
      ref={sectionRef}
      className="relative bg-[#F8FAFC] overflow-visible"
      style={{ height: "3000px" }} // Allows smooth multi-stage scrolling along the arc
    >
      {/* Pinned Viewport Container */}
      <div
        ref={trackRef}
        className="w-full h-screen flex flex-col justify-between pt-8 sm:pt-12 pb-6 sm:pb-8 px-6 relative z-10 overflow-hidden"
      >
        {/* Top Header with Balanced Spacing */}
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-4 sm:mb-8 z-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-2">
              Client Feedback
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-slate-900">
              Reviews That Speak Volumes
            </h2>
          </div>

          {/* Social Proof Star Pill */}
          <div className="flex items-center gap-4 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-[4px_4px_16px_#D1D9E6,-4px_-4px_16px_#FFFFFF] border border-slate-200/70 w-fit">
            <div className="flex -space-x-2.5 overflow-hidden">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.id}
                  className="size-8 sm:size-9 rounded-full ring-2 ring-white relative overflow-hidden bg-slate-100"
                >
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                </div>
              ))}
            </div>

            <div className="text-left">
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-amber-400 stroke-amber-400" />
                ))}
              </div>
              <p className="text-xs font-bold text-slate-600">
                Trusted by 50+ founders & tech leads
              </p>
            </div>
          </div>
        </div>

        {/* Center Stage: Orbiting Cards Around Central Profile Anchor */}
        <div className="relative w-full max-w-5xl mx-auto flex-1 flex flex-col items-center justify-center -mt-2 sm:-mt-4">

          {/* Subtle Gravitational Orbit Halo */}
          <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] sm:w-[680px] md:w-[820px] h-[340px] sm:h-[420px] rounded-full border border-blue-500/10 pointer-events-none z-0" />

          {/* Gliding Review Cards: Orbiting Along the Curve with Inward Gravitational Tilt */}
          <div className="relative w-full h-[150px] sm:h-[165px] flex items-center justify-center select-none z-20">
            {TESTIMONIALS.map((review, i) => {
              // Offset relative to current scroll focus point:
              // offset > 0: card is on the right side of orbit
              // offset = 0: card is at zenith apex directly above profile
              // offset < 0: card is on the left side of orbit
              const offset = i - currentFocus;

              // Arc coordinates:
              const xPos = offset * arcWidth;
              const yPos = Math.pow(offset, 2) * arcDrop;
              // Card tilts inward towards the central profile anchor
              const rotation = Math.max(Math.min(offset * 14, 22), -22);

              // Gravitational scale and smooth visibility falloff
              const distance = Math.abs(offset);
              const isActive = distance < 0.45;
              const scale = Math.max(1 - distance * 0.16, 0.78);
              // Keeps nearby orbiting cards gently visible (around 25-30% opacity)
              const opacity = Math.max(1 - distance * 0.78, 0);

              // Clip far-off cards
              if (distance > 1.6) return null;

              return (
                <div
                  key={review.id}
                  onClick={() => goToReview(i)}
                  style={{
                    transform: `translate3d(${xPos}px, ${yPos}px, 0) rotate(${rotation}deg) scale(${scale})`,
                    opacity,
                    zIndex: isActive ? 40 : 20 - Math.round(distance * 5),
                    transition: "transform 0.1s ease-out, opacity 0.15s ease-out",
                  }}
                  className={`absolute top-0 w-[275px] sm:w-[350px] md:w-[395px] p-5 sm:p-6 rounded-3xl cursor-pointer transition-shadow duration-300 ${
                    isActive
                      ? "bg-white shadow-[0_16px_40px_-10px_rgba(59,130,246,0.22),0_6px_18px_-4px_rgba(15,23,42,0.08)] border-2 border-blue-500/85"
                      : "bg-white/85 backdrop-blur-sm shadow-[0_8px_20px_-4px_rgba(15,23,42,0.06)] border border-slate-200/60"
                  }`}
                >
                  {/* Top Quote Icon & Stars */}
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: review.rating }).map((_, starIdx) => (
                        <Star key={starIdx} className="size-3.5 fill-amber-400 stroke-amber-400" />
                      ))}
                    </div>
                    <Quote className="size-5 text-blue-400 opacity-80" />
                  </div>

                  {/* Review Quote Body */}
                  <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed italic line-clamp-3">
                    &ldquo;{review.text}&rdquo;
                  </p>

                  {/* Downward Tag Pointer (Pointing towards profile with small clean gap) */}
                  {isActive && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-blue-500/85 rotate-45 transform z-30" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Middle Space: Central Profile Anchor (with 8-10px clean gap below the triangle pointer) */}
          <div className="relative mt-3.5 sm:mt-4 flex flex-col items-center justify-center z-30">
            {/* Ambient Glow */}
            <div className="absolute size-28 sm:size-36 bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-sky-400/20 blur-xl rounded-full pointer-events-none" />

            {/* Profile Avatar Frame */}
            <div className="relative size-20 sm:size-22 rounded-full p-1 bg-white shadow-[0_8px_24px_rgba(59,130,246,0.22)] ring-4 ring-blue-500">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-100">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeReview.id}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.08 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={activeReview.avatar}
                      alt={activeReview.name}
                      fill
                      priority
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Online / Active Indicator Dot */}
              <div className="absolute bottom-0.5 right-0.5 size-4 bg-emerald-500 border-2 border-white rounded-full shadow-sm" />
            </div>

            {/* Profile Meta Information (Name & Role) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReview.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="mt-2.5 text-center"
              >
                <h4 className="font-heading font-black text-lg sm:text-xl text-slate-900 tracking-tight leading-tight">
                  {activeReview.name}
                </h4>
                <div className="flex items-center justify-center gap-2 mt-0.5">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    {activeReview.role}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {activeReview.handle}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom Navigation & Scroll Indicator */}
        <div className="max-w-md mx-auto w-full flex items-center justify-between pt-3 sm:pt-4 border-t border-slate-200/60 z-20">
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => goToReview(dotIdx)}
                className={`transition-all duration-300 rounded-full ${
                  dotIdx === activeIndex
                    ? "w-8 h-2 bg-blue-600 shadow-sm"
                    : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to review ${dotIdx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => goToReview(activeIndex - 1)}
              className="p-2 rounded-full bg-white hover:bg-slate-50 text-slate-700 shadow-sm border border-slate-200 transition-all active:scale-95"
              aria-label="Previous review"
            >
              <ChevronLeft className="size-4" />
            </button>
            <span className="text-xs font-bold text-slate-400 tabular-nums">
              0{activeIndex + 1} / 0{TESTIMONIALS.length}
            </span>
            <button
              onClick={() => goToReview(activeIndex + 1)}
              className="p-2 rounded-full bg-white hover:bg-slate-50 text-slate-700 shadow-sm border border-slate-200 transition-all active:scale-95"
              aria-label="Next review"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
