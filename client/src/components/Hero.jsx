import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  FileText,
  Mic,
  Briefcase,
  Sparkles,
} from "lucide-react";

const features = [
  { icon: FileText, text: "ATS Score & Analysis" },
  { icon: Sparkles, text: "AI Resume Rewrite" },
  { icon: Briefcase, text: "Job Description Match" },
  { icon: Mic, text: "AI Mock Interview" },
];

function HeroDashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, rotateY: -5 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative"
    >
      {/* Glow behind card */}
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/10 to-cyan-500/20 rounded-3xl blur-2xl" />

      <div className="relative gradient-border rounded-2xl p-6 bg-slate-950/80 backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center gap-2 mb-5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
          <span className="ml-2 text-xs text-slate-500 font-medium">
            CareerPilot AI Dashboard
          </span>
        </div>

        {/* Score */}
        <div className="flex items-center gap-6 mb-5">
          <div className="relative w-20 h-20">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(148,163,184,0.1)" strokeWidth="8" />
              <motion.circle
                cx="50" cy="50" r="40" fill="none"
                stroke="#10b981"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={251}
                initial={{ strokeDashoffset: 251 }}
                animate={{ strokeDashoffset: 251 - (92 / 100) * 251 }}
                transition={{ duration: 2, delay: 1 }}
              />
            </svg>
            <motion.span
              className="absolute inset-0 flex items-center justify-center text-lg font-bold text-emerald-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              92
            </motion.span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">ATS Score</p>
            <p className="text-xs text-emerald-400 font-medium">Excellent</p>
          </div>
        </div>

        {/* Insight rows */}
        <div className="space-y-2.5">
          {[
            { label: "Strengths", count: 5, color: "bg-emerald-400" },
            { label: "Keywords", count: 12, color: "bg-blue-400" },
            { label: "Suggestions", count: 3, color: "bg-amber-400" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + i * 0.15 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${item.color}`} />
                <span className="text-xs text-slate-400">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${item.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${60 + i * 15}%` }}
                    transition={{ duration: 1, delay: 1.4 + i * 0.15 }}
                  />
                </div>
                <span className="text-xs text-slate-500 w-4 text-right">
                  {item.count}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="flex flex-wrap gap-1.5 mt-4"
        >
          {["React", "Node.js", "Python", "SQL", "Docker"].map((skill) => (
            <span
              key={skill}
              className="text-[10px] font-medium px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20"
            >
              {skill}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Aurora blobs */}
      <div className="aurora-blob-1" style={{ top: "-200px", left: "-100px" }} />
      <div className="aurora-blob-2" style={{ top: "-100px", right: "-150px" }} />
      <div className="aurora-blob-3" style={{ bottom: "-100px", left: "30%" }} />

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg grid-bg-fade" />

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-ring" />
              100% Free · Runs Locally · No API Key
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.1]">
              Your AI-Powered
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Career Co-Pilot
              </span>
            </h1>

            <p className="text-slate-400 mt-6 text-lg leading-relaxed max-w-lg">
              Upload your resume, get instant ATS scores, practice mock
              interviews with voice, match against job descriptions, and let AI
              rewrite your resume — all powered by local AI.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/upload"
                className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 px-7 py-3.5 rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 font-semibold text-sm"
              >
                Analyze Resume
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                to="/interview"
                className="flex items-center gap-2 border border-slate-700 px-7 py-3.5 rounded-xl hover:bg-white/5 hover:border-slate-600 transition-all font-medium text-sm text-slate-300"
              >
                <Mic size={16} />
                Try AI Interview
              </Link>
            </div>

            {/* Quick feature list */}
            <div className="grid grid-cols-2 gap-3 mt-10">
              {features.map(({ icon: Icon, text }, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-2.5"
                >
                  <div className="w-6 h-6 rounded-md bg-blue-500/10 flex items-center justify-center">
                    <Icon size={13} className="text-blue-400" />
                  </div>
                  <span className="text-sm text-slate-400">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side — Dashboard Mockup */}
          <div className="hidden lg:block">
            <HeroDashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;