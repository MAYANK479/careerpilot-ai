import React from "react";
import { motion } from "framer-motion";
import { FileText, CheckCircle2, AlertTriangle, Sparkles, XCircle } from "lucide-react";
import { useCountUp } from "../hooks/useCountUp";

function ProgressBar({ label, value, delay = 0 }) {
  const { count, ref } = useCountUp(value, 2000, 0);

  return (
    <div className="space-y-2" ref={ref}>
      <div className="flex justify-between text-sm font-semibold text-slate-300">
        <span>{label}</span>
        <span>{count}%</span>
      </div>
      <div className="w-full h-2 rounded-full bg-[#111B2E] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay, ease: "easeOut" }}
          className="h-full bg-blue-500 rounded-full"
        />
      </div>
    </div>
  );
}

function ResumeDemo() {
  const { count: atsScore, ref: atsRef } = useCountUp(92, 2000, 0);

  return (
    <section className="py-36 bg-[#050816] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-[1.1] tracking-tight">
            See How AI Scans & Scores <br className="hidden sm:block" /> Your Resume Live
          </h2>
          <p className="text-lg text-[#94A3B8] mt-6 leading-relaxed font-normal">
            Real-time keyword matching, formatting evaluation, and automated bullet point optimization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Fake Resume (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 saas-card p-6 sm:p-8 bg-[#0E1424] relative overflow-hidden h-full min-h-[600px]"
          >
            {/* Animated Scanning Beam Line */}
            <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_20px_#3b82f6] z-20 animate-scan pointer-events-none" />
            <div className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent to-blue-500/10 z-10 animate-scan pointer-events-none transform -translate-y-full" />

            <div className="border-b border-white/10 pb-5 mb-6 flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold border border-blue-500/20">
                  <FileText size={24} />
                </div>
                <div>
                  <p className="text-lg font-bold text-white">Alex_Rivera_Resume_2026.pdf</p>
                  <p className="text-sm text-[#94A3B8] font-medium">Senior Full Stack Developer Candidate</p>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Scanning Active
              </span>
            </div>

            <div className="space-y-6 font-mono text-sm text-slate-300 leading-relaxed">
              <div className="p-5 rounded-2xl bg-[#111B2E] border border-white/5">
                <p className="text-blue-400 font-bold mb-2 text-xs tracking-widest uppercase">Summary</p>
                <p className="text-[#94A3B8]">
                  Passionate Senior Software Engineer with 6+ years building distributed React and Node.js microservices serving 2M+ monthly active users.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#111B2E] border border-white/5">
                <p className="text-blue-400 font-bold mb-3 text-xs tracking-widest uppercase">Experience</p>
                <ul className="space-y-3 text-[#94A3B8]">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">›</span>
                    Engineered real-time WebSocket dashboard handling 10,000 req/sec with &lt;40ms latency.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">›</span>
                    Architected PostgreSQL database migrations reducing query execution times by 45%.
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-[#111B2E] border border-white/5 relative overflow-hidden">
                <p className="text-blue-400 font-bold mb-2 text-xs tracking-widest uppercase">Core Skills</p>
                <p className="text-slate-300 font-sans font-semibold">
                  React 19, TypeScript, Node.js, Express, PostgreSQL, GraphQL, Tailwind CSS
                </p>
                {/* Simulated highlight on skills */}
                <motion.div
                  initial={{ opacity: 0, width: "0%" }}
                  whileInView={{ opacity: 1, width: "100%" }}
                  transition={{ duration: 1, delay: 1.5 }}
                  className="absolute inset-0 bg-blue-500/10 pointer-events-none"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Metrics (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            {/* ATS Score Card */}
            <div className="saas-card p-6 bg-[#0E1424]">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider">Computed ATS Match</span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Top 2% Candidate
                </span>
              </div>

              <div className="flex items-center gap-6 mb-8" ref={atsRef}>
                <div className="text-[72px] font-black text-white tracking-tighter leading-none">
                  {atsScore}
                  <span className="text-2xl text-slate-500 font-bold ml-1">/100</span>
                </div>
              </div>

              <div className="space-y-5">
                <ProgressBar label="Keyword Match" value={92} delay={0.2} />
                <ProgressBar label="Format Score" value={88} delay={0.4} />
                <ProgressBar label="Readability" value={95} delay={0.6} />
                <ProgressBar label="Grammar & Spelling" value={97} delay={0.8} />
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="saas-card p-5 bg-[#0E1424]">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  Strengths
                </h3>
                <ul className="space-y-3 text-sm text-[#94A3B8] font-medium">
                  <li>Quantified impact in 80% of bullets</li>
                  <li>Clean PDF text structure</li>
                  <li>Action verbs used consistently</li>
                </ul>
              </div>

              <div className="saas-card p-5 bg-[#0E1424]">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <AlertTriangle size={16} className="text-amber-400" />
                  Missing Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Docker", "AWS", "Redis"].map((skill) => (
                    <span key={skill} className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ResumeDemo;
