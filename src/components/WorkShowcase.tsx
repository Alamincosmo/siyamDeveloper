"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  image: string;
  live_url: string;
  metrics: string;
  bullets: string[];
}

const SIYAM_PROJECTS: Project[] = [
  {
    id: "01",
    title: "Modern Mediks",
    tagline: "HealthTech Clinic OS",
    category: "Healthcare SaaS",
    image: "/images/work/01.png",
    live_url: "#",
    metrics: "HIPAA Compliant • 99.98% Uptime",
    bullets: [
      "HIPAA-compliant Clinic OS with real-time patient queue",
      "Sub-second Electronic Health Records sync & telehealth",
      "Engineered with Next.js, TypeScript, PostgreSQL & WebSockets",
    ],
  },
  {
    id: "02",
    title: "Techfrica LLC",
    tagline: "Enterprise Automation",
    category: "Cloud Systems",
    image: "/images/work/02.png",
    live_url: "#",
    metrics: "<100ms Latency • Multi-tenant ECS",
    bullets: [
      "Distributed enterprise automation suite & event streaming",
      "High-concurrency microservices with <100ms latency",
      "Built with Docker, AWS ECS, Redis & FastAPI",
    ],
  },
  {
    id: "03",
    title: "House of Change",
    tagline: "Digital Platform",
    category: "Enterprise Backend",
    image: "/images/work/03.png",
    live_url: "#",
    metrics: "Resilient Caching • Secure Payments",
    bullets: [
      "High-volume recurring subscription & membership pipeline",
      "Redis distributed caching with zero payment dropouts",
      "Built with Next.js, Node.js, Stripe & Supabase",
    ],
  },
  {
    id: "04",
    title: "ScaleOS",
    tagline: "Workflow Operating Suite",
    category: "Automation SaaS",
    image: "/images/work/gallery-1.png",
    live_url: "#",
    metrics: "Autonomous Workflows • Zero Cloud Waste",
    bullets: [
      "Autonomous workflow orchestrator & cron job engine",
      "Eliminates operational bottlenecks with AI automations",
      "Engineered with Python, Celery, Redis & Webhooks",
    ],
  },
];

