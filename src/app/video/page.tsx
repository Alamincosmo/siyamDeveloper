"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";
import Timeline from "@/components/Timeline";
import TechMatrix from "@/components/TechMatrix";
import CylinderEcosystems from "@/components/CylinderEcosystems";
import Philosophy from "@/components/Philosophy";
import Footer from "@/components/Footer";

interface ScrollyVideoProps {
  src: string;
  useWebCodecs?: boolean;
  cover?: boolean;
  sticky?: boolean;
  full?: boolean;
  trackScroll?: boolean;
  transitionSpeed?: number;
  frameThreshold?: number;
  debug?: boolean;
  className?: string;
}

// Dynamically import ScrollyVideo without SSR to ensure canvas & WebCodecs load on client
const ScrollyVideo = dynamic<ScrollyVideoProps>(
  () => import("scrolly-video/dist/ScrollyVideo.cjs.jsx" as any),
  { ssr: false }
);

export default function VideoComparisonPage() {
  return (
    <main className="flex flex-col min-h-screen bg-black">
      {/* Floating Mode Switcher Bar */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-1.5 rounded-full bg-black/80 backdrop-blur-xl border border-white/20 shadow-2xl text-xs font-mono">
        <Link
          href="/"
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-white/70 hover:text-white transition-all hover:bg-white/10"
        >
          <ArrowLeft size={13} />
          <span>Option A: Canvas WebP</span>
        </Link>

        <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-600 text-white font-semibold shadow-md">
          <Sparkles size={13} />
          <span>Option B: ScrollyVideo (1.8MB MP4)</span>
        </span>
      </div>

      {/* Hero Video Scrub Section */}
      <section className="relative w-full">
        {/* ScrollyVideo component scrubbing public/new.mp4 */}
        <div className="relative w-full h-[550vh]">
          <ScrollyVideo
            src="/new.mp4"
            useWebCodecs={true}
            cover={true}
            sticky={true}
            full={true}
            trackScroll={true}
          />

          {/* Floating HUD comparison pill at bottom */}
          <div className="fixed bottom-6 left-6 z-40 pointer-events-none flex flex-col gap-2">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white text-xs font-mono shadow-xl">
              <CheckCircle2 size={14} className="text-emerald-400" />
              <span>Engine: ScrollyVideo + WebCodecs</span>
              <span className="text-white/40">|</span>
              <span className="text-blue-300">File: 1.82 MB (1080p MP4)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Seamless continuation of the rest of the portfolio */}
      <div className="relative z-30 bg-white">
        <div className="py-20 text-center border-b border-gray-100">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
            PORTFOLIO // WORK SHOWCASE
          </span>
          <h2 className="text-5xl sm:text-7xl font-black text-gray-900 tracking-tight mt-4 mb-2">
            Client Work
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm sm:text-base">
            Video scrub seamlessly finished. Welcome to the systems showcase.
          </p>
        </div>

        <Timeline />
        <TechMatrix />
        <CylinderEcosystems />
        <Philosophy />
        <Footer />
      </div>
    </main>
  );
}
