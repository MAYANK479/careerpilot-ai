import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Companies from "../components/Companies";
import ProblemSection from "../components/ProblemSection";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import ResumeDemo from "../components/ResumeDemo";
import ResumeBuilderSection from "../components/ResumeBuilderSection";
import InterviewSection from "../components/InterviewSection";
import CoverLetterSection from "../components/CoverLetterSection";
import RoadmapSection from "../components/RoadmapSection";
import DashboardPreview from "../components/DashboardPreview";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col justify-between selection:bg-blue-500 selection:text-white font-sans">
      <Navbar />

      <main className="flex-1 w-full">
        {/* 1. Full-viewport Hero */}
        <Hero />

        {/* 2. Companies Marquee */}
        <Companies />

        {/* 3. Problem Section — Why candidates fail */}
        <ProblemSection />

        {/* 4. Features Grid (6 AI Tools) */}
        <Features />

        {/* 5. How It Works (5-step timeline) */}
        <HowItWorks />

        {/* 6. ATS Live Scanner Demo */}
        <ResumeDemo />

        {/* 7. AI Resume Builder */}
        <ResumeBuilderSection />

        {/* 8. AI Voice Interview */}
        <InterviewSection />

        {/* 9. Cover Letter Generator */}
        <CoverLetterSection />

        {/* 10. Career Roadmap Timeline */}
        <RoadmapSection />

        {/* 11. Full SaaS Dashboard Preview */}
        <DashboardPreview />

        {/* 12. Testimonials Carousel */}
        <Testimonials />

        {/* 13. Pricing Plans */}
        <Pricing />

        {/* 14. FAQ Accordion */}
        <FAQ />
      </main>

      {/* 15. Final CTA + Footer */}
      <Footer />
    </div>
  );
}

export default Home;