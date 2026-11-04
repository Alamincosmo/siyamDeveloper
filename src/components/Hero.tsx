"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Compass, User, Send } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 169 WebP frames in public/frames (frame_001.webp -> frame_169.webp)
const FRAME_COUNT = 169;
const FRAME_PATHS: string[] = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/frames/frame_${String(i + 1).padStart(3, "0")}.webp`
);

// MATHEMATICALLY CALIBRATED MOTION CURVE (EXACT TRANSLATION OF USER SKETCH IN IMAGE 2)
// Profile:
// 1. Slow anticipation ramp (shallow slope)
// 2. High-velocity linear/steep surge (rapid sweep)
// 3. Smooth arc crest with slight overshoot peak (1.04)
// 4. Subtle dip/settle down to final resting level (1.00)
function evaluateImage2Curve(t: number): number {
  const clampT = Math.min(1, Math.max(0, t));
  if (clampT <= 0) return 0;
  if (clampT >= 1) return 1;

  if (clampT < 0.25) {
    const p = clampT / 0.25;
    return 0.08 * (p * p);
  } else if (clampT < 0.78) {
    const p = (clampT - 0.25) / (0.78 - 0.25);
    return 0.08 + 0.80 * p;
  } else if (clampT < 0.90) {
    const p = (clampT - 0.78) / (0.90 - 0.78);
    return 0.88 + 0.16 * Math.sin(p * (Math.PI / 2));
  } else {
    const p = (clampT - 0.90) / 0.10;
    return 1.04 - 0.04 * (0.5 - 0.5 * Math.cos(p * Math.PI));
  }
}
const BIOGRAPHY_ERAS = [
  {
    era: "Era I",
    title: "Foundation & Hardware",
    years: "2017–2020",
    age: "Age 9–11",
    desc: "Began the journey exploring Web Basics, Computer Architecture, and IoT. At an early age, built a strong foundation in understanding how hardware logic and software code unite to form intelligent systems.",
    image: "/eras/era1.jpg"
  },
  {
    era: "Era II",
    title: "Raw Coding & Global Freelancing",
    years: "2021–2023",
    age: "Age 13–14",
    desc: "Mastered Frontend engineering and Custom CMS development. Operated globally on Fiverr as a Lead Digital Strategist, transforming client ideas into high-performance digital realities.",
    image: "/eras/era2.jpg"
  },
  {
    era: "Era III",
    title: "Enterprise Full-Stack & SaaS",
    years: "2023–2025",
    age: "Age 15–17",
    desc: "Engineered scalable architectures at House Of Change Limited & Techfrica LLC. Specialized in legacy system modernization, building robust SaaS platforms capable of handling massive data loads.",
    image: "/eras/era3.jpg"
  },
  {
    era: "Era IV",
    title: "Architecture, AI & Health-Tech",
    years: "2024–Present",
    age: "Age 16+",
    desc: "Currently leading development at DoctorsHero and Modern Mediks. Architecting advanced AI-powered E-Prescription systems, pushing the boundaries of what's possible in modern healthcare technology.",
    image: "/eras/era4.jpg"
  }
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Curved Rail Text Refs (First phase animation)
  const railContainerRef = useRef<HTMLDivElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);

  // Unified Choreography Stage
  const stageRef = useRef<HTMLDivElement>(null);

  // Stage 1: Client Work First
  const clientWorkStageRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<HTMLDivElement>(null);
  const clientWordRef = useRef<HTMLSpanElement>(null);
  const workWordRef = useRef<HTMLSpanElement>(null);
  const firstWordRef = useRef<HTMLSpanElement>(null);
  const shockwaveRef = useRef<HTMLDivElement>(null);

  // THE ONE AND ONLY UNIVERSAL NEUMORPHIC TILE (PERSISTENT ELEMENT)
  const mainTileRef = useRef<HTMLDivElement>(null);
  const pullTabClaspRef = useRef<HTMLDivElement>(null);
  const iconBriefcaseRef = useRef<HTMLDivElement>(null);
  const iconCompassRef = useRef<HTMLDivElement>(null);
  const iconUserRef = useRef<HTMLDivElement>(null);
  const iconSendRef = useRef<HTMLDivElement>(null);

  // Stage 2: Kinetic Zipper Stage ("LET'S KNOW ABOUT ME")
  const zipperStageRef = useRef<HTMLDivElement>(null);
  const track1RowRef = useRef<HTMLDivElement>(null);
  const track2RowRef = useRef<HTMLDivElement>(null);

  // Row 1 (LET'S KNOW ABOUT) Track & Mask Refs
  const track1TextRef = useRef<HTMLDivElement>(null);
  const track1ClosedRef = useRef<HTMLDivElement>(null);
  const track1OpenRef = useRef<HTMLDivElement>(null);

  // Row 2 (ME) Track & Mask Refs
  const track2TextRef = useRef<HTMLDivElement>(null);
  const track2ClosedRef = useRef<HTMLDivElement>(null);
  const track2OpenRef = useRef<HTMLDivElement>(null);

  // Stage 3: Studio Floor & Detached Icon Landing
  const studioFloorRef = useRef<HTMLDivElement>(null);

  // Stage 4: 2D Flat Book Stage
  const bookStageRef = useRef<HTMLDivElement>(null);
  const backCoverRef = useRef<HTMLDivElement>(null);
  const pagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const cloneTileRef = useRef<HTMLDivElement>(null);
  const coverSlotRef = useRef<HTMLDivElement>(null);
  const rippleTriggeredRef = useRef<boolean>(false);
  const textTriggeredRef = useRef<boolean>(false);
  const leadingTileRef = useRef<HTMLDivElement>(null);
  const journeyTextRef = useRef<HTMLHeadingElement>(null);
  const ripple1Ref = useRef<HTMLDivElement>(null);
  const ripple2Ref = useRef<HTMLDivElement>(null);
  const ripple3Ref = useRef<HTMLDivElement>(null);

  // Modal State
  const [activeEra, setActiveEra] = useState<number | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (activeEra !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeEra]);

  // Dynamic layout coordinates measured directly from DOM geometry
  const layoutCoords = useRef({
    row1Y: -115,
    row2Y: 115,
    row1CenterX: 0,
    halfW: 390,
  });

  const [isFirstFrameReady, setIsFirstFrameReady] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // References for memory-efficient render loop and continuous zoom
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null));
  const frameObj = useRef({ frame: 0 });
  const currentZoomScale = useRef<number>(1.0);
  const isRendering = useRef(false);
  const lastDrawnIndex = useRef<number>(-1);
  const lastDrawnZoom = useRef<number>(1.0);

  // 1. FAST STRATIFIED PRELOADER (OPTIMIZED FOR WEBP & LOW-BANDWIDTH)
  useEffect(() => {
    let isCancelled = false;

    const loadFrame = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        if (imagesRef.current[index]) {
          return resolve(imagesRef.current[index]!);
        }
        const img = new Image();
        img.src = FRAME_PATHS[index];
        img.onload = () => {
          if (!isCancelled) {
            imagesRef.current[index] = img;
            if (index === 0) {
              setIsFirstFrameReady(true);
              requestRender();
            }
          }
          resolve(img);
        };
        img.onerror = () => resolve(img);
      });
    };

    loadFrame(0).then(() => {
      if (isCancelled) return;

      const keyframes: number[] = [];
      for (let i = 6; i < FRAME_COUNT; i += 6) {
        keyframes.push(i);
      }

      const loadKeyframes = async () => {
        const queue = [...keyframes];
        const workers = Array.from({ length: 4 }).map(async () => {
          while (queue.length > 0 && !isCancelled) {
            const next = queue.shift();
            if (next !== undefined) await loadFrame(next);
          }
        });
        await Promise.all(workers);

        if (isCancelled) return;

        const remaining: number[] = [];
        for (let i = 1; i < FRAME_COUNT; i++) {
          if (!imagesRef.current[i]) remaining.push(i);
        }

        const remainingQueue = [...remaining];
        const bgWorkers = Array.from({ length: 4 }).map(async () => {
          while (remainingQueue.length > 0 && !isCancelled) {
            const next = remainingQueue.shift();
            if (next !== undefined) await loadFrame(next);
          }
        });
        await Promise.all(bgWorkers);
      };

      loadKeyframes();
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  // 2. CRISP CANVAS DRAW FUNCTION WITH DYNAMIC DEEP ZOOM INTO LAPTOP DISPLAY
  function drawFrame(frameFloat: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const total = FRAME_COUNT;
    const targetIndex = Math.min(Math.max(0, Math.round(frameFloat)), total - 1);
    const zoom = currentZoomScale.current;

    if (
      targetIndex === lastDrawnIndex.current &&
      imagesRef.current[targetIndex] &&
      Math.abs(zoom - lastDrawnZoom.current) < 0.005
    ) {
      return;
    }

    const findImage = (idx: number): HTMLImageElement | null => {
      if (imagesRef.current[idx]) return imagesRef.current[idx];
      for (let offset = 1; offset < total; offset++) {
        if (idx - offset >= 0 && imagesRef.current[idx - offset]) {
          return imagesRef.current[idx - offset];
        }
        if (idx + offset < total && imagesRef.current[idx + offset]) {
          return imagesRef.current[idx + offset];
        }
      }
      return null;
    };

    const img = findImage(targetIndex);
    if (!img) return;

    lastDrawnIndex.current = targetIndex;
    lastDrawnZoom.current = zoom;

    const canvasW = canvas.width;
    const canvasH = canvas.height;
    const imgW = img.naturalWidth || 854;
    const imgH = img.naturalHeight || 480;

    const imgRatio = imgW / imgH;
    const canvasRatio = canvasW / canvasH;

    let renderW = canvasW;
    let renderH = canvasH;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      renderW = canvasW;
      renderH = canvasW / imgRatio;
      offsetY = (canvasH - renderH) / 2;
    } else {
      renderH = canvasH;
      renderW = canvasH * imgRatio;
      offsetX = (canvasW - renderW) / 2;
    }

    ctx.save();

    if (zoom > 1.001) {
      const anchorX = canvasW * 0.5;
      const anchorY = canvasH * 0.53;

      ctx.translate(anchorX, anchorY);
      ctx.scale(zoom, zoom);
      ctx.translate(-anchorX, -anchorY);
    }

    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
    ctx.restore();
  }

  function requestRender() {
    if (!isRendering.current) {
      isRendering.current = true;
      requestAnimationFrame(() => {
        drawFrame(frameObj.current.frame);
        isRendering.current = false;
      });
    }
  }

  // 3. RESPONSIVE RESIZE & DYNAMIC GEOMETRY MEASUREMENT
  const updateLayout = () => {
    if (!socketRef.current || !track1RowRef.current || !track2RowRef.current) return;
    const socketRect = socketRef.current.getBoundingClientRect();
    const track1Rect = track1RowRef.current.getBoundingClientRect();
    const track2Rect = track2RowRef.current.getBoundingClientRect();

    if (track1Rect.width < 50) return;

    // Center of Track 1 relative to center of socket cavity
    const r1Y = track1Rect.top + track1Rect.height / 2 - (socketRect.top + socketRect.height / 2);
    // Center of Track 2 relative to center of socket cavity
    const r2Y = track2Rect.top + track2Rect.height / 2 - (socketRect.top + socketRect.height / 2);
    // Center X offset (if any)
    const cX = track1Rect.left + track1Rect.width / 2 - (socketRect.left + socketRect.width / 2);
    // Half width of track
    const hW = track1Rect.width / 2;

    layoutCoords.current = {
      row1Y: r1Y,
      row2Y: r2Y,
      row1CenterX: cX,
      halfW: hW,
    };
  };

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "medium";
      }

      lastDrawnIndex.current = -1;
      drawFrame(frameObj.current.frame);
      updateLayout();
    };

    handleResize();
    const timer = setTimeout(updateLayout, 150);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 4. GSAP MASTER SCROLL CHOREOGRAPHY (WITH DETACHMENT, 3D ISOMETRIC FLOOR DROP & COIN BOUNCE)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (textPathRef.current) {
      textPathRef.current.setAttribute("startOffset", "1750px");
    }

    const ctx = gsap.context(() => {
      gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.65, // Luxurious inertia damping
            onUpdate: (self) => {
              const rawProgress = self.progress;
              const progress = Math.min(1, rawProgress / 0.7);
              const bookProgress = Math.max(0, (rawProgress - 0.7) / 0.3);
              setScrollProgress(rawProgress);

              // ── PHASE 0: CURVED RAIL TEXT (progress 0.00 -> 0.08) ──
              if (textPathRef.current && railContainerRef.current) {
                if (progress <= 0.09) {
                  const rP = Math.min(1, Math.max(0, progress / 0.07));
                  const rEased = gsap.parseEase("sine.inOut")(rP);
                  const currentOffset = 1750 - rEased * 2900;
                  textPathRef.current.setAttribute("startOffset", `${currentOffset}px`);

                  const rOpacity = progress < 0.06 ? 1 : Math.max(0, 1 - (progress - 0.06) / 0.025);
                  railContainerRef.current.style.opacity = `${rOpacity}`;
                  railContainerRef.current.style.visibility = rOpacity > 0 ? "visible" : "hidden";
                } else {
                  railContainerRef.current.style.opacity = "0";
                  railContainerRef.current.style.visibility = "hidden";
                }
              }

              // ── PHASE 1: VIDEO SCRUBBING (progress 0.00 -> 0.28) ──
              const videoProgress = Math.min(1, progress / 0.28);
              frameObj.current.frame = videoProgress * (FRAME_COUNT - 1);

              // ── PHASE 2: DEEP OPTICAL ZOOM INTO LAPTOP DISPLAY (progress 0.26 -> 0.36) ──
              let zoom = 1.0;
              if (progress >= 0.26) {
                const zP = Math.min(1, Math.max(0, (progress - 0.26) / 0.10));
                zoom = 1.0 + Math.pow(zP, 1.8) * 4.6;
              }
              currentZoomScale.current = zoom;
              requestRender();

              // ── CHOREOGRAPHY STAGE VISIBILITY (progress >= 0.36) ──
              if (stageRef.current) {
                if (progress < 0.36) {
                  stageRef.current.style.opacity = "0";
                  stageRef.current.style.visibility = "hidden";
                } else {
                  stageRef.current.style.visibility = "visible";
                  stageRef.current.style.opacity = "1";
                }

                if (progress >= 0.995) {
                  const exitP = (progress - 0.995) / 0.005;
                  stageRef.current.style.transform = `translate3d(0, ${-exitP * 40}px, 0)`;
                  stageRef.current.style.opacity = `${1 - exitP}`;
                } else {
                  stageRef.current.style.transform = "translate3d(0, 0, 0)";
                }
              }

              // Re-check layout geometry dynamically before entering the zipper track
              if (progress >= 0.65 && progress <= 0.72) {
                updateLayout();
              }

              const { row1Y, row2Y, row1CenterX, halfW } = layoutCoords.current;

              // ── PHASE 3 & 4: SOCKET CAVITY FORMATION & TILE FLIGHT (progress 0.36 -> 0.42) ──
              const flightP = Math.min(1, Math.max(0, (progress - 0.36) / 0.06));
              const flightEased = gsap.parseEase("power3.out")(flightP);

              // Socket cavity inner drop shadow (Completely vanishes when tile leaves!)
              if (socketRef.current) {
                if (flightP < 0.25 || progress >= 0.69) {
                  socketRef.current.style.boxShadow = "none";
                  socketRef.current.style.border = "none";
                  socketRef.current.style.backgroundColor = "transparent";
                } else {
                  const socketP = Math.min(1, (flightP - 0.25) / 0.75);
                  const sEased = gsap.parseEase("power2.out")(socketP);
                  const darkOffset = Math.round(sEased * 9);
                  const darkBlur = Math.round(sEased * 20);
                  const lightOffset = Math.round(sEased * 9);
                  const lightBlur = Math.round(sEased * 20);

                  socketRef.current.style.border = "1px solid #D1D9E6";
                  socketRef.current.style.backgroundColor = "#ECF0F3";
                  socketRef.current.style.boxShadow =
                    `inset ${darkOffset}px ${darkOffset}px ${darkBlur}px #B8C4D6, inset -${lightOffset}px -${lightOffset}px ${lightBlur}px #FFFFFF`;
                }
              }

              // Universal Tile coordinates relative to socket center (0, 0)
              let tileX = 0;
              let tileY = (1 - flightEased) * 440;
              let tileScale = 0.6 + 0.4 * flightEased;
              let tileRot = (1 - flightEased) * -18;
              let rotX = 0;
              let rotY = 0;
              let rotZ = 0;
              let skewX = 0;
              let tileOpacity = Math.min(1, Math.max(0, (flightP - 0.05) * 4));
              if (bookProgress > 0) {
                tileOpacity = 1 - Math.min(1, bookProgress / 0.05); // Fade out as book stage starts
              }

              const elev = 1 - flightEased;
              const dropOffset = Math.round(elev * 16 + (1 - elev) * 4);
              const dropBlur = Math.round(elev * 30 + (1 - elev) * 10);
              let tileBoxShadow =
                flightP > 0.05
                  ? `${dropOffset}px ${dropOffset}px ${dropBlur}px rgba(163,177,198,0.7), -${dropOffset}px -${dropOffset}px ${dropBlur}px #FFFFFF`
                  : "none";

              // ── STRICT ICON ROTATION RESET FOR FIRST IMAGE PERFECTION (progress < 0.62) ──
              if (progress < 0.62) {
                if (iconBriefcaseRef.current) {
                  iconBriefcaseRef.current.style.opacity = "1";
                  iconBriefcaseRef.current.style.transform = "scale(1) rotate(0deg)";
                }
                if (iconCompassRef.current) {
                  iconCompassRef.current.style.opacity = "0";
                  iconCompassRef.current.style.transform = "scale(0) rotate(0deg)";
                }
                if (iconUserRef.current) {
                  iconUserRef.current.style.opacity = "0";
                  iconUserRef.current.style.transform = "scale(0) rotate(0deg)";
                }
                if (pullTabClaspRef.current) {
                  pullTabClaspRef.current.style.opacity = "0";
                  pullTabClaspRef.current.style.transform = "rotate(0deg)";
                }
              }

              // ── PHASE 6: PHYSICAL KICK LEFT & "Client" SLIDE OUT (progress 0.42 -> 0.46) ──
              let clientEased = 0;
              if (progress >= 0.42 && progress < 0.46) {
                const kick1P = (progress - 0.42) / 0.04;
                if (kick1P < 0.2) {
                  const wP = kick1P / 0.2;
                  tileRot = wP * 3;
                  tileX = wP * 4;
                } else if (kick1P < 0.5) {
                  const pP = (kick1P - 0.2) / 0.3;
                  tileRot = 3 - pP * 15;
                  tileX = 4 - pP * 18;
                } else {
                  const rP = (kick1P - 0.5) / 0.5;
                  const rEased = gsap.parseEase("power2.out")(rP);
                  tileRot = -12 * (1 - rEased);
                  tileX = -14 * (1 - rEased);
                }

                if (kick1P >= 0.2) {
                  const cP = Math.min(1, (kick1P - 0.2) / 0.8);
                  clientEased = gsap.parseEase("power3.out")(cP);
                }
              } else if (progress >= 0.46) {
                clientEased = 1;
              }

              if (clientWordRef.current && progress < 0.62) {
                gsap.set(clientWordRef.current, {
                  xPercent: 70 * (1 - clientEased),
                  yPercent: 0,
                  rotate: 0,
                  scale: 1,
                  opacity: clientEased,
                  filter: `blur(${(1 - clientEased) * 12}px)`,
                });
              }

              // ── PHASE 7: PHYSICAL KICK RIGHT & "Work" SLIDE OUT (progress 0.46 -> 0.50) ──
              let workEased = 0;
              if (progress >= 0.46 && progress < 0.50) {
                const kick2P = (progress - 0.46) / 0.04;
                if (kick2P < 0.2) {
                  const wP = kick2P / 0.2;
                  tileRot = -wP * 3;
                  tileX = -wP * 4;
                } else if (kick2P < 0.5) {
                  const pP = (kick2P - 0.2) / 0.3;
                  tileRot = -3 + pP * 15;
                  tileX = -4 + pP * 18;
                } else {
                  const rP = (kick2P - 0.5) / 0.5;
                  const rEased = gsap.parseEase("power2.out")(rP);
                  tileRot = 12 * (1 - rEased);
                  tileX = 14 * (1 - rEased);
                }

                if (kick2P >= 0.2) {
                  const wP = Math.min(1, (kick2P - 0.2) / 0.8);
                  workEased = gsap.parseEase("power3.out")(wP);
                }
              } else if (progress >= 0.50) {
                workEased = 1;
              }

              if (workWordRef.current && progress < 0.62) {
                gsap.set(workWordRef.current, {
                  xPercent: -70 * (1 - workEased),
                  yPercent: 0,
                  rotate: 0,
                  scale: 1,
                  opacity: workEased,
                  filter: `blur(${(1 - workEased) * 12}px)`,
                });
              }

              // ── PHASE 8: LINE BREAK -> "First" 3D KINETIC REVEAL (progress 0.50 -> 0.55) ──
              let firstEased = 0;
              if (progress >= 0.50 && progress < 0.55) {
                const fP = Math.min(1, Math.max(0, (progress - 0.50) / 0.05));
                firstEased = gsap.parseEase("power3.out")(fP);
              } else if (progress >= 0.55) {
                firstEased = 1;
              }

              if (firstWordRef.current && progress < 0.62) {
                gsap.set(firstWordRef.current, {
                  yPercent: 120 * (1 - firstEased),
                  xPercent: 0,
                  rotate: 0,
                  rotateX: -26 * (1 - firstEased),
                  scale: 1,
                  opacity: firstEased,
                  filter: `blur(${(1 - firstEased) * 14}px)`,
                });
              }

              // ── RESTING STABLE PAUSE: PERFECT ZERO ROTATION & LEVEL POSITION (progress 0.55 -> 0.62) ──
              if (progress >= 0.55 && progress < 0.62) {
                tileRot = 0;
                tileX = 0;
                tileY = 0;
                tileScale = 1.0;
              }

              // ── PHASE 9 & 10: SMOOTH SUCK-IN (NO TEXT ROTATION) & LIQUID WHIRLPOOL ICON MORPH (progress 0.62 -> 0.69) ──
              if (progress >= 0.62 && progress < 0.69) {
                const suckRaw = (progress - 0.62) / 0.07;
                const suckP = gsap.parseEase("power3.in")(Math.min(1, Math.max(0, suckRaw)));

                // 1. "Client" pulled straight horizontally into center box (NO ROTATION!)
                if (clientWordRef.current) {
                  gsap.set(clientWordRef.current, {
                    xPercent: 75 * suckP,
                    yPercent: 0,
                    rotate: 0,
                    scale: Math.max(0, 1 - suckP),
                    opacity: Math.max(0, 1 - suckP),
                    filter: `blur(${suckP * 16}px)`,
                  });
                }

                // 2. "Work" pulled straight horizontally into center box (NO ROTATION!)
                if (workWordRef.current) {
                  gsap.set(workWordRef.current, {
                    xPercent: -75 * suckP,
                    yPercent: 0,
                    rotate: 0,
                    scale: Math.max(0, 1 - suckP),
                    opacity: Math.max(0, 1 - suckP),
                    filter: `blur(${suckP * 16}px)`,
                  });
                }

                // 3. "First" pulled straight vertically up into center box (NO ROTATION!)
                if (firstWordRef.current) {
                  gsap.set(firstWordRef.current, {
                    xPercent: 0,
                    yPercent: -130 * suckP,
                    rotate: 0,
                    rotateX: 0,
                    scale: Math.max(0, 1 - suckP),
                    opacity: Math.max(0, 1 - suckP),
                    filter: `blur(${suckP * 16}px)`,
                  });
                }

                // Box Swell & Gyroscopic Rotation
                tileScale = 1.0 + 0.36 * Math.sin(suckRaw * Math.PI);
                tileRot = Math.sin(suckRaw * Math.PI * 2) * 14;

                // 4. LIQUID WHIRLPOOL ICON MORPH (Briefcase swirls into drain -> Compass emerges)
                if (suckRaw < 0.5) {
                  const p = suckRaw / 0.5;
                  if (iconBriefcaseRef.current) {
                    iconBriefcaseRef.current.style.opacity = `${1 - p}`;
                    iconBriefcaseRef.current.style.transform = `scale(${Math.max(0, 1 - p)}) rotate(${p * 720}deg)`;
                  }
                  if (iconCompassRef.current) iconCompassRef.current.style.opacity = "0";
                  if (iconUserRef.current) iconUserRef.current.style.opacity = "0";
                } else {
                  const p = (suckRaw - 0.5) / 0.5;
                  const pEased = gsap.parseEase("back.out(2)")(p);
                  if (iconBriefcaseRef.current) iconBriefcaseRef.current.style.opacity = "0";
                  if (iconCompassRef.current) {
                    iconCompassRef.current.style.opacity = `${p}`;
                    iconCompassRef.current.style.transform = `scale(${pEased}) rotate(${(1 - p) * -720}deg)`;
                  }
                  if (iconUserRef.current) iconUserRef.current.style.opacity = "0";
                }

                // Shockwave pulse at peak absorption
                if (shockwaveRef.current) {
                  if (suckRaw >= 0.45 && suckRaw <= 0.95) {
                    const waveP = (suckRaw - 0.45) / 0.5;
                    shockwaveRef.current.style.opacity = `${(1 - waveP) * 0.9}`;
                    shockwaveRef.current.style.transform = `scale(${0.8 + waveP * 2.2})`;
                  } else {
                    shockwaveRef.current.style.opacity = "0";
                  }
                }
              } else if (progress >= 0.69) {
                // Completely swallowed
                if (clientWordRef.current) gsap.set(clientWordRef.current, { opacity: 0 });
                if (workWordRef.current) gsap.set(workWordRef.current, { opacity: 0 });
                if (firstWordRef.current) gsap.set(firstWordRef.current, { opacity: 0 });
                if (shockwaveRef.current) shockwaveRef.current.style.opacity = "0";
              }

              // Stage 2 (Zipper Stage) activates smoothly
              if (zipperStageRef.current && progress < 0.94) {
                if (progress < 0.69) {
                  zipperStageRef.current.style.opacity = "0";
                } else if (progress < 0.72) {
                  const fP = (progress - 0.69) / 0.03;
                  zipperStageRef.current.style.opacity = `${fP}`;
                } else {
                  zipperStageRef.current.style.opacity = "1";
                }
                zipperStageRef.current.style.transform = "translate3d(0, 0, 0)";
              }

              // ── SOLID PHYSICAL SLIDER SHADOW FOR ZIPPER PHASES (progress 0.69 -> 0.94) ──
              if (progress >= 0.69 && progress < 0.94) {
                tileBoxShadow =
                  "0 14px 28px -4px rgba(15, 23, 42, 0.16), 0 8px 12px -4px rgba(15, 23, 42, 0.08), 0 0 0 1.5px rgba(226, 232, 240, 0.9), -2px -2px 8px rgba(255, 255, 255, 0.9)";
              }

              // ── PHASE 11: RAPID MOTION SLIDE FROM CENTER (0,0) TO ROW 1 RIGHT (progress 0.69 -> 0.73) ──
              if (progress >= 0.69 && progress < 0.73) {
                const gRaw = Math.min(1, Math.max(0, (progress - 0.69) / 0.04));
                const gEased = gsap.parseEase("power3.inOut")(gRaw);

                tileX = (row1CenterX + halfW) * gEased;
                tileY = row1Y * gEased;
                tileScale = 1.0;
                tileRot = Math.sin(gRaw * Math.PI) * 6; // dynamic glide tilt

                if (pullTabClaspRef.current) {
                  pullTabClaspRef.current.style.opacity = `${gRaw}`;
                  pullTabClaspRef.current.style.transform = "rotate(0deg)";
                }

                if (iconBriefcaseRef.current) iconBriefcaseRef.current.style.opacity = "0";
                if (iconCompassRef.current) {
                  iconCompassRef.current.style.opacity = "1";
                  iconCompassRef.current.style.transform = "scale(1) rotate(0deg)";
                }
                if (iconUserRef.current) iconUserRef.current.style.opacity = "0";

                if (track1ClosedRef.current) track1ClosedRef.current.style.clipPath = "inset(0 0 0 0)";
                if (track1OpenRef.current) track1OpenRef.current.style.clipPath = "inset(0 0 0 100%)";
                if (track1TextRef.current) track1TextRef.current.style.clipPath = "inset(0 0 0 100%)";
              }

              // ── PHASE 12: ROW 1 UNZIP SLIDE FROM RIGHT TO LEFT (IMAGE 2 MOTION CURVE) (progress 0.73 -> 0.82) ──
              if (progress >= 0.73 && progress < 0.82) {
                const z1T = Math.min(1, Math.max(0, (progress - 0.73) / 0.09));
                const curveVal = evaluateImage2Curve(z1T);

                tileX = row1CenterX + halfW - curveVal * (2 * halfW);
                tileY = row1Y;
                tileScale = 1.0;
                tileRot = 0;

                if (pullTabClaspRef.current) {
                  pullTabClaspRef.current.style.opacity = "1";
                  pullTabClaspRef.current.style.transform = "rotate(0deg)";
                }

                if (iconBriefcaseRef.current) iconBriefcaseRef.current.style.opacity = "0";
                if (iconCompassRef.current) {
                  iconCompassRef.current.style.opacity = "1";
                  iconCompassRef.current.style.transform = "scale(1) rotate(0deg)";
                }
                if (iconUserRef.current) iconUserRef.current.style.opacity = "0";

                const P1 = Math.min(100, Math.max(0, (1 - curveVal) * 100));

                if (track1TextRef.current) {
                  track1TextRef.current.style.clipPath = `inset(0px 0px 0px ${P1}%)`;
                }
                if (track1ClosedRef.current) {
                  track1ClosedRef.current.style.clipPath = `inset(0px calc(100% - ${P1}%) 0px 0px)`;
                }
                if (track1OpenRef.current) {
                  track1OpenRef.current.style.clipPath = `inset(0px 0px 0px ${P1}%)`;
                }
              }

              // ── PHASE 13: DIAGONAL SLIDE (Row 1 Left -> Row 2 Right) & MORPH TO USER (progress 0.82 -> 0.86) ──
              if (progress >= 0.82 && progress < 0.86) {
                const diagRaw = Math.min(1, Math.max(0, (progress - 0.82) / 0.04));
                const diagEased = gsap.parseEase("power2.inOut")(diagRaw);

                tileX = row1CenterX - halfW + diagEased * (2 * halfW);
                tileY = row1Y + diagEased * (row2Y - row1Y);
                tileRot = Math.sin(diagRaw * Math.PI) * 14; // Aerodynamic banking tilt

                if (pullTabClaspRef.current) {
                  pullTabClaspRef.current.style.opacity = "1";
                  pullTabClaspRef.current.style.transform = `rotate(${Math.sin(diagRaw * Math.PI) * 20}deg)`;
                }

                // SQUASH & SPRING ICON MORPH: Compass -> User
                if (diagRaw < 0.45) {
                  const p = diagRaw / 0.45;
                  if (iconCompassRef.current) {
                    iconCompassRef.current.style.opacity = `${1 - p}`;
                    iconCompassRef.current.style.transform = `scale(${Math.max(0, 1 - p)}) rotate(${p * 360}deg)`;
                  }
                  if (iconUserRef.current) iconUserRef.current.style.opacity = "0";
                } else {
                  const p = (diagRaw - 0.45) / 0.55;
                  const pEased = gsap.parseEase("back.out(2)")(p);
                  if (iconCompassRef.current) iconCompassRef.current.style.opacity = "0";
                  if (iconUserRef.current) {
                    iconUserRef.current.style.opacity = `${p}`;
                    iconUserRef.current.style.transform = `scale(${pEased}) rotate(${(1 - p) * -360}deg)`;
                  }
                }
                if (iconBriefcaseRef.current) iconBriefcaseRef.current.style.opacity = "0";

                // Row 1 remains open
                if (track1TextRef.current) track1TextRef.current.style.clipPath = "inset(0 0 0 0)";
                if (track1ClosedRef.current) track1ClosedRef.current.style.clipPath = "inset(0 0 0 100%)";
                if (track1OpenRef.current) track1OpenRef.current.style.clipPath = "inset(0 0 0 0)";

                // Row 2 is closed initially
                if (track2ClosedRef.current) track2ClosedRef.current.style.clipPath = "inset(0 0 0 0)";
                if (track2OpenRef.current) track2OpenRef.current.style.clipPath = "inset(0 0 0 100%)";
                if (track2TextRef.current) track2TextRef.current.style.clipPath = "inset(0 0 0 100%)";
              }

              // ── PHASE 14: ROW 2 REVERSE UNZIP ("ME" 1.4x LARGER) (progress 0.86 -> 0.92) ──
              if (progress >= 0.86 && progress < 0.92) {
                const z2T = Math.min(1, Math.max(0, (progress - 0.86) / 0.06));
                const revCurve = gsap.parseEase("power2.inOut")(z2T);

                tileX = row1CenterX + halfW - revCurve * (2 * halfW);
                tileY = row2Y;
                tileScale = 1.0;
                tileRot = 0;

                if (pullTabClaspRef.current) {
                  pullTabClaspRef.current.style.opacity = "1";
                  pullTabClaspRef.current.style.transform = "rotate(0deg)";
                }

                if (iconBriefcaseRef.current) iconBriefcaseRef.current.style.opacity = "0";
                if (iconCompassRef.current) iconCompassRef.current.style.opacity = "0";
                if (iconUserRef.current) {
                  iconUserRef.current.style.opacity = "1";
                  iconUserRef.current.style.transform = "scale(1) rotate(0deg)";
                }

                if (track1TextRef.current) track1TextRef.current.style.clipPath = "inset(0 0 0 0)";
                if (track1OpenRef.current) track1OpenRef.current.style.clipPath = "inset(0 0 0 0)";

                const P2 = Math.min(100, Math.max(0, (1 - revCurve) * 100));

                if (track2TextRef.current) {
                  track2TextRef.current.style.clipPath = `inset(0px 0px 0px ${P2}%)`;
                }
                if (track2ClosedRef.current) {
                  track2ClosedRef.current.style.clipPath = `inset(0px calc(100% - ${P2}%) 0px 0px)`;
                }
                if (track2OpenRef.current) {
                  track2OpenRef.current.style.clipPath = `inset(0px 0px 0px ${P2}%)`;
                }
              }

              // ── PHASE 15: DOCKED PAUSE TO READ "LET'S KNOW ABOUT ME" (progress 0.92 -> 0.938) ──
              if (progress >= 0.92 && progress < 0.938) {
                tileX = row1CenterX - halfW;
                tileY = row2Y;
                tileScale = 1.0;
                tileRot = 0;
                rotX = 0;
                rotY = 0;
                rotZ = 0;
                skewX = 0;

                if (pullTabClaspRef.current) {
                  pullTabClaspRef.current.style.opacity = "1";
                  pullTabClaspRef.current.style.transform = "rotate(0deg)";
                }

                if (iconUserRef.current) {
                  iconUserRef.current.style.opacity = "1";
                  iconUserRef.current.style.transform = "scale(1) rotate(0deg)";
                }
                if (iconSendRef.current) iconSendRef.current.style.opacity = "0";

                if (zipperStageRef.current) {
                  zipperStageRef.current.style.opacity = "1";
                  zipperStageRef.current.style.transform = "translate3d(0, 0, 0)";
                }

                if (track1TextRef.current) track1TextRef.current.style.clipPath = "inset(0 0 0 0)";
                if (track1OpenRef.current) track1OpenRef.current.style.clipPath = "inset(0 0 0 0)";
                if (track1ClosedRef.current) track1ClosedRef.current.style.clipPath = "inset(0 0 0 100%)";

                if (track2TextRef.current) track2TextRef.current.style.clipPath = "inset(0 0 0 0)";
                if (track2OpenRef.current) track2OpenRef.current.style.clipPath = "inset(0 0 0 0)";
                if (track2ClosedRef.current) track2ClosedRef.current.style.clipPath = "inset(0 100% 0 0)";

                if (studioFloorRef.current) studioFloorRef.current.style.opacity = "0";
              }

              // ── PHASE 16: TILE RUNS TO THE FAR LEFT WALL (rawProgress 0.655 -> 0.70) ──
              // "LET'S KNOW ABOUT ME" remains 100% STATIC and untouched!
              if (rawProgress >= 0.655 && rawProgress < 0.70) {
                if (zipperStageRef.current) {
                  zipperStageRef.current.style.opacity = "1";
                  zipperStageRef.current.style.transform = "translate3d(0, 0, 0)";
                }
                if (track1TextRef.current) track1TextRef.current.style.clipPath = "inset(0 0 0 0)";
                if (track2TextRef.current) track2TextRef.current.style.clipPath = "inset(0 0 0 0)";
                if (pullTabClaspRef.current) pullTabClaspRef.current.style.opacity = "0";

                const wallP = Math.min(1, (rawProgress - 0.655) / 0.045);
                const wallEased = gsap.parseEase("power2.out")(wallP);

                // Run from track end to the far left wall of the screen
                const startX = row1CenterX - halfW;
                const targetWallX = -window.innerWidth / 2 + 28;
                tileX = startX + wallEased * (targetWallX - startX);
                tileY = row2Y;
                rotX = 0;
                rotY = 0;
                rotZ = 0;
                skewX = 0;
                tileScale = 1.0;

                // CLEAN ICON MORPH (No jumble! User shrinks away, Send emerges smoothly)
                if (wallP < 0.45) {
                  const p = wallP / 0.45;
                  if (iconUserRef.current) {
                    iconUserRef.current.style.opacity = `${1 - p}`;
                    iconUserRef.current.style.transform = `scale(${Math.max(0, 1 - p)}) rotate(${-p * 90}deg)`;
                  }
                  if (iconSendRef.current) {
                    iconSendRef.current.style.opacity = "0";
                    iconSendRef.current.style.transform = "scale(0) rotate(90deg)";
                  }
                } else {
                  const p = (wallP - 0.45) / 0.55;
                  const pEased = gsap.parseEase("back.out(2)")(p);
                  if (iconUserRef.current) {
                    iconUserRef.current.style.opacity = "0";
                    iconUserRef.current.style.transform = "scale(0)";
                  }
                  if (iconSendRef.current) {
                    iconSendRef.current.style.opacity = `${p}`;
                    iconSendRef.current.style.transform = `scale(${pEased}) rotate(0deg)`;
                  }
                }
                if (iconBriefcaseRef.current) iconBriefcaseRef.current.style.opacity = "0";
                if (iconCompassRef.current) iconCompassRef.current.style.opacity = "0";

                // Book stage is hidden offscreen to the left
                if (bookStageRef.current) {
                  bookStageRef.current.style.visibility = "hidden";
                  bookStageRef.current.style.transform = "translate3d(-100%, 0, 0)";
                }
                if (leadingTileRef.current) leadingTileRef.current.style.opacity = "0";
                if (cloneTileRef.current) cloneTileRef.current.style.opacity = "0";
              }

              // APPLY GPU 3D TRANSFORMS TO THE PERSISTENT TILE
              const finalRotZ = rotZ || tileRot;
              if (mainTileRef.current) {
                mainTileRef.current.style.transform = `translate3d(${tileX}px, ${tileY}px, 0) scale(${tileScale}) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${finalRotZ}deg) skewX(${skewX}deg)`;
                // Handover: mainTileRef hides when section slide starts at rawProgress >= 0.70!
                if (rawProgress >= 0.70) {
                  mainTileRef.current.style.opacity = "0";
                } else {
                  mainTileRef.current.style.opacity = `${tileOpacity}`;
                }
                mainTileRef.current.style.boxShadow = tileBoxShadow;
              }

              // ── PHASE 17: HORIZONTAL SECTION SLIDE-IN (rawProgress 0.70 -> 0.80) ──
              // Full section slides in from left like an off-canvas drawer / YouTube sidebar!
              // The leadingTileRef is firmly stuck on the right border, fully visible & overflowing!
              if (rawProgress >= 0.70 && rawProgress < 0.80) {
                const slideP = Math.min(1, (rawProgress - 0.70) / 0.10);
                const slideEased = gsap.parseEase("power2.out")(slideP);
                const slidePercent = (-1 + slideEased) * 100;

                if (bookStageRef.current) {
                  bookStageRef.current.style.visibility = "visible";
                  bookStageRef.current.style.opacity = "1";
                  bookStageRef.current.style.transform = `translate3d(${slidePercent}%, 0, 0)`;
                }

                // The leading tile is firmly stuck on the border (overflowing outside, fully visible!)
                if (leadingTileRef.current) {
                  leadingTileRef.current.style.opacity = "1";
                  leadingTileRef.current.style.transform = "translate(50%, -50%)";
                }
                if (cloneTileRef.current) cloneTileRef.current.style.opacity = "0";
              }

              // ── PHASE 18: TILE DOCKS FROM RIGHT SIDE STRAIGHT INTO THE SLOT (rawProgress 0.80 -> 0.84) ──
              if (rawProgress >= 0.80) {
                if (bookStageRef.current) {
                  bookStageRef.current.style.visibility = "visible";
                  bookStageRef.current.style.opacity = "1";
                  bookStageRef.current.style.transform = "translate3d(0%, 0, 0)";
                }

                if (rawProgress < 0.84) {
                  const dockP = Math.min(1, (rawProgress - 0.80) / 0.04);
                  const dockEased = gsap.parseEase("power3.out")(dockP);

                  // Tile comes in from right side and glides directly into (0, 0, 0) of the slot!
                  // It is already inside the 3D book cover, so it matches the book's 3D angle perfectly!
                  if (leadingTileRef.current) {
                    leadingTileRef.current.style.opacity = `${Math.max(0, 1 - dockP * 3)}`;
                  }
                  if (cloneTileRef.current) {
                    cloneTileRef.current.style.opacity = "1";
                    // Glides from the right side of the book (+320px) directly to 0px (exact slot center)!
                    const currentX = 320 * (1 - dockEased);
                    const currentY = -40 * (1 - dockEased);
                    const arcZ = Math.sin(dockP * Math.PI) * 45;
                    cloneTileRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, ${arcZ}px)`;
                  }
                } else {
                  // Fully settled in the exact center of the slot
                  if (leadingTileRef.current) leadingTileRef.current.style.opacity = "0";
                  if (cloneTileRef.current) {
                    cloneTileRef.current.style.opacity = "1";
                    cloneTileRef.current.style.transform = "translate3d(0, 0, 0)";
                  }
                }
              }

              // ── AUTOMATIC WATER DROP RIPPLE & 3D TEXT POP (Fires immediately on dock at 0.835!) ──
              if (rawProgress >= 0.835) {
                // 1. Automatic Real-Time Water Drop Wave (No slow scroll scrubbing!)
                if (!rippleTriggeredRef.current && ripple1Ref.current && ripple2Ref.current && ripple3Ref.current) {
                  rippleTriggeredRef.current = true;
                  gsap.fromTo(ripple1Ref.current, 
                    { scale: 1, opacity: 0.95 },
                    { scale: 3.2, opacity: 0, duration: 0.75, ease: "power2.out" }
                  );
                  gsap.fromTo(ripple2Ref.current, 
                    { scale: 1, opacity: 0.8 },
                    { scale: 2.6, opacity: 0, duration: 0.75, delay: 0.12, ease: "power2.out" }
                  );
                  gsap.fromTo(ripple3Ref.current, 
                    { scale: 1, opacity: 0.6 },
                    { scale: 2.0, opacity: 0, duration: 0.7, delay: 0.24, ease: "power2.out" }
                  );
                }

                // 2. Automatic Real-Time 3D Text Extrusion (Snappy & Satisfying!)
                if (!textTriggeredRef.current && journeyTextRef.current) {
                  textTriggeredRef.current = true;
                  const textAnim = { d: 0 };
                  gsap.to(textAnim, {
                    d: 1,
                    duration: 0.55,
                    delay: 0.15,
                    ease: "power3.out",
                    onUpdate: () => {
                      if (!journeyTextRef.current) return;
                      const d = textAnim.d;
                      const shadows = [
                         `0px 0px 0 #38bdf8`,
                         `${(1 * d).toFixed(1)}px ${(1 * d).toFixed(1)}px 0 #0ea5e9`,
                         `${(2 * d).toFixed(1)}px ${(2 * d).toFixed(1)}px 0 #0284c7`,
                         `${(3 * d).toFixed(1)}px ${(3 * d).toFixed(1)}px 0 #0369a1`,
                         `${(4 * d).toFixed(1)}px ${(4 * d).toFixed(1)}px 0 #075985`,
                         `${(5 * d).toFixed(1)}px ${(5 * d).toFixed(1)}px 0 #0c4a6e`,
                         `${(6 * d).toFixed(1)}px ${(6 * d).toFixed(1)}px 0 #083344`,
                         `${(7 * d).toFixed(1)}px ${(7 * d).toFixed(1)}px 4px rgba(2,132,199,${0.5 * d})`,
                         `${(8 * d).toFixed(1)}px ${(8 * d).toFixed(1)}px 8px rgba(12,74,110,${0.4 * d})`,
                         `0px 0px ${(10 * d).toFixed(1)}px rgba(56,189,248,${0.35 * d})`
                      ];
                      journeyTextRef.current.style.transform = `translateZ(${d * 16}px)`;
                      journeyTextRef.current.style.textShadow = shadows.join(', ');
                    }
                  });
                }
              } else if (rawProgress < 0.79) {
                // Reset trigger if scrolling backward
                rippleTriggeredRef.current = false;
                textTriggeredRef.current = false;
                if (ripple1Ref.current) ripple1Ref.current.style.opacity = "0";
                if (ripple2Ref.current) ripple2Ref.current.style.opacity = "0";
                if (ripple3Ref.current) ripple3Ref.current.style.opacity = "0";
                if (journeyTextRef.current) {
                  journeyTextRef.current.style.transform = "translateZ(0px)";
                  journeyTextRef.current.style.textShadow = "0px 0px 0 #0ea5e9";
                }
              }

              // --- SMOOTH LUXURIOUS PAGE FLIPS AND BOOK CLOSE ---
              pagesRef.current.forEach((page, i) => {
                if (!page) return;
                
                const start = 0.84 + i * 0.025; // 0.840, 0.865, 0.890, 0.915, 0.940
                const duration = 0.04;
                let p = 0;
                if (rawProgress > start) {
                  p = Math.min(1, (rawProgress - start) / duration);
                }
                const eased = gsap.parseEase("power2.inOut")(p);
                const angle = eased * -180;
                
                // Dynamic Z-depth for physical stacking in 3D
                const startZ = (6 - i) * 2; 
                const endZ = (i + 1) * 2;   
                const currentZ = startZ + (endZ - startZ) * eased;
                
                const archZ = Math.sin(eased * Math.PI) * 15;
                
                page.style.transform = `translateZ(${currentZ + archZ}px) rotateY(${angle}deg)`;
                
                // Toaster Lift Animation for ALL left-page images (Back of pages)
                const toasterImg = page.querySelector('.toaster-img') as HTMLImageElement;
                if (toasterImg) {
                  let liftP = 0;
                  if (eased > 0.5) {
                    liftP = (eased - 0.5) / 0.5;
                  }
                  const liftEased = gsap.parseEase("back.out(1.2)")(liftP);
                  toasterImg.style.transform = `translateY(${100 - liftEased * 100}%) translateZ(30px)`;
                }
              });

              // Book Close Animation (The Back Cover swings to the left)
              if (backCoverRef.current) {
                const closeStart = 0.950; // starts closely after page 4
                const closeDuration = 0.050; // stretches to 1.0
                let closeP = 0;
                if (rawProgress > closeStart) {
                  closeP = Math.min(1, (rawProgress - closeStart) / closeDuration);
                }
                const closeEased = gsap.parseEase("power2.inOut")(closeP);
                const closeAngle = closeEased * -180;
                const closeArchZ = Math.sin(closeEased * Math.PI) * 20;
                
                // It needs to physically rest ON TOP of the flipped left pages
                // Left pages max out at Z=10. Back cover goes to Z=14.
                const closeZ = closeEased * 14;
                
                backCoverRef.current.style.transform = `translateZ(${closeZ + closeArchZ}px) rotateY(${closeAngle}deg)`;
                // Switch z-index halfway so it renders above all inner pages
                backCoverRef.current.style.zIndex = closeEased > 0.5 ? "50" : "0";
              }
            },
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  // Subtle initial scroll hint that dissolves away
  const initialHintOpacity = Math.max(0, 1 - scrollProgress * 20);

  // Pure Neumorphic Snow-White Solid Overlay (#ECF0F3 matched from reference image)
  const whiteScreenOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.32) / 0.05));

  return (
    // 3000vh height ensures calm, luxurious scroll pacing for the entire 18-phase choreography + book stage
    <section ref={containerRef} className="relative w-full h-[3000vh] bg-black">
      {/* Sticky Fullscreen Canvas Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center select-none">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          style={{
            opacity: isFirstFrameReady ? 1 : 0,
            imageRendering: "auto",
          }}
        />

        {/* ── PHASE 0: BALANCED CURVED RAIL TEXT (Calibrated trajectory across open sky) ── */}
        <div
          ref={railContainerRef}
          className="absolute inset-0 pointer-events-none z-15 flex items-center justify-center transition-opacity duration-150"
          style={{ opacity: 1 }}
        >
          <svg
            viewBox="0 0 1600 900"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="textSkyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#A5F3FC" />
                <stop offset="35%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#93C5FD" />
              </linearGradient>

              <linearGradient id="railGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0284C7" stopOpacity="0" />
                <stop offset="25%" stopColor="#38BDF8" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#E0F2FE" stopOpacity="0.7" />
                <stop offset="75%" stopColor="#38BDF8" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
              </linearGradient>
            </defs>

            <path
              id="curveRailTrack"
              d="M -350 580 C 200 220, 480 220, 800 220 C 1120 220, 1400 220, 1950 580"
              fill="none"
              stroke="url(#railGlow)"
              strokeWidth="1.5"
              strokeDasharray="6 8"
              className="opacity-40"
            />

            <text
              fill="url(#textSkyGradient)"
              className="uppercase select-none font-extrabold"
              style={{
                fontFamily: "var(--font-syne), var(--font-heading), sans-serif",
                fontSize: "35px",
                fontWeight: 800,
                letterSpacing: "0.24em",
                filter:
                  "drop-shadow(0px 4px 14px rgba(0, 0, 0, 0.95)) drop-shadow(0px 0px 18px rgba(56, 189, 248, 0.45))",
              }}
            >
              <textPath
                ref={textPathRef}
                href="#curveRailTrack"
                startOffset="1750px"
              >
                START A JOURNEY WITH SIYAM ✦
              </textPath>
            </text>
          </svg>
        </div>

        {/* Seamless Neumorphic Surface Overlay (#ECF0F3 matched from reference image) */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-150 z-10"
          style={{
            backgroundColor: "#ECF0F3",
            opacity: whiteScreenOpacity,
          }}
        />

        {/* ── 3D STUDIO TABLETOP FLOOR WITH CARVED SNAKE DRAIN (MATCHES IMAGE 3) ── */}
        <div
          ref={studioFloorRef}
          className="absolute inset-0 pointer-events-none transition-opacity duration-200 z-15 flex items-center justify-center overflow-hidden"
          style={{ opacity: 0 }}
        >
          {/* Clean Studio Ambient Lighting Gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 95% 75% at 50% 35%, #FFFFFF 0%, #F1F4F8 40%, #E2E8F0 75%, #CBD5E1 100%)",
            }}
          />

          {/* Gentle Level Floor Grid (Level Horizon - NO STEEP MOUNTAIN SLOPE!) */}
          <div
            className="absolute w-[180vw] h-[180vh] flex items-center justify-center pointer-events-none"
            style={{
              transform: "perspective(1200px) rotateX(38deg)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Subtle Studio Architectural Floor Grid */}
            <div
              className="absolute inset-0 opacity-[0.14]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(148, 163, 184, 0.25) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(148, 163, 184, 0.25) 1px, transparent 1px)
                `,
                backgroundSize: "70px 70px",
              }}
            />
          </div>
        </div>

        {/* ── UNIFIED CHOREOGRAPHY STAGE (PERSPECTIVE 1400PX TRUE 3D) ── */}
        <div
          ref={stageRef}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-6 pointer-events-none perspective-[1400px]"
          style={{
            opacity: 0,
            visibility: "hidden",
            transformStyle: "preserve-3d",
          }}
        >
          {/* ── 1. CLIENT WORK STAGE (Cavity & Kinetic Words) ── */}
          <div
            ref={clientWorkStageRef}
            className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center relative select-none z-30"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Row 1: Symmetrical 3-Column Center: [Client] [Socket Cavity & Universal Tile] [Work] */}
            <div className="w-full flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
              {/* Left Column: Client */}
              <div className="flex-1 flex justify-end overflow-hidden pr-3 sm:pr-5 md:pr-7">
                <div className="overflow-hidden py-2 px-1">
                  <span
                    ref={clientWordRef}
                    className="inline-block font-heading font-black text-4xl sm:text-6xl md:text-8xl lg:text-[9.2rem] uppercase tracking-tighter leading-none text-slate-950 select-none whitespace-nowrap will-change-transform"
                    style={{ opacity: 0 }}
                  >
                    Client
                  </span>
                </div>
              </div>

              {/* Center Column: Socket Cavity & Universal Tile */}
              <div className="shrink-0 flex items-center justify-center relative" style={{ transformStyle: "preserve-3d" }}>
                {/* Shockwave Energy Ripple (Clean circular pulse, fires only upon absorption) */}
                <div
                  ref={shockwaveRef}
                  className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-blue-400/50 pointer-events-none -z-10 shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                  style={{ opacity: 0, transform: "scale(0.8)" }}
                />

                {/* The Socket Cavity Hole (Original Nesting Parent - Invisible when empty!) */}
                <div
                  ref={socketRef}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-2xl sm:rounded-3xl md:rounded-[32px] lg:rounded-[36px] flex items-center justify-center relative select-none"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    opacity: 1,
                    boxShadow: "none",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* THE ONE AND ONLY UNIVERSAL NEUMORPHIC TILE (PERFECT FIT IN GAP GUARANTEED) */}
                  <div
                    ref={mainTileRef}
                    className="w-full h-full rounded-2xl sm:rounded-3xl md:rounded-[32px] lg:rounded-[36px] flex items-center justify-center relative select-none will-change-transform z-50 border border-slate-200/90"
                    style={{
                      backgroundColor: "#FFFFFF",
                      opacity: 0,
                      transformOrigin: "center center",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Zipper Pull-Tab Clasp Hanger (Fades in when entering zipper mode) */}
                    <div
                      ref={pullTabClaspRef}
                      className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 w-4 sm:w-5 h-6 sm:h-8 rounded-md border border-slate-300/80 bg-gradient-to-b from-[#ECF0F3] via-slate-200 to-slate-300 shadow-md flex items-center justify-center pointer-events-none -z-10 transition-opacity duration-200"
                      style={{ opacity: 0, transformOrigin: "top center" }}
                    >
                      <div className="w-1.5 h-3 rounded-full bg-slate-400/70 shadow-inner" />
                    </div>

                    {/* 4 Morphing Icons: Briefcase -> Compass -> User -> Send/Rocket */}
                    <div
                      ref={iconBriefcaseRef}
                      className="absolute inset-0 flex items-center justify-center will-change-transform"
                      style={{ opacity: 1, transform: "scale(1) rotate(0deg)" }}
                    >
                      <Briefcase className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 lg:w-13 lg:h-13 text-blue-600 stroke-[2.3]" />
                    </div>

                    <div
                      ref={iconCompassRef}
                      className="absolute inset-0 flex items-center justify-center will-change-transform"
                      style={{ opacity: 0, transform: "scale(0) rotate(0deg)" }}
                    >
                      <Compass className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 lg:w-13 lg:h-13 text-sky-500 stroke-[2.3]" />
                    </div>

                    <div
                      ref={iconUserRef}
                      className="absolute inset-0 flex items-center justify-center will-change-transform"
                      style={{ opacity: 0, transform: "scale(0) rotate(0deg)" }}
                    >
                      <User className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 lg:w-13 lg:h-13 text-indigo-600 stroke-[2.3]" />
                    </div>

                    <div
                      ref={iconSendRef}
                      className="absolute inset-0 flex items-center justify-center will-change-transform"
                      style={{ opacity: 0, transform: "scale(0) rotate(0deg)" }}
                    >
                      <Send className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-blue-600 stroke-[2.4] rotate-45" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Work */}
              <div className="flex-1 flex justify-start overflow-hidden pl-3 sm:pl-5 md:pl-7">
                <div className="overflow-hidden py-2 px-1">
                  <span
                    ref={workWordRef}
                    className="inline-block font-heading font-black text-4xl sm:text-6xl md:text-8xl lg:text-[9.2rem] uppercase tracking-tighter leading-none text-slate-950 select-none whitespace-nowrap will-change-transform"
                    style={{ opacity: 0 }}
                  >
                    Work
                  </span>
                </div>
              </div>
            </div>

            {/* Row 2: First */}
            <div className="w-full flex items-center justify-center mt-2 sm:mt-4 md:mt-6 overflow-hidden">
              <div className="overflow-hidden py-2 px-1">
                <span
                  ref={firstWordRef}
                  className="inline-block font-heading font-black text-4xl sm:text-6xl md:text-8xl lg:text-[9.2rem] uppercase tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 select-none whitespace-nowrap will-change-transform"
                  style={{ opacity: 0 }}
                >
                  First
                </span>
              </div>
            </div>
          </div>

          {/* ── 2. ZIPPER ARENA ("LET'S KNOW ABOUT ME") ── */}
          <div
            ref={zipperStageRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none transition-transform duration-100 z-10"
            style={{ opacity: 0, visibility: "visible" }}
          >
            {/* Balanced Typographic Proximity (Tighter golden-ratio vertical gap) */}
            <div className="relative w-full max-w-4xl mx-auto h-[370px] sm:h-[410px] flex flex-col justify-between py-4 sm:py-6 px-4">
              {/* ROW 1: "LET'S KNOW ABOUT" (Unzipped Right -> Left) */}
              <div
                ref={track1RowRef}
                className="relative w-full h-24 sm:h-32 flex items-center justify-center"
              >
                {/* Closed Metallic Zipper Track Ahead */}
                <div
                  ref={track1ClosedRef}
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-6 pointer-events-none"
                >
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 24">
                    <line x1="0" y1="12" x2="1000" y2="12" stroke="#94A3B8" strokeWidth="2" strokeDasharray="3 4" />
                    <line x1="0" y1="9" x2="1000" y2="9" stroke="#64748B" strokeWidth="2.5" strokeDasharray="4 6" />
                    <line x1="0" y1="15" x2="1000" y2="15" stroke="#64748B" strokeWidth="2.5" strokeDasharray="4 6" strokeDashoffset="5" />
                  </svg>
                </div>

                {/* Parted Metallic Zipper Track Behind */}
                <div
                  ref={track1OpenRef}
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-24 sm:h-32 pointer-events-none"
                  style={{ clipPath: "inset(0 0 0 100%)" }}
                >
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 90">
                    <line x1="0" y1="6" x2="1000" y2="6" stroke="#94A3B8" strokeWidth="2.5" strokeDasharray="4 6" />
                    <line x1="0" y1="84" x2="1000" y2="84" stroke="#94A3B8" strokeWidth="2.5" strokeDasharray="4 6" strokeDashoffset="5" />
                  </svg>
                </div>

                {/* Unzipping Text Container ("LET'S KNOW ABOUT") */}
                <div
                  ref={track1TextRef}
                  className="relative z-10 w-full flex items-center justify-center will-change-transform"
                  style={{ clipPath: "inset(0 0 0 100%)" }}
                >
                  <h2 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] uppercase tracking-tight text-slate-900 whitespace-nowrap drop-shadow-sm select-none">
                    LET&apos;S KNOW ABOUT
                  </h2>
                </div>
              </div>

              {/* ROW 2: "ME" (1.4x LARGER, Unzipped Right -> Left with Left Dock) */}
              <div
                ref={track2RowRef}
                className="relative w-full h-28 sm:h-40 flex items-center justify-center"
              >
                {/* Closed Metallic Track Ahead */}
                <div
                  ref={track2ClosedRef}
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-6 pointer-events-none"
                >
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 24">
                    <line x1="0" y1="12" x2="1000" y2="12" stroke="#94A3B8" strokeWidth="2" strokeDasharray="3 4" />
                    <line x1="0" y1="9" x2="1000" y2="9" stroke="#64748B" strokeWidth="2.5" strokeDasharray="4 6" />
                    <line x1="0" y1="15" x2="1000" y2="15" stroke="#64748B" strokeWidth="2.5" strokeDasharray="4 6" strokeDashoffset="5" />
                  </svg>
                </div>

                {/* Parted Metallic Track Behind */}
                <div
                  ref={track2OpenRef}
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-28 sm:h-36 pointer-events-none"
                  style={{ clipPath: "inset(0 0 0 100%)" }}
                >
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 90">
                    <line x1="0" y1="6" x2="1000" y2="6" stroke="#94A3B8" strokeWidth="2.5" strokeDasharray="4 6" />
                    <line x1="0" y1="84" x2="1000" y2="84" stroke="#94A3B8" strokeWidth="2.5" strokeDasharray="4 6" strokeDashoffset="5" />
                  </svg>
                </div>

                {/* Unzipping Text Container ("ME" 1.4x LARGER with left padding for docked tile) */}
                <div
                  ref={track2TextRef}
                  className="relative z-10 w-full flex items-center justify-center will-change-transform pl-20 sm:pl-32"
                  style={{ clipPath: "inset(0 0 0 100%)" }}
                >
                  <h2 className="font-heading font-black text-6xl sm:text-8xl md:text-9xl lg:text-[8rem] xl:text-[9.5rem] uppercase tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-400 whitespace-nowrap select-none drop-shadow-sm">
                    ME
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 4. BOOK STAGE (HORIZONTAL SLIDE-IN SECTION FROM LEFT) ── */}
        <div
          ref={bookStageRef}
          className="absolute inset-0 z-30 flex items-center justify-center overflow-visible bg-[#F1F5F9] pointer-events-none"
          style={{ 
            transform: "translate3d(-100%, 0, 0)",
            boxShadow: "35px 0 80px rgba(15, 23, 42, 0.22), 10px 0 30px rgba(15, 23, 42, 0.12)",
            borderRight: "2px solid #cbd5e1",
            visibility: "hidden",
            perspective: "2500px"
          }}
        >
          {/* Leading Edge Drag Tile (Stuck on the right border, fully overflowing outside) */}
          <div 
            ref={leadingTileRef}
            className="absolute z-50 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-22 lg:h-22 rounded-2xl sm:rounded-[26px] md:rounded-[28px] flex items-center justify-center border-2 border-white/90 shadow-[0_14px_30px_rgba(15,23,42,0.22)] bg-white will-change-transform pointer-events-none"
            style={{ 
              right: "0px", 
              top: "50%", 
              transform: "translate(50%, -50%)", 
              opacity: 0 
            }}
          >
            <Send className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-9 lg:h-9 text-sky-500 stroke-[2.3]" />
          </div>
          <div 
            className="relative flex items-end justify-center w-full max-w-[1360px] mx-auto px-4"
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateX(45deg) rotateZ(-20deg) scale(1.15)",
              marginTop: "8vh" // visually balance the rotation
            }}
          >
             {/* Left Area (Where the cover lands when opened) */}
             <div className="w-1/2 max-w-[680px] h-[500px] sm:h-[650px] relative pointer-events-none" style={{ transformStyle: 'preserve-3d' }} />
             
             {/* Right Area (The Book Block: Back Cover) */}
             <div 
               ref={backCoverRef}
               className="w-1/2 max-w-[680px] h-[500px] sm:h-[650px] bg-slate-100 rounded-r-3xl relative pointer-events-none origin-left will-change-transform" 
               style={{ 
                 transformStyle: 'preserve-3d',
                 boxShadow: '16px 20px 30px -4px rgba(15, 23, 42, 0.12), 4px 8px 12px -2px rgba(15, 23, 42, 0.06)'
               }}
             >
                {/* Inside Back Cover (White page) */}
                <div className="absolute inset-0 bg-white rounded-r-3xl border-r border-slate-200/80" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }} />
                
                {/* OUTSIDE of Back Cover (Visible when closed over to the left) */}
                <div 
                  className="absolute inset-0 bg-[#edf6fd] rounded-l-3xl flex items-center justify-center shadow-[-6px_10px_24px_-2px_rgba(15,23,42,0.12)]"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                   <h2 className="text-4xl sm:text-6xl font-black text-sky-500 italic uppercase" style={{ fontFamily: 'Georgia, serif' }}>The End</h2>
                </div>
             </div>

             {/* Front Cover (Anchored at the center, initially covers the Right Area) */}
             {/* Note: It rotates from 0deg (closed) to -180deg (open) */}
             <div 
               ref={(el) => { pagesRef.current[0] = el; }} // Treat the Front Cover as Page 0 for GSAP
               className="absolute top-0 left-1/2 w-[calc(50%-8px)] sm:w-[calc(50%-12px)] max-w-[680px] h-[calc(100%-8px)] origin-left will-change-transform z-50 rounded-r-3xl"
               style={{ 
                 transformStyle: 'preserve-3d', 
                 transform: 'rotateY(0deg)', // Closed
                 backgroundColor: '#edf6fd', // Soft Snow Blue cover
                 boxShadow: '6px 10px 24px -2px rgba(15, 23, 42, 0.12)'
               }}
             >
                 {/* Front Side of the Cover (The Soft Snow Blue Design) */}
                 <div className="absolute inset-0 flex flex-col items-center justify-center rounded-r-3xl" style={{ backfaceVisibility: 'hidden', transform: 'translateZ(1px) rotateY(0deg)' }}>
                     {/* Leather Texture overlay */}
                     <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0,transparent_100%)] pointer-events-none rounded-r-3xl" />
                     
                     {/* 3D Text */}
                     <h2 
                       ref={journeyTextRef}
                       className="absolute top-[22%] text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] font-black uppercase text-center will-change-transform select-none" 
                       style={{ 
                         color: '#38bdf8',
                         fontFamily: '"Arial Black", Gadget, sans-serif',
                         letterSpacing: '1px',
                         lineHeight: '1.15',
                         transform: 'translateZ(0px)',
                       }}
                     >
                        My<br/>Journey
                     </h2>

                     {/* The Empty Slot for Icon Box (Recessed cavity matching cover color with realistic inset depth) */}
                     <div 
                       ref={coverSlotRef}
                        className="absolute top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-22 lg:h-22 rounded-2xl sm:rounded-[26px] md:rounded-[28px] overflow-hidden flex items-center justify-center"
                       style={{
                         backgroundColor: '#d8eaf8',
                         boxShadow: 'inset 3px 5px 10px rgba(30, 58, 138, 0.25), inset -2px -2px 6px rgba(255, 255, 255, 0.95), 0 1px 2px rgba(255, 255, 255, 0.8)',
                         border: '1px solid rgba(186, 215, 242, 0.7)'
                       }}
                     />

                     {/* Water Drop Ripple Wave Rings (Impact on slot docking) */}
                     <div className="absolute top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 flex items-center justify-center">
                       <div 
                         ref={ripple1Ref}
                         className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-22 lg:h-22 rounded-full border-2 border-sky-400 absolute"
                         style={{ opacity: 0, transform: "scale(1)" }}
                       />
                       <div 
                         ref={ripple2Ref}
                         className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-22 lg:h-22 rounded-full border border-sky-300 absolute"
                         style={{ opacity: 0, transform: "scale(1)" }}
                       />
                       <div 
                         ref={ripple3Ref}
                         className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-22 lg:h-22 rounded-full border border-sky-200 absolute"
                         style={{ opacity: 0, transform: "scale(1)" }}
                       />
                     </div>

                     {/* The Clone Tile (Identical size & radius to slot, snug fit, perfectly centered) */}
                     <div 
                       ref={cloneTileRef}
                       className="absolute top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-22 lg:h-22 rounded-2xl sm:rounded-[26px] md:rounded-[28px] flex items-center justify-center border border-slate-200/90 shadow-[0_12px_24px_rgba(15,23,42,0.15)] will-change-transform bg-[#FFFFFF] pointer-events-none"
                       style={{ opacity: 0, transform: 'translate3d(-175px, 260px, 110px) scale(1)' }} 
                     >
                        <Send className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-9 lg:h-9 text-blue-600 stroke-[2.3]" />
                     </div>
                 </div>

                 {/* Back Side of the Front Cover (Inside Cover, visible when flipped left) */}
                 <div className="absolute inset-0 bg-slate-50 border border-slate-200 shadow-[-2px_2px_8px_rgba(0,0,0,0.05)] rounded-l-3xl flex items-center justify-center overflow-hidden" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', transformStyle: 'preserve-3d' }}>
                     <div className="absolute inset-x-8 bottom-8 top-16 flex items-end justify-center" style={{ transformStyle: 'preserve-3d' }}>
                       {/* Toaster Slit Container (clips the image as it rises) */}
                       <div className="w-full h-full relative overflow-hidden flex items-end justify-center rounded-xl" style={{ transformStyle: 'preserve-3d' }}>
                         <img 
                           src={BIOGRAPHY_ERAS[0].image}
                           alt="Era 1" 
                           className="toaster-img w-[85%] object-contain mix-blend-multiply will-change-transform"
                           style={{ transform: "translateY(100%)" }} 
                         />
                         {/* Slit shadow for realism */}
                         <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                       </div>
                     </div>
                 </div>
             </div>

             {/* Pages Container (Inner Pages) */}
             <div 
               className="absolute left-0 right-0 top-auto bottom-0 flex justify-center h-[500px] sm:h-[650px] pointer-events-none"
               style={{ transformStyle: "preserve-3d" }}
             >
               {/* Inner Pages (Pages 1, 2, 3, 4) */}
               {[1, 2, 3, 4].map((i) => {
                 const currentEraText = BIOGRAPHY_ERAS[i - 1];
                 const nextEraImage = i < 4 ? BIOGRAPHY_ERAS[i] : null;
                 
                 return (
                  <div 
                    key={i}
                    ref={(el) => { pagesRef.current[i] = el; }}
                    className="absolute top-0 w-[calc(50%-8px)] sm:w-[calc(50%-12px)] max-w-[680px] h-[calc(100%-8px)] origin-left will-change-transform mt-1 rounded-r-2xl"
                    style={{
                      left: '50%',
                      transformStyle: 'preserve-3d',
                      zIndex: 10 - i,
                    }}
                  >
                    {/* Front of Page (Right Side of Spread) */}
                    <div 
                      className="absolute inset-0 bg-white border border-slate-200 shadow-[2px_2px_8px_rgba(0,0,0,0.05)] rounded-tr-2xl flex flex-col p-8 sm:p-12 overflow-hidden pointer-events-auto"
                      style={{ backfaceVisibility: "hidden", transform: 'rotateY(0deg)' }}
                    >
                      {/* Ribbon Page Number (Right side page) */}
                      <div className="absolute top-0 right-8 w-12 h-16 bg-[#0284c7] shadow-lg flex justify-center pt-3 z-20" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}>
                        <span className="text-white font-black text-xl select-none leading-none">
                          {i * 2 - 1}
                        </span>
                      </div>

                      <div className="flex flex-col h-full text-slate-800 relative z-10 pt-4">
                        <span className="text-sky-500 font-bold tracking-widest text-xs sm:text-sm mb-2 sm:mb-3 uppercase">{currentEraText.era} • {currentEraText.years}</span>
                        <h3 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-5 text-slate-900 leading-tight">
                          {currentEraText.title}
                        </h3>
                        <div className="inline-block px-4 py-1.5 bg-slate-100 rounded-full text-xs sm:text-sm font-semibold text-slate-500 mb-6 sm:mb-8 w-max border border-slate-200">
                          {currentEraText.age}
                        </div>
                        <p className="font-medium text-slate-600 leading-relaxed text-sm sm:text-base md:text-lg">
                          {currentEraText.desc}
                        </p>
                        
                        {/* Click to see details */}
                        <button 
                          onClick={() => setActiveEra(i - 1)}
                          className="mt-auto self-start flex items-center gap-2 text-sky-500 font-bold uppercase tracking-widest text-xs hover:text-sky-600 transition-colors pointer-events-auto"
                        >
                           Click to see details <span className="text-lg leading-none">→</span>
                        </button>
                      </div>
                    </div>

                    {/* Back of Page (Left Side of NEXT Spread) */}
                    <div 
                      className={`absolute inset-0 bg-slate-50 border border-slate-200 shadow-[-2px_2px_8px_rgba(0,0,0,0.05)] flex items-center justify-center overflow-hidden ${i === 4 ? 'rounded-l-2xl' : 'rounded-tl-2xl'}`}
                      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", transformStyle: "preserve-3d" }}
                    >
                        {/* Ribbon Page Number (Left side page) */}
                        {i < 4 && (
                          <div className="absolute top-0 left-8 w-12 h-16 bg-[#0284c7] shadow-lg flex justify-center pt-3 z-20" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}>
                            <span className="text-white font-black text-xl select-none leading-none">
                              {i * 2}
                            </span>
                          </div>
                        )}

                        {nextEraImage && (
                          <div className="absolute inset-x-8 bottom-8 top-16 flex items-end justify-center" style={{ transformStyle: 'preserve-3d' }}>
                            <div className="w-full h-full relative overflow-hidden flex items-end justify-center rounded-xl" style={{ transformStyle: 'preserve-3d' }}>
                              <img 
                                src={nextEraImage.image} 
                                alt={nextEraImage.title} 
                                className="toaster-img w-[85%] object-contain mix-blend-multiply will-change-transform"
                                style={{ transform: "translateY(100%)" }} 
                              />
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                 );
               })}
             </div>
          </div>
        </div>

        {/* Minimal Initial Scroll Mouse Pill (Fades out completely on first scroll) */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-200 z-10 flex flex-col items-center gap-1.5"
          style={{ opacity: initialHintOpacity }}
        >
          <div className="w-5 h-9 rounded-full border-2 border-white/50 flex justify-center pt-1.5 shadow-lg backdrop-blur-xs">
            <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* FULL SCREEN GLASSMORPHISM DETAILS OVERLAY */}
      {activeEra !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300 pointer-events-auto">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setActiveEra(null)} />
          <div className="relative w-full max-w-4xl h-[85vh] bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 flex flex-col overflow-hidden">
             <button onClick={() => setActiveEra(null)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100/80 flex items-center justify-center text-slate-500 hover:bg-slate-800 hover:text-white z-10 transition-colors shadow-sm">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
             </button>
             
             <div className="w-full h-[45%] relative bg-slate-50/50 flex items-center justify-center p-6 border-b border-white/30 shrink-0">
                <div className="absolute inset-0 bg-gradient-to-b from-sky-50/50 to-transparent pointer-events-none" />
                <img src={BIOGRAPHY_ERAS[activeEra].image} className="h-full object-contain mix-blend-multiply drop-shadow-xl will-change-transform" alt="" />
             </div>
             
             <div className="flex-1 overflow-y-auto overscroll-contain p-8 sm:p-12 bg-white/40 pointer-events-auto">
               <span className="text-sky-500 font-bold tracking-widest uppercase text-sm mb-2 block">{BIOGRAPHY_ERAS[activeEra].era} • {BIOGRAPHY_ERAS[activeEra].years}</span>
               <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight leading-none">{BIOGRAPHY_ERAS[activeEra].title}</h2>
               <div className="inline-block px-4 py-1.5 bg-white rounded-full text-sm font-semibold text-slate-500 mb-8 border border-slate-200/60 shadow-sm">
                 {BIOGRAPHY_ERAS[activeEra].age}
               </div>
               
               <div className="prose prose-slate max-w-none prose-lg">
                 <p className="text-xl text-slate-800 leading-relaxed font-semibold">
                   {BIOGRAPHY_ERAS[activeEra].desc}
                 </p>
                 <p className="text-slate-600 leading-relaxed mt-6">
                   During this pivotal period, numerous foundational skills were established. The projects undertaken required intense dedication, deep technical problem-solving, and a forward-thinking approach to system design. Every challenge served as a stepping stone towards mastering complex architectures and delivering high-impact solutions.
                 </p>
                 <p className="text-slate-600 leading-relaxed mt-4">
                   This era wasn't just about writing code; it was about understanding the philosophy of good software engineering—building systems that are scalable, maintainable, and aligned with cutting-edge industry standards. The transformation from raw ambition to technical excellence began here.
                 </p>
               </div>
             </div>
          </div>
        </div>
      )}
    </section>
  );
}
