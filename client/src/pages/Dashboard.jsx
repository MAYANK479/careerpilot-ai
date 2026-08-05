import { useLocation, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Upload,
  Briefcase,
  Download,
} from "lucide-react";
import AtsScoreGauge from "../components/dashboard/AtsScoreGauge";
import SummaryCard from "../components/dashboard/SummaryCard";
import InsightList from "../components/dashboard/InsightList";
import SkillChips from "../components/dashboard/SkillChips";
import ResumePreview from "../components/dashboard/ResumePreview";

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { resumeText, analysis, fileName, analysisAvailable } =
    location.state || {};

  // Redirect to upload if no data
  if (!resumeText) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold mb-4">No Analysis Data</h1>
          <p className="text-slate-400 mb-8">
            Upload a resume first to see your analysis dashboard.
          </p>
          <Link
            to="/upload"
            className="inline-flex items-center gap-2 bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-500 transition font-medium"
          >
            <Upload size={18} />
            Upload Resume
          </Link>
        </motion.div>
      </div>
    );
  }

  const stagger = {
    container: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: { staggerChildren: 0.08 },
      },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 },
    },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-800/50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back</span>
        </button>

        <h1 className="text-lg font-bold text-blue-400">Analysis Dashboard</h1>

        <div className="flex items-center gap-3">
          <Link
            to="/job-match"
            state={{ resumeText }}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            <Briefcase size={16} />
            Job Match
          </Link>
          <Link
            to="/upload"
            className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition font-medium"
          >
            <Upload size={16} />
            New Resume
          </Link>
        </div>
      </nav>

      {/* Dashboard Content */}
      <motion.div
        variants={stagger.container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto px-6 py-8"
      >
        {/* File Info */}
        {fileName && (
          <motion.p
            variants={stagger.item}
            className="text-sm text-slate-500 mb-6"
          >
            Analyzed: <span className="text-slate-400">{fileName}</span>
          </motion.p>
        )}

        {analysis ? (
          <>
            {/* Top Row: Score + Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <motion.div variants={stagger.item}>
                <AtsScoreGauge
                  score={analysis.atsScore}
                  rating={analysis.resumeRating}
                />
              </motion.div>

              <motion.div variants={stagger.item} className="lg:col-span-2">
                <SummaryCard summary={analysis.professionalSummary} />

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="glass rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-emerald-400">
                      {analysis.strengths?.length || 0}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Strengths</p>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-amber-400">
                      {analysis.weaknesses?.length || 0}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Weaknesses</p>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-red-400">
                      {analysis.missingSkills?.length || 0}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Missing Skills</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <motion.div variants={stagger.item}>
                <InsightList
                  title="Strengths"
                  items={analysis.strengths}
                  icon="💪"
                  color="green"
                  emptyMessage="No specific strengths identified"
                />
              </motion.div>
              <motion.div variants={stagger.item}>
                <InsightList
                  title="Weaknesses"
                  items={analysis.weaknesses}
                  icon="⚠️"
                  color="amber"
                  emptyMessage="No weaknesses detected — great job!"
                />
              </motion.div>
            </div>

            {/* Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <motion.div variants={stagger.item}>
                <SkillChips
                  title="Missing Skills"
                  items={analysis.missingSkills}
                  color="red"
                  icon="🔍"
                  emptyMessage="No critical skill gaps detected"
                />
              </motion.div>
              <motion.div variants={stagger.item}>
                <SkillChips
                  title="Keyword Suggestions"
                  items={analysis.keywordSuggestions}
                  color="blue"
                  icon="🏷️"
                  emptyMessage="Resume keywords look comprehensive"
                />
              </motion.div>
            </div>

            {/* Grammar & Formatting */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <motion.div variants={stagger.item}>
                <InsightList
                  title="Grammar Issues"
                  items={analysis.grammarIssues}
                  icon="📝"
                  color="red"
                  emptyMessage="No grammar issues found"
                />
              </motion.div>
              <motion.div variants={stagger.item}>
                <InsightList
                  title="Formatting Suggestions"
                  items={analysis.formattingSuggestions}
                  icon="📐"
                  color="purple"
                  emptyMessage="Formatting looks good"
                />
              </motion.div>
            </div>

            {/* Recommended Improvements */}
            <motion.div variants={stagger.item} className="mb-6">
              <InsightList
                title="Recommended Improvements"
                items={analysis.recommendedImprovements}
                icon="🚀"
                color="blue"
                emptyMessage="No additional improvements needed"
              />
            </motion.div>
          </>
        ) : (
          /* No AI analysis available */
          <motion.div
            variants={stagger.item}
            className="glass rounded-2xl p-8 text-center mb-6"
          >
            <p className="text-slate-400 text-lg">
              AI analysis is not available. Make sure Ollama is running.
            </p>
            <p className="text-slate-500 text-sm mt-2">
              Run <code className="bg-slate-800 px-2 py-0.5 rounded text-blue-400">ollama serve</code> and try uploading again.
            </p>
          </motion.div>
        )}

        {/* Resume Preview */}
        <motion.div variants={stagger.item}>
          <ResumePreview text={resumeText} />
        </motion.div>

        {/* Action Bar */}
        <motion.div
          variants={stagger.item}
          className="flex flex-wrap gap-4 justify-center mt-10 pb-10"
        >
          <Link
            to="/upload"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition font-medium"
          >
            <Upload size={18} />
            Analyze Another Resume
          </Link>
          <Link
            to="/job-match"
            state={{ resumeText }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 transition font-medium"
          >
            <Briefcase size={18} />
            Compare to Job Description
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Dashboard;
