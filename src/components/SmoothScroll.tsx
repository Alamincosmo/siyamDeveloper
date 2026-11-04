"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis RAF loop via GSAP ticker for 100% jitter-free synchronization
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
