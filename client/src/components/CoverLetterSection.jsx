import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Building, Briefcase, FileSignature } from "lucide-react";

function CoverLetterSection() {
  return (
    <section className="py-28 bg-[#050816] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-[1.1] tracking-tight">
            One-Click Hyper-Personalized <br className="hidden sm:block" /> Cover Letters
          </h2>
          <p className="text-lg text-[#94A3B8] mt-6 leading-relaxed font-normal max-w-2xl mx-auto">
            Stop sending generic templates. Our AI writes tailored cover letters by matching your exact resume experience against the job description.
          </p>
        </motion.div>

        {/* 3-Part Horizontal Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Step 1: Company Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="saas-card p-6 bg-[#0E1424] flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold border border-blue-500/20">
                1
              </div>
              <h3 className="text-white font-bold text-lg">Target Company</h3>
            </div>
            
            <div className="space-y-4 flex-1">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Company Name</label>
                <div className="flex items-center gap-3 px-4 py-3 bg-[#111B2E] border border-white/5 rounded-xl text-white">
                  <Building size={18} className="text-slate-400" />
                  Google
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Role Title</label>
                <div className="flex items-center gap-3 px-4 py-3 bg-[#111B2E] border border-white/5 rounded-xl text-white">
                  <Briefcase size={18} className="text-slate-400" />
                  Senior Frontend Engineer
                </div>
              </div>
            </div>
          </motion.div>

          {/* Step 2: Job Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="saas-card p-6 bg-[#0E1424] flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold border border-blue-500/20">
                  2
                </div>
                <h3 className="text-white font-bold text-lg">Job Description</h3>
              </div>
            </div>
            
            <div className="flex-1 bg-[#111B2E] border border-white/5 rounded-xl p-4 text-sm text-slate-400 leading-relaxed font-mono overflow-hidden relative">
              <p>We are looking for a Senior Frontend Engineer to join our Core UI team. You should have deep expertise in React, TypeScript, and state management.</p>
              <br/>
              <p>Requirements:</p>
              <ul className="pl-4 mt-2 space-y-1">
                <li>- 5+ years React experience</li>
                <li>- Web performance optimization</li>
                <li>- Accessibility standards</li>
              </ul>
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#111B2E] to-transparent" />
            </div>
            <button className="mt-4 w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20">
              <Sparkles size={16} /> Generate Letter
            </button>
          </motion.div>

          {/* Step 3: Generated Output */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="saas-card p-6 bg-[#0E1424] flex flex-col border-purple-500/30 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold border border-purple-500/20">
                <FileSignature size={20} />
              </div>
              <h3 className="text-white font-bold text-lg">AI Generated</h3>
            </div>
            
            <div className="flex-1 bg-[#111B2E] border border-white/5 rounded-xl p-5 text-sm text-slate-300 leading-relaxed relative z-10">
              <p className="mb-4">Dear Hiring Manager at Google,</p>
              <p className="mb-4 text-white bg-purple-500/10 p-1 -mx-1 rounded relative">
                With over 6 years of experience building scalable applications in React and TypeScript, I am thrilled to apply for the Senior Frontend Engineer role.
                <motion.span 
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-4 bg-purple-500"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </p>
              <p className="opacity-50">In my current role, I optimized our Core UI performance, reducing load times by 45%...</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default CoverLetterSection;
