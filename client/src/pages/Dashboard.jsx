import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Target,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Map,
  FolderGit2,
  FileText,
  Mic,
  Briefcase,
  TrendingUp,
  Sparkles,
} from "lucide-react";

function Dashboard() {
  const [targetRole, setTargetRole] = useState("Full Stack Engineer");

  const skillMastery = [
    { name: "React 19 / Modern Frontend Architecture", progress: 92, status: "Mastered", color: "bg-blue-500" },
    { name: "Node.js & Express REST Microservices", progress: 88, status: "Proficient", color: "bg-indigo-500" },
    { name: "System Design & Distributed Systems", progress: 65, status: "In Progress", color: "bg-amber-500" },
    { name: "PostgreSQL & Query Optimization", progress: 80, status: "Proficient", color: "bg-emerald-500" },
    { name: "CI/CD & Docker Containerization", progress: 55, status: "Skill Gap", color: "bg-rose-500" },
  ];

  const criticalGaps = [
    "AWS Infrastructure (EC2, S3, IAM, CloudFront)",
    "Distributed Caching with Redis",
    "GraphQL API Integration & Caching",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-white font-sans selection:bg-blue-500 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-6 py-10">
        {/* Header Title Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                Career Readiness Hub
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mt-2 tracking-tight">
              Candidate Readiness Command Center
            </h1>
          </div>

          {/* Role Picker */}
          <div className="flex items-center gap-3 bg-[#111827] px-4 py-2.5 rounded-[16px] border border-slate-800 shadow-sm">
            <Target size={18} className="text-blue-400 shrink-0" />
            <span className="text-xs font-bold text-[#94A3B8]">Target Role:</span>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
            >
              <option value="Full Stack Engineer" className="bg-[#111827]">Full Stack Engineer</option>
              <option value="Frontend Developer" className="bg-[#111827]">Frontend Developer</option>
              <option value="Backend Developer" className="bg-[#111827]">Backend Developer</option>
              <option value="AI / ML Engineer" className="bg-[#111827]">AI / ML Engineer</option>
              <option value="DevOps & Cloud Engineer" className="bg-[#111827]">DevOps & Cloud Engineer</option>
            </select>
          </div>
        </div>

        {/* Top Grid: Score & Summary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Readiness Score Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="saas-card p-8 bg-[#111827] border border-slate-800 rounded-[24px] flex items-center gap-6"
          >
            <div className="relative w-24 h-24 shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#1e293b" strokeWidth="9" />
                <circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke="#3B82F6"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray={264}
                  strokeDashoffset={264 - (91 / 100) * 264}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-white">91</span>
                <span className="text-[10px] font-bold text-slate-400">/ 100</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                Top 2% Candidate
              </span>
              <h3 className="text-lg font-bold text-white mt-2">Readiness Score</h3>
              <p className="text-xs text-[#94A3B8] mt-1">Ready for senior technical interviews.</p>
            </div>
          </motion.div>

          {/* Acquired Skills Count */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="saas-card p-8 bg-[#111827] border border-slate-800 rounded-[24px] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Skills Acquired</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <CheckCircle2 size={18} />
              </div>
            </div>
            <div>
              <p className="text-4xl font-black text-white">14 / 17</p>
              <p className="text-xs text-emerald-400 font-semibold mt-1">82% role coverage achieved</p>
            </div>
          </motion.div>

          {/* Skill Gaps Count */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="saas-card p-8 bg-[#111827] border border-slate-800 rounded-[24px] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Skill Gaps to Close</span>
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                <AlertTriangle size={18} />
              </div>
            </div>
            <div>
              <p className="text-4xl font-black text-white">3 Topics</p>
              <p className="text-xs text-amber-400 font-semibold mt-1">AWS, Redis & GraphQL remaining</p>
            </div>
          </motion.div>
        </div>

        {/* Middle Section: Skills Breakdown & Critical Gaps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Skills Mastery Progress */}
          <div className="lg:col-span-2 saas-card p-8 bg-[#111827] border border-slate-800 rounded-[24px]">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center justify-between">
              <span>Skills Mastery & Role Alignment</span>
              <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">{targetRole}</span>
            </h3>

            <div className="space-y-5">
              {skillMastery.map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between text-xs font-bold text-slate-200 mb-2">
                    <span>{item.name}</span>
                    <span className="text-[#94A3B8]">{item.progress}% ({item.status})</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#1E293B] overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color} transition-all duration-1000`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Skill Gaps Card */}
          <div className="saas-card p-8 bg-[#111827] border border-slate-800 rounded-[24px] flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle size={20} className="text-amber-400" />
                Critical Skill Gaps
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
                Close these gaps to reach top candidate percentiles for {targetRole} postings.
              </p>

              <div className="space-y-3">
                {criticalGaps.map((gap, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#1E293B]/60 border border-slate-800 text-xs font-semibold text-slate-200">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    {gap}
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/roadmap"
              className="mt-8 w-full flex items-center justify-center gap-2 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-600/30 transition-all"
            >
              Generate Learning Roadmap
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Bottom Section: Quick Launch Action Suite */}
        <div>
          <h2 className="text-xl font-bold text-white mb-6">
            Career Pilot Tool Suite
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Learning Plan", desc: "Week-by-week track for skill gaps", icon: Map, link: "/roadmap" },
              { title: "Build Portfolio", desc: "Project ideas with architecture & resume bullets", icon: FolderGit2, link: "/portfolio" },
              { title: "Resume Architect", desc: "ATS match score & AI rewriter", icon: FileText, link: "/upload" },
              { title: "Interview Prep", desc: "Voice mock interviews & speech score", icon: Mic, link: "/interview" },
            ].map((tool) => (
              <Link
                key={tool.title}
                to={tool.link}
                className="saas-card-interactive p-6 bg-[#111827] border border-slate-800 rounded-[24px] flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <tool.icon size={20} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">{tool.title}</h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">{tool.desc}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-400 group-hover:translate-x-1 transition-transform">
                  Launch Tool <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;
