import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Resume Analyzer", to: "/upload" },
      { label: "Job Match", to: "/job-match" },
      { label: "Cover Letter", to: "/cover-letter" },
      { label: "AI Interview", to: "/interview" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Dashboard", to: "/dashboard" },
      { label: "GitHub Analyzer", to: "/github-analyzer" },
    ],
  },
];

function Footer() {
  return (
    <footer className="border-t border-slate-800/50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Compass size={16} className="text-white" />
              </div>
              <span className="text-base font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                CareerPilot AI
              </span>
            </Link>
            <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
              Your AI-powered career co-pilot. Analyze resumes, practice
              interviews, and land your dream job — all for free.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold text-white mb-4">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-slate-500 hover:text-slate-300 transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} CareerPilot AI. Built with React +
            Node.js + Ollama
          </p>
          <p className="text-xs text-slate-600">
            100% Free · Open Source · Runs Locally
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;