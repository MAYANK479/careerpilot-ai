import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  FileText,
  Mic,
  Briefcase,
  Map,
  CheckCircle2,
  TrendingUp,
  Award,
  Sparkles,
} from "lucide-react";

const badges = [
  { icon: FileText, text: "ATS Analysis" },
  { icon: Mic, text: "AI Interview" },
  { icon: Briefcase, text: "Job Match" },
  { icon: Map, text: "Career Roadmap" },
];

function HeroDashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative"
    >
      {/* Background ambient glow behind mockup */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 via-blue-400/10 to-indigo-600/20 rounded-[32px] blur-2xl pointer-events-none" />

      {/* Main Floating Dashboard Card */}
      <div className="relative saas-card p-6 sm:p-8 bg-[#111827] border border-slate-800 shadow-2xl rounded-[24px]">
        {/* Header window controls */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-3 text-xs font-semibold text-slate-400 font-mono">
              CareerPilot OS v2.4
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
          <div className="p-5 rounded-[20px] bg-[#1E293B]/60 border border-slate-800 flex items-center gap-4">
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
                91%
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400">Resume Score</p>
              <p className="text-sm font-bold text-emerald-400 mt-0.5 flex items-center gap-1">
                <TrendingUp size={14} /> Top 2% Match
              </p>
            </div>
          </div>

          {/* Interview Readiness Card */}
          <div className="p-5 rounded-[20px] bg-[#1E293B]/60 border border-slate-800 flex items-center gap-4">
            <div className="relative w-16 h-16 shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="8" />
                <motion.circle
                  cx="50" cy="50" r="40" fill="none"
                  stroke="#60A5FA"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={251}
                  initial={{ strokeDashoffset: 251 }}
                  animate={{ strokeDashoffset: 251 - (87 / 100) * 251 }}
                  transition={{ duration: 1.8, delay: 0.7 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-lg text-white">
                87%
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400">Interview Readiness</p>
              <p className="text-sm font-bold text-blue-400 mt-0.5">High Confidence</p>
            </div>
          </div>
        </div>

        {/* Skills & Missing Skills Split */}
        <div className="space-y-4">
          {/* Acquired Skills */}
          <div className="p-4 rounded-[16px] bg-[#1E293B]/40 border border-slate-800/80">
            <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 size={14} /> Mastered Skills
              </span>
              <span className="text-slate-400">3 Core Technologies</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Java", "React", "Node"].map((skill) => (
                <span key={skill} className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Skills Alert */}
          <div className="p-4 rounded-[16px] bg-[#1E293B]/40 border border-slate-800/80">
            <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Sparkles size={14} /> Missing Target Skills
              </span>
              <span className="text-amber-400">3 Skill Gaps Identified</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Docker", "Redis", "System Design"].map((gap) => (
                <span key={gap} className="px-3 py-1 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
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
          className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 p-4 rounded-2xl bg-[#030712]/95 border border-slate-800 shadow-2xl backdrop-blur-xl"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Award size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-white">AI Analysis Complete</p>
            <p className="text-[11px] text-slate-400">Shortlist probability increased +34%</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Slow Moving Glow Background */}
      <div className="hero-glow top-0 left-1/2 -translate-x-1/2 animate-pulse-glow" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              The #1 AI Career Development Platform
            </div>

            {/* 72px Hero Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-bold text-white leading-[1.08] tracking-tight">
              Land Your Dream Job{" "}
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
                Faster with AI
              </span>
            </h1>

            {/* 18px Subtext */}
            <p className="text-lg lg:text-[18px] text-[#94A3B8] leading-relaxed max-w-2xl font-normal">
              CareerPilot AI analyzes your resume against ATS algorithms, generates week-by-week learning roadmaps, builds portfolio project specs, and conducts real-time voice mock interviews.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/upload"
                className="group flex items-center gap-3 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Upload Resume
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#demo"
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-[#1E293B] hover:bg-[#334155] border border-slate-700/80 text-white font-semibold text-base transition-all duration-300"
              >
                <Play size={16} className="fill-white text-white" />
                Watch Demo
              </a>
            </div>

            {/* Feature Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
              {badges.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <Icon size={16} />
                  </div>
                  <span className="text-sm font-semibold text-slate-300">{text}</span>
                </div>
              ))}
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