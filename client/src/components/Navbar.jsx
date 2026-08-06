import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Menu, X, Sparkles, ArrowRight } from "lucide-react";

function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Features", href: "#features" },
    { label: "Dashboard", to: "/dashboard" },
    { label: "Interview", to: "/interview" },
    { label: "About", to: "/about" },
    { label: "Pricing", href: "#pricing" },
    { label: "Login", to: "/upload" },
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

        {/* Desktop Nav Items - refined spacing and larger touch targets */}
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
                className={`nav-link ${location.pathname===item.to ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="nav-action">
          <Link
            to="/upload"
            className="nav-action-link"
          >
            <Sparkles size={16} />
            Get Started
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
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
              <div className="pt-4">
                <Link
                  to="/upload"
                  onClick={() => setMobileOpen(false)}
                  className="mobile-action"
                >
                  <Sparkles size={16} />
                  Get Started Free
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;