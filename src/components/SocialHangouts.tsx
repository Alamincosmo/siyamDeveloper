"use client";

import Image from "next/image";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function SocialHangouts() {
  const socials = [
    {
      platform: "X (Twitter)",
      handle: "@mdsiyam_dev",
      followers: "6.9K+ followers",
      link: "https://x.com/mdsiyam_dev",
      icon: "/images/social/x.svg",
      verified: true,
    },
    {
      platform: "LinkedIn",
      handle: "@mdsiyam",
      followers: "2K+ connections",
      link: "https://linkedin.com/in/mdsiyam",
      icon: "/images/social/linkedin.svg",
      verified: true,
    },
    {
      platform: "Instagram",
      handle: "@mdsiyamofficial",
      followers: "4.5K+ followers",
      link: "https://instagram.com/mdsiyamofficial",
      icon: "/images/social/instagram.svg",
      verified: true,
    },
    {
      platform: "Facebook",
      handle: "@mdsiyam.dev",
      followers: "6K+ followers",
      link: "https://facebook.com/mdsiyam.dev",
      icon: "/images/social/facebook.svg",
      verified: false,
    },
  ];

  return (
    <section id="social" className="py-24 md:py-36 bg-[#ECF0F3] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="relative text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-blue-600 text-xs font-bold uppercase tracking-wider shadow-sm mb-3">
            Social Connect
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-slate-900 mb-2">
            Where I&apos;m Active On
          </h2>
          <p className="text-slate-600 font-medium text-sm sm:text-base">
            Connect with me across the web for technical discussions, software updates, and daily insights.
          </p>

          <div className="hidden sm:block absolute -top-4 left-0 -rotate-12 bg-white/90 px-3.5 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm border border-slate-200">
            My Internet Hangouts 🌐
          </div>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {socials.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-3xl p-6 bg-white shadow-[6px_6px_20px_#D1D9E6,-6px_-6px_20px_#FFFFFF] border border-white/80 transition-all duration-300 hover:shadow-[8px_8px_26px_#D1D9E6,-8px_-8px_26px_#FFFFFF] hover:-translate-y-1 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="size-14 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 p-3 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <div className="relative size-8">
                    <Image src={item.icon} alt={item.platform} fill className="object-contain" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-lg font-heading font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {item.handle}
                    </h3>
                    {item.verified && (
                      <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-100" />
                    )}
                  </div>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">
                    {item.followers}
                  </p>
                </div>
              </div>

              <div className="size-9 rounded-full bg-[#F8FAFC] border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
