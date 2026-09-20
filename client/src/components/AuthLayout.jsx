import { Outlet } from 'react-router-dom';
import { Sparkles, CheckCircle2, Shield, TrendingUp } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="auth-layout-container">
      <div className="auth-card-frame">
        {/* Form Panel */}
        <div className="auth-left-panel">
          <Outlet />
        </div>

        {/* Rich Hero Showcase Panel */}
        <div className="auth-right-panel">
          <div className="auth-showcase-content">
            <div className="auth-showcase-badge">
              <Sparkles size={14} className="sparkle-icon" />
              <span>AI-Powered Career Acceleration</span>
            </div>

            <h2 className="auth-showcase-title">
              Turn your resume into interview invitations.
            </h2>
            <p className="auth-showcase-subtitle">
              Instant ATS scores, precision keyword matching, and interactive voice mock interviews built for modern job seekers.
            </p>

            {/* Visual Mini Scorecard */}
            <div className="auth-scorecard-preview">
              <div className="auth-scorecard-header">
                <div className="auth-scorecard-user">
                  <div className="auth-avatar-mini">JD</div>
                  <div>
                    <div className="auth-scorecard-name">Senior Software Engineer</div>
                    <div className="auth-scorecard-meta">Full-Stack Track · Verified</div>
                  </div>
                </div>
                <div className="auth-score-pill">
                  <span className="auth-score-num">94%</span>
                  <span className="auth-score-label">ATS Score</span>
                </div>
              </div>

              <div className="auth-score-bars">
                <div className="auth-bar-row">
                  <span>Keyword Optimization</span>
                  <span>96%</span>
                </div>
                <div className="auth-bar-track">
                  <div className="auth-bar-fill" style={{ width: '96%' }}></div>
                </div>

                <div className="auth-bar-row" style={{ marginTop: '0.6rem' }}>
                  <span>Impact Metrics</span>
                  <span>91%</span>
                </div>
                <div className="auth-bar-track">
                  <div className="auth-bar-fill" style={{ width: '91%', background: 'linear-gradient(90deg, #3B82F6, #60A5FA)' }}></div>
                </div>
              </div>

              <div className="auth-badge-row">
                <div className="auth-mini-chip"><CheckCircle2 size={13} color="var(--success)" /> Live Voice AI</div>
                <div className="auth-mini-chip"><TrendingUp size={13} color="var(--primary)" /> Top 5% ATS</div>
                <div className="auth-mini-chip"><Shield size={13} color="#A855F7" /> Secure Auth</div>
              </div>
            </div>

            <div className="auth-testimonial-quote">
              <p>“CareerPilot boosted my ATS keyword rate from 52% to 94% — landed 3 senior offers in 4 weeks.”</p>
              <span>— Alex M., Staff Frontend Engineer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
