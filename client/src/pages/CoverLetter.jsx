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
            Tailored AI Generator
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2">
            Generate a{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Cover Letter
            </span>
          </h1>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto text-base md:text-lg">
            Paste your resume and a job description — AI will craft a tailored,
            professional cover letter in seconds.
          </p>
        </motion.div>

        {/* Inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="glass-strong rounded-3xl p-8 border border-slate-800 shadow-xl">
            <label className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 block">
              Your Resume
            </label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume text or upload a resume first..."
              className="w-full h-56 bg-slate-950/60 border border-slate-800 rounded-2xl p-4 text-sm text-slate-300 placeholder-slate-600 resize-none focus:outline-none focus:border-blue-500/50 transition font-sans leading-relaxed"
            />
          </div>

          <div className="glass-strong rounded-3xl p-8 border border-slate-800 shadow-xl">
            <label className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 block">
              Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description..."
              className="w-full h-56 bg-slate-950/60 border border-slate-800 rounded-2xl p-4 text-sm text-slate-300 placeholder-slate-600 resize-none focus:outline-none focus:border-purple-500/50 transition font-sans leading-relaxed"
            />
          </div>
        </div>

        {/* Company Name */}
        <div className="glass-strong rounded-3xl p-8 mb-8 border border-slate-800 shadow-xl">
          <label className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3 block">
            Company Name (Optional)
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g. Google, Amazon, Flipkart..."
            className="w-full bg-slate-950/60 border border-slate-800 rounded-2xl px-5 py-4 text-base text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition"
          />
        </div>

        {/* Generate Button */}
        <div className="flex justify-center mb-12">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={loading || !resumeText.trim() || !jobDescription.trim()}
            className="flex items-center gap-3 px-12 py-5 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-40 transition-all shadow-xl shadow-blue-500/25"
          >
            {loading ? (
              <>
                <Loader2 size={22} className="animate-spin" />
                Generating Cover Letter...
              </>
            ) : (
              <>
                <Sparkles size={22} />
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
              className="glass-strong rounded-3xl p-8 border border-slate-800 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <FileEdit size={20} className="text-white" />
                  </div>
                  <h3 className="text-base font-bold text-slate-300 uppercase tracking-wider">
                    Your Tailored Cover Letter
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700"
                  >
                    {copied ? (
                      <Check size={16} className="text-emerald-400" />
                    ) : (
                      <Copy size={16} />
                    )}
                    {copied ? "Copied" : "Copy"}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700"
                  >
                    <Download size={16} />
                    Download
                  </button>
                </div>
              </div>

              <div className="bg-slate-950/70 rounded-2xl p-8 border border-slate-800/80">
                <pre className="whitespace-pre-wrap text-base text-slate-200 leading-relaxed font-sans">
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
