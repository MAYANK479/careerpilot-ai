import React from "react";
import { Link } from "react-router-dom";
import { Compass, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const footerLinks = [
  {
    title: "Platform",
    links: [
      { label: "AI Resume Analyzer", to: "/upload" },
      { label: "Mock Interviews", to: "/interview" },
      { label: "Job Matcher", to: "/job-match" },
      { label: "Career Roadmaps", to: "/roadmap" },
      { label: "Cover Letters", to: "/cover-letter" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Candidate Dashboard", to: "/dashboard" },
      { label: "ATS Guidelines", to: "/upload" },
      { label: "Interview Questions", to: "/interview" },
      { label: "System Design Prep", to: "/portfolio" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Privacy Policy", to: "/" },
      { label: "Terms of Service", to: "/" },
      { label: "Contact Support", to: "/" },
    ],
  },
];

function Footer() {
  return (
    <>
      {/* Final CTA Section */}
      <section className="py-32 bg-[#050816] relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
        <div className="max-w-[1000px] mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl sm:text-6xl lg:text-[72px] font-extrabold text-white leading-[1.05] tracking-tight mb-8">
              Stop getting rejected.<br />
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Start getting offers.</span>
            </h2>
            <p className="text-xl text-slate-400 font-medium mb-12 max-w-2xl mx-auto">
              Join 25,000+ engineers who used AI to bypass the ATS and ace their technical interviews.
            </p>
            <div className="cta-flex">
              <Link
                to="/upload"
                className="group flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg shadow-xl shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Get Started for Free
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#pricing"
                className="footer-link"
              >
                View Pricing
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#050816] pt-20 pb-10 relative z-10">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="md:col-span-2 space-y-6">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                  <Compass size={22} className="stroke-[2.2]" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">
                  CareerPilot <span className="text-blue-500">AI</span>
                </span>
              </Link>
              <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
                The next-generation AI career platform. Built to help engineers land top-tier jobs with data-driven insights.
              </p>
            </div>

            {/* Links */}
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-6">
                  {group.title}
                </h4>
                <ul className="space-y-4">
                  {group.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        to={link.to}
                        className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 font-medium">
              © {new Date().getFullYear()} CareerPilot AI Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-slate-500 font-medium">
              <Link to="/" className="hover:text-white transition-colors">Twitter</Link>
              <Link to="/" className="hover:text-white transition-colors">GitHub</Link>
              <Link to="/" className="hover:text-white transition-colors">LinkedIn</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;