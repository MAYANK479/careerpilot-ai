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
    { label: "Pricing", href: "#pricing" },
    { label: "Login", to: "/upload" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-navbar">
      <div className="max-w-[1400px] mx-auto w-full flex items-center justify-between px-6 py-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
            <Compass size={22} className="stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white leading-none">
              CareerPilot <span className="text-blue-500">AI</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mt-1">
              Next-Gen Career SaaS
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            if (item.href) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-base font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              );
            }
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`text-base font-semibold transition-colors ${
                  location.pathname === item.to
                    ? "text-blue-400"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/upload"
            className="group flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <Sparkles size={16} />
            Get Started
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-slate-300 hover:text-white p-2 rounded-xl bg-slate-900 border border-slate-800"
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
            className="lg:hidden border-t border-slate-800 bg-[#030712] overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block text-lg font-semibold text-slate-300 hover:text-white"
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
                  className="w-full flex items-center justify-center gap-2 text-base font-bold px-6 py-3.5 rounded-full bg-blue-600 text-white"
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