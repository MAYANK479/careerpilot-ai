import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, FileText, Send, Mail, UserCheck, Mic, ArrowRight } from "lucide-react";

function Dashboard() {
  const [targetRole, setTargetRole] = useState("Full Stack Engineer");

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || {};
    } catch {
      return {};
    }
  })();

  const userName = user.name || "Candidate";

  const skillMastery = [
    { name: "React 19 / Modern Frontend", progress: 92, status: "Mastered" },
    { name: "Node.js Microservices", progress: 88, status: "Proficient" },
    { name: "System Design", progress: 65, status: "In Progress" },
    { name: "PostgreSQL Optimization", progress: 80, status: "Proficient" },
    { name: "CI/CD & Docker", progress: 55, status: "Skill Gap" },
  ];

  const criticalGaps = [
    "AWS Infrastructure (EC2, S3, IAM, CloudFront)",
    "Distributed Caching with Redis",
    "GraphQL API Integration & Caching",
  ];

  return (
    <div>
      {/* Header Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="section-title" style={{ fontSize: '1.75rem', marginBottom: '0.35rem' }}>
            Welcome back, {userName}!
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Here's what's happening with your job search today.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
          <Link to="/upload" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', padding: '0.6rem 1.25rem' }}>
            <FileText size={16} />
            Upload Resume
          </Link>
        </div>
      </div>

      {/* Quick Access Workflows */}
      <h2 className="section-title" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Your Workflows</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        
        {/* ATS Resume Analysis */}
        <div className="stat-card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
          <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>📄</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Resume Analysis</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', flex: 1 }}>
            Get an ATS score and identify critical skill gaps.
          </p>
          <Link to="/upload" style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            Analyze Resume <ArrowRight size={14} />
          </Link>
        </div>

        {/* Job Match */}
        <div className="stat-card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
          <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>🎯</div>
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
          <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>✉️</div>
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
          <h3 className="section-title" style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Skills Mastery & Role Alignment</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {skillMastery.map((item) => (
              <div key={item.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                  <span style={{ fontWeight: '500', color: 'var(--text-main)' }}>{item.name}</span>
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
            <h3 className="section-title" style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--danger)' }}>Critical Skill Gaps</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Close these gaps to reach top percentiles for {targetRole} postings.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {criticalGaps.map((gap, i) => (
                <div key={i} style={{ padding: '0.75rem', background: 'var(--card-bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--input-border)', fontSize: '0.85rem' }}>
                  ⚠️ {gap}
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
