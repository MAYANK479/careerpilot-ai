import { useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [targetRole, setTargetRole] = useState("Full Stack Engineer");

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
      <div className="section-header">
        <h1 className="section-title">Candidate Readiness Command Center</h1>
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
      </div>

      {/* Top Grid: Score & Summary Metrics */}
      <div className="dashboard-grid">
        {/* Readiness Score Card */}
        <div className="stat-card">
          <span className="overlay-subtitle" style={{ color: 'var(--success)', fontWeight: 'bold' }}>Top 2% Candidate</span>
          <h3 className="stat-value" style={{ color: 'var(--primary-light)' }}>91<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/100</span></h3>
          <span className="stat-label">Readiness Score</span>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>Ready for senior technical interviews.</p>
        </div>

        {/* Acquired Skills Count */}
        <div className="stat-card">
          <span className="overlay-subtitle" style={{ color: 'var(--text-muted)', fontWeight: 'bold' }}>Skills Acquired</span>
          <h3 className="stat-value">14 <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ 17</span></h3>
          <span className="stat-label" style={{ color: 'var(--success)' }}>82% role coverage</span>
        </div>

        {/* Skill Gaps Count */}
        <div className="stat-card">
          <span className="overlay-subtitle" style={{ color: 'var(--text-muted)', fontWeight: 'bold' }}>Skill Gaps to Close</span>
          <h3 className="stat-value">3 <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Topics</span></h3>
          <span className="stat-label" style={{ color: 'var(--danger)' }}>AWS, Redis & GraphQL</span>
        </div>
      </div>

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

      {/* Bottom Section: Quick Launch Action Suite */}
      <div style={{ marginTop: '2rem' }}>
        <h2 className="section-title">Career Pilot Tool Suite</h2>
        <div className="dashboard-grid">
          {[
            { title: "Learning Plan", desc: "Week-by-week track for skill gaps", icon: "🗺️", link: "/roadmap" },
            { title: "Build Portfolio", desc: "Project ideas & architecture", icon: "📁", link: "/portfolio" },
            { title: "Resume Architect", desc: "ATS match score & AI rewriter", icon: "📄", link: "/upload" },
            { title: "Interview Prep", desc: "Voice mock interviews", icon: "🗣️", link: "/interview" },
          ].map((tool) => (
            <Link key={tool.title} to={tool.link} className="stat-card" style={{ textDecoration: 'none', transition: 'var(--transition)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{tool.icon}</div>
              <h3 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>{tool.title}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{tool.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
