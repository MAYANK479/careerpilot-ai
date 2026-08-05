import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Companies from "../components/Companies";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import InterviewSection from "../components/InterviewSection";
import ResumeDemo from "../components/ResumeDemo";
import RoadmapSection from "../components/RoadmapSection";
import DashboardPreview from "../components/DashboardPreview";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col justify-between selection:bg-blue-500 selection:text-white font-sans">
      <Navbar />

      <main className="flex-1 w-full">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Companies / Trusted By */}
        <Companies />

        {/* 3. Features (6 Premium Cards) */}
        <Features />

        {/* 4. How It Works Timeline */}
        <HowItWorks />

        {/* 5. AI Interview Hero Feature */}
        <InterviewSection />

        {/* 6. ATS Live Scanner Demo */}
        <ResumeDemo />

        {/* 7. Skill Roadmap Timeline */}
        <RoadmapSection />

        {/* 8. SaaS Dashboard Preview */}
        <DashboardPreview />

        {/* 9. Candidate Testimonials */}
        <Testimonials />

        {/* 10. Pricing Plans */}
        <Pricing />

        {/* 11. FAQ Accordion */}
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}

export default Home;