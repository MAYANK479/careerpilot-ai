import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, FileText, Briefcase, Mic, ArrowRight, ShieldCheck, Zap } from "lucide-react";

function Home() {
  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Navbar */}
      <nav style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--input-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '900', fontSize: '1.25rem', color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
          <Sparkles color="var(--primary)" size={24} />
          CareerPilot AI
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/login" style={{ padding: '0.5rem 1rem', color: 'var(--text-main)', textDecoration: 'none', fontWeight: '600', display: 'flex', alignItems: 'center' }}>
            Log In
          </Link>
          <Link to="/register" className="btn-primary" style={{ padding: '0.5rem 1.25rem', textDecoration: 'none', fontSize: '0.9rem', width: 'auto' }}>
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        
        {/* Background Glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80vw', height: '80vw', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(15, 23, 42, 0) 70%)', zIndex: 0, pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
          <span className="brand-badge" style={{ margin: '0 auto 1.5rem auto' }}>
            <Sparkles size={14} style={{ display: 'inline-block', marginRight: '0.5rem' }} />
            The Ultimate Job Search Co-Pilot
          </span>
          <h1 style={{ fontSize: '4rem', fontWeight: '900', color: 'var(--text-main)', lineHeight: '1.1', letterSpacing: '-1px', marginBottom: '1.5rem' }}>
            Land Your Dream Role with <span style={{ color: 'var(--primary-light)' }}>AI Precision</span>.
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
            Optimize your resume for ATS, generate tailored cover letters, and practice with real-time AI voice mock interviews—all in one place.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'auto', padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Start for Free <ArrowRight size={20} />
            </Link>
            <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', borderRadius: 'var(--radius-pill)', border: '1px solid var(--input-border)', background: 'var(--card-bg-light)', color: 'var(--text-main)', fontWeight: 'bold', textDecoration: 'none', transition: 'var(--transition)' }}>
              See Demo
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', width: '100%', maxWidth: '1200px', marginTop: '6rem', position: 'relative', zIndex: 1 }}>
          <div className="stat-card" style={{ textAlign: 'left' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <FileText size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '0.75rem' }}>ATS Resume Scorer</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Upload your PDF to instantly see your ATS match score and discover missing keywords before you apply.</p>
          </div>

          <div className="stat-card" style={{ textAlign: 'left' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(74, 222, 128, 0.1)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Briefcase size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '0.75rem' }}>Job Description Match</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Paste any job description to compare your resume side-by-side and generate a perfectly tailored cover letter.</p>
          </div>

          <div className="stat-card" style={{ textAlign: 'left' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Mic size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '0.75rem' }}>AI Voice Interviews</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Practice technical and behavioral questions with our real-time speech recognition and scoring engine.</p>
          </div>
        </div>

        {/* Social Proof */}
        <div style={{ marginTop: '6rem', position: 'relative', zIndex: 1, display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 'bold' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={20} color="var(--primary)" /> Enterprise Grade AI Models
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Zap size={20} color="var(--success)" /> Instant Feedback
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={20} color="var(--secondary)" /> Trusted by 10,000+ Candidates
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer style={{ padding: '2rem', borderTop: '1px solid var(--input-border)', textAlign: 'center', color: 'var(--text-light)', fontSize: '0.9rem' }}>
        <p>© {new Date().getFullYear()} CareerPilot AI. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;