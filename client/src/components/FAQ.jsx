import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "How does CareerPilot AI score my resume?",
    a: "CareerPilot parses your uploaded PDF using natural language processing to extract skills, experience bullets, and job history. It then compares your data against target job descriptions and ATS keyword indexes to calculate a 0-100 score with detailed category breakdowns.",
  },
  {
    q: "How does the AI Voice Mock Interview simulator work?",
    a: "The simulator uses your browser's native Speech Recognition API to record your voice answers in real-time. Your response transcript is evaluated by AI models for technical depth, communication clarity, confidence, and use of filler words.",
  },
  {
    q: "Is my resume data kept private?",
    a: "Yes. Your privacy is paramount. Resume text is processed strictly for the duration of your session and is never sold, shared, or used for model training. All data is encrypted in transit and at rest.",
  },
  {
    q: "Can I generate tailored cover letters for specific job postings?",
    a: "Absolutely. Paste the target job posting into the Cover Letter tool, and our AI will draft a customized letter highlighting your most relevant experience and aligning your skills with the job requirements.",
  },
  {
    q: "What technologies are covered in the Career Roadmaps?",
    a: "Our roadmaps cover major engineering tracks including Full Stack, Frontend Architecture, Backend Microservices, Data Engineering, AI/ML, DevOps, and Cloud Infrastructure. Each roadmap includes week-by-week milestones with curated resources.",
  },
  {
    q: "Is there a free plan available?",
    a: "Yes. The Starter plan is completely free and includes 1 resume analysis, 1 mock interview session, and basic ATS keyword matching. Upgrade to Pro for unlimited access to all tools.",
  },
];

function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="py-32 bg-[#050816] relative">
      <div className="max-w-[800px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-[1.1] tracking-tight">
            Frequently Asked <br className="hidden sm:block" /> Questions
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                  isOpen
                    ? "bg-[#0E1424] border-blue-500/20"
                    : "bg-[#0A0F1C] border-white/5 hover:border-white/10"
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-lg font-bold text-white pr-4">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? "bg-blue-500/20 text-blue-400" : "bg-[#111B2E] text-slate-400"
                  }`}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-[#94A3B8] leading-relaxed">
                        {faq.a}
                      </div>
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

export default FAQ;
