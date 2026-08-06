import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const projectBlueprints = [
  {
    title: "AI-Powered PDF Resume Screener",
    category: "Full Stack / AI",
    complexity: "Advanced",
    techStack: ["React 19", "Node.js", "Express", "Google Gemini API"],
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
    techStack: ["React", "TypeScript", "Socket.io", "Monaco Editor"],
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
    <div>
      <div className="section-header">
        <h1 className="section-title">High-Impact Project Blueprints</h1>
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Stand out to recruiters with resume-boosting portfolio projects complete with architecture specs and copyable bullet points.
      </p>

      {/* Filter Bar */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        {["All", "Full Stack", "Frontend", "Backend"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.85rem',
              fontWeight: 'bold',
              transition: 'var(--transition)',
              cursor: 'pointer',
              border: filter === cat ? 'none' : '1px solid var(--input-border)',
              background: filter === cat ? 'var(--primary)' : 'var(--card-bg)',
              color: filter === cat ? 'var(--primary-text)' : 'var(--text-light)',
              boxShadow: filter === cat ? '0 4px 14px rgba(99, 102, 241, 0.4)' : 'none'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="stat-card"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderBottom: '1px solid var(--input-border)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <span className="brand-badge" style={{ marginBottom: 0 }}>
                  {project.category}
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-pill)', background: 'var(--input-bg)', color: 'var(--text-muted)' }}>
                  {project.complexity}
                </span>
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{project.title}</h2>
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '2rem' }}>
              {project.description}
            </p>

            <div className="dashboard-grid two-columns" style={{ marginBottom: '2rem' }}>
              {/* Tech Stack Chips */}
              <div>
                <p style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '1rem' }}>Recommended Tech Stack</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {project.techStack.map((tech) => (
                    <span key={tech} style={{ fontSize: '0.8rem', fontWeight: '600', padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-sm)', background: 'var(--card-bg-light)', color: 'var(--text-light)', border: '1px solid var(--input-border)' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Core Features */}
              <div>
                <p style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '1rem' }}>Key Engineering Features</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {project.features.map((feat, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                      <CheckCircle2 size={16} color="var(--success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      {feat}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resume Bullet Points */}
            <div style={{ padding: '1.5rem', borderRadius: 'var(--radius-sm)', background: 'var(--card-bg-light)', border: '1px solid var(--input-border)' }}>
              <p style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '1rem' }}>Ready-to-Use Resume Bullets</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: 0, padding: 0, listStyle: 'none' }}>
                {project.resumeBullets.map((bullet, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>•</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Portfolio;
