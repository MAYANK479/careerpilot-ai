import React from "react";
import { motion } from "framer-motion";
import { Mic, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function InterviewSection() {
  return (
    <section className="min-h-[90vh] bg-[#050816] relative overflow-hidden flex flex-col justify-center items-center py-20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 w-full text-center">
        {/* Header Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 inline-block mb-6">
            Signature Feature
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-[1.1] tracking-tight">
            Practice Voice Interviews <br className="hidden sm:block" /> with Real-Time AI
          </h2>
        </motion.div>

        {/* Central UI Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-[#0E1424] rounded-[32px] p-10 sm:p-16 border border-white/5 shadow-2xl relative"
        >
          {/* AI Interviewer Avatar */}
          <div className="absolute top-6 left-6 sm:top-8 sm:left-8 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 p-[2px]">
              <div className="w-full h-full rounded-full bg-[#0E1424] flex items-center justify-center overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=Sarah&backgroundColor=transparent`} alt="Interviewer" className="w-10 h-10 object-cover" />
              </div>
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-bold text-white">Sarah Chen</p>
              <p className="text-xs font-medium text-slate-400">Senior Technical Interviewer</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center mt-8 sm:mt-4">
            {/* Massive Microphone Sphere */}
            <div className="relative mb-12">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center text-white shadow-[0_0_50px_rgba(139,92,246,0.3)] animate-pulse">
                <Mic size={56} className="sm:w-16 sm:h-16" />
              </div>
              <div className="absolute inset-0 rounded-full border-[3px] border-purple-400/30 animate-ping pointer-events-none" style={{ animationDuration: '2s' }} />
            </div>

            {/* Audio Waves */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 h-16 mb-12">
              {[30, 60, 90, 40, 75, 25, 85, 45, 95, 35, 70, 50, 80, 40, 100, 60, 30, 85, 45, 70].map((h, idx) => (
                <motion.div
                  key={idx}
                  className="w-1.5 sm:w-2 rounded-full bg-gradient-to-t from-purple-500 to-blue-400"
                  animate={{ height: ["20%", `${h}%`, "20%"] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: idx * 0.05,
                  }}
                />
              ))}
            </div>

            {/* Live Transcript Preview */}
            <div className="max-w-xl mx-auto mb-16">
              <p className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed">
                "For the database architecture, I chose <span className="text-white bg-white/10 px-2 rounded">PostgreSQL</span> because of its strong support for JSONB operations, which allows us to..."
                <span className="inline-block w-2 h-5 bg-purple-500 ml-1 animate-pulse" />
              </p>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
              {[
                { label: "Confidence", value: "92/100", color: "text-purple-400" },
                { label: "Speech Speed", value: "145 wpm", color: "text-blue-400" },
                { label: "Tech Depth", value: "High", color: "text-emerald-400" },
                { label: "Filler Words", value: "Low", color: "text-amber-400" },
              ].map((metric) => (
                <div key={metric.label} className="p-4 rounded-2xl bg-[#111B2E] border border-white/5 text-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">{metric.label}</span>
                  <span className={`text-xl sm:text-2xl font-black ${metric.color}`}>{metric.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Link
            to="/interview"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-lg shadow-xl shadow-purple-600/20 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Start Practice Interview
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default InterviewSection;
