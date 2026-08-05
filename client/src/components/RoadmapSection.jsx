import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Map, CheckCircle2, ArrowRight, Clock, Award } from "lucide-react";

const milestones = [
  { step: "01", title: "Frontend Architecture", status: "Completed", progress: 100, topics: "React 19, TypeScript, Tailwind, Next.js App Router" },
  { step: "02", title: "Backend & Microservices", status: "Completed", progress: 100, topics: "Node.js, Express REST, PostgreSQL, Prisma ORM" },
  { step: "03", title: "Data Structures & Algorithms", status: "In Progress", progress: 75, topics: "Arrays, Trees, Graphs, Dynamic Programming" },
  { step: "04", title: "System Design & Cloud", status: "Active Milestone", progress: 50, topics: "Caching with Redis, Docker, Load Balancing" },
  { step: "05", title: "Portfolio Capstone Project", status: "Upcoming", progress: 20, topics: "AI Document Analyzer & GitHub Blueprint" },
  { step: "06", title: "Voice Mock Interviews", status: "Upcoming", progress: 0, topics: "Behavioral & Technical System Design Practice" },
];

function RoadmapSection() {
  return (
    <section className="py-28 lg:py-32 relative bg-[#030712] border-t border-slate-800/80">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block mb-4">
            Structured Skill Milestones
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-white leading-tight tracking-tight">
            Personalized Career Learning Roadmap
          </h2>
          <p className="text-lg lg:text-[18px] text-[#94A3B8] mt-4 leading-relaxed font-normal">
            Track your progress across six core engineering milestones to guarantee candidate readiness for top tech roles.
          </p>
        </motion.div>

        {/* Milestone Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {milestones.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="saas-card-interactive p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black text-blue-400 font-mono">MILESTONE {item.step}</span>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${
                      item.progress === 100
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : item.progress > 0
                        ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        : "bg-slate-800 text-slate-400 border-slate-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed mb-6 font-normal">
                  {item.topics}
                </p>
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                  <span>Milestone Completion</span>
                  <span>{item.progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#1E293B] overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/roadmap"
            className="inline-flex items-center gap-2 text-base font-bold text-blue-400 hover:text-blue-300 transition-colors"
          >
            Generate Custom Learning Roadmap <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default RoadmapSection;
