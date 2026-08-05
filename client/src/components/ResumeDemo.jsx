import { motion } from "framer-motion";
import { FileText, CheckCircle2, AlertTriangle, Sparkles, TrendingUp } from "lucide-react";

function ResumeDemo() {
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
            ATS Scanner Simulation
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-white leading-tight tracking-tight">
            See How AI Scans & Scores Your Resume Live
          </h2>
          <p className="text-lg lg:text-[18px] text-[#94A3B8] mt-4 leading-relaxed font-normal">
            Real-time keyword matching, formatting evaluation, and automated bullet point optimization.
          </p>
        </motion.div>

        {/* Demo Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Fake Resume with Animated Laser Scan Line */}
          <div className="lg:col-span-7 saas-card p-6 sm:p-8 bg-[#111827] border border-slate-800 rounded-[24px] relative overflow-hidden">
            {/* Animated Scanning Beam Line */}
            <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_15px_#3b82f6] z-20 animate-scan pointer-events-none" />

            {/* Fake Resume Content Header */}
            <div className="border-b border-slate-800 pb-4 mb-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                  <FileText size={20} />
                </div>
                <div>
                  <p className="text-base font-bold text-white">Alex_Rivera_Resume_2026.pdf</p>
                  <p className="text-xs text-[#94A3B8]">Senior Full Stack Developer Candidate</p>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Scanning Active
              </span>
            </div>

            {/* Fake Resume Lines */}
            <div className="space-y-4 font-mono text-xs text-slate-300 leading-relaxed opacity-90">
              <div className="p-4 rounded-xl bg-[#1E293B]/40 border border-slate-800">
                <p className="text-blue-400 font-bold mb-1">SUMMARY</p>
                <p className="text-[#94A3B8]">
                  Passionate Senior Software Engineer with 6+ years building distributed React and Node.js microservices serving 2M+ monthly active users.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#1E293B]/40 border border-slate-800">
                <p className="text-blue-400 font-bold mb-1">EXPERIENCE BULLETS</p>
                <ul className="space-y-1 text-[#94A3B8]">
                  <li>• Engineered real-time WebSocket dashboard handling 10,000 req/sec with &lt;40ms latency.</li>
                  <li>• Architected PostgreSQL database migrations reducing query execution times by 45%.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-[#1E293B]/40 border border-slate-800">
                <p className="text-blue-400 font-bold mb-1">CORE SKILLS</p>
                <p className="text-slate-300 font-sans font-semibold">
                  React 19, TypeScript, Node.js, Express, PostgreSQL, GraphQL, TailWind CSS
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Live ATS Insights & Metrics */}
          <div className="lg:col-span-5 space-y-6">
            {/* Score Metric Widget */}
            <div className="saas-card p-6 bg-[#111827] border border-slate-800 rounded-[24px]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Computed ATS Match Score</span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">Top 2% Candidate</span>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-5xl font-black text-white tracking-tight">92<span className="text-xl text-blue-400">/100</span></div>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-300">
                    <span>Keyword Alignment</span>
                    <span>92%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#1E293B] overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full w-[92%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Missing Skills Identified */}
            <div className="saas-card p-6 bg-[#111827] border border-slate-800 rounded-[24px]">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <AlertTriangle size={16} className="text-amber-400" />
                Missing Target Keywords
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Docker", "Redis", "System Design", "AWS EC2"].map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-lg text-xs font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/20">
                    + {skill}
                  </span>
                ))}
              </div>
              <p className="text-xs text-[#94A3B8]">
                Adding these missing skills can increase interview call probability by +28%.
              </p>
            </div>

            {/* Recommendations List */}
            <div className="saas-card p-6 bg-[#111827] border border-slate-800 rounded-[24px]">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Sparkles size={16} className="text-blue-400" />
                AI Formatting Recommendations
              </h3>
              <ul className="space-y-2 text-xs text-[#94A3B8]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                  Quantified achievements present in 4 bullet points.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                  Clean PDF parse structure with standard headings.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResumeDemo;
