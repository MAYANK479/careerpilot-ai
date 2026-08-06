import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqItems = [
  {
    q: "What is CareerPilot AI?",
    a: "An AI‑powered platform that analyses your resume, simulates interviews, and builds personalized career roadmaps.",
  },
  {
    q: "How does the ATS score work?",
    a: "We parse your resume, match keywords against the target job description and compute a 0‑100 readiness score.",
  },
  {
    q: "Is my data private?",
    a: "All data is encrypted in transit and at rest and is never stored after your session ends.",
  },
  {
    q: "Can I try it for free?",
    a: "Yes – the Starter plan gives you one resume analysis, one mock interview and basic ATS matching at no cost.",
  },
  {
    q: "How do I get started?",
    a: "Create an account, upload your resume and let the AI generate a roadmap instantly.",
  },
];

function FAQCompact() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="py-24 bg-[#050816] text-white" id="faq">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
        </motion.div>
        <div className="space-y-3">
          {faqItems.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`rounded-xl border transition-colors ${isOpen ? "bg-[#0E1424] border-blue-500/30" : "bg-[#0A0F1C] border-white/5 hover:border-white/10"}`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-lg text-white">{item.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isOpen ? "bg-blue-600/30" : "bg-[#111B2E]"}`}>
                    {isOpen ? <Minus size={16} className="text-blue-400"/> : <Plus size={16} className="text-slate-400"/>}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-5 pb-5 text-[#94A3B8]"
                    >
                      {item.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQCompact;
