"use client";

import { CheckCircle2, ArrowRight, Layers, Cpu, TrendingUp, Calendar } from "lucide-react";

export default function Services() {
  const services = [
    {
      id: "01",
      title: "Full-Stack Web Development",
      description: "Robust, high-performance web applications built from scratch with clean, maintainable architecture.",
      icon: Layers,
      features: [
        "Modern Responsive Frontend (Next.js, React)",
        "Resilient Backend Architecture & REST/GraphQL APIs",
        "High-Performance Database Design (PostgreSQL, Redis)",
        "Third-Party Service & Payment Gateway Integrations",
      ],
      techStack: ["Next.js", "React", "Node.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    },
    {
      id: "02",
      title: "App & System Architecture",
      description: "Designing production-ready software systems built to scale seamlessly from day one.",
      icon: Cpu,
      features: [
        "Cloud Infrastructure Setup (AWS, Vercel, Docker)",
        "Microservices & Decoupled Architecture",
        "Data Security, Auth & HIPAA/GDPR Compliance",
        "CI/CD Deployment Pipelines & Monitoring",
      ],
      techStack: ["Docker", "AWS", "Linux", "Redis", "Supabase", "Git Actions"],
    },
    {
      id: "03",
      title: "Business Strategy & Automation",
      description: "Turning complex operational bottlenecks into automated, high-yield digital tools.",
      icon: TrendingUp,
      features: [
        "Internal Workflow & CRM/ERP Automation",
        "Custom Scripting, Webhooks & Data Scrapers",
        "AI Diagnostic & Assistive Tool Integrations",
        "Product Roadmap & Technical Leadership",
      ],
      techStack: ["Python", "OpenAI APIs", "FastAPI", "Webhooks", "Make/Zapier"],
    },
  ];

  return (
    <section id="service" className="py-24 md:py-36 bg-[#F8FAFC] relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
            Capabilities
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-slate-900 mb-4">
            How Can I Help?
          </h2>
          <p className="text-slate-600 font-medium text-sm sm:text-base">
            From technical architecture to rapid full-stack execution, I deliver software that accelerates your business goals.
          </p>
        </div>

        {/* Services Stack */}
        <div className="flex flex-col gap-8 mb-16">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="rounded-3xl p-6 sm:p-8 md:p-10 bg-white shadow-[8px_8px_24px_#D1D9E6,-8px_-8px_24px_#FFFFFF] border border-white/80 grid md:grid-cols-12 gap-8 items-center transition-all duration-300 hover:shadow-[10px_10px_30px_#D1D9E6,-10px_-10px_30px_#FFFFFF]"
              >
                {/* Left Column: Icon & Title */}
                <div className="md:col-span-5 flex flex-col justify-between h-full gap-4">
                  <div className="flex items-center gap-4">
                    <div className="size-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
                      <Icon className="w-7 h-7 stroke-[2]" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                      SERVICE {service.id}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Right Column: Features & Tech Stack */}
                <div className="md:col-span-7 rounded-2xl p-6 bg-[#F8FAFC] border border-slate-100 flex flex-col gap-6">
                  <div className="flex flex-col gap-2.5">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Key Deliverables
                    </div>
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-200/80">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Core Technologies
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {service.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 shadow-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
              Need a developer who turns complex ideas into reliable, working software? Let&apos;s talk about your project goals.
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
