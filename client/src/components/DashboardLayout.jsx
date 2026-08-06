import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';

export default function DashboardLayout() {
  const navigate = useNavigate();

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

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || {};
    } catch {
      return {};
    }
  })();

  const userName = user.name || 'Candidate';
  const userInitials = userName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'CP';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/dashboard" className="sidebar-logo">CareerPilot AI</a>
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
        
        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <span className="nav-icon">📊</span>
            Dashboard
          </NavLink>
          <NavLink to="/job-match" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <span className="nav-icon">🎯</span>
            Find Jobs & Match
          </NavLink>
          <NavLink to="/ats" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <span className="nav-icon">📄</span>
            ATS Analyzer
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
            Cover Letters
          </NavLink>
          <NavLink to="/roadmap" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <span className="nav-icon">🗺️</span>
            Career Roadmap
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile-mini">
            <div className="user-avatar" style={{ background: 'var(--primary)', color: '#fff', fontWeight: 'bold' }}>{userInitials}</div>
            <div className="user-info">
              <span className="user-name" style={{ fontWeight: '600', color: 'var(--text-main)' }}>{userName}</span>
              <span className="user-role" style={{ fontSize: '0.7rem', color: 'var(--primary-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CANDIDATE</span>
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
