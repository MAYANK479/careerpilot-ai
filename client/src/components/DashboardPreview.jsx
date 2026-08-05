import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Mic,
  Briefcase,
  TrendingUp,
  Award,
  CheckCircle2,
  Map,
  Sparkles,
  ArrowRight,
} from "lucide-react";

function DashboardPreview() {
  return (
    <section className="py-28 lg:py-32 relative bg-[#030712] border-t border-slate-800/80">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block mb-4">
            Production SaaS Dashboard
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-white leading-tight tracking-tight">
            Complete Command Center for Your Career Search
          </h2>
          <p className="text-lg lg:text-[18px] text-[#94A3B8] mt-4 leading-relaxed font-normal">
            Track resume scores, upcoming mock interviews, matched job opportunities, and skill gap milestones in real time.
          </p>
        </motion.div>

        {/* Full SaaS Dashboard Mockup Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="saas-card p-6 sm:p-10 bg-[#111827] border border-slate-800 rounded-[24px] shadow-2xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar Mockup (3 cols) */}
            <div className="lg:col-span-3 space-y-3 border-r border-slate-800/80 pr-6 hidden lg:block">
              <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-4">Navigation</p>
              {[
                { name: "Dashboard Hub", icon: LayoutDashboard, active: true },
                { name: "Resume Architect", icon: FileText, active: false },
                { name: "Voice Mock Interviews", icon: Mic, active: false },
                { name: "Job Matcher Board", icon: Briefcase, active: false },
                { name: "Skill Roadmaps", icon: Map, active: false },
              ].map((item) => (
                <div
                  key={item.name}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    item.active
                      ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20"
                      : "text-[#94A3B8] hover:text-white hover:bg-[#1E293B]"
                  }`}
                >
                  <item.icon size={16} />
                  {item.name}
                </div>
              ))}
            </div>

            {/* Main Workspace (9 cols) */}
            <div className="lg:col-span-9 space-y-6">
              {/* Top Banner Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-[20px] bg-[#1E293B]/60 border border-slate-800">
                  <p className="text-xs font-bold text-[#94A3B8]">Overall Readiness</p>
                  <p className="text-3xl font-black text-white mt-1">91/100</p>
                  <p className="text-xs font-bold text-emerald-400 mt-1">Top 2% Percentile</p>
                </div>
                <div className="p-5 rounded-[20px] bg-[#1E293B]/60 border border-slate-800">
                  <p className="text-xs font-bold text-[#94A3B8]">Interview Voice Score</p>
                  <p className="text-3xl font-black text-blue-400 mt-1">87/100</p>
                  <p className="text-xs font-semibold text-slate-400 mt-1">3 Sessions Completed</p>
                </div>
                <div className="p-5 rounded-[20px] bg-[#1E293B]/60 border border-slate-800">
                  <p className="text-xs font-bold text-[#94A3B8]">Target Job Matches</p>
                  <p className="text-3xl font-black text-purple-400 mt-1">12 Roles</p>
                  <p className="text-xs font-semibold text-purple-300 mt-1">&gt;85% Match Ratio</p>
                </div>
              </div>

              {/* Recent Activity Table Mockup */}
              <div className="p-6 rounded-[20px] bg-[#1E293B]/40 border border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white">Recent Analyses & Job Matches</h3>
                  <span className="text-xs text-[#94A3B8]">Updated 2 mins ago</span>
                </div>

                <div className="space-y-3">
                  {[
                    { role: "Senior Full-Stack Engineer @ Stripe", score: "94% Match", date: "Today", status: "Strong Match", color: "text-emerald-400 bg-emerald-500/10" },
                    { role: "Frontend Architect @ Vercel", score: "89% Match", date: "Yesterday", status: "Competitive", color: "text-blue-400 bg-blue-500/10" },
                    { role: "Product Engineer @ Linear", score: "91% Match", date: "3 days ago", status: "Strong Match", color: "text-purple-400 bg-purple-500/10" },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-[#111827] border border-slate-800/80">
                      <div>
                        <p className="text-xs font-bold text-white">{row.role}</p>
                        <p className="text-[11px] text-[#94A3B8]">{row.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-white">{row.score}</span>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border border-slate-700 ${row.color}`}>
                          {row.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 text-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-xl shadow-blue-600/30 transition-all duration-300"
          >
            Explore Live Dashboard <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default DashboardPreview;
