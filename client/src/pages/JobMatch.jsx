import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  Briefcase,
  Loader2,
  Target,
  TrendingUp,
  Lightbulb,
  BarChart3,
  Upload,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer, useToast } from "../components/ui/Toast";
import AtsScoreGauge from "../components/dashboard/AtsScoreGauge";
import SkillChips from "../components/dashboard/SkillChips";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5002";

const probabilityColors = {
  Low: { color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30" },
  Medium: { color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
  High: { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
  "Very High": { color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30" },
};

function JobMatch() {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  const [resumeText, setResumeText] = useState(
    location.state?.resumeText || ""
  );
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleCompare = async () => {
    if (!resumeText.trim()) {
      toast.error("Please provide your resume text. Upload a resume first.");
      return;
    }
    if (!jobDescription.trim()) {
      toast.error("Please paste a job description to compare against.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/api/job-match`, {
        resumeText: resumeText.trim(),
        jobDescription: jobDescription.trim(),
      });

      setResult(res.data.comparison);
      toast.success("Job comparison complete!");
    } catch (err) {
      console.error("Job match failed:", err);
      toast.error(
        err.response?.data?.message ||
          "Could not compare resume. Make sure the server and Ollama are running."
      );
    } finally {
      setLoading(false);
    }
  };

  const prob = result
    ? probabilityColors[result.shortlistProbability] || probabilityColors.Medium
    : null;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismissToast} />

      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">
            Keyword & Skill Gap Analysis
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-2">
            Compare Resume to{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Job Description
            </span>
          </h1>
          <p className="text-slate-400 mt-4 text-base md:text-lg max-w-xl mx-auto">
            Paste a job posting below to see your match score, missing skills, keyword coverage, and shortlist probability.
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          {/* Resume Text */}
          <div className="glass-strong rounded-3xl p-8 border border-slate-800 shadow-xl">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">
              <Target size={18} className="text-blue-400" />
              Your Resume Text
            </label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume text here, or upload a resume first to auto-fill..."
              className="w-full h-64 bg-slate-950/60 border border-slate-800 rounded-2xl p-5 text-sm text-slate-200 placeholder-slate-600 resize-none focus:outline-none focus:border-blue-500/50 transition font-sans leading-relaxed"
            />
            {resumeText && (
              <p className="text-xs text-slate-500 mt-3 font-mono">
                {resumeText.length.toLocaleString()} characters
              </p>
            )}
          </div>

          {/* Job Description */}
          <div className="glass-strong rounded-3xl p-8 border border-slate-800 shadow-xl">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">
              <Briefcase size={18} className="text-purple-400" />
              Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here..."
              className="w-full h-64 bg-slate-950/60 border border-slate-800 rounded-2xl p-5 text-sm text-slate-200 placeholder-slate-600 resize-none focus:outline-none focus:border-purple-500/50 transition font-sans leading-relaxed"
            />
            {jobDescription && (
              <p className="text-xs text-slate-500 mt-3 font-mono">
                {jobDescription.length.toLocaleString()} characters
              </p>
            )}
          </div>
        </motion.div>

        {/* Compare Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCompare}
            disabled={loading || !resumeText.trim() || !jobDescription.trim()}
            className="flex items-center gap-3 px-12 py-5 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:to-pink-500 disabled:opacity-40 transition-all shadow-xl shadow-purple-500/20"
          >
            {loading ? (
              <>
                <Loader2 size={22} className="animate-spin" />
                Comparing Resume & Job...
              </>
            ) : (
              <>
                <BarChart3 size={22} />
                Compare Resume
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Top Row: Match Score + Shortlist Probability + Keyword Coverage */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AtsScoreGauge
                  score={result.matchScore}
                  rating={`${result.matchScore}% Match`}
                />

                {/* Shortlist Probability */}
                <div className="glass-strong rounded-3xl p-8 border border-slate-800 flex flex-col items-center justify-center text-center">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                    Shortlist Probability
                  </h3>
                  <div className={`text-4xl font-extrabold ${prob.color} mb-3`}>
                    {result.shortlistProbability}
                  </div>
                  <span
                    className={`text-xs font-bold px-4 py-1.5 rounded-full border ${prob.bg} ${prob.border} ${prob.color}`}
                  >
                    {result.matchScore >= 70
                      ? "Strong Candidate"
                      : result.matchScore >= 40
                      ? "Competitive Match"
                      : "Significant Skill Gaps"}
                  </span>
                </div>

                {/* Keyword Coverage */}
                <div className="glass-strong rounded-3xl p-8 border border-slate-800 flex flex-col items-center justify-center">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                    Keyword Coverage
                  </h3>
                  <div className="w-full max-w-[220px]">
                    <div className="flex justify-between text-sm mb-2 font-bold">
                      <span className="text-slate-400">Coverage</span>
                      <span className="text-blue-400">{result.keywordCoverage}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${result.keywordCoverage}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SkillChips
                  title="Matching Skills"
                  items={result.matchingSkills}
                  color="green"
                  icon="✅"
                  emptyMessage="No matching skills identified"
                />
                <SkillChips
                  title="Missing Skills"
                  items={result.missingSkills}
                  color="red"
                  icon="❌"
                  emptyMessage="No missing skills — great match!"
                />
              </div>

              {/* Recommendations */}
              {result.recommendations?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-strong rounded-3xl p-8 border border-slate-800"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Lightbulb size={22} className="text-amber-400" />
                    <h3 className="text-base font-bold text-slate-300 uppercase tracking-wider">
                      Tailored Recommendations
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {result.recommendations.map((rec, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3 text-sm text-slate-200 leading-relaxed"
                      >
                        <TrendingUp
                          size={16}
                          className="text-blue-400 mt-0.5 shrink-0"
                        />
                        <span>{rec}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Action Bar */}
              <div className="flex flex-wrap gap-4 justify-center pt-6">
                <button
                  onClick={() => navigate("/upload")}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 font-bold transition shadow-xl shadow-blue-500/20"
                >
                  <Upload size={18} />
                  Upload New Resume
                </button>
                <button
                  onClick={() => {
                    setResult(null);
                    setJobDescription("");
                  }}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-slate-800 bg-slate-900 hover:bg-slate-800 font-bold transition"
                >
                  <BarChart3 size={18} />
                  Compare Another Job
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default JobMatch;
