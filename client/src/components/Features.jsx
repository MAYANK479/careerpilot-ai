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
  },
  {
    icon: Sparkles,
    title: "Resume Builder",
    description:
      "Rewrite bullet points with high-impact action verbs and quantitative metrics in a single click using AI algorithms.",
    link: "/upload",
    tag: "AI Architect",
  },
  {
    icon: FileEdit,
    title: "AI Cover Letter",
    description:
      "Generate hyper-personalized cover letters aligned with the exact requirements and culture of target job postings.",
    link: "/cover-letter",
    tag: "One-Click Writer",
  },
  {
    icon: Mic,
    title: "AI Voice Interview",
    description:
      "Simulate real-time voice technical and HR interview rounds with speech-to-text feedback and confidence ratings.",
    link: "/interview",
    tag: "Voice Simulator",
  },
  {
    icon: Briefcase,
    title: "Job Matching",
    description:
      "Compare your profile directly against any job description to compute shortlist probabilities and missing skill gaps.",
    link: "/job-match",
    tag: "Gap Matcher",
  },
  {
    icon: Map,
    title: "Career Roadmap",
    description:
      "Receive week-by-week skill roadmaps tailored to your career goal with curated tutorials and project milestones.",
    link: "/roadmap",
    tag: "Roadmap Engine",
  },
];

function Features() {
  return (
    <section id="features" className="py-28 lg:py-32 relative">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block mb-4">
            Unified Career Intelligence
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-white leading-tight tracking-tight">
            Six Powerful AI Tools Built into One Platform
          </h2>
          <p className="text-lg lg:text-[18px] text-[#94A3B8] mt-4 leading-relaxed font-normal">
            Everything you need to optimize your resume, prepare for rigorous interviews, and accelerate your tech career.
          </p>
        </motion.div>

        {/* 6 Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map(({ icon: Icon, title, description, link, tag }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="saas-card-interactive p-8 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-[16px] bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Icon size={24} />
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#1E293B] text-slate-300 border border-slate-700/80">
                    {tag}
                  </span>
                </div>

                <h3 className="text-xl lg:text-[24px] font-bold text-white mb-3 tracking-tight">
                  {title}
                </h3>
                <p className="text-base lg:text-[18px] text-[#94A3B8] leading-relaxed font-normal mb-8">
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