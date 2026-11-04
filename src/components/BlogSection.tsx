"use client";

import Image from "next/image";
import { ArrowUpRight, Calendar, BookOpen } from "lucide-react";

export default function BlogSection() {
  const blogs = [
    {
      id: 1,
      title: "Why I Built a Prescription System Instead of Buying One",
      date: "March 14, 2025",
      category: "HealthTech & Architecture",
      image: "/images/blog/blog-1.png",
      summary: "Commercial software lacked the clinical precision required by Bangladeshi doctors. Here is how we engineered an offline-first, blazing-fast medical prescribing engine.",
    },
    {
      id: 2,
      title: "Full-Stack Architecture Patterns for HealthTech Apps",
      date: "April 22, 2025",
      category: "System Design",
      image: "/images/blog/blog-2.png",
      summary: "Handling sensitive patient data, strict HIPAA/GDPR compliance, and zero-latency UI patterns in modern distributed web applications.",
    },
  ];

  return (
    <section id="blog" className="py-24 md:py-36 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
            Insights
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-slate-900 mb-4">
            Latest From the Blog
          </h2>
          <p className="text-slate-600 font-medium text-sm sm:text-base">
            Thoughts on scalable software engineering, real-world healthtech challenges, and system architecture.
          </p>
        </div>

        {/* Blog Cards Stack */}
        <div className="flex flex-col gap-6 mb-12">
          {blogs.map((b) => (
            <div
              key={b.id}
              className="group rounded-3xl p-5 sm:p-6 bg-white shadow-[6px_6px_20px_#D1D9E6,-6px_-6px_20px_#FFFFFF] border border-white/80 transition-all duration-300 hover:shadow-[8px_8px_26px_#D1D9E6,-8px_-8px_26px_#FFFFFF] flex flex-col sm:flex-row items-center gap-6"
            >
              <div className="relative w-full sm:w-44 h-40 sm:h-32 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                <Image
                  src={b.image}
                  alt={b.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col justify-between h-full flex-1 gap-2">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <span className="text-blue-600">{b.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{b.date}</span>
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-heading font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                  <span>{b.title}</span>
                  <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 ml-2" />
                </h3>

                <p className="text-sm text-slate-600 font-normal leading-relaxed line-clamp-2">
                  {b.summary}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="flex justify-center">
          <a
            href="https://scaleos.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 shadow-[4px_4px_12px_#D1D9E6,-4px_-4px_12px_#FFFFFF] text-slate-800 text-sm font-bold hover:text-blue-600 hover:border-blue-300 transition-all active:scale-95"
          >
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Read More on scaleos.co.uk</span>
          </a>
        </div>
      </div>
    </section>
  );
}
