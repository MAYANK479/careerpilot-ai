import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  FileEdit,
  Loader2,
  Copy,
  Check,
  Download,
  Sparkles,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer, useToast } from "../components/ui/Toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5002";

function CoverLetter() {
  const location = useLocation();
  const toast = useToast();

  const [resumeText, setResumeText] = useState(
    location.state?.resumeText || ""
  );
  const [jobDescription, setJobDescription] = useState(
    location.state?.jobDescription || ""
  );
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
        err.response?.data?.message || "Failed to generate cover letter."
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
    <div className="min-h-screen bg-[#030712] text-white flex flex-col justify-between font-sans selection:bg-blue-500 selection:text-white">
      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismissToast} />
      <Navbar />

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-6 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block mb-4">
            AI Cover Letter Writer
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Tailored Cover Letter Generator
          </h1>
          <p className="text-[#94A3B8] mt-4 text-base sm:text-lg">
            Paste your resume and job description to generate a highly tailored, professional cover letter in seconds.
          </p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="saas-card p-8 bg-[#111827] border border-slate-800 rounded-[24px]">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4 block">
              Your Resume Text
            </label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume text..."
              className="w-full h-56 p-5 rounded-2xl bg-[#030712] border border-slate-800 text-sm font-medium text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="saas-card p-8 bg-[#111827] border border-slate-800 rounded-[24px]">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4 block">
              Target Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the target job posting..."
              className="w-full h-56 p-5 rounded-2xl bg-[#030712] border border-slate-800 text-sm font-medium text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="saas-card p-8 mb-8 bg-[#111827] border border-slate-800 rounded-[24px]">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 block">
            Company Name (Optional)
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g. Google, Stripe, Amazon..."
            className="w-full bg-[#030712] border border-slate-800 rounded-2xl px-5 py-4 text-sm font-semibold text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex justify-center mb-12">
          <button
            onClick={handleGenerate}
            disabled={loading || !resumeText.trim() || !jobDescription.trim()}
            className="px-8 py-4 rounded-full font-bold text-base bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/30 flex items-center gap-2 disabled:opacity-40 transition-all"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Generating Cover Letter...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Generate Cover Letter
              </>
            )}
          </button>
        </div>

        <AnimatePresence>
          {letter && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="saas-card p-8 bg-[#111827] border border-slate-800 rounded-[24px]"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                    <FileEdit size={20} />
                  </div>
                  <h3 className="text-base font-bold text-white">
                    Generated Cover Letter
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white px-4 py-2 rounded-full bg-[#1E293B] border border-slate-700/80"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white px-4 py-2 rounded-full bg-[#1E293B] border border-slate-700/80"
                  >
                    <Download size={14} />
                    Download
                  </button>
                </div>
              </div>

              <div className="bg-[#030712] rounded-2xl p-8 border border-slate-800">
                <pre className="whitespace-pre-wrap text-sm text-slate-200 leading-relaxed font-sans">
                  {letter}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default CoverLetter;
