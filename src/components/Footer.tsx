"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Phone, Send, CheckCircle2, MapPin } from "lucide-react";

export default function Footer() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullname && formData.email) {
      setSubmitted(true);
    }
  };

  return (
    <footer id="contact" className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Main Contact Container */}
        <div className="rounded-3xl p-8 sm:p-12 md:p-16 bg-white shadow-[10px_10px_30px_#D1D9E6,-10px_-10px_30px_#FFFFFF] border border-white/80 flex flex-col items-center">
          {/* Profile Avatar */}
          <div className="relative size-20 sm:size-24 rounded-full overflow-hidden shadow-[4px_4px_12px_#D1D9E6,-4px_-4px_12px_#FFFFFF] border-2 border-white mb-6">
            <Image
              src="/freepik_generate-9-different-angl_2857194376.png"
              alt="Md Siyam"
              fill
              className="object-cover object-top"
            />
          </div>

          <div className="text-center max-w-lg mb-10">
            <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-slate-900 mb-3">
              Get in touch
            </h2>
            <p className="text-slate-600 font-medium text-sm sm:text-base">
              Fill out the form below or reach out directly. I respond to all business and technical inquiries within 24 hours.
            </p>
          </div>

          {/* Form */}
          <div className="w-full max-w-md mb-12">
            {submitted ? (
              <div className="p-8 rounded-2xl bg-blue-50 border border-blue-200 text-center flex flex-col items-center gap-3">
                <CheckCircle2 className="size-10 text-blue-600" />
                <h4 className="text-xl font-heading font-extrabold text-slate-900">Message Received!</h4>
                <p className="text-sm text-slate-600 font-medium">
                  Thank you, {formData.fullname}. I will review your project requirements and get back to you shortly at {formData.email}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="fullname" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 text-left">
                    Your Name*
                  </label>
                  <input
                    id="fullname"
                    type="text"
                    required
                    value={formData.fullname}
                    onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#ECF0F3] border border-slate-200 focus:border-blue-500 focus:bg-white text-slate-900 text-sm font-medium outline-none transition-all shadow-inner"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 text-left">
                    Email Address*
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#ECF0F3] border border-slate-200 focus:border-blue-500 focus:bg-white text-slate-900 text-sm font-medium outline-none transition-all shadow-inner"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 text-left">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your product, timelines, and technical goals..."
                    className="w-full px-4 py-3.5 rounded-xl bg-[#ECF0F3] border border-slate-200 focus:border-blue-500 focus:bg-white text-slate-900 text-sm font-medium outline-none transition-all shadow-inner resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Divider */}
          <div className="w-full border-t border-slate-200 mb-10" />

          {/* Direct Contact Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mb-10 text-center">
            <a
              href="tel:+8801312399777"
              className="flex items-center gap-2.5 text-slate-700 hover:text-blue-600 font-semibold text-base transition-colors"
            >
              <div className="size-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
                <Phone className="w-4 h-4" />
              </div>
              <span>+880 131 239 9777</span>
            </a>

            <a
              href="mailto:siyam@doctorshero.com"
              className="flex items-center gap-2.5 text-slate-700 hover:text-blue-600 font-semibold text-base transition-colors"
            >
              <div className="size-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
                <Mail className="w-4 h-4" />
              </div>
              <span>siyam@doctorshero.com</span>
            </a>

            <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Dhaka, Bangladesh</span>
            </div>
          </div>

          {/* Barcode & Copyright Bar */}
          <div className="w-full pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
            <div>
              Md Siyam &copy; {new Date().getFullYear()} • Built with Next.js &amp; GSAP
            </div>

            <div className="relative h-6 w-24 opacity-60 grayscale hover:grayscale-0 transition-opacity">
              <Image
                src="/images/svg/barcode.svg"
                alt="Barcode"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
