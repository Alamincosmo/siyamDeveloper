"use client";

import { motion } from "framer-motion";
import { Server, Layout, Database, TerminalSquare } from "lucide-react";

const techCategories = [
  {
    title: "Full-Stack Web Development",
    icon: <Server className="w-6 h-6 text-brand" />,
    items: [
      { name: "Frontend & Backend", desc: "Robust full-stack web solutions" },
      { name: "Tech Stack", desc: "Laravel, PHP, Next.js, React, Tailwind CSS" },
    ],
  },
  {
    title: "App & System Architecture",
    icon: <Layout className="w-6 h-6 text-brand" />,
    items: [
      { name: "Production-ready Systems", desc: "Designing platforms built to scale" },
      { name: "Tech Stack", desc: "Flutter, Mobile Dev, Database Design, System Architecture" },
    ],
  },
  {
    title: "Business Strategy & Automation",
    icon: <Database className="w-6 h-6 text-brand" />,
    items: [
      { name: "Workflow Automation", desc: "Turning complex challenges into automated digital tools" },
      { name: "Tech Stack", desc: "Python, AI integrations, API proxy layer management" },
    ],
  },
  {
    title: "Cloud & Dev Infrastructure",
    icon: <TerminalSquare className="w-6 h-6 text-brand" />,
    items: [
      { name: "System Management", desc: "Secure environments & database optimizations" },
      { name: "Tech Stack", desc: "MySQL, PostgreSQL, Redis, Linux Admin" },
    ],
  },
];

export default function TechMatrix() {
  return (
    <section className="py-24 bg-gray-50 border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Tech Stack Matrix</h2>
          <p className="text-gray-500">The Core Engine powering the systems I build.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {techCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg border border-gray-100 transition-all group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
              </div>
              <div className="space-y-4">
                {category.items.map((item) => (
                  <div key={item.name} className="flex flex-col">
                    <span className="font-semibold text-gray-900">{item.name}</span>
                    <span className="text-sm text-gray-500">{item.desc}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
