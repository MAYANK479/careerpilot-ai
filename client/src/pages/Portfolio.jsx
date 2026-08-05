import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const projectBlueprints = [
  {
    title: "AI-Powered PDF Resume Screener",
    category: "Full Stack / AI",
    complexity: "Advanced",
    techStack: ["React 19", "Node.js", "Express", "Google Gemini API", "Tailwind CSS"],
    description: "An end-to-end web application that parses PDF resumes, computes ATS keyword matches, and provides structured feedback.",
    features: [
      "PDF parsing using pdf-parse & multi-part file uploads",
      "AI prompt engineering for structured JSON output",
      "Interactive SVG score gauges and key recommendations",
      "Real-time voice & speech mock interview simulator"
    ],
    resumeBullets: [
      "Engineered an AI PDF Resume Analyzer using React 19 and Node.js with Gemini API, scoring ATS keyword matches with <200ms latency.",
      "Architected clean REST APIs for file parsing and feedback extraction, serving 1,000+ mock resume evaluations."
    ]
  },
  {
    title: "Real-Time Collaborative Code Editor",
    category: "Frontend / WebSockets",
    complexity: "Intermediate",
    techStack: ["React", "TypeScript", "Socket.io", "Monaco Editor", "Tailwind"],
    description: "Multi-user live collaborative text and code editor with syntax highlighting, cursor sharing, and execution sandboxes.",
    features: [
      "Operational transformation & conflict resolution via Socket.io",
      "Integration with Monaco Editor for VS Code look & feel",
      "Live cursor position indicators & online user avatars",
      "Dockerized code execution container worker"
    ],
    resumeBullets: [
      "Built a real-time collaborative code editor using Socket.io and Monaco Editor, supporting 10+ concurrent editors per workspace.",
      "Optimized WebSocket state sync algorithms reducing lag by 40% over high latency network conditions."
    ]
  },
  {
    title: "Microservices E-Commerce API Gateway",
    category: "Backend / Microservices",
    complexity: "Advanced",
    techStack: ["Node.js", "Express", "PostgreSQL", "Redis", "Docker", "RabbitMQ"],
    description: "Scalable backend architecture featuring rate limiting, distributed caching, order processing, and message queues.",
    features: [
      "JWT authorization with refresh token rotation",
      "Redis caching layer reducing DB reads by 65%",
      "Async queue-based order fulfillment using RabbitMQ",
      "Full API documentation using Swagger / OpenAPI 3.0"
    ],
    resumeBullets: [
      "Designed a microservice backend handling auth, product catalog, and checkout using Node.js, Express, and PostgreSQL.",
      "Implemented Redis caching and RabbitMQ job queues, boosting API throughput to 1,500 req/sec."
    ]
  }
];

function Portfolio() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = filter === "All"
    ? projectBlueprints
    : projectBlueprints.filter(p => p.category.includes(filter));

  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-white font-sans selection:bg-blue-500 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-6 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block mb-4">
            Portfolio Generator
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            High-Impact Project Blueprints
          </h1>
          <p className="text-[#94A3B8] mt-4 text-base sm:text-lg">
            Stand out to recruiters with resume-boosting portfolio projects complete with architecture specs and copyable bullet points.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex justify-center gap-3 mb-10">
          {["All", "Full Stack", "Frontend", "Backend"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                filter === cat
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "bg-[#111827] text-slate-300 hover:text-white border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards */}
        <div className="space-y-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="saas-card p-8 bg-[#111827] border border-slate-800 rounded-[24px]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 mr-3">
                    {project.category}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-800 px-3 py-1 rounded-full">
                    {project.complexity}
                  </span>
                  <h2 className="text-2xl font-bold text-white mt-3">{project.title}</h2>
                </div>
              </div>

              <p className="text-sm text-[#94A3B8] leading-relaxed mb-6 font-normal">
                {project.description}
              </p>

              {/* Tech Stack Chips */}
              <div className="mb-6">
                <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Recommended Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="text-xs font-semibold px-3 py-1 rounded-lg bg-[#1E293B] text-slate-200 border border-slate-700/80">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Core Features */}
              <div className="mb-6">
                <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Key Engineering Features</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                      {feat}
                    </div>
                  ))}
                </div>
              </div>

              {/* Resume Bullet Points */}
              <div className="p-5 rounded-2xl bg-[#1E293B]/60 border border-slate-800">
                <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3">Ready-to-Use Resume Bullets</p>
                <ul className="space-y-2">
                  {project.resumeBullets.map((bullet, i) => (
                    <li key={i} className="text-xs text-slate-200 flex items-start gap-2.5">
                      <span className="text-blue-400 font-bold">•</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Portfolio;
