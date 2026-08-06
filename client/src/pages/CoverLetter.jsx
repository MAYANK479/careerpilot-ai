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
    <div>
      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismissToast} />

      <div className="section-header">
        <h1 className="section-title">Tailored Cover Letter Generator</h1>
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Paste your resume and job description to generate a highly tailored, professional cover letter in seconds.
      </p>

      {/* Inputs */}
      <div className="dashboard-grid two-columns" style={{ marginBottom: '1.5rem' }}>
        <div className="stat-card">
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Your Resume Text
          </label>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume text..."
            className="form-input"
            style={{ minHeight: '300px', resize: 'vertical' }}
          />
        </div>

        <div className="stat-card">
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Target Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the target job posting..."
            className="form-input"
            style={{ minHeight: '300px', resize: 'vertical' }}
          />
        </div>
      </div>

      <div className="stat-card" style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-light)', textTransform: 'uppercase' }}>
          Company Name (Optional)
        </label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="e.g. Google, Stripe, Amazon..."
          className="form-input"
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
        <button
          onClick={handleGenerate}
          disabled={loading || !resumeText.trim() || !jobDescription.trim()}
          className="btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'auto', padding: '1rem 2rem', fontSize: '1rem' }}
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
            className="stat-card"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileEdit size={20} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
                  Generated Cover Letter
                </h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                  onClick={handleCopy}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-main)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-pill)', background: 'var(--card-bg-light)', border: '1px solid var(--input-border)', cursor: 'pointer' }}
                >
                  {copied ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy"}
                </button>
                <button
                  onClick={handleDownload}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-main)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-pill)', background: 'var(--card-bg-light)', border: '1px solid var(--input-border)', cursor: 'pointer' }}
                >
                  <Download size={14} />
                  Download
                </button>
              </div>
            </div>

            <div style={{ background: 'var(--card-bg-light)', borderRadius: 'var(--radius-sm)', padding: '2rem', border: '1px solid var(--input-border)' }}>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.6', fontFamily: 'var(--font-family)' }}>
                {letter}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CoverLetter;
