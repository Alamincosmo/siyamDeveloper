"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mail, Phone, Send, CheckCircle2, MapPin, Sparkles, AlertCircle, ArrowUpRight } from "lucide-react";

// ─── Interactive 3-Cartoon Mascot Bar ────────────────────────────────────────
interface MascotProps {
  emailStatus: "empty" | "invalid" | "valid";
  isOverForm: boolean;
  isHoveringSubmit: boolean;
}

function CartoonMascots({
  emailStatus,
  isOverForm,
  isHoveringSubmit,
}: MascotProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Character body DOM refs
  const c1Ref = useRef<HTMLDivElement>(null);
  const c2Ref = useRef<HTMLDivElement>(null);
  const c3Ref = useRef<HTMLDivElement>(null);

  // Pupil group DOM refs
  const c1Pupils = useRef<SVGGElement>(null);
  const c2Pupils = useRef<SVGGElement>(null);
  const c3Pupils = useRef<SVGGElement>(null);

  const mouseRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number | null>(null);

  const isConcerned = emailStatus === "invalid";
  const isValid = emailStatus === "valid";
  const isWow = isOverForm || isHoveringSubmit || isValid;

  // Latest isWow reference for continuous smooth RAF execution without effect rebuilds
  const isWowRef = useRef(isWow);
  isWowRef.current = isWow;

  // Continuous linear interpolation (LERP) states for 120fps butter-smooth physics
  const stateRef = useRef({
    c1: { px: 0, py: 0, rot: 0, scaleX: 1, scaleY: 1 },
    c2: { px: 0, py: 0, rot: 0, scaleX: 1, scaleY: 1 },
    c3: { px: 0, py: 0, rot: 0, scaleX: 1, scaleY: 1 },
  });

  useEffect(() => {
    mouseRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Smooth physics loop with friction damping
    const updateTracking = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerY = rect.top + rect.height * 0.65;
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const currentWow = isWowRef.current;

        const lerpChar = (
          charCenterX: number,
          state: { px: number; py: number; rot: number; scaleX: number; scaleY: number },
          bodyEl: HTMLDivElement | null,
          pupilsGroup: SVGGElement | null,
          maxPupil = 9
        ) => {
          if (!bodyEl) return;
          const dx = mx - charCenterX;
          const dy = my - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);

          // Target pupil offset
          const pupilDist = Math.min(dist / 30, maxPupil);
          const targetPx = Math.cos(angle) * pupilDist;
          const targetPy = Math.sin(angle) * pupilDist;

          // Target lean angle
          const maxLean = 14;
          const targetRot = Math.max(-maxLean, Math.min(maxLean, (dx / (window.innerWidth || 1200)) * 26));

          // Target elastic squash/stretch
          let targetScaleX = 1;
          let targetScaleY = 1;

          if (currentWow) {
            targetScaleX = 1.05;
            targetScaleY = 0.94;
          } else if (dist > 180) {
            const stretch = Math.min((dist - 180) / 1400, 0.14);
            targetScaleY = 1 + stretch;
            targetScaleX = 1 - stretch * 0.6;
          }

          // Friction damping LERP (avoids any state jitter or glitching)
          state.px += (targetPx - state.px) * 0.16;
          state.py += (targetPy - state.py) * 0.16;
          state.rot += (targetRot - state.rot) * 0.16;
          state.scaleX += (targetScaleX - state.scaleX) * 0.16;
          state.scaleY += (targetScaleY - state.scaleY) * 0.16;

          // Apply directly to DOM without fighting CSS transitions
          bodyEl.style.transform = `translate(${state.px * 0.35}px, ${
            currentWow ? 2 : 0
          }px) rotate(${state.rot}deg) scale(${state.scaleX}, ${state.scaleY})`;

          if (pupilsGroup) {
            pupilsGroup.style.transform = `translate(${state.px}px, ${state.py}px)`;
          }
        };

        lerpChar(rect.left + rect.width * 0.22, stateRef.current.c1, c1Ref.current, c1Pupils.current, 8);
        lerpChar(rect.left + rect.width * 0.5, stateRef.current.c2, c2Ref.current, c2Pupils.current, 10);
        lerpChar(rect.left + rect.width * 0.78, stateRef.current.c3, c3Ref.current, c3Pupils.current, 8);
      }

      animFrameRef.current = requestAnimationFrame(updateTracking);
    };

    animFrameRef.current = requestAnimationFrame(updateTracking);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-md mx-auto h-32 sm:h-36 flex items-end justify-center gap-2 sm:gap-5 select-none pointer-events-none overflow-visible -mb-px z-10"
    >
      {/* ────────────────────────────────────────────────────────────── */}
      {/* CHARACTER 1: Cool & Pensive (Lilac Purple)                     */}
      {/* ────────────────────────────────────────────────────────────── */}
      <div
        ref={c1Ref}
        className="relative flex flex-col items-center origin-bottom will-change-transform"
      >
        {isConcerned && (
          <div className="absolute -top-7 -left-1 animate-bounce">
            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-300 font-mono text-[10px] font-bold shadow-xs">
              @?
            </span>
          </div>
        )}

        <svg width="88" height="98" viewBox="0 0 88 98" fill="none" className="overflow-visible">
          <ellipse cx="44" cy="94" rx="36" ry="4" fill="#0F172A" opacity="0.08" />

          {/* Body */}
          <rect x="6" y="6" width="76" height="88" rx="32" fill="url(#c1Grad)" />
          <rect x="18" y="28" width="52" height="58" rx="22" fill="#C4B5FD" opacity="0.3" />

          {/* Eye Whites */}
          <circle cx="28" cy="40" r="9.5" fill="#FFFFFF" />
          <circle cx="60" cy="40" r="9.5" fill="#FFFFFF" />

          {/* Pupils Group - translated via lerp RAF */}
          <g ref={c1Pupils}>
            <circle cx="28" cy="40" r="4.5" fill="#2E1065" />
            <circle cx="29.5" cy="38.5" r="1.6" fill="#FFFFFF" />
            <circle cx="60" cy="40" r="4.5" fill="#2E1065" />
            <circle cx="61.5" cy="38.5" r="1.6" fill="#FFFFFF" />
          </g>

          {/* Eyebrows */}
          <path
            d={
              isConcerned
                ? "M20 28 Q28 33 36 30"
                : isWow
                ? "M20 27 Q28 22 36 26"
                : "M21 30 Q28 26 35 29"
            }
            stroke="#4C1D95"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d={
              isConcerned
                ? "M52 30 Q60 33 68 28"
                : isWow
                ? "M52 26 Q60 22 68 27"
                : "M53 29 Q60 26 67 30"
            }
            stroke="#4C1D95"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Mouth (Permanent SVGs with Smooth Opacity Switching) */}
          <g className={`transition-opacity duration-200 ${isConcerned ? "opacity-100" : "opacity-0"}`}>
            <path d="M36 60 Q44 56 52 60" stroke="#4C1D95" strokeWidth="3" strokeLinecap="round" />
          </g>
          <g className={`transition-opacity duration-200 ${!isConcerned && isWow ? "opacity-100" : "opacity-0"}`}>
            <ellipse cx="44" cy="62" rx="7" ry="8.5" fill="#4C1D95" />
            <ellipse cx="44" cy="66" rx="4.5" ry="3.5" fill="#F43F5E" />
          </g>
          <g className={`transition-opacity duration-200 ${!isConcerned && !isWow ? "opacity-100" : "opacity-0"}`}>
            <path d="M37 60 Q44 65 51 60" stroke="#4C1D95" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* Cheeks */}
          <circle cx="17" cy="49" r="4.5" fill="#A78BFA" opacity={isWow ? "0.8" : "0.4"} />
          <circle cx="71" cy="49" r="4.5" fill="#A78BFA" opacity={isWow ? "0.8" : "0.4"} />

          {/* Paws on card edge */}
          <ellipse cx="26" cy="93" rx="7" ry="4" fill="#7C3AED" />
          <ellipse cx="62" cy="93" rx="7" ry="4" fill="#7C3AED" />

          <defs>
            <linearGradient id="c1Grad" x1="6" y1="6" x2="82" y2="94" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9333EA" />
              <stop offset="1" stopColor="#7E22CE" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ────────────────────────────────────────────────────────────── */}
      {/* CHARACTER 2: Happy & Smiley Peachy Mascot (Peach / Orange)    */}
      {/* ────────────────────────────────────────────────────────────── */}
      <div
        ref={c2Ref}
        className="relative flex flex-col items-center origin-bottom will-change-transform z-20"
      >
        {isConcerned ? (
          <div className="absolute -top-7 right-1 animate-pulse text-amber-500 font-bold text-sm">
            💧
          </div>
        ) : isWow ? (
          <div className="absolute -top-7 -right-1 animate-bounce text-amber-400 font-bold text-sm">
            ✨
          </div>
        ) : null}

        <svg width="102" height="114" viewBox="0 0 102 114" fill="none" className="overflow-visible">
          <ellipse cx="51" cy="110" rx="42" ry="4.5" fill="#0F172A" opacity="0.08" />

          {/* Sprout Antenna */}
          <path d="M51 14 Q51 3 59 5" stroke="#EA580C" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="60" cy="5" r="3.5" fill="#F97316" />

          {/* Main Body */}
          <rect x="7" y="14" width="88" height="96" rx="40" fill="url(#c2Grad)" />

          {/* Bright Rosy Cheeks */}
          <circle cx="20" cy="62" r="6.5" fill="#EF4444" opacity={isWow ? "0.7" : "0.4"} />
          <circle cx="82" cy="62" r="6.5" fill="#EF4444" opacity={isWow ? "0.7" : "0.4"} />

          {/* Eye Whites */}
          <circle cx="34" cy="46" r="11" fill="#FFFFFF" />
          <circle cx="68" cy="46" r="11" fill="#FFFFFF" />

          {/* Pupils Group - translated via lerp RAF */}
          <g ref={c2Pupils}>
            {/* Standard pupil circles */}
            <circle cx="34" cy="46" r={isWow ? "6.5" : "5.2"} fill="#7C2D12" />
            <circle cx="32" cy="44" r={isWow ? "2.6" : "1.8"} fill="#FFFFFF" />
            <circle cx="36" cy="48" r="1.2" fill="#FFFFFF" />

            <circle cx="68" cy="46" r={isWow ? "6.5" : "5.2"} fill="#7C2D12" />
            <circle cx="66" cy="44" r={isWow ? "2.6" : "1.8"} fill="#FFFFFF" />
            <circle cx="70" cy="48" r="1.2" fill="#FFFFFF" />
          </g>

          {/* Mouth (Permanent SVGs with Smooth Opacity Switching) */}
          <g className={`transition-opacity duration-200 ${isConcerned ? "opacity-100" : "opacity-0"}`}>
            <circle cx="51" cy="68" r="5" fill="#7C2D12" />
          </g>
          <g className={`transition-opacity duration-200 ${!isConcerned && isWow ? "opacity-100" : "opacity-0"}`}>
            <path
              d="M36 63 Q51 86 66 63 Z"
              fill="#7C2D12"
              stroke="#7C2D12"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path d="M42 74 Q51 84 60 74 Z" fill="#F43F5E" />
          </g>
          <g className={`transition-opacity duration-200 ${!isConcerned && !isWow ? "opacity-100" : "opacity-0"}`}>
            <path d="M37 66 Q51 77 65 66" stroke="#7C2D12" strokeWidth="3.6" strokeLinecap="round" />
          </g>

          {/* Paws on card edge */}
          <ellipse cx="32" cy="109" rx="8" ry="4.5" fill="#EA580C" />
          <ellipse cx="70" cy="109" rx="8" ry="4.5" fill="#EA580C" />

          <defs>
            <linearGradient id="c2Grad" x1="7" y1="14" x2="95" y2="110" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FB923C" />
              <stop offset="1" stopColor="#EA580C" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ────────────────────────────────────────────────────────────── */}
      {/* CHARACTER 3: Curious & Excited (Sky Blue)                      */}
      {/* ────────────────────────────────────────────────────────────── */}
      <div
        ref={c3Ref}
        className="relative flex flex-col items-center origin-bottom will-change-transform"
      >
        <svg width="88" height="98" viewBox="0 0 88 98" fill="none" className="overflow-visible">
          <ellipse cx="44" cy="94" rx="36" ry="4" fill="#0F172A" opacity="0.08" />

          {/* Body */}
          <rect x="6" y="8" width="76" height="86" rx="30" fill="url(#c3Grad)" />
          <rect x="18" y="28" width="52" height="56" rx="20" fill="#38BDF8" opacity="0.35" />

          {/* Eye Whites */}
          <circle cx="28" cy="40" r="9.5" fill="#FFFFFF" />
          <circle cx="60" cy="40" r="9.5" fill="#FFFFFF" />

          {/* Pupils Group - translated via lerp RAF */}
          <g ref={c3Pupils}>
            <circle cx="28" cy="40" r="4.6" fill="#082F49" />
            <circle cx="29.5" cy="38.5" r="1.6" fill="#FFFFFF" />
            <circle cx="60" cy="40" r="4.6" fill="#082F49" />
            <circle cx="61.5" cy="38.5" r="1.6" fill="#FFFFFF" />
          </g>

          {/* Eyebrows */}
          <path
            d={
              isConcerned
                ? "M20 28 Q27 32 35 29"
                : isWow
                ? "M21 26 Q28 20 35 25"
                : "M21 28 Q28 24 35 27"
            }
            stroke="#0369A1"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d={
              isConcerned
                ? "M53 29 Q61 32 68 28"
                : isWow
                ? "M53 25 Q60 20 67 26"
                : "M53 27 Q60 24 67 28"
            }
            stroke="#0369A1"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Mouth (Permanent SVGs with Smooth Opacity Switching) */}
          <g className={`transition-opacity duration-200 ${isConcerned ? "opacity-100" : "opacity-0"}`}>
            <circle cx="44" cy="62" r="4.5" fill="#0C4A6E" />
          </g>
          <g className={`transition-opacity duration-200 ${!isConcerned && isWow ? "opacity-100" : "opacity-0"}`}>
            <ellipse cx="44" cy="63" rx="7.5" ry="8" fill="#0C4A6E" />
            <ellipse cx="44" cy="67" rx="4.5" ry="3.5" fill="#38BDF8" />
          </g>
          <g className={`transition-opacity duration-200 ${!isConcerned && !isWow ? "opacity-100" : "opacity-0"}`}>
            <path d="M36 61 Q44 68 53 62" stroke="#0C4A6E" strokeWidth="3.2" strokeLinecap="round" />
          </g>

          {/* Cheeks */}
          <circle cx="17" cy="49" r="4.5" fill="#38BDF8" opacity={isWow ? "0.8" : "0.5"} />
          <circle cx="71" cy="49" r="4.5" fill="#38BDF8" opacity={isWow ? "0.8" : "0.5"} />

          {/* Paws on card edge */}
          <ellipse cx="26" cy="93" rx="7" ry="4" fill="#0284C7" />
          <ellipse cx="62" cy="93" rx="7" ry="4" fill="#0284C7" />

          <defs>
            <linearGradient id="c3Grad" x1="6" y1="8" x2="82" y2="94" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0284C7" />
              <stop offset="1" stopColor="#0369A1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

