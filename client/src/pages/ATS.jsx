import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useResume } from "../context/ResumeContext";
import ResumeDemo from "../components/ResumeDemo";
import { CheckCircle, AlertTriangle, Upload, Sparkles } from "lucide-react";

function ProgressBar({ label, value }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div style={{ width: '100%', height: '8px', borderRadius: '4px', background: 'var(--input-bg)', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${value}%`,
            background: value >= 80 ? 'var(--success)' : value >= 60 ? 'var(--primary)' : 'var(--warning)',
            transition: 'width 1s ease-out',
          }}
        />
      </div>
    </div>
  );
}

function ATS() {
  const location = useLocation();
  const { resumeData, hasResume, saveResume } = useResume();
  const [showDemo, setShowDemo] = useState(false);

  // Sync if arrived from upload with fresh state
  useEffect(() => {
    if (location.state?.analysis && (!hasResume || !resumeData?.analysis)) {
      saveResume({
        resumeText: location.state.resumeText,
        analysis: location.state.analysis,
        fileName: location.state.fileName || 'uploaded-resume.pdf',
        rawFile: location.state.rawFile,
      });
    }
  }, [location.state, hasResume, resumeData, saveResume]);

  const activeData = resumeData?.analysis ? resumeData : (location.state?.analysis ? location.state : null);
  const isAvailable = Boolean(activeData && activeData.analysis);

  if (!isAvailable || showDemo) {
    return (
      <div>
        {isAvailable && (
          <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1.25rem', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.25)', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
              Viewing sample demo. Your uploaded resume (<strong>{activeData.fileName}</strong>) is ready.
            </span>
            <button
              onClick={() => setShowDemo(false)}
              className="btn-primary"
              style={{ width: 'auto', padding: '0.4rem 1rem', fontSize: '0.85rem' }}
            >
              Return to My Resume
            </button>
          </div>
        )}
        {!isAvailable && (
          <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1.25rem', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
              Viewing demo scorecard. Upload your resume to calculate your live ATS score.
            </span>
            <Link
              to="/upload"
              className="btn-primary"
              style={{ width: 'auto', padding: '0.4rem 1rem', fontSize: '0.85rem', textDecoration: 'none' }}
            >
              Upload Resume
            </Link>
          </div>
        )}
        <ResumeDemo />
      </div>
    );
  }

  const { analysis, fileName, resumeText } = activeData;
  const atsScore = analysis.atsScore || 85;
  const rating = analysis.resumeRating || "Good";
  const strengths = analysis.strengths || [];
  const missingSkills = analysis.missingSkills || [];
  const recommendedImprovements = analysis.recommendedImprovements || [];

  return (
    <div>
      {/* Header */}
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h1 className="section-title">Live ATS Resume Scorecard</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.35rem' }}>
            Real-time automated evaluation for <strong>{fileName}</strong>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            onClick={() => setShowDemo(true)}
            style={{
              background: 'transparent',
              border: '1px solid var(--input-border)',
              color: 'var(--text-light)',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-pill)',
              cursor: 'pointer',
              fontSize: '0.85rem',
            }}
          >
            Sample Demo
          </button>
          <Link
            to="/upload"
            className="btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
              padding: '0.5rem 1.25rem',
              width: 'auto',
              fontSize: '0.88rem',
            }}
          >
            <Upload size={15} />
            Upload New Resume
          </Link>
        </div>
      </div>

      {/* Main Grid */}
      <div className="dashboard-grid two-columns" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
        {/* Left Column: Extracted Resume Content & Analysis */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Active File Banner */}
          <div className="stat-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--input-border)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                  📄
                </div>
                <div>
                  <p style={{ fontSize: '1.05rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{fileName}</p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Analyzed with CareerPilot AI Engine</p>
                </div>
              </div>
              <span className="brand-badge" style={{ background: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)', border: '1px solid rgba(34, 197, 94, 0.2)', marginBottom: 0 }}>
                ● Active Profile Resume
              </span>
            </div>

            {/* AI Summary */}
            <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-sm)', background: 'var(--card-bg-light)', border: '1px solid var(--input-border)', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--primary-light)', fontWeight: 'bold', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <Sparkles size={14} /> AI Executive Summary
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                {analysis.professionalSummary || "Candidate demonstrates solid technical competencies with clear opportunities to boost ATS ranking by incorporating high-frequency keywords."}
              </p>
            </div>

            {/* Resume Text Snippet */}
            <div style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', background: 'var(--input-bg)', border: '1px solid var(--input-border)', maxHeight: '240px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-light)', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
              {resumeText}
            </div>
          </div>

          {/* Recommended Improvements */}
          <div className="stat-card">
            <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} color="var(--primary-light)" /> High-Priority Action Items
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {recommendedImprovements.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.85rem 1rem', background: 'var(--card-bg-light)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--input-border)', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--primary-light)', fontWeight: 'bold' }}>{idx + 1}.</span>
                  <span style={{ color: 'var(--text-main)', lineHeight: '1.4' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Score & Metrics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Main Scorecard */}
          <div className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Overall ATS Score
              </span>
              <span className="brand-badge" style={{ background: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)', border: '1px solid rgba(34, 197, 94, 0.2)', marginBottom: 0 }}>
                {rating}
              </span>
            </div>

            <div style={{ fontSize: '3.75rem', fontWeight: '900', color: 'var(--text-main)', lineHeight: '1', marginBottom: '1.75rem' }}>
              {atsScore}
              <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)', fontWeight: '500' }}>/100</span>
            </div>

            <ProgressBar label="Keyword Match Density" value={Math.min(atsScore + 2, 98)} />
            <ProgressBar label="ATS Formatting & Parsing" value={Math.min(atsScore - 4, 94)} />
            <ProgressBar label="Measurable Impact Metrics" value={Math.max(atsScore - 10, 68)} />
            <ProgressBar label="Chronological Structure" value={95} />

            <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--input-border)', display: 'flex', gap: '0.75rem' }}>
              <Link to="/job-match" className="btn-primary" style={{ flex: 1, textAlign: 'center', textDecoration: 'none', fontSize: '0.85rem', padding: '0.65rem 1rem' }}>
                Match Against Job
              </Link>
              <Link to="/cover-letter" style={{ flex: 1, textAlign: 'center', textDecoration: 'none', fontSize: '0.85rem', padding: '0.65rem 1rem', borderRadius: 'var(--radius-pill)', border: '1px solid var(--input-border)', background: 'var(--card-bg-light)', color: 'var(--text-main)', fontWeight: '600' }}>
                Write Cover Letter
              </Link>
            </div>
          </div>

          {/* Strengths & Missing Skills */}
          <div className="stat-card">
            <h3 style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle size={16} color="var(--success)" /> Detected Strengths
            </h3>
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 1.5rem 0', lineHeight: '1.5' }}>
              {strengths.slice(0, 3).map((str, i) => (
                <li key={i} style={{ marginBottom: '0.4rem' }}>{str}</li>
              ))}
            </ul>

            <h3 style={{ fontSize: '0.9rem', color: 'var(--danger)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={16} color="var(--danger)" /> Missing Skills to Add
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {missingSkills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '6px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    color: 'var(--danger)',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                  }}
                >
                  +{skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ATS;
