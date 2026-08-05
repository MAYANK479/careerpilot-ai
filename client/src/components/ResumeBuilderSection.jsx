import React from "react";
import { motion } from "framer-motion";
import { PenTool, Sparkles, Wand2, Plus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function ResumeBuilderSection() {
  return (
    <section className="py-32 bg-[#050816] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block mb-6">
            AI Resume Builder
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-[1.1] tracking-tight">
            Write the Perfect Resume <br className="hidden sm:block" /> with AI Assistance
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Fake Resume Editor */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="saas-card p-6 sm:p-8 bg-[#0E1424] relative min-h-[500px]"
          >
            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs text-slate-500 font-mono ml-2">editor.tsx</span>
            </div>

            <div className="space-y-6 font-mono text-sm">
              <div>
                <p className="text-blue-400 font-bold mb-2 uppercase tracking-widest text-xs">Summary</p>
                <div className="p-4 bg-[#111B2E] rounded-xl border border-white/5 text-slate-300 relative group cursor-text">
                  <span className="opacity-50 select-none absolute left-2 top-4">1</span>
                  <p className="pl-6">Software Engineer with 3 years experience in web dev.</p>
                  {/* Highlight box showing AI rewrite target */}
                  <motion.div
                    className="absolute inset-0 border-2 border-purple-500/50 rounded-xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                </div>
              </div>

              <div>
                <p className="text-blue-400 font-bold mb-2 uppercase tracking-widest text-xs">Experience</p>
                <div className="p-4 bg-[#111B2E] rounded-xl border border-white/5 text-slate-300 relative">
                  <span className="opacity-50 select-none absolute left-2 top-4">2</span>
                  <p className="pl-6 mb-2 text-white font-bold">Frontend Developer @ TechCorp</p>
                  <span className="opacity-50 select-none absolute left-2 top-10">3</span>
                  <p className="pl-6 text-slate-400">- Made the website faster and fixed bugs.</p>
                  <span className="opacity-50 select-none absolute left-2 top-16">4</span>
                  <p className="pl-6 text-slate-400 flex items-center">
                    - Added new features using React.<span className="w-2 h-4 bg-blue-500 ml-1 animate-pulse" />
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: AI Suggestions Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/5 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Wand2 className="text-purple-400" size={20} />
                <h3 className="text-lg font-bold text-white">AI Suggestion</h3>
              </div>
              <p className="text-sm text-slate-300 mb-4 line-through opacity-60">
                Software Engineer with 3 years experience in web dev.
              </p>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 rounded-full" />
                <p className="pl-4 text-white font-medium leading-relaxed">
                  Results-driven Software Engineer with 3+ years of experience architecting scalable web applications using React and Node.js.
                </p>
              </div>
              <div className="mt-6 flex gap-3">
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-purple-500/20">
                  Accept ✨
                </button>
                <button className="px-4 py-2 bg-[#111B2E] text-slate-300 hover:text-white text-sm font-bold rounded-lg transition-colors border border-white/5">
                  Try Another
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="saas-card p-5 bg-[#0E1424] group cursor-pointer hover:border-blue-500/50">
                <Sparkles className="text-blue-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
                <h4 className="text-white font-bold mb-1">Action Verbs</h4>
                <p className="text-xs text-slate-400">Replace weak words with strong action verbs.</p>
              </div>
              <div className="saas-card p-5 bg-[#0E1424] group cursor-pointer hover:border-emerald-500/50">
                <Plus className="text-emerald-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
                <h4 className="text-white font-bold mb-1">Add Metrics</h4>
                <p className="text-xs text-slate-400">AI finds places where you should add numbers.</p>
              </div>
            </div>

            <div className="pt-6">
              <Link
                to="/upload"
                className="inline-flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors group"
              >
                Try the Resume Builder <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ResumeBuilderSection;
