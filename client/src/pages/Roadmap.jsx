import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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
    <div className="min-h-screen flex flex-col bg-[#030712] text-white font-sans selection:bg-blue-500 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-6 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block mb-4">
            Skill Roadmap Generator
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Personalized Career Learning Plans
          </h1>
          <p className="text-[#94A3B8] mt-4 text-base sm:text-lg">
            Select your target career path to generate a week-by-week structured learning roadmap.
          </p>
        </div>

        {/* Input Card */}
        <div className="saas-card p-8 mb-12 bg-[#111827] border border-slate-800 rounded-[24px]">
          <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="w-full sm:w-1/2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Target Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-800 bg-[#1E293B]/60 text-sm font-semibold text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Frontend Engineer" className="bg-[#111827]">Frontend Engineer</option>
                <option value="Backend / Node.js Developer" className="bg-[#111827]">Backend / Node.js Developer</option>
                <option value="AI / Machine Learning Engineer" className="bg-[#111827]">AI / Machine Learning Engineer</option>
                <option value="Custom Role" className="bg-[#111827]">Custom Role...</option>
              </select>
            </div>

            {selectedRole === "Custom Role" && (
              <div className="w-full sm:w-1/2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Enter Role Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cloud DevOps Engineer"
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-800 bg-[#1E293B]/60 text-sm font-semibold text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            )}

            <div className="w-full sm:w-auto sm:self-end">
              <button
                type="submit"
                disabled={generating}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-600/30 transition-all"
              >
                <Sparkles size={18} />
                {generating ? "Generating..." : "Generate Roadmap"}
              </button>
            </div>
          </form>
        </div>

        {/* Roadmap Display */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Map className="text-blue-400" size={24} />
              8-Week Learning Track: <span className="text-blue-400">{selectedRole === "Custom Role" ? customRole || "Custom Track" : selectedRole}</span>
            </h2>
            <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Structured Timeline
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activePlan.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="saas-card p-8 bg-[#111827] border border-slate-800 rounded-[24px]"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-extrabold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 flex items-center gap-1.5">
                    <Clock size={14} />
                    {step.week}
                  </span>
                  <span className="text-xs font-bold text-[#94A3B8]">Module {idx + 1} of 4</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-4">{step.title}</h3>

                <ul className="space-y-2.5">
                  {step.topics.map((topic, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-slate-200">
                      <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Roadmap;
