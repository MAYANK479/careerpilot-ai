import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import { resolveCandidateName, getCandidateInitials } from '../utils/userUtils';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { resumeData, hasResume } = useResume();

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const candidateName = resolveCandidateName(user);
  const candidateInitials = getCandidateInitials(candidateName);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/dashboard" className="sidebar-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
            <img src="/favicon.svg" alt="CareerPilot AI" style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
            <span style={{ fontWeight: '700', fontSize: '1.15rem', letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
              CareerPilot <span style={{ color: '#3B82F6' }}>AI</span>
            </span>
          </Link>
          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            style={{
              background: 'var(--card-bg-light)',
              border: '1px solid var(--input-border)',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-main)',
              transition: 'var(--transition)'
            }}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Active Resume Status Badge */}
        {hasResume && (
          <div style={{ padding: '0.75rem 1rem 0.25rem 1rem' }}>
            <Link
              to="/ats"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.6rem 0.75rem',
                borderRadius: '10px',
                background: 'rgba(59, 130, 246, 0.08)',
                border: '1px solid rgba(59, 130, 246, 0.22)',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              title="Click to view full ATS Score & Analysis"
            >
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '7px',
                background: 'rgba(34, 197, 94, 0.15)',
                color: 'var(--success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                flexShrink: 0
              }}>
                📄
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  color: 'var(--text-main)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {resumeData?.fileName || 'Uploaded Resume'}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.7rem',
                  color: 'var(--success)',
                  fontWeight: '600'
                }}>
                  <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--success)' }} />
                  ATS {resumeData?.analysis?.atsScore || 90}% • Active
                </div>
              </div>
            </Link>
          </div>
        )}
        
        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <span className="nav-icon">📊</span>
            Dashboard
          </NavLink>
          <NavLink to="/job-match" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <span className="nav-icon">🎯</span>
            <span style={{ flex: 1 }}>Find Jobs & Match</span>
            {hasResume && (
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--success)' }} title="Resume loaded" />
            )}
          </NavLink>
          <NavLink to="/ats" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <span className="nav-icon">📄</span>
            <span style={{ flex: 1 }}>ATS Analyzer</span>
            {hasResume && (
              <span style={{
                fontSize: '0.68rem',
                fontWeight: '700',
                padding: '0.15rem 0.45rem',
                borderRadius: '12px',
                background: 'rgba(34, 197, 94, 0.15)',
                color: '#4ADE80',
                border: '1px solid rgba(34, 197, 94, 0.3)'
              }}>
                {resumeData?.analysis?.atsScore ? `${resumeData.analysis.atsScore}%` : 'Active'}
              </span>
            )}
          </NavLink>
          <NavLink to="/interview" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <span className="nav-icon">🗣️</span>
            Mock Interviews
          </NavLink>
          <NavLink to="/scheduled-interviews" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <span className="nav-icon">📅</span>
            Scheduled Interviews
          </NavLink>
          <NavLink to="/invitations" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <span className="nav-icon">📩</span>
            Invitations
          </NavLink>
          <NavLink to="/cover-letter" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <span className="nav-icon">📝</span>
            <span style={{ flex: 1 }}>Cover Letters</span>
            {hasResume && (
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--success)' }} title="Resume loaded" />
            )}
          </NavLink>
          <NavLink to="/roadmap" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <span className="nav-icon">🗺️</span>
            Career Roadmap
          </NavLink>
          <NavLink to="/portfolio" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <span className="nav-icon">💼</span>
            Project Blueprints
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile-mini">
            {user?.avatar && !user.avatar.includes('unsplash.com/photo-1534528741775-53994a69daeb') ? (
              <img
                src={user.avatar}
                alt={candidateName}
                referrerPolicy="no-referrer"
                style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)' }}
              />
            ) : (
              <div
                className="user-avatar"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                  color: '#fff',
                  fontWeight: '700',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  boxShadow: '0 2px 8px rgba(37, 99, 235, 0.35)',
                }}
              >
                {candidateInitials}
              </div>
            )}
            <div className="user-info">
              <span className="user-name" style={{ fontWeight: '600', color: 'var(--text-main)' }}>{candidateName}</span>
              <span className="user-role" style={{ fontSize: '0.7rem', color: 'var(--primary-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {user?.provider === 'google' ? 'GOOGLE ACCOUNT' : 'CANDIDATE'}
              </span>
            </div>
          </div>
          <button onClick={handleLogout} className="btn-logout" style={{ marginTop: '0.5rem', width: '100%', justifyContent: 'center' }}>
            <span className="nav-icon">🚪</span>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}
