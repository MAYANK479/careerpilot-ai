import React from "react";
import { motion } from "framer-motion";
import { Upload, Cpu, Sparkles, Mic, CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Upload Resume",
    desc: "Drop your PDF resume into our secure parser engine for instant analysis.",
    icon: Upload,
  },
  {
    num: "02",
    title: "AI Analysis",
    desc: "Our AI extracts ATS keyword scores, skill gaps, and formatting issues.",
    icon: Cpu,
  },
  {
    num: "03",
    title: "Improve & Rewrite",
    desc: "One-click bullet rewriter optimizes achievements with action verbs and metrics.",
    icon: Sparkles,
  },
  {
    num: "04",
    title: "Practice Interview",
    desc: "Voice mock interview with real-time speech recognition and scoring.",
    icon: Mic,
  },
  {
    num: "05",
    title: "Land the Job",
    desc: "Apply with tailored cover letters and track your progress in the dashboard.",
    icon: CheckCircle,
  },
];

function HowItWorks() {
  return (
    <section className="py-36 bg-[#050816] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-[1.1] tracking-tight">
            How It Works
          </h2>
          <p className="text-lg text-[#94A3B8] mt-6 leading-relaxed font-normal max-w-2xl mx-auto">
            Five intuitive steps to transform your job search from application to offer.
          </p>
        </motion.div>

        {/* Horizontal Step Timeline */}
        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Step Circle */}
                  <div className="relative z-10 w-[120px] h-[120px] rounded-3xl bg-[#0E1424] border border-white/10 flex flex-col items-center justify-center mb-8 group-hover:border-blue-500/30 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300">
                    <span className="text-xs font-black text-blue-400 uppercase tracking-widest mb-2">{s.num}</span>
                    <Icon size={28} className="text-slate-300 group-hover:text-blue-400 transition-colors" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed max-w-[200px]">{s.desc}</p>

                  {/* Arrow between steps (desktop only) */}
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-[60px] -right-3 z-20">
                      <ArrowRight size={16} className="text-slate-600" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
