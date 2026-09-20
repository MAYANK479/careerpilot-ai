import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Map, Sparkles, CheckCircle, Clock, AlertTriangle, ArrowRight } from "lucide-react";
import { useResume } from "../context/ResumeContext";

const sampleRoadmaps = {
  "Frontend Engineer": [
    { week: "Week 1-2", title: "HTML5, Semantic UI & Modern CSS", topics: ["Flexbox & Grid Layouts", "CSS Custom Properties", "Responsive Design", "Accessibility (a11y)"] },
    { week: "Week 3-4", title: "JavaScript Deep Dive (ES6+)", topics: ["Async/Await & Promises", "DOM Manipulation", "Closures & Scope", "Fetch API & REST"] },
    { week: "Week 5-6", title: "React Fundamentals & State Management", topics: ["JSX & Component Design", "Hooks (useState, useEffect)", "Context API", "Tailwind CSS Architecture"] },
    { week: "Week 7-8", title: "Production App & Performance", topics: ["Next.js App Router", "Vite Build Optimization", "State Management (Zustand)", "Deploy to Vercel"] }
  ],
  "Backend / Node.js Developer": [
    { week: "Week 1-2", title: "Node.js Core & Asynchronous I/O", topics: ["Event Loop & Streams", "Module System (ESM vs CJS)", "Buffer & File System", "npm & Package Management"] },
    { week: "Week 3-4", title: "RESTful APIs with Express / Fastify", topics: ["Route Handlers & Middleware", "JWT Authentication", "Error Handling & Logging", "Rate Limiting & CORS"] },
    { week: "Week 5-6", title: "Databases & ORM", topics: ["PostgreSQL & Relational Data", "MongoDB & Mongoose", "Prisma / TypeORM", "Database Indexing & Queries"] },
    { week: "Week 7-8", title: "Cloud Deployment & Microservices", topics: ["Docker Containerization", "CI/CD Pipelines", "Redis Caching", "AWS EC2 Deployment"] }
  ],
  "AI / Machine Learning Engineer": [
    { week: "Week 1-2", title: "Python for Data Science", topics: ["NumPy Matrix Operations", "Pandas Dataframes", "Data Cleaning & Prep", "Matplotlib / Seaborn Visuals"] },
    { week: "Week 3-4", title: "Classical Machine Learning", topics: ["Scikit-Learn Workflows", "Linear & Logistic Regression", "Decision Trees & Ensembles", "Model Evaluation Metrics"] },
    { week: "Week 5-6", title: "Deep Learning & Neural Networks", topics: ["PyTorch / TensorFlow", "CNNs & Image Processing", "Transformers & Attention", "Model Training Loops"] },
    { week: "Week 7-8", title: "LLMs & Generative AI Integration", topics: ["LangChain & LlamaIndex", "Vector DBs (Pinecone/Chroma)", "Prompt Engineering & RAG", "Deploying Models with FastAPI"] }
  ]
};

