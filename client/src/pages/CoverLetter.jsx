import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  ArrowLeft,
  FileEdit,
  Loader2,
  Copy,
  Check,
  Download,
  Sparkles,
} from "lucide-react";
import { ToastContainer, useToast } from "../components/ui/Toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5002";

function CoverLetter() {
  const location = useLocation();
  const toast = useToast();

  const [resumeText, setResumeText] = useState(
    location.state?.resumeText || ""
  );
  const [jobDescription, setJobDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [letter, setLetter] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!resumeText.trim()) {
      toast.error("Please provide your resume text.");
      return;
    }
    if (!jobDescription.trim()) {
      toast.error("Please paste the job description.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/api/cover-letter`, {
        resumeText: resumeText.trim(),
        jobDescription: jobDescription.trim(),
        companyName: companyName.trim() || "the company",
      });

      setLetter(res.data.coverLetter);
      toast.success("Cover letter generated!");
    } catch (err) {
      console.error("Cover letter generation failed:", err);
      toast.error(
        err.response?.data?.message ||
          "Failed to generate cover letter. Make sure Ollama is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(letter);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([letter], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cover-letter-${companyName || "generated"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Cover letter downloaded!");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismissToast} />

      {/* Header */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-800/50">
        <Link
          to="/"
          className="flex items-center gap-2 text-slate-400 hover:text-white transition"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Home</span>
        </Link>
        <h1 className="text-lg font-bold text-blue-400">Cover Letter</h1>
        <div className="w-20" />
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-extrabold">
            Generate a{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Cover Letter
            </span>
          </h1>
          <p className="text-slate-400 mt-3 max-w-lg mx-auto">
            Paste your resume and a job description — AI will craft a tailored
            cover letter in seconds.
          </p>
        </motion.div>

        {/* Inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="glass rounded-2xl p-6">
            <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 block">
              Your Resume
            </label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume text or upload a resume first..."
              className="w-full h-44 bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 placeholder-slate-600 resize-none focus:outline-none focus:border-blue-500/50 transition"
            />
          </div>

          <div className="glass rounded-2xl p-6">
            <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 block">
              Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description..."
              className="w-full h-44 bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 placeholder-slate-600 resize-none focus:outline-none focus:border-purple-500/50 transition"
            />
          </div>
        </div>

        {/* Company Name */}
        <div className="glass rounded-2xl p-6 mb-6">
          <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 block">
            Company Name (optional)
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g. Google, Amazon, Flipkart..."
            className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition"
          />
        </div>

        {/* Generate Button */}
        <div className="flex justify-center mb-10">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={loading || !resumeText.trim() || !jobDescription.trim()}
            className="flex items-center gap-2 px-10 py-4 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/15"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Generate Cover Letter
              </>
            )}
          </motion.button>
        </div>

        {/* Output */}
        <AnimatePresence>
          {letter && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="glass rounded-2xl p-6"
            >
              {/* Top bar */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <FileEdit size={16} className="text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                    Your Cover Letter
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition px-3 py-2 rounded-lg hover:bg-slate-800"
                  >
                    {copied ? (
                      <Check size={14} className="text-emerald-400" />
                    ) : (
                      <Copy size={14} />
                    )}
                    {copied ? "Copied" : "Copy"}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition px-3 py-2 rounded-lg hover:bg-slate-800"
                  >
                    <Download size={14} />
                    Download
                  </button>
                </div>
              </div>

              {/* Letter content */}
              <div className="bg-slate-950/50 rounded-xl p-6">
                <pre className="whitespace-pre-wrap text-sm text-slate-300 leading-relaxed font-sans">
                  {letter}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CoverLetter;
