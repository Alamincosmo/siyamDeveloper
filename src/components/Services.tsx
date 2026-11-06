"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Layers,
  Cpu,
  TrendingUp,
  Calendar,
  ArrowRight,
  Code2,
  Terminal,
  Database,
  Cloud,
  Workflow,
  Sparkles,
  GitBranch,
  Server,
  Zap,
  Globe,
  Network,
  Shield,
  Activity,
  Boxes,
  FileCode,
  Bot,
  Compass,
} from "lucide-react";

// ─── Helpers ─────────────────────────────────────────────────────────────────
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

// ─── Figma-Style Bounding Box ─────────────────────────────────────────────────
const BoundingBox = ({
  isDraggingCorner = false,
  className = "",
}: {
  isDraggingCorner?: boolean;
  className?: string;
}) => (
  <div
    className={`absolute -inset-1.5 sm:-inset-2 border-[1.5px] border-dashed border-[#0C8CE9] rounded-[4px] pointer-events-none z-30 transition-all duration-300 ${className}`}
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
      className={`absolute -bottom-1.5 -right-1.5 size-2.5 bg-[#0C8CE9] border-[1.5px] border-white rounded-[1px] transition-transform duration-200 ${
        isDraggingCorner ? "scale-140 ring-2 ring-[#0C8CE9]/30" : ""
      }`}
    />
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
    style={{
      display: "inline-block",
      width: "1.5px",
      height: "1em",
      backgroundColor: "#1a1a1a",
      marginLeft: "1.5px",
      verticalAlign: "text-bottom",
      animation: "caretBlink 0.85s step-end infinite",
    }}
  />
);

// ─── Tech Icon Resolver ──────────────────────────────────────────────────────
const getTechIcon = (tech: string) => {
  switch (tech.toLowerCase()) {
    case "next.js":
    case "react":
      return <Code2 className="w-3.5 h-3.5 text-blue-600/70" />;
    case "node.js":
    case "typescript":
    case "python":
    case "fastapi":
      return <Terminal className="w-3.5 h-3.5 text-indigo-600/70" />;
    case "postgresql":
    case "redis":
    case "supabase":
      return <Database className="w-3.5 h-3.5 text-sky-600/70" />;
    case "docker":
    case "aws":
    case "linux":
      return <Cloud className="w-3.5 h-3.5 text-slate-600/70" />;
    case "git actions":
      return <GitBranch className="w-3.5 h-3.5 text-slate-600/70" />;
    case "openai apis":
      return <Sparkles className="w-3.5 h-3.5 text-amber-600/70" />;
    case "webhooks":
    case "make/zapier":
      return <Workflow className="w-3.5 h-3.5 text-teal-600/70" />;
    case "tailwind css":
      return <Zap className="w-3.5 h-3.5 text-cyan-600/70" />;
    default:
      return <Server className="w-3.5 h-3.5 text-slate-500" />;
  }
};

// ─── Individual Service Card with Independent Scroll Trigger ─────────────────
interface ServiceData {
  id: string;
  titlePart1: string;
  titlePart2: string;
  description: string;
  icon: React.ElementType;
  features: { label: string; icon: React.ElementType }[];
  techStack: string[];
}

