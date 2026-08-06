import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

export default function DashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Basic logout logic for now
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <a href="/dashboard" className="sidebar-logo">CareerPilot AI</a>
        </div>
        
        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <span className="nav-icon">📊</span>
            Dashboard
          </NavLink>
          <NavLink to="/ats" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <span className="nav-icon">📄</span>
            ATS Analyzer
          </NavLink>
          <NavLink to="/job-match" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <span className="nav-icon">🎯</span>
            Job Match
          </NavLink>
          <NavLink to="/interview" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <span className="nav-icon">🗣️</span>
            Mock Interviews
          </NavLink>
          <NavLink to="/cover-letter" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <span className="nav-icon">📝</span>
            Cover Letters
          </NavLink>
          <NavLink to="/roadmap" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <span className="nav-icon">🗺️</span>
            Roadmap
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile-mini">
            <div className="user-avatar">CP</div>
            <div className="user-info">
              <span className="user-name">Candidate</span>
              <span className="user-role">Free Plan</span>
            </div>
          </div>
          <button onClick={handleLogout} className="btn-logout">
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
