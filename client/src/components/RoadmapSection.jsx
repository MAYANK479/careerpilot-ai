import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Lock, ArrowRight, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useCountUp } from "../hooks/useCountUp";

const roadmapData = [
  {
    week: "Week 1-2",
    title: "Frontend Architecture",
    topics: "React 19, TypeScript, State Management, Performance",
    status: "completed",
    progress: 100,
  },
  {
    week: "Week 3-4",
    title: "Backend & APIs",
    topics: "Node.js, Express, PostgreSQL, Authentication",
    status: "completed",
    progress: 100,
  },
  {
    week: "Week 5-6",
    title: "System Design",
    topics: "Scalability, Caching (Redis), Microservices",
    status: "in-progress",
    progress: 65,
  },
  {
    week: "Week 7-8",
    title: "Interview Prep",
    topics: "Mock Interviews, Behavioral, Resume Polish",
    status: "locked",
    progress: 0,
  }
];

function TimelineCard({ item, index }) {
  const isLeft = index % 2 === 0;
  const isCompleted = item.status === "completed";
  const isInProgress = item.status === "in-progress";
  const isLocked = item.status === "locked";
  
  const { count, ref } = useCountUp(item.progress, 1500, 0);

  return (
    <div className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${isLocked ? 'opacity-50 grayscale' : ''}`}>
      
      {/* Center Line Marker (Desktop) */}
      <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full absolute left-1/2 -translate-x-1/2 shrink-0 z-20">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-[#050816] ${
          isCompleted ? 'bg-emerald-500' : isInProgress ? 'bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 'bg-slate-700'
        }`}>
          {isCompleted && <CheckCircle2 size={20} className="text-[#050816] fill-emerald-500" />}
          {isInProgress && <div className="w-3 h-3 bg-white rounded-full animate-ping" />}
          {isLocked && <Lock size={16} className="text-slate-400" />}
        </div>
      </div>

      {/* Card */}
      <motion.div 
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="w-full md:w-[calc(50%-3rem)] saas-card p-6 bg-[#0E1424] border border-white/5 relative z-10"
        ref={ref}
      >
        {/* Mobile Marker */}
        <div className="md:hidden flex items-center gap-3 mb-4 border-b border-white/5 pb-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isCompleted ? 'bg-emerald-500/20 text-emerald-400' : isInProgress ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-700/50 text-slate-400'
          }`}>
            {isCompleted && <CheckCircle2 size={16} />}
            {isInProgress && <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />}
            {isLocked && <Lock size={16} />}
          </div>
          <span className="text-sm font-bold text-white">{item.week}</span>
        </div>

        <div className="hidden md:flex justify-between items-center mb-4">
          <span className={`text-xs font-bold uppercase tracking-wider ${
            isCompleted ? 'text-emerald-400' : isInProgress ? 'text-blue-400' : 'text-slate-400'
          }`}>
            {item.week}
          </span>
          {isCompleted && (
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
              <Award size={14} /> Certified
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
        <p className="text-sm text-[#94A3B8] mb-6">{item.topics}</p>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-300">
            <span>Milestone Progress</span>
            <span>{isLocked ? 0 : count}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#111B2E] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${item.progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className={`h-full rounded-full ${isCompleted ? 'bg-emerald-500' : 'bg-blue-500'}`}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function RoadmapSection() {
  return (
    <section className="py-40 bg-[#050816] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 inline-block mb-6">
            AI Learning Roadmap
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-[1.1] tracking-tight">
            A Structured Path to <br className="hidden sm:block" /> Your Target Role
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Center Vertical Line (Desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-[#111B2E] -translate-x-1/2 z-0" />
          
          <div className="space-y-8 md:space-y-12">
            {roadmapData.map((item, idx) => (
              <TimelineCard key={item.title} item={item} index={idx} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <Link
            to="/roadmap"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#111B2E] hover:bg-[#1e293b] text-white font-bold text-lg transition-colors border border-white/10 shadow-lg"
          >
            Generate Your Roadmap <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default RoadmapSection;