function Roadmap() {
  const { resumeData, hasResume } = useResume();
  const [selectedRole, setSelectedRole] = useState("Frontend Engineer");
  const [customRole, setCustomRole] = useState("");
  const [generating, setGenerating] = useState(false);
  const [activePlan, setActivePlan] = useState(sampleRoadmaps["Frontend Engineer"]);

  const handleGapSelect = (gapName) => {
    setSelectedRole("Custom Role");
    setCustomRole(`${gapName} Mastery Sprint`);
    setGenerating(true);
    setTimeout(() => {
      setActivePlan([
        { week: "Week 1-2", title: `${gapName} Fundamentals & Core Architecture`, topics: ["Core Concepts & Runtime Execution", "Syntax Patterns & Conventions", "Memory & Performance Profile", "Standard Tooling Setup"] },
        { week: "Week 3-4", title: `Real-World Integration & APIs`, topics: ["Middleware & Handlers", "Authentication & Security", "Error Resilience & Retries", "Local Testing Benchmarks"] },
        { week: "Week 5-6", title: `Scaling & Distributed Systems`, topics: ["Production Optimization", "High Availability & Caching", "Data Integrity & Migrations", "Observability & Tracing"] },
        { week: "Week 7-8", title: `Resume Project & Interview Readiness`, topics: ["Production Deployment", "Automated CI/CD Workflows", "Live Demo Hosting", "System Design Interview Walkthrough"] }
      ]);
      setGenerating(false);
    }, 400);
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    setGenerating(true);
    setTimeout(() => {
      if (sampleRoadmaps[selectedRole]) {
        setActivePlan(sampleRoadmaps[selectedRole]);
      } else {
        setActivePlan([
          { week: "Week 1-2", title: `Foundations of ${customRole || selectedRole}`, topics: ["Core Syntax & Principles", "Tooling & Environment", "Basic Methods", "Standard Libraries"] },
          { week: "Week 3-4", title: `Framework & API Integration`, topics: ["Key Frameworks", "API Integrations", "Database Architecture", "Authentication"] },
          { week: "Week 5-6", title: `Advanced System Architecture`, topics: ["Design Patterns", "State Management", "Performance Tuning", "Automated Testing"] },
          { week: "Week 7-8", title: `Capstone & Deployment`, topics: ["Cloud Hosting", "CI/CD Integration", "Portfolio Integration", "Interview Prep"] }
        ]);
      }
      setGenerating(false);
    }, 600);
  };

  return (
    <div>
      <div className="section-header">
        <h1 className="section-title">Personalized Career Learning Plans</h1>
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Select your target career path to generate a week-by-week structured learning roadmap.
      </p>

      {/* Active Resume Context Bar */}
      {hasResume && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, rgba(30, 64, 175, 0.05) 100%)',
          border: '1px solid rgba(59, 130, 246, 0.25)',
          borderRadius: 'var(--radius-card)',
          padding: '1rem 1.25rem',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.4rem' }}>📄</span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-main)' }}>
                  Active Profile: {resumeData?.fileName}
                </span>
                <span className="brand-badge" style={{ marginBottom: 0, padding: '0.15rem 0.45rem', fontSize: '0.7rem', background: 'rgba(34, 197, 94, 0.15)', color: '#4ADE80', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                  ATS {resumeData?.analysis?.atsScore || 90}%
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>
                Roadmaps can be customized to close the exact gaps discovered in your resume.
              </p>
            </div>
          </div>
          <Link
            to="/ats"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--primary-light)',
              fontWeight: '600',
              fontSize: '0.85rem',
              textDecoration: 'none'
            }}
          >
            Review ATS Scorecard <ArrowRight size={14} />
          </Link>
        </div>
      )}

      {/* Recommended Focus Areas if gaps exist */}
      {hasResume && resumeData?.analysis?.missingSkills?.length > 0 && (
        <div className="stat-card" style={{ marginBottom: '2rem', padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <AlertTriangle size={16} color="var(--warning)" />
            <h3 style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--text-main)', margin: 0 }}>
              Identified Skill Gaps to Bridge (1-Click Roadmaps)
            </h3>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Click any skill to instantly generate a targeted 8-week mastery sprint:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {resumeData.analysis.missingSkills.map((gap) => (
              <button
                key={gap}
                type="button"
                onClick={() => handleGapSelect(gap)}
                style={{
                  background: customRole.includes(gap) ? 'var(--primary)' : 'rgba(59, 130, 246, 0.1)',
                  color: customRole.includes(gap) ? '#FFFFFF' : 'var(--primary-light)',
                  border: '1px solid rgba(59, 130, 246, 0.25)',
                  padding: '0.4rem 0.85rem',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  transition: 'all 0.2s'
                }}
              >
                <Sparkles size={12} />
                Generate {gap} Track
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Card */}
      <div className="stat-card" style={{ marginBottom: '3rem' }}>
        <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="dashboard-grid two-columns" style={{ gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-light)', textTransform: 'uppercase' }}>
                Target Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="form-input"
              >
                <option value="Frontend Engineer">Frontend Engineer</option>
                <option value="Backend / Node.js Developer">Backend / Node.js Developer</option>
                <option value="AI / Machine Learning Engineer">AI / Machine Learning Engineer</option>
                <option value="Custom Role">Custom Role...</option>
              </select>
            </div>

            {selectedRole === "Custom Role" && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-light)', textTransform: 'uppercase' }}>
                  Enter Role Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cloud DevOps Engineer"
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  className="form-input"
                />
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <button
              type="submit"
              disabled={generating}
              className="btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'auto' }}
            >
              <Sparkles size={18} />
              {generating ? "Generating..." : "Generate Roadmap"}
            </button>
          </div>
        </form>
      </div>

      {/* Roadmap Display */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Map color="var(--primary)" size={24} />
            8-Week Learning Track: <span style={{ color: 'var(--primary)', marginLeft: '0.5rem' }}>{selectedRole === "Custom Role" ? customRole || "Custom Track" : selectedRole}</span>
          </h2>
          <span className="brand-badge" style={{ marginBottom: 0 }}>
            Structured Timeline
          </span>
        </div>

        <div className="dashboard-grid two-columns">
          {activePlan.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="stat-card"
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span className="brand-badge" style={{ marginBottom: 0, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Clock size={14} />
                  {step.week}
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>Module {idx + 1} of 4</span>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '1rem' }}>{step.title}</h3>

              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0, margin: 0, listStyle: 'none' }}>
                {step.topics.map((topic, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-light)' }}>
                    <CheckCircle size={16} color="var(--success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    {topic}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Roadmap;