export default function WorkShowcase() {
  const [projects] = useState<Project[]>(SIYAM_PROJECTS);
  const [activeProjectIdx, setActiveProjectIdx] = useState<number>(0);

  // Outer Scroll Track: 900vh provides a relaxed, luxurious, buttery-smooth scroll journey
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  // Sticky Viewport Container: Physically locked to viewport top: 0 with h-screen
  const stageRef = useRef<HTMLDivElement>(null);
  const cameraViewportRef = useRef<HTMLDivElement>(null);
  const textTrackRef = useRef<HTMLDivElement>(null);

  // Living Water Background Waves & Parallax Shapes
  const wave1Ref = useRef<SVGPathElement>(null);
  const wave2Ref = useRef<SVGPathElement>(null);
  const wave3Ref = useRef<SVGPathElement>(null);
  const shapeRingRef = useRef<HTMLDivElement>(null);
  const shapePillRef = useRef<HTMLDivElement>(null);
  const shapeDiamondRef = useRef<HTMLDivElement>(null);
  const shapeOrbRef = useRef<HTMLDivElement>(null);
  const canvasGlowRef = useRef<HTMLDivElement>(null);

  // Screen 1: Work Showcase (Kinetic Typewriter Reveal)
  const screen1Ref = useRef<HTMLDivElement>(null);

  // Screen 2: Pure Impact
  const screen2Ref = useRef<HTMLDivElement>(null);
  const wordPureRef = useRef<HTMLSpanElement>(null);
  const wordImpactRef = useRef<HTMLSpanElement>(null);
  const badgeShowcaseRef = useRef<HTMLDivElement>(null);

  // Morphing Droplet to 3D Isometric Card to Fullscreen Canvas
  const morphCanvasRef = useRef<HTMLDivElement>(null);
  const dropletAuraRef = useRef<HTMLDivElement>(null);

  // 3D Cylinder Cards Container & Card Wrappers
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardWrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const activeProjectIdxRef = useRef<number>(0);
  const currentDrumProgressRef = useRef<number>(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!scrollTrackRef.current) return;

      const screen1Chars =
        screen1Ref.current?.querySelectorAll<HTMLSpanElement>(".type-char");

      // ─────────────────────────────────────────────────────────────
      // CONTINUOUS IDLE LOOPS: Waves breathing & shapes floating gently
      // ─────────────────────────────────────────────────────────────
      if (wave1Ref.current) {
        gsap.to(wave1Ref.current, {
          y: 20,
          duration: 4.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      if (wave2Ref.current) {
        gsap.to(wave2Ref.current, {
          y: -24,
          duration: 5.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      if (wave3Ref.current) {
        gsap.to(wave3Ref.current, {
          y: 14,
          duration: 4.0,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (shapeRingRef.current) {
        gsap.to(shapeRingRef.current, {
          y: 22,
          rotate: 30,
          duration: 6.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      if (shapePillRef.current) {
        gsap.to(shapePillRef.current, {
          y: -20,
          rotate: -15,
          duration: 5.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      if (shapeDiamondRef.current) {
        gsap.to(shapeDiamondRef.current, {
          y: 18,
          rotate: -22,
          duration: 4.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      if (canvasGlowRef.current) {
        gsap.to(canvasGlowRef.current, {
          x: 160,
          y: 100,
          scale: 1.25,
          duration: 7.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Master Scrubbed Timeline (Calibrated across 1600vh for ultra-deliberate, slow reading pacing)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollTrackRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6, // Fast, snappy, responsive scrolling (reduced lag)
          invalidateOnRefresh: true,
        },
      });

      // ─────────────────────────────────────────────────────────────
      // 0. LIVING BACKGROUND: Water Waves continuous glide across scroll
      // ─────────────────────────────────────────────────────────────
      if (wave1Ref.current) {
        tl.to(wave1Ref.current, { x: "-120px", duration: 1.0, ease: "none" }, 0);
      }
      if (wave2Ref.current) {
        tl.to(wave2Ref.current, { x: "140px", duration: 1.0, ease: "none" }, 0);
      }
      if (wave3Ref.current) {
        tl.to(wave3Ref.current, { x: "-80px", duration: 1.0, ease: "none" }, 0);
      }

      // Parallax shapes interactive movement during Screen 1
      if (shapeRingRef.current) {
        tl.fromTo(
          shapeRingRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.08, ease: "power2.out" },
          0
        );
      }
      if (shapePillRef.current) {
        tl.fromTo(
          shapePillRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.08, ease: "power2.out" },
          0
        );
      }
      if (shapeDiamondRef.current) {
        tl.fromTo(
          shapeDiamondRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.08, ease: "power2.out" },
          0
        );
      }

      // ─────────────────────────────────────────────────────────────
      // 1. SCREEN 1: "Work Showcase" (Snappy Reveal)
      //    (0.00 -> 0.10) + Hold (0.10 -> 0.20)
      // ─────────────────────────────────────────────────────────────
      tl.fromTo(
        screen1Ref.current,
        {
          x: "8vw",
          opacity: 0,
        },
        {
          x: "0vw",
          opacity: 1,
          duration: 0.08,
          ease: "power2.out",
        },
        0
      );

      if (screen1Chars && screen1Chars.length > 0) {
        tl.fromTo(
          screen1Chars,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.005,
            duration: 0.08,
            ease: "power2.out",
          },
          0.01
        );
      }

      // ─────────────────────────────────────────────────────────────
      // 2. SCREEN 1 DISSOLVE & SLIDE LEFT (After hold 0.10 -> 0.20)
      //    (0.20 -> 0.25)
      // ─────────────────────────────────────────────────────────────
      if (screen1Chars && screen1Chars.length > 0) {
        tl.to(
          screen1Chars,
          {
            x: -40,
            opacity: 0,
            stagger: { amount: 0.02, from: "start" },
            duration: 0.04,
            ease: "power2.in",
          },
          0.20
        );
      }

      tl.to(
        screen1Ref.current,
        {
          x: "-12vw",
          opacity: 0,
          duration: 0.04,
          ease: "power2.in",
        },
        0.21
      );

      // ─────────────────────────────────────────────────────────────
      // 3. SCREEN 2: "Pure Impact" (FAST & CRISP)
      //    (0.26 -> 0.35) + Hold Time (0.35 -> 0.47)
      // ─────────────────────────────────────────────────────────────
      // Background shapes subtle gentle drift (no abrupt jump/glitch)
      if (shapeRingRef.current) {
        tl.to(
          shapeRingRef.current,
          { x: "-20px", y: "15px", duration: 0.08, ease: "power1.out" },
          0.26
        );
      }
      if (shapePillRef.current) {
        tl.to(
          shapePillRef.current,
          { x: "20px", y: "-10px", duration: 0.08, ease: "power1.out" },
          0.26
        );
      }
      if (shapeDiamondRef.current) {
        tl.to(
          shapeDiamondRef.current,
          { x: "-15px", y: "-15px", duration: 0.08, ease: "power1.out" },
          0.26
        );
      }

      // Word 1: "Pure" slides in smoothly & quickly
      if (wordPureRef.current) {
        tl.fromTo(
          wordPureRef.current,
          {
            x: -40,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.06,
            ease: "power3.out",
          },
          0.26
        );
      }

      // Word 2: "Impact" follows immediately
      if (wordImpactRef.current) {
        tl.fromTo(
          wordImpactRef.current,
          {
            x: -30,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.06,
            ease: "power3.out",
          },
          0.28
        );
      }

      // Badge: "Portfolio Showcase" emerges promptly
      if (badgeShowcaseRef.current) {
        tl.fromTo(
          badgeShowcaseRef.current,
          {
            scale: 0.85,
            opacity: 0,
          },
          {
            scale: 1.0,
            opacity: 1,
            duration: 0.05,
            ease: "power2.out",
          },
          0.30
        );
      }

      // ─────────────────────────────────────────────────────────────
      // 4. SCREEN 2 DISSOLVE & SHAPES FADE
      //    (0.47 -> 0.53)
      // ─────────────────────────────────────────────────────────────
      tl.to(
        screen2Ref.current,
        {
          y: -60,
          opacity: 0,
          duration: 0.05,
          ease: "power2.in",
        },
        0.47
      );

      // Parallax shapes fade into morphing canvas
      const bgShapes = [shapeRingRef.current, shapePillRef.current, shapeDiamondRef.current].filter(Boolean);
      if (bgShapes.length > 0) {
        tl.to(
          bgShapes,
          {
            opacity: 0,
            scale: 0.85,
            duration: 0.06,
            ease: "power2.in",
          },
          0.47
        );
      }

      // ─────────────────────────────────────────────────────────────
      // 5. PHASE 2: 3D ISOMETRIC MORPHING CANVAS
      //    Starts as droplet, morphs into 3D isometric card
      //    (rotateX: 15deg, rotateY: 28deg, rotateZ: -5deg)
      //    Then expands and straightens to 0deg full-screen canvas
      //    (0.53 -> 0.68)
      // ─────────────────────────────────────────────────────────────
      if (dropletAuraRef.current) {
        tl.fromTo(
          dropletAuraRef.current,
          { scale: 0.2, opacity: 0 },
          { scale: 1.6, opacity: 0.8, duration: 0.05, ease: "power2.out" },
          0.53
        ).to(
          dropletAuraRef.current,
          { scale: 2.4, opacity: 0, duration: 0.06, ease: "power2.in" },
          0.58
        );
      }

      if (morphCanvasRef.current) {
        // Step A: Birth as a tiny droplet
        tl.fromTo(
          morphCanvasRef.current,
          {
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            x: "24vw",
            y: "22vh",
            rotateX: 10,
            rotateY: 20,
            rotateZ: -10,
            scale: 0.2,
            opacity: 0,
          },
          {
            width: "130px",
            height: "130px",
            borderRadius: "32px",
            scale: 1.0,
            opacity: 1,
            duration: 0.05,
            ease: "power2.out",
          },
          0.53
        );

        // Step B: Expands into 3D Isometric Card
        tl.to(
          morphCanvasRef.current,
          {
            width: "78vw",
            height: "82vh",
            borderRadius: "20px",
            x: "-6vw",
            y: "-3vh",
            rotateX: 15,
            rotateY: 28,
            rotateZ: -5,
            duration: 0.06,
            ease: "power2.out",
          },
          0.58
        );

        // Step C: Straightens to 0deg and expands to FULLSCREEN CANVAS
        tl.to(
          morphCanvasRef.current,
          {
            width: "100vw",
            height: "100vh",
            borderRadius: "0px",
            x: "0vw",
            y: "0vh",
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            duration: 0.04,
            ease: "power2.inOut",
          },
          0.64
        );
      }

      // ─────────────────────────────────────────────────────────────
      // 6. SCENE 3: 3D CYLINDER ROTARY DRUM SHOWCASE
      //    Pacing:
      //    - 0.68 -> 0.76: CARD 1 ARRIVAL HOLD (128vh of scroll hold!)
      //      Card 1 sits completely still in the center, giving 1-2s
      //      of calm reading time before any rotation begins!
      //    - 0.76 -> 0.96: SLOW 3D CYLINDER ROTATION (320vh of scroll!)
      //      Deliberate, unhurried progression through all 4 projects.
      //    - 0.96 -> 1.00: CARD 4 FINAL HOLD (64vh) before exit.
      // ─────────────────────────────────────────────────────────────
      const drum = { progress: 0 };
      const wrappers = cardWrappersRef.current.filter(Boolean);
      const totalCards = wrappers.length;

      const updateCylinder = (prog: number) => {
        const cards = cardWrappersRef.current.filter(Boolean);
        if (!cards.length) return;

        currentDrumProgressRef.current = prog;
        const total = cards.length;
        const closestIdx = Math.min(total - 1, Math.max(0, Math.round(prog)));
        if (closestIdx !== activeProjectIdxRef.current) {
          activeProjectIdxRef.current = closestIdx;
          setActiveProjectIdx(closestIdx);
        }

        const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
        const isTablet = typeof window !== "undefined" && window.innerWidth < 1024;
        // GENEROUS AIRY SPACING: Prevents cards from colliding or touching
        const spacing = isMobile ? 360 : isTablet ? 470 : 560;

        cards.forEach((card, i) => {
          if (!card) return;
          const diff = i - prog;
          const absDiff = Math.abs(diff);

          // Zero-Degree Focus Rule:
          // Active center card (diff = 0):
          // - rotateY = 0deg, translateZ = 0px
          // - Peak Elevated Scale: 1.18x (Significantly larger & commanding)
          // - NO CSS FILTER AT ALL! (filter: "none" ensures crystal-clear native vector text)
          const rotateY = diff * (isMobile ? 22 : 28);
          const translateX = diff * spacing;
          // translateZ pushes back deeply into 3D cylinder depth as card moves away from center
          const translateZ = -Math.pow(absDiff, 0.85) * (isMobile ? 120 : 185);

          // PROGRESSIVE SCALING DIRECTIVE:
          // Center card reaches peak 1.18x scale; as it moves away from center,
          // its size shrinks progressively smaller and smaller in true cylinder perspective!
          const maxScale = isMobile ? 1.12 : 1.18;
          const scale = Math.max(0.35, maxScale - Math.pow(absDiff, 0.88) * 0.40);

          // Center card opacity 1.0, adjacent card ~0.60, distant cards cleanly fade out
          const opacity = Math.max(0, 1 - Math.pow(absDiff, 0.9) * 0.40);

          // Depth-of-field blur: ONLY applied to side cards (absDiff > 0.25)!
          // For center card: blur is strictly 0, and filter is disabled ("none") for razor-sharp vector text!
          const isCenter = absDiff < 0.15;
          const blur = absDiff > 0.25 ? Math.min(8, (absDiff - 0.25) * 4) : 0;
          const brightness = Math.max(0.72, 1 - absDiff * 0.20);

          // CRITICAL BLUR FIX: If it's the center card, filter is "none".
          const filter = isCenter
            ? "none"
            : `blur(${blur}px) brightness(${brightness})`;

          const zIndex = Math.round(50 - absDiff * 10);
          const isVisible = absDiff < 2.5;

          gsap.set(card, {
            x: translateX,
            z: translateZ,
            rotationY: rotateY,
            scale: scale,
            opacity: opacity,
            filter: filter,
            zIndex: zIndex,
            pointerEvents: isCenter ? "auto" : "none",
            transformOrigin: "50% 50%",
            visibility: isVisible ? "visible" : "hidden",
          });
        });
      };

      // Initial frame setup
      updateCylinder(0);

      const handleResize = () => {
        updateCylinder(currentDrumProgressRef.current);
      };
      window.addEventListener("resize", handleResize);

      // Cards container reveals smoothly as the canvas finishes straightening
      if (cardsContainerRef.current) {
        tl.fromTo(
          cardsContainerRef.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.03, ease: "power2.out" },
          0.68
        );
      }

      // Initial frame setup at 0.68 (Card 1 is rendered at center)
      tl.call(() => {
        updateCylinder(0);
      }, undefined, 0.68);

      // CRITICAL ARRIVAL HOLD: Between 0.68 and 0.76 (128vh of scroll distance),
      // drum.progress stays 0, allowing the user to view Card 1 without it scrolling away!

      // Continuous 3D Cylinder rotation starts at 0.76 and scrubs slowly to 0.96 across 320vh!
      if (totalCards > 1) {
        tl.to(
          drum,
          {
            progress: totalCards - 1,
            duration: 0.20,
            ease: "none",
            onUpdate: () => {
              updateCylinder(drum.progress);
            },
          },
          0.76
        );
      }
    }, scrollTrackRef);

    // Refresh ScrollTrigger once DOM measures are stable
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [projects]);

  // Clickable Navigation Handler (Arrow buttons & dots)
  const scrollToCard = (targetIdx: number) => {
    if (!scrollTrackRef.current) return;
    const clampedIdx = Math.max(0, Math.min(projects.length - 1, targetIdx));
    setActiveProjectIdx(clampedIdx);
    activeProjectIdxRef.current = clampedIdx;

    const st =
      ScrollTrigger.getById(scrollTrackRef.current as unknown as string) ||
      ScrollTrigger.getAll().find((s) => s.trigger === scrollTrackRef.current);
    if (st) {
      let targetProgress: number;
      if (clampedIdx === 0) {
        // Comfortably inside the Card 1 arrival hold (0.68 -> 0.76)
        targetProgress = 0.71;
      } else if (clampedIdx === projects.length - 1) {
        // Comfortably inside the Card 4 final hold (0.96 -> 1.00)
        targetProgress = 0.98;
      } else {
        // Linear scrub across the rotation range (0.76 -> 0.96)
        const startProgress = 0.76;
        const progressRange = 0.20;
        targetProgress =
          startProgress + (clampedIdx / (projects.length - 1)) * progressRange;
      }

      const targetScroll = st.start + targetProgress * (st.end - st.start);
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <section
      id="work"
      ref={scrollTrackRef}
      className="relative w-full h-[1600vh] bg-[#F8FAFC] text-slate-900 select-none"
    >
      {/* Sticky Fullscreen Stage (PHYSICALLY LOCKED TO VIEWPORT FOR 1600vh) */}
      <div
        ref={stageRef}
        className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center select-none"
        style={{ perspective: "1500px" }}
      >
        {/* ─────────────────────────────────────────────────────────── */}
        {/* LIVING WATER BACKGROUND & PARALLAX GEOMETRY (Snow White/Blue)*/}
        {/* ─────────────────────────────────────────────────────────── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
          {/* Base radial wash */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 35%, #FFFFFF 0%, #F1F5F9 55%, #E2E8F0 100%)",
            }}
          />

          {/* LAYER 1: Deep Living Fluid Wave (Subtle Background Feel) */}
          <svg
            className="absolute -bottom-10 -left-20 w-[140%] h-[62%] opacity-25 will-change-transform"
            viewBox="0 0 1440 400"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              ref={wave1Ref}
              d="M0,160 C320,280 520,70 820,180 C1120,290 1280,100 1440,160 L1440,400 L0,400 Z"
              fill="url(#siyamDeepWave)"
            />
            <defs>
              <linearGradient id="siyamDeepWave" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.30" />
                <stop offset="50%" stopColor="#7DD3FC" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.08" />
              </linearGradient>
            </defs>
          </svg>

          {/* LAYER 2: Foreground Gentle Undulating Wave (Sky/Cyan) */}
          <svg
            className="absolute -bottom-4 -left-10 w-[135%] h-[50%] opacity-30 will-change-transform"
            viewBox="0 0 1440 400"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              ref={wave2Ref}
              d="M0,200 C340,90 560,270 920,140 C1220,60 1340,220 1440,180 L1440,400 L0,400 Z"
              fill="url(#siyamForeWave)"
            />
            <defs>
              <linearGradient id="siyamForeWave" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0284C7" stopOpacity="0.20" />
                <stop offset="60%" stopColor="#38BDF8" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0.06" />
              </linearGradient>
            </defs>
          </svg>

          {/* LAYER 3: Light Surface Crest Ripple (Frosted Caustic Highlights) */}
          <svg
            className="absolute bottom-0 left-0 w-[130%] h-[34%] opacity-25 will-change-transform"
            viewBox="0 0 1440 400"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              ref={wave3Ref}
              d="M0,240 C280,170 620,290 980,200 C1260,140 1380,260 1440,220 L1440,400 L0,400 Z"
              fill="url(#siyamCrestWave)"
            />
            <defs>
              <linearGradient id="siyamCrestWave" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.30" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0.22" />
              </linearGradient>
            </defs>
          </svg>

          {/* Parallax Shape 1: Top-Right Soft Frosted Glass Ring */}
          <div
            ref={shapeRingRef}
            className="absolute -top-10 -right-10 w-72 h-72 sm:w-84 sm:h-84 rounded-full border border-sky-300/30 bg-gradient-to-br from-white/40 via-sky-100/20 to-sky-200/10 backdrop-blur-md shadow-[0_15px_35px_rgba(56,189,248,0.08)] will-change-transform opacity-40 pointer-events-none"
          >
            <div className="absolute inset-5 rounded-full border border-sky-200/25" />
          </div>

          {/* Parallax Shape 2: Middle-Left Soft Frosted Pill */}
          <div
            ref={shapePillRef}
            className="absolute top-[42%] -left-12 w-64 sm:w-72 h-32 sm:h-36 rounded-full border border-sky-200/40 bg-gradient-to-tr from-sky-200/20 via-white/40 to-cyan-100/15 backdrop-blur-md shadow-[0_10px_25px_rgba(186,230,253,0.15)] will-change-transform opacity-40 pointer-events-none"
          >
            <div className="absolute top-2.5 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full" />
          </div>

          {/* Parallax Shape 3: Bottom-Right Soft Floating Glass Diamond */}
          <div
            ref={shapeDiamondRef}
            className="absolute bottom-20 right-14 w-32 h-32 sm:w-36 sm:h-36 rounded-3xl border border-sky-200/40 bg-gradient-to-bl from-white/40 via-cyan-100/20 to-sky-100/10 backdrop-blur-md shadow-[0_10px_25px_rgba(14,165,233,0.08)] rotate-12 will-change-transform opacity-40 pointer-events-none"
          />

          {/* Parallax Shape 4: Center Soft Luminous Snow-Blue Orb */}
          <div
            ref={shapeOrbRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[520px] rounded-full bg-gradient-to-tr from-sky-200/20 via-cyan-100/15 to-transparent blur-[140px] will-change-transform opacity-50 pointer-events-none"
          />
        </div>

        {/* 3D Camera Container */}
        <div
          ref={cameraViewportRef}
          className="relative w-full h-full flex items-center justify-center will-change-transform z-10"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* ─────────────────────────────────────────────────────────── */}
          {/* PHASE 1: KINETIC TYPOGRAPHY TRACK                           */}
          {/* ─────────────────────────────────────────────────────────── */}
          <div
            ref={textTrackRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* ══════════════════════════════════════════════════════════ */}
              {/* SCREEN 1: "Work Showcase" (Kinetic Typewriter Reveal)       */}
              {/* ══════════════════════════════════════════════════════════ */}
              <div
                ref={screen1Ref}
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none whitespace-nowrap will-change-transform opacity-0"
              >
                <div
                  className="font-black tracking-tighter inline-flex items-baseline gap-4 sm:gap-6"
                  style={{ fontSize: "clamp(3.5rem, 8vw, 7.8rem)" }}
                >
                  <span className="text-slate-950 inline-block drop-shadow-sm">
                    {"Work".split("").map((c, i) => (
                      <span
                        key={`w-${i}`}
                        className="type-char inline-block will-change-transform"
                      >
                        {c}
                      </span>
                    ))}
                  </span>
                  <span className="text-sky-600 inline-block drop-shadow-[0_4px_25px_rgba(2,132,199,0.22)]">
                    {"Showcase".split("").map((c, i) => (
                      <span
                        key={`s-${i}`}
                        className="type-char inline-block will-change-transform"
                      >
                        {c}
                      </span>
                    ))}
                  </span>
                </div>
              </div>

              {/* ══════════════════════════════════════════════════════════ */}
              {/* SCREEN 2: "Pure Impact" (ONE BY ONE, BUTTER-SMOOTH)        */}
              {/* ══════════════════════════════════════════════════════════ */}
              <div
                ref={screen2Ref}
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none whitespace-nowrap will-change-transform"
              >
                <div className="inline-flex items-center gap-3 sm:gap-6 pointer-events-auto whitespace-nowrap">
                  <div
                    className="inline-flex items-baseline gap-3 sm:gap-4 font-black tracking-tight whitespace-nowrap"
                    style={{ fontSize: "clamp(3.4rem, 7.5vw, 7.2rem)" }}
                  >
                    <span
                      ref={wordPureRef}
                      className="inline-block text-slate-900 drop-shadow-sm whitespace-nowrap will-change-transform"
                    >
                      Pure
                    </span>
                    <span
                      ref={wordImpactRef}
                      className="inline-block text-transparent bg-clip-text whitespace-nowrap will-change-transform drop-shadow-[0_4px_25px_rgba(56,189,248,0.25)]"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, #0284C7 0%, #38BDF8 50%, #06B6D4 100%)",
                        backgroundSize: "200% 200%",
                      }}
                    >
                      Impact
                    </span>
                  </div>

                  <div
                    ref={badgeShowcaseRef}
                    className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-white/90 border border-sky-200/80 shadow-[0_4px_15px_rgba(186,230,253,0.35)] backdrop-blur-md text-xs sm:text-sm font-mono font-semibold text-sky-700 whitespace-nowrap shrink-0 will-change-transform"
                  >
                    <Sparkles
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-500 animate-spin"
                      style={{ animationDuration: "8s" }}
                    />
                    <span>Portfolio Showcase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────── */}
          {/* PHASE 2: 3D ISOMETRIC MORPHING CANVAS                      */}
          {/* Soft architectural drafting surface (#ECEEF2)               */}
          {/* ─────────────────────────────────────────────────────────── */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-25"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Ambient Caustic Water Drop Halo */}
            <div
              ref={dropletAuraRef}
              className="absolute right-[28vw] bottom-[26vh] w-28 h-28 rounded-full bg-gradient-to-tr from-sky-400/50 via-cyan-300/40 to-transparent blur-2xl pointer-events-none opacity-0"
            />

            {/* Morphing Canvas */}
            <div
              ref={morphCanvasRef}
              className="relative flex flex-col items-center justify-between overflow-hidden pointer-events-auto will-change-transform select-none opacity-0"
              style={{
                transformOrigin: "bottom left",
                transformStyle: "preserve-3d",
                backgroundColor: "#ECEEF2",
                boxShadow:
                  "0 40px 100px -20px rgba(15, 23, 42, 0.12), 0 20px 40px -15px rgba(0, 0, 0, 0.05)",
              }}
            >
              {/* ══════════════════════════════════════════════════════════ */}
              {/* LIVING CANVAS BACKGROUND ANIMATIONS                        */}
              {/* ══════════════════════════════════════════════════════════ */}
              {/* Dynamic Ambient Moving Glow */}
              <div
                ref={canvasGlowRef}
                className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-sky-200/40 via-cyan-100/25 to-transparent blur-[110px] pointer-events-none will-change-transform"
              />
              <div
                className="absolute -bottom-36 -right-36 w-[650px] h-[650px] rounded-full bg-gradient-to-tl from-indigo-100/35 via-sky-100/25 to-transparent blur-[120px] pointer-events-none"
              />

              {/* Dynamic Technical Reticle / Compass Rotating Behind Cards */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full border border-slate-300/35 pointer-events-none flex items-center justify-center opacity-35 select-none animate-spin"
                style={{ animationDuration: "120s" }}
              >
                <div className="w-[520px] h-[520px] rounded-full border border-dashed border-sky-400/40" />
                <div className="absolute w-[320px] h-[320px] rounded-full border border-slate-300/25" />
                <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-slate-400/25 to-transparent" />
                <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-slate-400/25 to-transparent" />
              </div>

              {/* ARCHITECTURAL DOTTED BLUEPRINT GRID */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                <svg
                  className="w-full h-full opacity-45"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="0" y1="20%" x2="100%" y2="20%" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 5" />
                  <line x1="0" y1="40%" x2="100%" y2="40%" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 5" />
                  <line x1="0" y1="60%" x2="100%" y2="60%" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 5" />
                  <line x1="0" y1="80%" x2="100%" y2="80%" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 5" />

                  <line x1="20%" y1="0" x2="20%" y2="100%" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 5" />
                  <line x1="40%" y1="0" x2="40%" y2="100%" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 5" />
                  <line x1="60%" y1="0" x2="60%" y2="100%" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 5" />
                  <line x1="80%" y1="0" x2="80%" y2="100%" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 5" />
                </svg>

                {/* Dotted Crosshair Markers (+) */}
                {[20, 40, 60, 80].map((y) =>
                  [20, 40, 60, 80].map((x) => (
                    <span
                      key={`${x}-${y}`}
                      className="absolute text-slate-500 font-mono text-[10px] select-none -translate-x-1/2 -translate-y-1/2 opacity-60 font-semibold"
                      style={{ left: `${x}%`, top: `${y}%` }}
                    >
                      +
                    </span>
                  ))
                )}
              </div>

              {/* Living Canvas Floating Technical Chips */}

              {/* Studio Top Bar with Card Index & Interactive Prev / Next Arrows */}
              <div className="relative z-30 w-full flex items-center justify-between px-6 sm:px-12 pt-6 sm:pt-7 pointer-events-auto">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono font-semibold tracking-wider text-slate-700 uppercase">
                    Verified Works ({projects.length})
                  </span>
                </div>

                {/* Prev / Next Clickable Navigation */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-medium text-slate-500 hidden md:inline">
                    Scroll or Click:
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => scrollToCard(activeProjectIdx - 1)}
                      disabled={activeProjectIdx === 0}
                      className="w-7 h-7 rounded-full bg-white/90 hover:bg-white disabled:opacity-40 text-slate-700 hover:text-slate-950 flex items-center justify-center border border-slate-200/80 transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:cursor-not-allowed shadow-sm"
                      aria-label="Previous Project"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-[11px] font-mono font-bold text-slate-700 px-1">
                      0{activeProjectIdx + 1} / 0{projects.length}
                    </span>
                    <button
                      onClick={() => scrollToCard(activeProjectIdx + 1)}
                      disabled={activeProjectIdx === projects.length - 1}
                      className="w-7 h-7 rounded-full bg-white/90 hover:bg-white disabled:opacity-40 text-slate-700 hover:text-slate-950 flex items-center justify-center border border-slate-200/80 transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:cursor-not-allowed shadow-sm"
                      aria-label="Next Project"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* ══════════════════════════════════════════════════════════ */}
              {/* SCENE 3: 3D CYLINDER ROTARY DRUM SHOWCASE (PATIENTCARE STYLE) */}
              {/* Height configured to 540px/580px to hold commanding cards */}
              {/* ══════════════════════════════════════════════════════════ */}
              <div
                ref={cardsContainerRef}
                className="relative z-20 flex-1 w-full h-[540px] sm:h-[580px] flex items-center justify-center overflow-visible py-2 opacity-0 select-none pointer-events-none"
                style={{
                  perspective: "1400px",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* 3D Depth Backdrop Chips (giving rich spatial depth behind the cylinder cards) */}
                {projects.map((project, idx) => {
                  const isCurrentActive = activeProjectIdx === idx;
                  return (
                    <div
                      key={project.id || idx}
                      ref={(el) => {
                        cardWrappersRef.current[idx] = el;
                      }}
                      // Refined Card Dimensions (290px/330px/350px × 435px/465px)
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[290px] sm:w-[330px] md:w-[350px] h-[435px] sm:h-[465px] will-change-transform pointer-events-auto"
                      style={{
                        transformStyle: "preserve-3d",
                        WebkitFontSmoothing: "antialiased",
                        MozOsxFontSmoothing: "grayscale",
                        textRendering: "optimizeLegibility",
                      }}
                    >
                      {/* Natural Grounded Physical Shadow */}
                      <div
                        className="absolute inset-0 pointer-events-none -z-10"
                        style={{
                          clipPath:
                            "polygon(0px 0px, 4000px 0px, 4000px 4000px, 0px 4000px)",
                        }}
                      >
                        {/* 1. Corner Contact Occlusion */}
                        <div
                          className="absolute rounded-bl-[2px] rounded-br-[8px]"
                          style={{
                            left: "0px",
                            right: "0px",
                            bottom: "-4px",
                            height: "8px",
                            background: isCurrentActive
                              ? "rgba(15, 23, 42, 0.36)"
                              : "rgba(15, 23, 42, 0.18)",
                            filter: "blur(2px)",
                          }}
                        />

                        {/* 2. Soft Floor Shadow */}
                        <div
                          className="absolute rounded-br-[16px]"
                          style={{
                            left: "0px",
                            right: "-12px",
                            bottom: "-14px",
                            height: "22px",
                            background: isCurrentActive
                              ? "linear-gradient(to right, rgba(15, 23, 42, 0.10) 0%, rgba(15, 23, 42, 0.26) 60%, rgba(15, 23, 42, 0.16) 90%, transparent 100%)"
                              : "linear-gradient(to right, rgba(15, 23, 42, 0.04) 0%, rgba(15, 23, 42, 0.12) 60%, rgba(15, 23, 42, 0.08) 90%, transparent 100%)",
                            filter: "blur(7px)",
                          }}
                        />

                        {/* 3. Subtle Right-Edge Bevel Shadow */}
                        <div
                          className="absolute rounded-r-[10px]"
                          style={{
                            top: "35%",
                            right: "-8px",
                            bottom: "0px",
                            width: "14px",
                            background:
                              "linear-gradient(to bottom, transparent 0%, rgba(15, 23, 42, 0.12) 100%)",
                            filter: "blur(4px)",
                          }}
                        />

                        {/* 4. Soft Diffuse Floor Wash */}
                        <div
                          className="absolute rounded-br-[22px]"
                          style={{
                            left: "10px",
                            right: "-22px",
                            bottom: "-24px",
                            height: "32px",
                            background: isCurrentActive
                              ? "radial-gradient(ellipse at 80% 20%, rgba(15, 23, 42, 0.18) 0%, rgba(15, 23, 42, 0.05) 60%, transparent 90%)"
                              : "radial-gradient(ellipse at 80% 20%, rgba(15, 23, 42, 0.08) 0%, rgba(15, 23, 42, 0.02) 60%, transparent 90%)",
                            filter: "blur(14px)",
                          }}
                        />
                      </div>

                      {/* THE PHYSICAL 3D CARD (Crisp Pure White on Center, Beveled Finish) */}
                      <div
                        className={`relative z-10 w-full h-full rounded-[10px] flex flex-col justify-between select-none transition-colors duration-300 ${
                          isCurrentActive ? "bg-white shadow-[0_12px_36px_rgba(15,23,42,0.08)]" : "bg-[#F7F8FA]"
                        }`}
                        style={{
                          transformStyle: "preserve-3d",
                          borderTop: isCurrentActive
                            ? "1px solid rgba(255, 255, 255, 1)"
                            : "1px solid rgba(255, 255, 255, 0.9)",
                          borderLeft: isCurrentActive
                            ? "1px solid rgba(203, 213, 225, 0.9)"
                            : "1px solid rgba(226, 232, 240, 0.75)",
                          borderRight: isCurrentActive
                            ? "3px solid #64748B"
                            : "2.5px solid #94A3B8",
                          borderBottom: isCurrentActive
                            ? "4.5px solid #475569"
                            : "4px solid #64748B",
                          boxShadow: isCurrentActive ? "0 10px 30px -10px rgba(0,0,0,0.12)" : "none",
                        }}
                      >
                        {/* Right Beveled Gradient Strip */}
                        <div
                          className="absolute top-0 right-[-3px] bottom-0 w-[3px] rounded-r-[10px] pointer-events-none"
                          style={{
                            background:
                              "linear-gradient(to bottom, #CBD5E1 0%, #94A3B8 55%, #64748B 100%)",
                          }}
                        />

                        {/* Bottom Beveled Gradient Strip */}
                        <div
                          className="absolute bottom-[-4.5px] left-0 right-0 h-[4.5px] rounded-b-[10px] pointer-events-none"
                          style={{
                            background:
                              "linear-gradient(to right, #CBD5E1 0%, #94A3B8 40%, #475569 100%)",
                          }}
                        />

                        {/* UPPER PORTION: SCREENSHOT IMAGE WITH REFINED PROPORTIONS */}
                        <div className="p-3 pb-2">
                          <div className="relative w-full h-[165px] sm:h-[185px] rounded-[8px] overflow-hidden border border-slate-200/80 bg-slate-100 shadow-sm group">
                            {project.image ? (
                              <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                loading="eager"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400 font-mono text-xs">
                                No Preview
                              </div>
                            )}

                            {/* Category Pill Tag */}
                            <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[9.5px] font-bold bg-white/95 backdrop-blur-sm text-slate-800 shadow-sm border border-slate-200/60">
                              {project.category}
                            </div>
                          </div>
                        </div>

                        {/* LOWER PORTION: TITLE, BULLETS & ACTION BUTTON */}
                        <div className="px-4 pb-4 pt-1 flex flex-col justify-between flex-1">
                          {/* Title & Tagline (Larger, Crystal-Clear Typography) */}
                          <div className="mb-2">
                            <h4 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-tight line-clamp-1">
                              {project.title}
                            </h4>
                            <p className="text-xs text-sky-600 font-semibold mt-0.5 line-clamp-1">
                              {project.tagline}
                            </p>
                          </div>

                          {/* Bullets (Readable, Sharp Text with Solid Contrast) */}
                          <ul className="space-y-1.5 mb-3.5">
                            {project.bullets.map((bullet, bIdx) => (
                              <li
                                key={bIdx}
                                className="flex items-start gap-1.5 text-xs sm:text-[13px] text-slate-700 leading-snug font-medium"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                                <span className="line-clamp-1">{bullet}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Action Button (Tactile & Prominent) */}
                          <a
                            href={project.live_url}
                            className="mt-auto w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-[6px] bg-slate-900 hover:bg-sky-600 text-white text-xs font-bold transition-all duration-200 shadow-sm group/btn cursor-pointer"
                          >
                            <span>Visit Deliverable</span>
                            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Progress Rail Dots */}
              <div className="relative z-30 w-full flex items-center justify-center gap-2 pb-5 pointer-events-auto">
                {projects.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => scrollToCard(dotIdx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeProjectIdx === dotIdx
                        ? "w-7 bg-slate-900"
                        : "w-1.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Jump to project ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
