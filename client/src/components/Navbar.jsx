import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Menu, X, Sparkles, ArrowRight, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { resolveCandidateName } from "../utils/userUtils";

function Navbar() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const displayName = resolveCandidateName(user);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Features", href: "#features" },
    { label: "Dashboard", to: "/dashboard" },
    { label: "Interview", to: "/interview" },
    { label: "ATS Scorer", to: "/ats" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand">
          <div className="brand-icon">
            <Compass size={22} className="stroke-[2.2]" />
          </div>
          <div className="navbar-brand-text">
            <span className="text-xl font-bold tracking-tight text-white leading-none">
              CareerPilot <span className="text-blue-500">AI</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="navbar-list">
          {navItems.map((item) => {
            if (item.href) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="nav-link"
                >
                  {item.label}
                </a>
              );
            }
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`nav-link ${location.pathname === item.to ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Auth Action Buttons */}
        <div className="nav-action" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link
                to="/dashboard"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                  color: 'var(--text-main)',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  padding: '0.4rem 0.8rem',
                  borderRadius: 'var(--radius-pill)',
                  background: 'var(--card-bg-light)',
                  border: '1px solid var(--input-border)',
                }}
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    style={{ width: '24px', height: '24px', borderRadius: '50%' }}
                  />
                ) : (
                  <User size={16} color="var(--primary-light)" />
                )}
                <span>{displayName.split(' ')[0] || 'Dashboard'}</span>
              </Link>
              <button
                onClick={logout}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-light)',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  padding: '0.4rem 0.6rem',
                }}
                title="Sign Out"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="nav-link"
                style={{ textDecoration: 'none', fontWeight: '600' }}
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="nav-action-link"
              >
                <Sparkles size={16} />
                Get Started
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="mobile-toggle"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-menu"
          >
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="mobile-menu-link"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className="block text-lg font-semibold text-slate-300 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 flex flex-col gap-2">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="mobile-action"
                    >
                      Go to Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                      style={{ color: 'var(--danger)', textAlign: 'left', padding: '0.5rem 0', background: 'none', border: 'none' }}
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="block text-lg font-semibold text-slate-300 hover:text-white"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileOpen(false)}
                      className="mobile-action"
                    >
                      <Sparkles size={16} />
                      Get Started Free
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;