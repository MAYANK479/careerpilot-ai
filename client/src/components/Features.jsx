import { motion } from "framer-motion";
import {
  FileText,
  Sparkles,
  Briefcase,
  Mic,
  FileEdit,
  GitBranch,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "ATS Resume Analysis",
    description:
      "Upload your PDF and get an instant ATS compatibility score with detailed breakdowns of strengths, weaknesses, grammar, and formatting.",
    color: "from-blue-500 to-cyan-500",
    shadowColor: "shadow-blue-500/20",
  },
  {
    icon: Sparkles,
    title: "AI Resume Rewrite",
    description:
      "Let AI improve your professional summary, project descriptions, and experience bullets with one click. See before/after diffs.",
    color: "from-purple-500 to-pink-500",
    shadowColor: "shadow-purple-500/20",
  },
  {
    icon: Briefcase,
    title: "Job Description Matching",
    description:
      "Paste any job posting and see your match score, missing skills, keyword coverage, and probability of getting shortlisted.",
    color: "from-amber-500 to-orange-500",
    shadowColor: "shadow-amber-500/20",
  },
  {
    icon: Mic,
    title: "AI Mock Interview",
    description:
      "Practice interviews with voice. Select your role, answer questions using speech-to-text, and get scored on communication and technical depth.",
    color: "from-emerald-500 to-teal-500",
    shadowColor: "shadow-emerald-500/20",
  },
  {
    icon: FileEdit,
    title: "Cover Letter Generator",
    description:
      "Generate a tailored cover letter from your resume and job description in seconds. Copy or download instantly.",
    color: "from-rose-500 to-pink-500",
    shadowColor: "shadow-rose-500/20",
  },
  {
    icon: GitBranch,
    title: "GitHub Analyzer",
    description:
      "Paste your GitHub username and get AI-powered feedback on your repos, contribution patterns, README quality, and profile strength.",
    color: "from-slate-400 to-slate-300",
    shadowColor: "shadow-slate-400/20",
  },
];

function Features() {
  return (
    <section className="relative py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-3">
            Everything You Need to
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Land Your Dream Job
            </span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto text-lg">
            Six powerful AI tools designed for job seekers. All free, all
            running locally on your machine.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description, color, shadowColor }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group gradient-border rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300"
            >
              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg ${shadowColor} group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon size={20} className="text-white" />
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;