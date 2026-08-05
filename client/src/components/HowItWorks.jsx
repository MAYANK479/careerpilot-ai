import { motion } from "framer-motion";
import { Upload, Cpu, Sparkles, Mic, CheckCircle } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Upload Resume",
    desc: "Drop your PDF resume into our secure parser engine.",
    icon: Upload,
    badge: "Input",
  },
  {
    num: "02",
    title: "AI Analysis",
    desc: "Extract ATS keyword scores and skill gap breakdowns.",
    icon: Cpu,
    badge: "Processing",
  },
  {
    num: "03",
    title: "Improve Resume",
    desc: "One-click bullet rewriter for high impact achievements.",
    icon: Sparkles,
    badge: "Optimization",
  },
  {
    num: "04",
    title: "Practice Interview",
    desc: "Voice mock interview with real-time speech scoring.",
    icon: Mic,
    badge: "Simulation",
  },
  {
    num: "05",
    title: "Apply Jobs",
    desc: "Shortlist matching postings with tailored cover letters.",
    icon: CheckCircle,
    badge: "Success",
  },
];

function HowItWorks() {
  return (
    <section className="py-28 lg:py-32 bg-[#030712] border-t border-slate-800/80 relative">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block mb-4">
            Structured Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-white leading-tight tracking-tight">
            How CareerPilot AI Accelerates Your Hiring Process
          </h2>
          <p className="text-lg lg:text-[18px] text-[#94A3B8] mt-4 leading-relaxed font-normal">
            Five intuitive steps to transform your job search from application to interview offer.
          </p>
        </motion.div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="saas-card-interactive p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-extrabold text-blue-400 font-mono">
                      {s.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <Icon size={18} />
                    </div>
                  </div>
                  <h3 className="text-xl lg:text-[24px] font-bold text-white mb-2">
                    {s.title}
                  </h3>
                  <p className="text-base text-[#94A3B8] leading-relaxed font-normal">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {s.badge}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
