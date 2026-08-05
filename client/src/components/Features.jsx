import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FileText,
  Sparkles,
  FileEdit,
  Mic,
  Briefcase,
  Map,
  ArrowRight,
} from "lucide-react";

const featuresList = [
  {
    icon: FileText,
    title: "ATS Resume Analyzer",
    description:
      "Deep semantic scanning against Fortune 500 ATS engines. Get instant keyword coverage scores and line-by-line breakdown.",
    link: "/upload",
    tag: "ATS Engine",
    color: "from-blue-600 to-blue-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]",
  },
  {
    icon: Sparkles,
    title: "AI Resume Rewriter",
    description:
      "Rewrite bullet points with high-impact action verbs and quantitative metrics using AI algorithms.",
    link: "/upload",
    tag: "AI Writer",
    color: "from-purple-600 to-purple-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]",
  },
  {
    icon: FileEdit,
    title: "Cover Letter Generator",
    description:
      "Generate hyper-personalized cover letters aligned with the exact requirements of target job postings.",
    link: "/cover-letter",
    tag: "One-Click",
    color: "from-indigo-600 to-indigo-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]",
  },
  {
    icon: Mic,
    title: "AI Voice Interview",
    description:
      "Simulate real-time voice technical and behavioral interviews with speech-to-text feedback and confidence ratings.",
    link: "/interview",
    tag: "Voice AI",
    color: "from-emerald-600 to-emerald-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]",
  },
  {
    icon: Briefcase,
    title: "Job Description Matcher",
    description:
      "Compare your profile against any job description to compute shortlist probabilities and identify skill gaps.",
    link: "/job-match",
    tag: "Gap Finder",
    color: "from-amber-600 to-amber-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]",
  },
  {
    icon: Map,
    title: "Career Roadmap",
    description:
      "Receive week-by-week skill roadmaps tailored to your career goal with curated tutorials and milestones.",
    link: "/roadmap",
    tag: "Roadmap AI",
    color: "from-rose-600 to-rose-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(244,63,94,0.2)]",
  },
];

function Features() {
  return (
    <section id="features" className="py-36 bg-[#050816] relative">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block mb-6">
            Unified Career Intelligence
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-[1.1] tracking-tight">
            Six AI Tools. <br className="hidden sm:block" /> One Platform.
          </h2>
          <p className="text-lg text-[#94A3B8] mt-6 leading-relaxed font-normal max-w-2xl mx-auto">
            Everything you need to optimize your resume, practice for interviews, and accelerate your tech career.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresList.map(({ icon: Icon, title, description, link, tag, color, glow }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`group relative saas-card p-8 bg-[#0E1424] border border-white/5 hover:border-white/10 flex flex-col justify-between transition-all duration-300 ${glow}`}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${color} flex items-center justify-center text-white shadow-lg opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300`}>
                    <Icon size={24} />
                  </div>
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#111B2E] text-slate-400 border border-white/5 uppercase tracking-wider">
                    {tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  {title}
                </h3>
                <p className="text-[15px] text-[#94A3B8] leading-relaxed mb-8">
                  {description}
                </p>
              </div>

              <Link
                to={link}
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 group-hover:text-blue-300 transition-colors"
              >
                Launch Tool
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;