import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mic, Zap, Award, Sparkles, Volume2, ArrowRight, Activity, CheckCircle2 } from "lucide-react";

function InterviewSection() {
  return (
    <section className="py-28 lg:py-32 relative bg-[#030712] overflow-hidden border-t border-slate-800/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <Zap size={14} /> Flagship AI Feature
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-white leading-tight tracking-tight">
              Practice Voice Interviews with Real-Time AI Feedback
            </h2>

            <p className="text-lg lg:text-[18px] text-[#94A3B8] leading-relaxed font-normal">
              Eliminate interview anxiety. Practice technical architecture and behavioral questions with speech recognition, confidence scoring, and instant performance breakdowns.
            </p>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                { title: "Voice & Speech Simulator", desc: "Real-time Web Speech API" },
                { title: "Behavioral & Technical", desc: "Tailored to target job role" },
                { title: "Confidence Score Gauge", desc: "90+ rating breakdown" },
                { title: "Real-Time Audio Transcript", desc: "Instant audio wave feedback" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 p-4 rounded-2xl bg-[#111827] border border-slate-800/80">
                  <CheckCircle2 size={18} className="text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-white">{item.title}</p>
                    <p className="text-xs text-[#94A3B8] mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                to="/interview"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-xl shadow-blue-600/30 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Mic size={18} />
                Start AI Voice Interview
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column (6 cols): Large Mic & Visualizer Showcase Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6"
          >
            <div className="saas-card p-8 sm:p-10 bg-[#111827] border border-slate-800 shadow-2xl rounded-[24px] relative overflow-hidden">
              {/* Mic Icon Sphere Graphic */}
              <div className="flex flex-col items-center justify-center py-8">
                <div className="relative mb-6">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-blue-500/40 animate-pulse">
                    <Mic size={48} />
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 border-blue-400/40 animate-ping pointer-events-none" />
                </div>

                {/* Animated Audio Wave Spectrum */}
                <div className="flex items-center gap-1.5 h-10 mb-6">
                  {[40, 75, 100, 60, 85, 30, 95, 50, 80, 45, 90, 65].map((h, idx) => (
                    <motion.div
                      key={idx}
                      className="w-1.5 rounded-full bg-blue-500"
                      animate={{ height: ["20%", `${h}%`, "20%"] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: idx * 0.1,
                      }}
                    />
                  ))}
                </div>

                <p className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20 mb-6">
                  Recording Active · Speech Recognition Engine
                </p>

                {/* Real-time Score Pill */}
                <div className="grid grid-cols-3 gap-4 w-full pt-6 border-t border-slate-800/80">
                  <div className="text-center p-3 rounded-xl bg-[#1E293B]/60 border border-slate-800">
                    <span className="text-xs text-[#94A3B8] font-bold uppercase block mb-1">Confidence</span>
                    <span className="text-base font-extrabold text-blue-400">92/100</span>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-[#1E293B]/60 border border-slate-800">
                    <span className="text-xs text-[#94A3B8] font-bold uppercase block mb-1">Technical</span>
                    <span className="text-base font-extrabold text-emerald-400">89/100</span>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-[#1E293B]/60 border border-slate-800">
                    <span className="text-xs text-[#94A3B8] font-bold uppercase block mb-1">Fluency</span>
                    <span className="text-base font-extrabold text-purple-400">95/100</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default InterviewSection;
