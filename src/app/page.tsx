import Hero from "@/components/Hero";
import WorkShowcaseIntro from "@/components/WorkShowcaseIntro";
import WorkShowcase from "@/components/WorkShowcase";
import Services from "@/components/Services";
import Timeline from "@/components/Timeline";
import Achievements from "@/components/Achievements";
import StatsPreview from "@/components/StatsPreview";
import Reviews from "@/components/Reviews";
import Pricing from "@/components/Pricing";
import BlogSection from "@/components/BlogSection";
import SocialHangouts from "@/components/SocialHangouts";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative bg-[#F8FAFC] text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* 1. Hero & Kinetic Client Work Docking */}
      <Hero />

      {/* 2. Featured Work & Project Deliverables (Robin 3D Cylinder Rotary Drum Showcase) */}
      <WorkShowcase />

      {/* 3. Capabilities & Services */}
      <Services />

      {/* 5. Career Timeline */}
      <Timeline />

      {/* 6. Key Achievements & Awards */}
      <Achievements />

      {/* 7. Stats, Marquee & Active Initiatives */}
      <StatsPreview />

      {/* 8. Client Testimonials & Social Proof */}
      <Reviews />

      {/* 9. Transparent Pricing & Investment */}
      <Pricing />

      {/* 10. Technical Articles & HealthTech Blog */}
      <BlogSection />

      {/* 11. Social Hangouts & Community Channels */}
      <SocialHangouts />

      {/* 12. Interactive Contact Form & Footer */}
      <Footer />
    </main>
  );
}
