import { useState } from "react";
import { motion } from "framer-motion";
import { Map, Sparkles, CheckCircle, Clock } from "lucide-react";

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
  const [selectedRole, setSelectedRole] = useState("Frontend Engineer");
  const [customRole, setCustomRole] = useState("");
  const [generating, setGenerating] = useState(false);
  const [activePlan, setActivePlan] = useState(sampleRoadmaps["Frontend Engineer"]);

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
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Select your target career path to generate a week-by-week structured learning roadmap.
      </p>

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
