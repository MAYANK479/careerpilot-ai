import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

const footerLinks = [
  {
    title: "Platform Tools",
    links: [
      { label: "Resume Analyzer", to: "/upload" },
      { label: "AI Voice Mock Interview", to: "/interview" },
      { label: "Job Description Matcher", to: "/job-match" },
      { label: "Career Skill Roadmaps", to: "/roadmap" },
      { label: "Portfolio Project Builder", to: "/portfolio" },
      { label: "AI Cover Letter Generator", to: "/cover-letter" },
    ],
  },
  {
    title: "Resources & SaaS",
    links: [
      { label: "Candidate Dashboard", to: "/dashboard" },
      { label: "ATS Optimization Guide", to: "/upload" },
      { label: "Interview Questions Library", to: "/interview" },
      { label: "System Architecture Blueprints", to: "/portfolio" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About CareerPilot AI", to: "/" },
      { label: "Privacy Policy", to: "/" },
      { label: "Terms of Service", to: "/" },
      { label: "Status & Uptime", to: "/" },
    ],
  },
];

function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#030712]">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-16">
          {/* Brand Column (2 cols) */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <Compass size={22} className="stroke-[2.2]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                CareerPilot <span className="text-blue-500">AI</span>
              </span>
            </Link>
            <p className="text-base text-[#94A3B8] max-w-sm leading-relaxed font-normal">
              The next-generation AI career development platform for engineers and job seekers. Optimize resumes, practice voice interviews, and land top tech roles.
            </p>
          </div>

          {/* Link Columns (3 cols) */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.to}
                      className="text-sm font-semibold text-[#94A3B8] hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#94A3B8] font-medium">
            © {new Date().getFullYear()} CareerPilot AI Inc. All rights reserved.
          </p>
          <p className="text-xs text-[#94A3B8] font-medium">
            Engineered with React + Tailwind + Node.js
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;