function ServiceCardRow({
  service,
  sIndex,
}: {
  service: ServiceData;
  sIndex: number;
}) {
  const [hasStarted, setHasStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeItemKey, setActiveItemKey] = useState<string | null>(null);

  // Stream 1: Headline & Description
  const [textStep, setTextStep] = useState<"idle" | "part1" | "part2" | "desc" | "done">("idle");
  const [typedP1, setTypedP1] = useState("");
  const [typedP2, setTypedP2] = useState("");
  const [typedDesc, setTypedDesc] = useState("");

  // Stream 2: Deliverables
  const [activeDelivIdx, setActiveDelivIdx] = useState<number>(-1);
  const [delivCloning, setDelivCloning] = useState<boolean>(false);
  const [delivDraggingCorner, setDelivDraggingCorner] = useState<boolean>(false);
  const [delivTypedText, setDelivTypedText] = useState<string>("");
  const [createdDeliverables, setCreatedDeliverables] = useState<string[]>([]);

  // Stream 3: Tech Stack
  const [activeTechIdx, setActiveTechIdx] = useState<number>(-1);
  const [techCloning, setTechCloning] = useState<boolean>(false);
  const [techDraggingCorner, setTechDraggingCorner] = useState<boolean>(false);
  const [techTypedText, setTechTypedText] = useState<string>("");
  const [createdTech, setCreatedTech] = useState<string[]>([]);

  const rowRef = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          setHasStarted(true);
          startRowAnimation();
        }
      },
      { threshold: 0.2 }
    );

    if (rowRef.current) observer.observe(rowRef.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startRowAnimation = async () => {
    await sleep(200);

    // Run 3 concurrent worker streams with snappier flow
    await Promise.all([
      // Worker 1: Title & Description
      (async () => {
        setTextStep("part1");
        await sleep(250);
        for (let i = 1; i <= service.titlePart1.length; i++) {
          setTypedP1(service.titlePart1.slice(0, i));
          await sleep(40);
        }
        setTypedP1(service.titlePart1);
        await sleep(150);

        setTextStep("part2");
        await sleep(150);
        for (let i = 1; i <= service.titlePart2.length; i++) {
          setTypedP2(service.titlePart2.slice(0, i));
          await sleep(42);
        }
        setTypedP2(service.titlePart2);
        await sleep(200);

        setTextStep("desc");
        await sleep(200);
        for (let i = 2; i <= service.description.length; i += 2) {
          setTypedDesc(service.description.slice(0, i));
          await sleep(22);
        }
        setTypedDesc(service.description);
        await sleep(300);
        setTextStep("done");
      })(),

      // Worker 2: Key Deliverables (Faster & smooth clone slide)
      (async () => {
        await sleep(350);
        for (let i = 0; i < service.features.length; i++) {
          const target = service.features[i].label;
          setActiveDelivIdx(i);
          setDelivTypedText("");

          if (i === 0) {
            setDelivDraggingCorner(true);
            await sleep(650);
            setDelivDraggingCorner(false);
            await sleep(150);

            for (let c = 2; c <= target.length; c += 2) {
              setDelivTypedText(target.slice(0, c));
              await sleep(22);
            }
            setDelivTypedText(target);
            setCreatedDeliverables((prev) => [...prev, target]);
            await sleep(250);
          } else {
            // Smooth snappy clone drag down
            setDelivCloning(true);
            await sleep(80);
            setDelivCloning(false);
            await sleep(750); // Snappier & smooth 750ms slide

            for (let c = 2; c <= target.length; c += 2) {
              setDelivTypedText(target.slice(0, c));
              await sleep(20);
            }
            setDelivTypedText(target);
            setCreatedDeliverables((prev) => [...prev, target]);
            await sleep(250);
          }
        }
        setActiveDelivIdx(-1);
      })(),

      // Worker 3: Core Technologies (Snappy smooth clone slide)
      (async () => {
        await sleep(500);
        for (let t = 0; t < service.techStack.length; t++) {
          const tech = service.techStack[t];
          setActiveTechIdx(t);
          setTechTypedText("");

          if (t === 0) {
            setTechDraggingCorner(true);
            await sleep(550);
            setTechDraggingCorner(false);
            await sleep(150);

            for (let c = 1; c <= tech.length; c++) {
              setTechTypedText(tech.slice(0, c));
              await sleep(26);
            }
            setTechTypedText(tech);
            setCreatedTech((prev) => [...prev, tech]);
            await sleep(200);
          } else {
            setTechCloning(true);
            await sleep(60);
            setTechCloning(false);
            await sleep(600); // Snappy 600ms horizontal slide

            for (let c = 1; c <= tech.length; c++) {
              setTechTypedText(tech.slice(0, c));
              await sleep(24);
            }
            setTechTypedText(tech);
            setCreatedTech((prev) => [...prev, tech]);
            await sleep(180);
          }
        }
        setActiveTechIdx(-1);
      })(),
    ]);

    setIsCompleted(true);
  };

  const Icon = service.icon;
  const curveStyle =
    sIndex === 0
      ? { transform: "rotateX(1deg) translateZ(-6px)" }
      : sIndex === 1
      ? { transform: "rotateX(0deg) translateZ(-20px) scale(0.992)" }
      : { transform: "rotateX(-1deg) translateZ(-6px)" };

  return (
    <div
      ref={rowRef}
      className={`group relative py-14 sm:py-18 first:pt-4 last:pb-4 overflow-visible transition-all duration-700 ease-out ${
        hasStarted ? "opacity-100" : "opacity-0"
      }`}
      style={curveStyle}
    >
      {/* Watermark stamp */}
      <div className="absolute -left-12 -top-6 pointer-events-none select-none opacity-[0.016] group-hover:opacity-[0.03] transition-opacity duration-700 ease-out">
        <Icon className="w-84 h-84 stroke-[1.2] text-slate-900" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start relative z-10">
        {/* Left Column: Title, Description, Core Tech (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-start">
          <div className="mb-2">
            <span className="text-xs font-bold text-blue-600/75 tracking-widest font-sans">
              {service.id}
            </span>
          </div>

          {/* Headline (Stream 1) */}
          <div className="relative inline-block mb-4">
            <h3
              className="font-heading font-black tracking-tight leading-[1.12] invisible select-none pointer-events-none"
              aria-hidden="true"
            >
              <span className="block text-xl sm:text-2xl lg:text-[28px] font-bold text-slate-700 mb-1">
                {service.titlePart1}
              </span>
              <span className="block text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-950">
                {service.titlePart2}
              </span>
            </h3>

            <h3 className="font-heading font-black tracking-tight leading-[1.12] absolute inset-0">
              <span className="block text-xl sm:text-2xl lg:text-[28px] font-bold text-slate-700 mb-1">
                {isCompleted || textStep === "part2" || textStep === "desc" || textStep === "done"
                  ? service.titlePart1
                  : textStep === "part1"
                  ? typedP1
                  : ""}
                {textStep === "part1" && <InlineCaret />}
              </span>
              <span className="block text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-950">
                {isCompleted || textStep === "desc" || textStep === "done"
                  ? service.titlePart2
                  : textStep === "part2"
                  ? typedP2
                  : ""}
                {textStep === "part2" && <InlineCaret />}
              </span>
            </h3>

            {(textStep === "part1" || textStep === "part2") && <BoundingBox />}
            {(textStep === "part1" || textStep === "part2") && (
              <div className="absolute -bottom-2 -right-2 pointer-events-none z-40">
                <BlackCursor />
              </div>
            )}
          </div>

          {/* Description (Stream 1) */}
          <div className="relative inline-block mb-9 max-w-xl">
            <p
              className="text-slate-600 font-normal text-sm sm:text-base leading-relaxed invisible select-none pointer-events-none"
              aria-hidden="true"
            >
              {service.description}
            </p>
            <p className="text-slate-600 font-normal text-sm sm:text-base leading-relaxed absolute inset-0">
              {isCompleted || textStep === "done"
                ? service.description
                : textStep === "desc"
                ? typedDesc
                : ""}
              {textStep === "desc" && <InlineCaret />}
            </p>
            {textStep === "desc" && <BoundingBox />}
            {textStep === "desc" && (
              <div className="absolute -bottom-2 -right-2 pointer-events-none z-40">
                <BlackCursor />
              </div>
            )}
          </div>

          {/* Core Technologies (Stream 3) */}
          <div className="pt-2">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 font-sans mb-3.5">
              Core Technologies
            </div>
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {service.techStack.map((tech, idx) => {
                const isCreated = isCompleted || createdTech.includes(tech);
                const isCurrentlyActive = activeTechIdx === idx;

                return (
                  <div
                    key={idx}
                    className={`relative transition-all duration-300 ${
                      isCreated || isCurrentlyActive ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                    style={{
                      transform:
                        isCurrentlyActive && techCloning
                          ? "translateX(-120%) scale(0.96)"
                          : isCurrentlyActive && techDraggingCorner
                          ? "scale(0.85)"
                          : "translateX(0px) scale(1)",
                      transformOrigin: "left center",
                      transition: "transform 0.6s cubic-bezier(0.25, 1, 0.35, 1), opacity 0.3s ease",
                      zIndex: isCurrentlyActive ? 30 : 1,
                    }}
                  >
                    <div
                      style={{ borderRadius: "8px" }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-200/50 hover:bg-slate-200/75 text-slate-700 text-xs font-semibold tracking-normal transition-colors"
                    >
                      {getTechIcon(tech)}
                      <span>
                        {isCurrentlyActive ? (
                          <>
                            {techTypedText}
                            <InlineCaret />
                          </>
                        ) : isCreated ? (
                          tech
                        ) : (
                          ""
                        )}
                      </span>
                    </div>

                    {isCurrentlyActive && <BoundingBox isDraggingCorner={techDraggingCorner} />}
                    {isCurrentlyActive && (
                      <div
                        className="absolute pointer-events-none z-40 transition-all duration-200"
                        style={{ bottom: "-6px", right: "-6px" }}
                      >
                        <BlackCursor />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Key Deliverables (Stream 2) */}
        <div className="lg:col-span-5 flex flex-col justify-start">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 font-sans mb-3.5">
            Key Deliverables
          </div>

          <div className="flex flex-col gap-3.5">
            {service.features.map((feat, idx) => {
              const FeatIcon = feat.icon;
              const itemKey = `${service.id}-${idx}`;
              const isCreated = isCompleted || createdDeliverables.includes(feat.label);
              const isCurrentlyActive = activeDelivIdx === idx;
              const isHovered = activeItemKey === itemKey;

              return (
                <div
                  key={idx}
                  className={`relative transition-all duration-400 ${
                    isCreated || isCurrentlyActive ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                  style={{
                    transform:
                      isCurrentlyActive && delivCloning
                        ? "translateY(-125%) scale(0.98)"
                        : isCurrentlyActive && delivDraggingCorner
                        ? "scale(0.95)"
                        : "translateY(0px) scale(1)",
                    transformOrigin: "top left",
                    transition: "transform 0.75s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease",
                    zIndex: isCurrentlyActive ? 30 : 1,
                  }}
                >
                  <div
                    onMouseEnter={() => setActiveItemKey(itemKey)}
                    onMouseLeave={() => setActiveItemKey(null)}
                    style={{
                      borderRadius: "7px",
                      transform: isHovered ? "translateY(2.5px)" : "translateY(0px)",
                      borderTop: "1px solid rgba(255, 255, 255, 0.95)",
                      borderLeft: "2.5px solid #CBD5E1",
                      borderRight: "1px solid #D8E1EC",
                      borderBottom: isHovered ? "1.5px solid #94A3B8" : "4.5px solid #94A3B8",
                      backgroundColor: isHovered ? "#EAF2ED" : "rgba(240, 246, 243, 0.95)",
                      boxShadow: isHovered
                        ? "0 1px 3px rgba(15, 23, 42, 0.08)"
                        : "0 5px 14px -3px rgba(15, 23, 42, 0.09), 0 2px 4px -1px rgba(15, 23, 42, 0.05)",
                      transition:
                        "transform 0.15s cubic-bezier(0.2, 0, 0, 1), border-bottom-width 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease",
                      willChange: "transform",
                    }}
                    className="group/item relative flex items-center gap-3 px-4 py-3 select-none cursor-pointer min-h-[50px]"
                  >
                    <div
                      className={`size-6 rounded-[5px] flex items-center justify-center shrink-0 transition-colors ${
                        isHovered
                          ? "bg-emerald-600/15 text-emerald-800"
                          : "bg-emerald-600/[0.08] text-emerald-700/75"
                      }`}
                    >
                      <FeatIcon className="w-3.5 h-3.5 stroke-[1.8]" />
                    </div>

                    <span
                      className={`text-[13px] sm:text-sm font-medium leading-snug tracking-[-0.01em] transition-colors ${
                        isHovered ? "text-slate-950 font-semibold" : "text-slate-800"
                      }`}
                    >
                      {isCurrentlyActive ? (
                        <>
                          {delivTypedText}
                          <InlineCaret />
                        </>
                      ) : isCreated ? (
                        feat.label
                      ) : (
                        ""
                      )}
                    </span>
                  </div>

                  {isCurrentlyActive && <BoundingBox isDraggingCorner={delivDraggingCorner} />}
                  {isCurrentlyActive && (
                    <div
                      className="absolute pointer-events-none z-40 transition-all duration-200"
                      style={{
                        bottom: delivDraggingCorner ? "-6px" : "-8px",
                        right: delivDraggingCorner ? "-6px" : "32px",
                      }}
                    >
                      <BlackCursor />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Services Component ─────────────────────────────────────────────────
export default function Services() {
  const [headerStarted, setHeaderStarted] = useState(false);
  const [headerCompleted, setHeaderCompleted] = useState(false);
  const [headerStep, setHeaderStep] = useState<"idle" | "title" | "sub" | "done">("idle");
  const [typedTitle, setTypedTitle] = useState("");
  const [typedSub, setTypedSub] = useState("");

  const headerRef = useRef<HTMLDivElement>(null);
  const headerTriggeredRef = useRef(false);

  const fullTitle = "How Can I Help?";
  const fullSub =
    "From technical architecture to rapid full-stack execution, I deliver software that accelerates your business goals.";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !headerTriggeredRef.current) {
          headerTriggeredRef.current = true;
          setHeaderStarted(true);
          runHeaderChoreography();
        }
      },
      { threshold: 0.15 }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const runHeaderChoreography = async () => {
    await sleep(250);
    setHeaderStep("title");
    await sleep(350);
    for (let i = 1; i <= fullTitle.length; i++) {
      setTypedTitle(fullTitle.slice(0, i));
      await sleep(48);
    }
    setTypedTitle(fullTitle);
    await sleep(250);

    setHeaderStep("sub");
    await sleep(250);
    for (let i = 2; i <= fullSub.length; i += 2) {
      setTypedSub(fullSub.slice(0, i));
      await sleep(20);
    }
    setTypedSub(fullSub);
    await sleep(300);

    setHeaderStep("done");
    setHeaderCompleted(true);
  };

  const services: ServiceData[] = [
    {
      id: "01",
      titlePart1: "Full-Stack Web",
      titlePart2: "Development",
      description:
        "Robust, high-performance web applications built from scratch with clean, scalable and maintainable architecture.",
      icon: Layers,
      features: [
        { label: "Modern Responsive Frontend (Next.js, React)", icon: Globe },
        { label: "Resilient Backend Architecture & REST/GraphQL APIs", icon: Network },
        { label: "High-Performance Database Design (PostgreSQL, Redis)", icon: Database },
        { label: "Third-Party Service & Payment Gateway Integrations", icon: Zap },
      ],
      techStack: ["Next.js", "React", "Node.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    },
    {
      id: "02",
      titlePart1: "App & System",
      titlePart2: "Architecture",
      description:
        "Designing production-ready cloud systems and resilient data pipelines engineered to scale effortlessly from day one.",
      icon: Cpu,
      features: [
        { label: "Cloud Infrastructure Setup (AWS, Vercel, Docker)", icon: Cloud },
        { label: "Microservices & Decoupled Modular Architecture", icon: Boxes },
        { label: "Data Security, Auth & HIPAA/GDPR Compliance", icon: Shield },
        { label: "CI/CD Deployment Pipelines & 24/7 Monitoring", icon: Activity },
      ],
      techStack: ["Docker", "AWS", "Linux", "Redis", "Supabase", "Git Actions"],
    },
    {
      id: "03",
      titlePart1: "Business Strategy &",
      titlePart2: "Automation",
      description:
        "Turning complex operational bottlenecks into automated, high-yield digital workflows and intelligent tools.",
      icon: TrendingUp,
      features: [
        { label: "Internal Workflow & CRM/ERP Process Automation", icon: Workflow },
        { label: "Custom Scripting, Webhooks & Autonomous Scrapers", icon: FileCode },
        { label: "AI Diagnostic & Assistive LLM Tool Integrations", icon: Bot },
        { label: "Product Roadmap & Pragmatic Technical Leadership", icon: Compass },
      ],
      techStack: ["Python", "OpenAI APIs", "FastAPI", "Webhooks", "Make/Zapier"],
    },
  ];

  return (
    <section
      id="service"
      className="py-24 md:py-32 bg-[#F8FAFC] relative overflow-hidden"
    >
      {/* Background Architectural Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 select-none"
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

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header with Independent Scroll Trigger */}
        <div
          ref={headerRef}
          className={`text-center max-w-2xl mx-auto mb-16 md:mb-20 relative transition-opacity duration-700 ${
            headerStarted ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/60 text-blue-600 text-xs font-bold font-sans uppercase tracking-wider mb-4 shadow-2xs">
            Capabilities
          </div>

          {/* 1. Header Title */}
          <div className="relative inline-block mb-4">
            <h2
              className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-slate-900 invisible select-none pointer-events-none"
              aria-hidden="true"
            >
              {fullTitle}
            </h2>
            <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-slate-900 absolute inset-0 flex items-center justify-center">
              {headerCompleted || headerStep === "sub" || headerStep === "done" ? (
                fullTitle
              ) : headerStep === "title" ? (
                <>
                  {typedTitle}
                  <InlineCaret />
                </>
              ) : null}
            </h2>
            {headerStep === "title" && <BoundingBox />}
            {headerStep === "title" && (
              <div className="absolute -bottom-2 -right-2 pointer-events-none z-40">
                <BlackCursor />
              </div>
            )}
          </div>

          {/* 2. Subtitle */}
          <div className="relative inline-block w-full">
            <p
              className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed invisible select-none pointer-events-none"
              aria-hidden="true"
            >
              {fullSub}
            </p>
            <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed absolute inset-0 flex items-center justify-center">
              {headerCompleted || headerStep === "done" ? (
                fullSub
              ) : headerStep === "sub" ? (
                <>
                  {typedSub}
                  <InlineCaret />
                </>
              ) : null}
            </p>
            {headerStep === "sub" && <BoundingBox />}
            {headerStep === "sub" && (
              <div className="absolute -bottom-2 -right-2 pointer-events-none z-40">
                <BlackCursor />
              </div>
            )}
          </div>
        </div>

        {/* 
          Ultrawide Inward Curved Display
          Each service row is mounted independently with its own scroll trigger!
        */}
        <div
          className="flex flex-col divide-y divide-slate-200/80 mb-20"
          style={{ perspective: "1800px" }}
        >
          {services.map((service, sIndex) => (
            <ServiceCardRow
              key={service.id}
              service={service}
              sIndex={sIndex}
            />
          ))}
        </div>

        {/* CTA Card */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 text-white shadow-xl shadow-blue-500/15 text-center flex flex-col items-center gap-6">
          <div className="size-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl sm:text-4xl font-heading font-black tracking-tight mb-2">
              Let&apos;s Build Something Together
            </h3>
            <p className="text-blue-100 font-medium text-sm sm:text-base max-w-lg mx-auto">
              Need a developer who turns complex ideas into reliable, working software? Let&apos;s
              talk about your project goals.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-white text-slate-900 font-bold hover:bg-blue-50 transition-all shadow-md active:scale-95"
          >
            <span>Schedule a Call</span>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </a>
        </div>
      </div>
    </section>
  );
}
