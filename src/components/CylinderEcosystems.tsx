"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Layers, ArrowUpRight, ShieldCheck, Zap } from "lucide-react";

const platforms = [
  {
    id: "01",
    tag: "HEALTHTECH",
    title: "Modern Mediks",
    focus: "Clinic management platform digitizing prescriptions, patient records, and clinical workflows for doctors across Bangladesh.",
    highlights: "Used by 50+ clinics. Streamlines daily medical operations and digitizes core healthcare interactions.",
    tech: ["Full-Stack", "System Architecture", "Leadership"],
    icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
  },
  {
    id: "02",
    tag: "ENTERPRISE AUTOMATION",
    title: "Techfrica LLC",
    focus: "Leading software development and IT strategy for UK-based startups, automating complex enterprise workflows.",
    highlights: "Secure systems architecture, remote team leadership, and robust B2B automation tools.",
    tech: ["IT Strategy", "Automation", "Security"],
    icon: <Zap className="w-5 h-5 text-amber-500" />,
  },
  {
    id: "03",
    tag: "DIGITAL TRANSFORMATION",
    title: "House of Change",
    focus: "Led backend development for scalable server-side systems, modernizing legacy enterprise applications.",
    highlights: "Re-architected core systems to support high-throughput API operations and stable data migrations.",
    tech: ["Backend", "Legacy Modernization", "APIs"],
    icon: <Layers className="w-5 h-5 text-blue-600" />,
  },
  {
    id: "04",
    tag: "BUSINESS WORKFLOW",
    title: "ScaleOS",
    focus: "Product development and business workflow automation platform to streamline company operations.",
    highlights: "Tech blog authoring and workflow integrations that turn complex business challenges into automated tools.",
    tech: ["Product Dev", "Workflow Automation"],
    icon: <ShieldCheck className="w-5 h-5 text-purple-600" />,
  },
];

export default function CylinderEcosystems() {
  const [activeIndex, setActiveIndex] = useState(0);
  const drumRef = useRef<HTMLDivElement>(null);
  const drumProgress = useRef({ val: 0 });

  const numCards = platforms.length;

  const goTo = (index: number) => {
    const target = (index + numCards) % numCards;
    setActiveIndex(target);
    gsap.to(drumProgress.current, {
      val: target,
      duration: 0.65,
      ease: "power2.out",
      onUpdate: updateCards,
    });
  };

  const updateCards = () => {
    if (!drumRef.current) return;
    const cards = drumRef.current.querySelectorAll<HTMLElement>(".cylinder-card");
    const isMobile = window.innerWidth < 768;
    const spacing = isMobile ? 290 : 420;

    cards.forEach((card, i) => {
      const diff = i - drumProgress.current.val;
      const absDiff = Math.abs(diff);

      const rotateY = diff * (isMobile ? 24 : 32);
      const translateX = diff * spacing;
      const translateZ = -absDiff * (isMobile ? 90 : 150);
      const scale = Math.max(0.75, 1 - absDiff * 0.16);
      const opacity = Math.max(0.18, 1 - absDiff * 0.45);
      const blur = absDiff > 0.35 ? absDiff * 2.5 : 0;
      const zIndex = Math.round(50 - absDiff * 10);

      gsap.set(card, {
        x: translateX,
        z: translateZ,
        rotationY: rotateY,
        scale: scale,
        opacity: opacity,
        filter: blur > 0 ? `blur(${blur}px)` : "none",
        zIndex: zIndex,
        transformOrigin: "50% 50%",
      });
    });
  };

  useEffect(() => {
    updateCards();
    const handleResize = () => updateCards();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative py-28 bg-[#fbfbfb] border-t border-gray-200/70 overflow-hidden">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center px-4 mb-14">
        <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-mono font-semibold tracking-wider mb-3 border border-blue-100">
          PRODUCTS & SOFTWARE DESIGN
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Featured Ecosystems
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto text-base">
          Interactive 3D architectural showcase. Rotate through multi-tenant platforms, fintech infrastructure, and cloud systems.
        </p>
      </div>

      {/* 3D Cylinder Rotary Drum Stage */}
      <div
        className="relative w-full h-[480px] md:h-[520px] flex items-center justify-center select-none"
        style={{ perspective: "1400px", transformStyle: "preserve-3d" }}
        ref={drumRef}
      >
        {platforms.map((platform, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={platform.id}
              onClick={() => goTo(i)}
              className={`cylinder-card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[310px] sm:w-[380px] md:w-[440px] h-[400px] md:h-[420px] rounded-3xl p-7 md:p-8 flex flex-col justify-between transition-shadow duration-300 cursor-pointer ${
                isActive
                  ? "bg-white/95 backdrop-blur-xl border-2 border-blue-200/90 shadow-[0_25px_60px_rgba(15,36,68,0.12)]"
                  : "bg-white/80 backdrop-blur-md border border-gray-200/70 shadow-[0_15px_35px_rgba(0,0,0,0.04)] hover:border-gray-300"
              }`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Card Top */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold tracking-wider text-blue-600 bg-blue-50/80 px-2.5 py-1 rounded-lg border border-blue-100/60">
                    PLATFORM {platform.id}
                  </span>
                  <div className="p-2 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                    {platform.icon}
                  </div>
                </div>

                <span className="text-[11px] font-mono tracking-widest text-gray-400 uppercase block mb-1">
                  {platform.tag}
                </span>

                <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug mb-3">
                  {platform.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {platform.focus}
                </p>
              </div>

              {/* Card Bottom / Highlights */}
              <div className="border-t border-gray-100 pt-4 mt-auto">
                <div className="mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                    Key Highlights
                  </span>
                  <p className="text-gray-700 text-xs leading-relaxed font-medium">
                    {platform.highlights}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {platform.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 bg-gray-100/80 border border-gray-200 text-gray-600 rounded text-[11px] font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Step Navigator Controls */}
      <div className="flex items-center justify-center gap-4 mt-8 relative z-20">
        <button
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Previous platform"
          className="p-2.5 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-95"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Step Indicator Pills */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur border border-gray-200/80 rounded-full shadow-sm">
          {platforms.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => goTo(idx)}
              className={`px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all duration-200 ${
                idx === activeIndex
                  ? "bg-gray-900 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {p.id}
            </button>
          ))}
        </div>

        <button
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Next platform"
          className="p-2.5 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-95"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
