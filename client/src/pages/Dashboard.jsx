import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, AlertTriangle, Upload } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useResume } from "../context/ResumeContext";
import { resolveCandidateName } from "../utils/userUtils";

function Dashboard() {
  const [targetRole, setTargetRole] = useState("Full Stack Engineer");
  const { user } = useAuth();
  const { resumeData, hasResume } = useResume();
  const userName = resolveCandidateName(user);

  const defaultSkills = [
    { name: "React 19 / Modern Frontend", progress: 92, status: "Mastered" },
    { name: "Node.js Microservices", progress: 88, status: "Proficient" },
    { name: "System Design", progress: 65, status: "In Progress" },
    { name: "PostgreSQL Optimization", progress: 80, status: "Proficient" },
    { name: "CI/CD & Docker", progress: 55, status: "Skill Gap" },
  ];

  const defaultGaps = [
    "AWS Infrastructure (EC2, S3, IAM, CloudFront)",
    "Distributed Caching with Redis",
    "GraphQL API Integration & Caching",
  ];

  // Dynamic strengths from active resume or fallback
  const displayedSkills = hasResume && resumeData?.analysis?.strengths?.length
    ? resumeData.analysis.strengths.slice(0, 5).map((str, idx) => ({
        name: str,
        progress: Math.max(95 - idx * 4, 75),
        status: idx === 0 ? "Mastered" : "Proficient",
      }))
    : defaultSkills;

  // Dynamic gaps from active resume or fallback
  const displayedGaps = hasResume && resumeData?.analysis?.missingSkills?.length
    ? resumeData.analysis.missingSkills.slice(0, 4)
    : defaultGaps;

  return (
    <div>
      {/* Header Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="section-title" style={{ fontSize: '1.75rem', marginBottom: '0.35rem' }}>
            Welcome back, {userName}!
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {hasResume
              ? `Your resume is active across all CareerPilot AI modules.`
              : "Upload your resume to unlock AI scoring, interview prep, and learning tracks."}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Target Role:</span>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="form-input"
              style={{ width: 'auto', padding: '0.4rem 1rem', background: 'var(--card-bg-light)' }}
            >
              <option value="Full Stack Engineer">Full Stack Engineer</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="AI / ML Engineer">AI / ML Engineer</option>
              <option value="DevOps & Cloud Engineer">DevOps & Cloud Engineer</option>
            </select>
          </div>
          <Link
            to="/upload"
            className="btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', padding: '0.6rem 1.25rem' }}
          >
            <Upload size={16} />
            {hasResume ? "Upload New Resume" : "Upload Resume"}
          </Link>
        </div>
      </div>

      {/* Active Resume Showcase Bar */}
      {hasResume && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, rgba(30, 64, 175, 0.05) 100%)',
          border: '1px solid rgba(59, 130, 246, 0.25)',
          borderRadius: 'var(--radius-card)',
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(59, 130, 246, 0.2)',
              color: '#60A5FA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              flexShrink: 0
            }}>
              📄
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-main)' }}>
                  {resumeData?.fileName || 'Uploaded Resume'}
                </span>
                <span className="brand-badge" style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ADE80', border: '1px solid rgba(34, 197, 94, 0.3)', marginBottom: 0, padding: '0.2rem 0.55rem', fontSize: '0.72rem' }}>
                  ● Active Resume Profile
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>
                Overall ATS Score: <strong style={{ color: 'var(--text-main)' }}>{resumeData?.analysis?.atsScore || 90}%</strong> • Rating: <strong style={{ color: 'var(--primary-light)' }}>{resumeData?.analysis?.resumeRating || 'Strong'}</strong> • Profile ready across all workflows
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/ats"
              className="btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
                padding: '0.55rem 1.15rem',
                fontSize: '0.85rem'
              }}
            >
              View ATS Scorecard <ArrowRight size={14} />
            </Link>
            <Link
              to="/job-match"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                textDecoration: 'none',
                padding: '0.55rem 1rem',
                fontSize: '0.85rem',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid var(--input-border)',
                background: 'var(--card-bg-light)',
                color: 'var(--text-main)',
                fontWeight: '500'
              }}
            >
              Match Jobs
            </Link>
          </div>
        </div>
      )}

      {/* Quick Access Workflows */}
      <h2 className="section-title" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Your Workflows</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        
        {/* ATS Resume Analysis */}
        <div className="stat-card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <div style={{ fontSize: '1.75rem' }}>📄</div>
            {hasResume && (
              <span style={{
                fontSize: '0.72rem',
                fontWeight: '700',
                padding: '0.2rem 0.5rem',
                borderRadius: '10px',
                background: 'rgba(34, 197, 94, 0.15)',
                color: '#4ADE80',
                border: '1px solid rgba(34, 197, 94, 0.3)'
              }}>
                ATS {resumeData?.analysis?.atsScore || 90}%
              </span>
            )}
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Resume Analysis</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', flex: 1 }}>
            {hasResume
              ? `Real-time evaluation for ${resumeData?.fileName || 'your resume'}. Click to view scorecard.`
              : "Get an ATS score and identify critical skill gaps."}
          </p>
          <Link
            to={hasResume ? "/ats" : "/upload"}
            style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
          >
            {hasResume ? "View Live Scorecard" : "Analyze Resume"} <ArrowRight size={14} />
          </Link>
        </div>

        {/* Job Match */}
        <div className="stat-card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <div style={{ fontSize: '1.75rem' }}>🎯</div>
            {hasResume && (
              <span style={{ fontSize: '0.72rem', color: 'var(--success)', fontWeight: '600' }}>
                ✓ Resume Ready
              </span>
            )}
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Job Match Engine</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', flex: 1 }}>
            Match your profile against specific job descriptions.
          </p>
          <Link to="/job-match" style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            Find Matches <ArrowRight size={14} />
          </Link>
        </div>

        {/* Cover Letter */}
        <div className="stat-card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <div style={{ fontSize: '1.75rem' }}>✉️</div>
            {hasResume && (
              <span style={{ fontSize: '0.72rem', color: 'var(--success)', fontWeight: '600' }}>
                ✓ Resume Ready
              </span>
            )}
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Cover Letters</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', flex: 1 }}>
            Generate tailored cover letters for your target role.
          </p>
          <Link to="/cover-letter" style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            Generate Letter <ArrowRight size={14} />
          </Link>
        </div>

        {/* Mock Interview */}
        <div className="stat-card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', border: '1px solid var(--primary-light)', background: 'rgba(59, 130, 246, 0.05)' }}>
          <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>🗣️</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--primary)' }}>Mock Interview</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', flex: 1 }}>
            Practice interactive voice interviews with AI.
          </p>
          <Link to="/interview" style={{ background: 'var(--primary)', color: 'white', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-pill)', fontWeight: '600', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', width: 'fit-content' }}>
            Start Practice <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Skills Mastery & Critical Gaps Grid */}
      <div className="dashboard-grid two-columns" style={{ gridTemplateColumns: '2fr 1fr' }}>
        {/* Skills Mastery Progress */}
        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 className="section-title" style={{ fontSize: '1.1rem', marginBottom: 0 }}>
              {hasResume ? "Detected Skills & Strengths" : "Skills Mastery & Role Alignment"}
            </h3>
            {hasResume && (
              <span className="brand-badge" style={{ marginBottom: 0, fontSize: '0.72rem' }}>
                From Active Resume
              </span>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {displayedSkills.map((item) => (
              <div key={item.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                  <span style={{ fontWeight: '500', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle size={14} color="var(--success)" />
                    {item.name}
                  </span>
                  <span style={{ color: 'var(--text-muted)' }}>{item.progress}% ({item.status})</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'var(--input-bg)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{ 
                      height: '100%', 
                      width: `${item.progress}%`, 
                      background: item.progress > 80 ? 'var(--success)' : item.progress > 60 ? 'var(--primary)' : 'var(--danger)',
                      borderRadius: '4px'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Skill Gaps Card */}
        <div className="stat-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 className="section-title" style={{ fontSize: '1.1rem', marginBottom: 0, color: 'var(--danger)' }}>
                Critical Skill Gaps
              </h3>
              {hasResume && (
                <span style={{ fontSize: '0.72rem', color: 'var(--danger)', fontWeight: 'bold' }}>
                  {displayedGaps.length} Gaps Found
                </span>
              )}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Close these gaps to reach top percentiles for {targetRole} postings.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {displayedGaps.map((gap, i) => (
                <div key={i} style={{ padding: '0.75rem', background: 'var(--card-bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--input-border)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertTriangle size={15} color="var(--warning)" style={{ flexShrink: 0 }} />
                  <span>{gap}</span>
                </div>
              ))}
            </div>
          </div>
          <Link to="/roadmap" className="btn-primary" style={{ marginTop: '2rem', textAlign: 'center', display: 'block', textDecoration: 'none' }}>
            Generate Learning Roadmap
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
