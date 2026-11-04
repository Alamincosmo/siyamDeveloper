"use client";

import { motion } from "framer-motion";
import { Server, Compass, CheckCircle2 } from "lucide-react";

const philosophyItems = [
  {
    num: "01",
    tag: "RESILIENCE",
    icon: <Server className="w-5 h-5 text-blue-600" />,
    title: "Infrastructure-First Approach",
    desc: "Code is only as strong as the environment running it. I design server structures and databases to handle load before the first feature is shipped.",
  },
  {
    num: "02",
    tag: "ROI & IMPACT",
    icon: <Compass className="w-5 h-5 text-emerald-600" />,
    title: "Product & Business Intent",
    desc: "I build with business metrics in mind—focusing on user conversion, payment flows, and system reliability.",
  },
  {
    num: "03",
    tag: "EFFICIENCY",
    icon: <CheckCircle2 className="w-5 h-5 text-purple-600" />,
    title: "Pure Pragmatism",
    desc: "Right tool for the right job. Whether it's Go for raw performance or Laravel for rapid business deployment.",
  },
];

export default function Philosophy() {
  return (
    <section className="py-28 bg-white border-t border-gray-200/70 relative overflow-hidden">
      {/* Background Telemetry Grid & Stream Simulation (Soft Snow White & Grayish) */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none flex flex-col justify-between py-12 px-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent w-full origin-left"
            animate={{ scaleX: [0, 1, 0.6, 1, 0] }}
            transition={{
              duration: 4 + ((i * 1.5) % 4),
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="mb-16 md:mb-20 text-center max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-mono font-semibold tracking-wider mb-3 border border-gray-200">
            ENGINEERING PRINCIPLES
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Architectural Philosophy
          </h2>
          <p className="text-gray-500 font-mono text-xs md:text-sm">
            THE WAY I BUILD // SYSTEM_RULES_ENGAGED
          </p>
        </div>

        {/* 3 Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {philosophyItems.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative bg-[#fbfbfb] hover:bg-white border border-gray-200/80 hover:border-gray-300 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl md:text-5xl font-extrabold text-gray-200 group-hover:text-gray-300 font-mono tracking-tighter transition-colors">
                    {item.num}
                  </span>
                  <div className="p-2.5 rounded-2xl bg-white border border-gray-200/70 shadow-xs">
                    {item.icon}
                  </div>
                </div>

                <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-semibold block mb-2">
                  {item.tag}
                </span>

                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Status pulse */}
              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span className="text-[11px] font-mono text-gray-400">Core Invariant</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
