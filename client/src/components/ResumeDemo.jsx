import React from "react";
import { useCountUp } from "../hooks/useCountUp";

function ProgressBar({ label, value, delay = 0 }) {
  const { count, ref } = useCountUp(value, 2000, 0);

  return (
    <div style={{ marginBottom: '1rem' }} ref={ref}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
        <span>{label}</span>
        <span>{count}%</span>
      </div>
      <div style={{ width: '100%', height: '8px', borderRadius: '4px', background: 'var(--input-bg)', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${value}%`,
            background: 'var(--primary)',
            transition: 'width 1.5s ease-out',
            transitionDelay: `${delay}s`
          }}
        />
      </div>
    </div>
  );
}

function ResumeDemo() {
  const { count: atsScore, ref: atsRef } = useCountUp(92, 2000, 0);

  return (
    <div>
      <div className="section-header">
        <h1 className="section-title">See How AI Scans & Scores Your Resume Live</h1>
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Real-time keyword matching, formatting evaluation, and automated bullet point optimization.
      </p>

      <div className="dashboard-grid two-columns" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
        {/* Left Column: Fake Resume */}
        <div className="stat-card" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ borderBottom: '1px solid var(--input-border)', paddingBottom: '1rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                📄
              </div>
              <div>
                <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-main)' }}>Alex_Rivera_Resume_2026.pdf</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Senior Full Stack Developer Candidate</p>
              </div>
            </div>
            <span className="brand-badge" style={{ background: 'rgba(74, 222, 128, 0.1)', color: 'var(--success)', border: '1px solid rgba(74, 222, 128, 0.2)', marginBottom: 0 }}>
              ● Scanning Active
            </span>
          </div>

          <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--text-light)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', background: 'var(--input-bg)', border: '1px solid var(--input-border)' }}>
              <p style={{ color: 'var(--primary-light)', fontWeight: 'bold', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Summary</p>
              <p>Passionate Senior Software Engineer with 6+ years building distributed React and Node.js microservices serving 2M+ monthly active users.</p>
            </div>

            <div style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', background: 'var(--input-bg)', border: '1px solid var(--input-border)' }}>
              <p style={{ color: 'var(--primary-light)', fontWeight: 'bold', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Experience</p>
              <ul style={{ paddingLeft: '1rem', margin: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>› Engineered real-time WebSocket dashboard handling 10,000 req/sec with &lt;40ms latency.</li>
                <li>› Architected PostgreSQL database migrations reducing query execution times by 45%.</li>
              </ul>
            </div>

            <div style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', background: 'var(--input-bg)', border: '1px solid var(--input-border)' }}>
              <p style={{ color: 'var(--primary-light)', fontWeight: 'bold', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Core Skills</p>
              <p style={{ fontFamily: 'var(--font-family)', fontWeight: '600', color: 'var(--text-main)' }}>React 19, TypeScript, Node.js, Express, PostgreSQL, GraphQL</p>
            </div>
          </div>
        </div>

        {/* Right Column: Metrics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* ATS Score Card */}
          <div className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Computed ATS Match</span>
              <span className="brand-badge" style={{ background: 'rgba(74, 222, 128, 0.1)', color: 'var(--success)', border: '1px solid rgba(74, 222, 128, 0.2)', marginBottom: 0 }}>Top 2%</span>
            </div>

            <div ref={atsRef} style={{ fontSize: '4rem', fontWeight: '900', color: 'var(--text-main)', lineHeight: '1', marginBottom: '2rem' }}>
              {atsScore}
              <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>/100</span>
            </div>

            <div>
              <ProgressBar label="Keyword Match" value={92} delay={0.2} />
              <ProgressBar label="Format Score" value={88} delay={0.4} />
              <ProgressBar label="Readability" value={95} delay={0.6} />
              <ProgressBar label="Grammar & Spelling" value={97} delay={0.8} />
            </div>
          </div>

          <div className="dashboard-grid two-columns">
            <div className="stat-card">
              <h3 style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--success)' }}>✓</span> Strengths
              </h3>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>Quantified impact</li>
                <li style={{ marginBottom: '0.5rem' }}>Clean PDF text</li>
                <li>Action verbs</li>
              </ul>
            </div>

            <div className="stat-card">
              <h3 style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--danger)' }}>⚠️</span> Missing Skills
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {["Docker", "AWS", "Redis"].map((skill) => (
                  <span key={skill} style={{ fontSize: '0.75rem', fontWeight: 'bold', padding: '0.25rem 0.5rem', borderRadius: '4px', background: 'rgba(248, 113, 113, 0.1)', color: 'var(--danger)', border: '1px solid rgba(248, 113, 113, 0.2)' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeDemo;
