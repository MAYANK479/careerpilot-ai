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
import { ToastContainer, useToast } from "../components/ui/Toast";

const API_URL = import.meta.env.VITE_API_URL || "";

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
    <div>
      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismissToast} />

      <div className="section-header">
        <h1 className="section-title">Job Description Matcher</h1>
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Compare your resume against any job posting to calculate match percentage, missing requirements, and tailored cover letters.
      </p>

      {/* Inputs */}
      <div className="dashboard-grid two-columns">
        <div className="stat-card">
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            <Target size={18} color="var(--primary)" />
            Your Resume Text
          </label>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste resume text or upload a PDF first..."
            className="form-input"
            style={{ minHeight: '300px', resize: 'vertical' }}
          />
        </div>

        <div className="stat-card">
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            <Briefcase size={18} color="var(--secondary)" />
            Target Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste full job posting requirements here..."
            className="form-input"
            style={{ minHeight: '300px', resize: 'vertical' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', marginBottom: '3rem' }}>
        <button
          onClick={handleCompare}
          disabled={loading || !resumeText.trim() || !jobDescription.trim()}
          className="btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'auto', padding: '1rem 2rem', fontSize: '1rem' }}
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
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="stat-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="brand-badge" style={{ background: 'rgba(74, 222, 128, 0.1)', color: 'var(--success)', border: '1px solid rgba(74, 222, 128, 0.2)' }}>Shortlist Rating</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-main)', marginTop: '0.5rem' }}>Match Score: {result.matchScore}%</h2>
              <p style={{ color: 'var(--text-muted)' }}>Shortlist Probability: <strong style={{ color: 'var(--text-main)' }}>{result.shortlistProbability}</strong></p>
            </div>

            <button
              onClick={() => navigate("/cover-letter", { state: { resumeText, jobDescription } })}
              className="btn-primary"
              style={{ width: 'auto' }}
            >
              Generate Cover Letter
            </button>
          </div>

          <div className="dashboard-grid two-columns">
            <div className="stat-card">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--success)' }}>✓</span> Matching Skills
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {result.matchingSkills?.length > 0 ? result.matchingSkills.map((skill, i) => (
                  <span key={i} className="badge badge-green">
                    {skill}
                  </span>
                )) : <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No matching skills identified.</p>}
              </div>
            </div>

            <div className="stat-card">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--danger)' }}>⚠️</span> Missing Skills
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {result.missingSkills?.length > 0 ? result.missingSkills.map((skill, i) => (
                  <span key={i} className="badge badge-red">
                    {skill}
                  </span>
                )) : <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No missing skills! Great match.</p>}
              </div>
            </div>
          </div>

          <div className="stat-card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              💡 Recommendations
            </h3>
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
              {result.recommendations?.map((rec, i) => (
                <li key={i} style={{ marginBottom: '0.75rem' }}>{rec}</li>
              ))}
            </ul>
          </div>
          
        </motion.div>
      )}
    </div>
  );
}

export default JobMatch;
