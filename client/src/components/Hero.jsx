import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play, TrendingUp, Sparkles, CheckCircle2, Award } from "lucide-react";
import { useCountUp } from "../hooks/useCountUp";

function AnimatedMetric({ label, value, suffix = "" }) {
  const { count, ref } = useCountUp(value, 2000, 0);
  return (
    <div className="flex flex-col" ref={ref}>
      <span className="text-2xl font-bold text-white">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-sm font-medium text-slate-400">{label}</span>
    </div>
  );
}

function HeroDashboardMockup() {
  const { count: resumeScore, ref: resumeRef } = useCountUp(91, 1500, 0);
  const { count: interviewScore, ref: interviewRef } = useCountUp(87, 1700, 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative w-full max-w-[600px] mx-auto lg:mx-0 animate-float"
    >
      {/* Background ambient glow behind mockup */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 via-purple-500/10 to-indigo-600/20 rounded-[32px] blur-2xl pointer-events-none" />

      {/* Main Floating Dashboard Card */}
      <div className="relative saas-card p-6 sm:p-8 bg-[#0E1424] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* Header window controls */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-3 text-xs font-semibold text-slate-400 font-mono">
              Dashboard Overview
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            LIVE SAAS DEMO
          </span>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Resume Score Card */}
          <div className="p-5 rounded-[20px] bg-[#111B2E] border border-white/5 flex items-center gap-4" ref={resumeRef}>
            <div className="relative w-16 h-16 shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="8" />
                <motion.circle
                  cx="50" cy="50" r="40" fill="none"
                  stroke="#3B82F6"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={251}
                  initial={{ strokeDashoffset: 251 }}
                  animate={{ strokeDashoffset: 251 - (91 / 100) * 251 }}
                  transition={{ duration: 1.8, delay: 0.5 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-lg text-white">
                {resumeScore}%
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">Resume Score</p>
              <p className="text-sm font-bold text-emerald-400 mt-0.5 flex items-center gap-1">
                <TrendingUp size={14} /> Top 2% Match
              </p>
            </div>
          </div>

          {/* Interview Readiness Card */}
          <div className="p-5 rounded-[20px] bg-[#111B2E] border border-white/5 flex items-center gap-4" ref={interviewRef}>
            <div className="relative w-16 h-16 shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="8" />
                <motion.circle
                  cx="50" cy="50" r="40" fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={251}
                  initial={{ strokeDashoffset: 251 }}
                  animate={{ strokeDashoffset: 251 - (87 / 100) * 251 }}
                  transition={{ duration: 1.8, delay: 0.7 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-lg text-white">
                {interviewScore}%
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">Interview Ready</p>
              <p className="text-sm font-bold text-purple-400 mt-0.5">High Confidence</p>
            </div>
          </div>
        </div>

        {/* Skills & Missing Skills Split */}
        <div className="space-y-4">
          <div className="p-4 rounded-[16px] bg-[#111B2E] border border-white/5">
            <div className="flex justify-between text-xs font-bold text-slate-300 mb-3">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 size={14} /> Mastered Skills
              </span>
              <span className="text-slate-400 font-medium">3 Core Technologies</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {["TypeScript", "React", "Node.js"].map((skill) => (
                <span key={skill} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-[16px] bg-[#111B2E] border border-white/5">
            <div className="flex justify-between text-xs font-bold text-slate-300 mb-3">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Sparkles size={14} /> Missing Target Skills
              </span>
              <span className="text-amber-400 font-medium">2 Skill Gaps</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Docker", "System Design"].map((gap) => (
                <span key={gap} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {gap}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Mini Overlay Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-4 p-4 rounded-2xl bg-[#050816] border border-white/10 shadow-2xl"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Award size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-white">AI Analysis Complete</p>
            <p className="text-xs font-medium text-slate-400 mt-0.5">Interview probability +34%</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-24 lg:pt-32 lg:pb-32">
      {/* Animated Backgrounds */}
      <div className="bg-aurora" />
      <div className="absolute inset-0 bg-dot-grid opacity-40" />
      <div className="bg-noise" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-12 items-center">
          {/* Left Column (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-10"
          >
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#111B2E] border border-white/10 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-sm font-semibold text-slate-300">
                AI-Powered Career Platform
              </span>
            </div>

            {/* 72px Hero Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-extrabold text-white leading-[1.05] tracking-tight">
              Land Your Dream Job{" "}
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Faster with AI
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-lg text-[#94A3B8] leading-relaxed max-w-2xl font-normal">
              Stop guessing what recruiters want. Our AI analyzes your resume, simulates technical interviews, and builds a personalized roadmap to get you hired.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/upload"
                className="group flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-base shadow-lg shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5 border border-blue-500/50"
              >
                Get Started Free
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#demo"
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-[#111B2E] hover:bg-[#1e293b] border border-white/10 text-white font-semibold text-base transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-black/20"
              >
                <Play size={16} className="fill-white text-white" />
                Watch Demo
              </a>
            </div>

            {/* Trust Metrics */}
            <div className="flex flex-wrap items-center gap-10 pt-8 border-t border-white/5">
              <AnimatedMetric label="Active Students" value={25000} suffix="+" />
              <div className="w-px h-10 bg-white/10 hidden sm:block" />
              <AnimatedMetric label="ATS Success" value={94} suffix="%" />
              <div className="w-px h-10 bg-white/10 hidden sm:block" />
              <AnimatedMetric label="Interview Rate" value={89} suffix="%" />
            </div>
          </motion.div>

          {/* Right Column (5 cols) */}
          <div className="lg:col-span-5">
            <HeroDashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;