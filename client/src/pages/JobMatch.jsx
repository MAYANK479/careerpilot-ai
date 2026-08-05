import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  ArrowLeft,
  Briefcase,
  Loader2,
  Target,
  CheckCircle,
  XCircle,
  TrendingUp,
  Lightbulb,
  BarChart3,
  Upload,
} from "lucide-react";
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
    <div className="min-h-screen bg-slate-950 text-white">
      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismissToast} />

      {/* Header */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-800/50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back</span>
        </button>
        <h1 className="text-lg font-bold text-blue-400">Job Match</h1>
        <Link
          to="/upload"
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition px-3 py-2 rounded-lg hover:bg-slate-800"
        >
          <Upload size={16} />
          Upload
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-extrabold tracking-tight">
            Compare Your Resume to a{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Job Description
            </span>
          </h1>
          <p className="text-slate-400 mt-3 max-w-xl mx-auto">
            Paste a job posting below and see how well your resume matches —
            with AI-powered keyword analysis and recommendations.
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        >
          {/* Resume Text */}
          <div className="glass rounded-2xl p-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
              <Target size={16} className="text-blue-400" />
              Your Resume
            </label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume text here, or upload a resume first to auto-fill..."
              className="w-full h-56 bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 placeholder-slate-600 resize-none focus:outline-none focus:border-blue-500/50 transition"
            />
            {resumeText && (
              <p className="text-xs text-slate-600 mt-2">
                {resumeText.length.toLocaleString()} characters
              </p>
            )}
          </div>

          {/* Job Description */}
          <div className="glass rounded-2xl p-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
              <Briefcase size={16} className="text-purple-400" />
              Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here..."
              className="w-full h-56 bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 placeholder-slate-600 resize-none focus:outline-none focus:border-purple-500/50 transition"
            />
            {jobDescription && (
              <p className="text-xs text-slate-600 mt-2">
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
            className="flex items-center gap-2 px-10 py-4 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/15"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Comparing...
              </>
            ) : (
              <>
                <BarChart3 size={20} />
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
            >
              {/* Top Row: Match Score + Shortlist Probability + Keyword Coverage */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <AtsScoreGauge
                  score={result.matchScore}
                  rating={`${result.matchScore}% Match`}
                />

                {/* Shortlist Probability */}
                <div className="glass rounded-2xl p-8 flex flex-col items-center justify-center glow-hover">
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                    Shortlist Probability
                  </h3>
                  <div
                    className={`text-3xl font-extrabold ${prob.color} mb-3`}
                  >
                    {result.shortlistProbability}
                  </div>
                  <span
                    className={`text-xs font-medium px-4 py-1.5 rounded-full border ${prob.bg} ${prob.border} ${prob.color}`}
                  >
                    {result.matchScore >= 70
                      ? "Strong candidate"
                      : result.matchScore >= 40
                      ? "Competitive with improvements"
                      : "Significant gaps to address"}
                  </span>
                </div>

                {/* Keyword Coverage */}
                <div className="glass rounded-2xl p-8 flex flex-col items-center justify-center glow-hover">
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                    Keyword Coverage
                  </h3>
                  <div className="w-full max-w-[200px]">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Coverage</span>
                      <span className="text-blue-400 font-bold">
                        {result.keywordCoverage}%
                      </span>
                    </div>
                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${result.keywordCoverage}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                  className="glass rounded-2xl p-6 mb-8 glow-hover"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb size={20} className="text-amber-400" />
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                      Recommendations
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3 text-sm text-slate-300"
                      >
                        <TrendingUp
                          size={14}
                          className="text-blue-400 mt-0.5 shrink-0"
                        />
                        <span>{rec}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Action Bar */}
              <div className="flex flex-wrap gap-4 justify-center pb-10">
                <Link
                  to="/upload"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition font-medium"
                >
                  <Upload size={18} />
                  Upload New Resume
                </Link>
                <button
                  onClick={() => {
                    setResult(null);
                    setJobDescription("");
                  }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 transition font-medium"
                >
                  <BarChart3 size={18} />
                  Compare Another Job
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default JobMatch;
