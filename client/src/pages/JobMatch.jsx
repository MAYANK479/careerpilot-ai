import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {
  Briefcase,
  Loader2,
  Target,
  BarChart3,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer, useToast } from "../components/ui/Toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5002";

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
      toast.error(err.response?.data?.message || "Could not compare resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col justify-between font-sans selection:bg-blue-500 selection:text-white">
      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismissToast} />
      <Navbar />

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-6 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block mb-4">
            Job Board & Matcher
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Job Description Matcher
          </h1>
          <p className="text-[#94A3B8] mt-4 text-base sm:text-lg">
            Compare your resume against any job posting to calculate match percentage, missing requirements, and tailored cover letters.
          </p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="saas-card p-8 bg-[#0E1424] border border-slate-800 rounded-[24px]">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">
              <Target size={18} className="text-blue-400" />
              Your Resume Text
            </label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste resume text or upload a PDF first..."
              className="w-full h-56 p-5 rounded-2xl bg-[#050816] border border-slate-800 text-sm font-medium text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="saas-card p-8 bg-[#0E1424] border border-slate-800 rounded-[24px]">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">
              <Briefcase size={18} className="text-purple-400" />
              Target Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste full job posting requirements here..."
              className="w-full h-56 p-5 rounded-2xl bg-[#050816] border border-slate-800 text-sm font-medium text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-center mb-12">
          <button
            onClick={handleCompare}
            disabled={loading || !resumeText.trim() || !jobDescription.trim()}
            className="px-8 py-4 rounded-full font-bold text-base bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/30 flex items-center gap-2 disabled:opacity-40 transition-all"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Comparing Resume & Job...
              </>
            ) : (
              <>
                <BarChart3 size={20} />
                Calculate Match Score
              </>
            )}
          </button>
        </div>

        {/* Results Card */}
        {result && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="saas-card p-8 bg-[#0E1424] border border-slate-800 rounded-[24px] flex flex-col sm:flex-row justify-between items-center gap-6">
              <div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Shortlist Rating</span>
                <h2 className="text-3xl font-black text-white mt-3">Match Score: {result.matchScore}%</h2>
                <p className="text-sm text-[#94A3B8] mt-1">Shortlist Probability: {result.shortlistProbability}</p>
              </div>

              <button
                onClick={() => navigate("/cover-letter", { state: { resumeText, jobDescription } })}
                className="px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md"
              >
                Generate Cover Letter
              </button>
            </div>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default JobMatch;