// ─── Main Footer & Get in Touch Component ─────────────────────────────────────
export default function Footer() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    message: "",
  });

  const [isOverForm, setIsOverForm] = useState(false);
  const [isHoveringSubmit, setIsHoveringSubmit] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  // Email validation status
  const emailStatus: "empty" | "invalid" | "valid" = (() => {
    if (!formData.email) return "empty";
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    if (isValid) return "valid";
    return "invalid";
  })();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullname && formData.email && emailStatus === "valid") {
      setSubmitted(true);
    }
  };

  return (
    <footer
      ref={sectionRef}
      id="contact"
      className="pt-24 sm:pt-32 pb-0 bg-[#F8FAFC] relative overflow-hidden"
    >
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

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10 mb-20 sm:mb-28">
        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ──────────────────────────────────────────────────────────── */}
          {/* LEFT SIDE: Clean, Small, Left-Aligned "Get in touch" (5 Cols)*/}
          {/* ──────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/60 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3.5 shadow-2xs w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Contact</span>
            </div>

            {/* Small & Clean Left-Aligned Heading (No Box Enclosure) */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black font-heading tracking-tight text-slate-900 leading-[1.15] mb-4">
              Get in touch
            </h2>

            <p className="text-slate-600 font-normal text-sm sm:text-base leading-relaxed mb-8 max-w-md">
              Have an upcoming product, technical architecture challenge, or full-stack web project? Fill out the form or reach out directly. I respond within 24 hours.
            </p>

            {/* Direct Contact Cards */}
            <div className="flex flex-col gap-3.5 mb-8">
              <a
                href="mailto:siyam@doctorshero.com"
                className="group flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-blue-400 hover:shadow-sm transition-all"
              >
                <div className="size-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider">Email Direct</div>
                  <div className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    siyam@doctorshero.com
                  </div>
                </div>
              </a>

              <a
                href="tel:+8801312399777"
                className="group flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-blue-400 hover:shadow-sm transition-all"
              >
                <div className="size-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider">Phone / WhatsApp</div>
                  <div className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    +880 131 239 9777
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/60 border border-slate-200/60">
                <div className="size-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider">Location</div>
                  <div className="text-sm font-semibold text-slate-700">
                    Dhaka, Bangladesh • Available Worldwide
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────────── */}
          {/* RIGHT SIDE: Mascots Pinned Directly on Form Card (7 Cols)   */}
          {/* ──────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-end">
            <div className="w-full max-w-lg">
              {/* 3 Cartoon Characters Pinned on Top Border with ZERO Gap */}
              <CartoonMascots
                emailStatus={emailStatus}
                isOverForm={isOverForm}
                isHoveringSubmit={isHoveringSubmit}
              />

              {/* Form Container (Clean Border directly connected to mascots) */}
              <div
                ref={formCardRef}
                onMouseEnter={() => setIsOverForm(true)}
                onMouseLeave={() => setIsOverForm(false)}
                className="relative rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-9 z-20"
              >
                {submitted ? (
                  <div className="py-12 text-center flex flex-col items-center gap-4">
                    <div className="size-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 className="size-8" />
                    </div>
                    <h4 className="text-2xl font-heading font-black text-slate-900">
                      Message Received!
                    </h4>
                    <p className="text-sm text-slate-600 font-medium max-w-sm">
                      Thank you, <span className="font-bold text-slate-900">{formData.fullname}</span>! I will review your inquiry and get back to you shortly at{" "}
                      <span className="font-mono font-bold text-blue-600">{formData.email}</span>.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="fullname"
                        className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5"
                      >
                        Your Name *
                      </label>
                      <input
                        id="fullname"
                        type="text"
                        required
                        value={formData.fullname}
                        onChange={(e) =>
                          setFormData({ ...formData, fullname: e.target.value })
                        }
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white text-slate-900 text-sm font-medium outline-none transition-all"
                      />
                    </div>

                    {/* Email Address with Live Dynamic Validation */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          htmlFor="email"
                          className="block text-xs font-bold uppercase tracking-wider text-slate-600"
                        >
                          Email Address *
                        </label>
                        {emailStatus === "invalid" && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-500">
                            <AlertCircle className="w-3 h-3" />
                            Please include &apos;@&apos; and domain
                          </span>
                        )}
                        {emailStatus === "valid" && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                            <CheckCircle2 className="w-3 h-3" />
                            Valid email
                          </span>
                        )}
                      </div>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="john@example.com"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-slate-900 text-sm font-medium outline-none transition-all ${
                          emailStatus === "invalid"
                            ? "border-rose-400 focus:border-rose-500 bg-rose-50/20"
                            : emailStatus === "valid"
                            ? "border-emerald-400 focus:border-emerald-500 bg-emerald-50/20"
                            : "border-slate-200 focus:border-blue-500 focus:bg-white"
                        }`}
                      />
                    </div>

                    {/* Message Details */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5"
                      >
                        Project Details
                      </label>
                      <textarea
                        id="message"
                        rows={3}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Tell me about your product, timelines, and technical goals..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white text-slate-900 text-sm font-medium outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      onMouseEnter={() => setIsHoveringSubmit(true)}
                      onMouseLeave={() => setIsHoveringSubmit(false)}
                      className="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                    >
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────── */}
      {/* BLACK FOOTER BOTTOM BAR: Designed and Developed by Robin/Alamin */}
      {/* ────────────────────────────────────────────────────────────── */}
      <div className="w-full bg-[#030712] border-t border-slate-800/80 py-8 px-6 sm:px-12 relative z-30">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left: Brand & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-slate-400 text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-2.5">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-slate-200 tracking-tight">Md Siyam</span>
              <span className="text-slate-600">•</span>
              <span>© {new Date().getFullYear()} Senior Full-Stack Engineer</span>
            </div>
          </div>

          {/* Right: Designed and Developed by Robin/Alamin + Direct Link */}
          <div className="flex items-center gap-4 sm:gap-5 flex-wrap justify-center sm:justify-end">
            <div className="text-center sm:text-right">
              <span className="text-xs text-slate-400 font-sans block">
                Designed and Developed by{" "}
                <span className="text-slate-100 font-bold tracking-tight">
                  Robin/Alamin
                </span>
              </span>
            </div>

            <a
              href="https://robin.pathfinderpeko.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 border border-blue-400/30 transition-all hover:scale-105 active:scale-95 group cursor-pointer"
            >
              <span>Visit Robin</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
