import React from "react";
import { motion } from "framer-motion";
import { FileWarning, MicOff, Map, FileSearch } from "lucide-react";
import { Link } from "react-router-dom";

const problems = [
  {
    title: "ATS Rejection",
    description: "75% of resumes are rejected by Applicant Tracking Systems before a human ever reads them.",
    icon: FileWarning,
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    glow: "group-hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]",
    hoverBorder: "group-hover:border-red-500/40"
  },
  {
    title: "No Interview Practice",
    description: "Most candidates have zero technical or behavioral interview practice before the real thing.",
    icon: MicOff,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    glow: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
    hoverBorder: "group-hover:border-amber-500/40"
  },
  {
    title: "Unfocused Learning",
    description: "No structured roadmap means months of wasted time learning the wrong skills for your target role.",
    icon: Map,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    glow: "group-hover:shadow-[0_0_30px_rgba(234,179,8,0.15)]",
    hoverBorder: "group-hover:border-yellow-500/40"
  },
  {
    title: "Lost in the Noise",
    description: "Generic resumes and standard cover letters get lost in a sea of thousands of identical applicants.",
    icon: FileSearch,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
    hoverBorder: "group-hover:border-blue-500/40"
  }
];

function ProblemSection() {
  return (
    <section className="py-32 bg-[#050816] relative">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-[1.1] tracking-tight">
            Why Most Candidates <br className="hidden sm:block" /> Never Get Interviews
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {problems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`group relative p-10 rounded-3xl bg-[#0E1424] border border-white/5 transition-all duration-300 ${item.hoverBorder} ${item.glow}`}
              >
                <div className={`w-16 h-16 rounded-2xl ${item.bg} ${item.border} border flex items-center justify-center mb-8`}>
                  <Icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <h3 className="text-[28px] font-bold text-white mb-4 leading-tight">{item.title}</h3>
                <p className="text-[18px] text-[#94A3B8] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-8">
            CareerPilot AI fixes all of this.
          </h3>
          <Link
            to="/upload"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-[#050816] font-bold text-lg hover:bg-slate-200 transition-colors shadow-xl shadow-white/10"
          >
            See How It Works
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default ProblemSection;
