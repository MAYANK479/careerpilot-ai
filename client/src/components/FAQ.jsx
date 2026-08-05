import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How does CareerPilot AI score my resume?",
    a: "CareerPilot parses your uploaded PDF using natural language processing to extract skills, experience bullets, and job history. It then compares your data against target job descriptions and ATS keyword indexes to calculate a 0-100 score.",
  },
  {
    q: "How does the AI Voice Mock Interview simulator work?",
    a: "The simulator uses your browser's native Speech Recognition API to record your voice answers. Your response transcript is sent to AI models for evaluation on technical depth, communication clarity, and confidence.",
  },
  {
    q: "Is my resume data kept private?",
    a: "Yes. Your privacy is paramount. Resume text is processed strictly for the duration of your session and is never sold or used for model training.",
  },
  {
    q: "Can I generate tailored cover letters for specific job postings?",
    a: "Absolutely! Simply paste the target job posting into the Job Matcher tool, and CareerPilot AI will draft a customized cover letter highlighting your relevant experience.",
  },
  {
    q: "What technologies are covered in the Career Roadmaps?",
    a: "Our roadmaps cover major engineering tracks including Full Stack, Frontend Architecture, Backend Microservices, Data Engineering, AI/ML, and DevOps Cloud infrastructure.",
  },
];

function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="py-28 lg:py-32 relative bg-[#030712] border-t border-slate-800/80">
      <div className="max-w-[900px] mx-auto px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block mb-4">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-white leading-tight tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg lg:text-[18px] text-[#94A3B8] mt-4 leading-relaxed font-normal">
            Everything you need to know about CareerPilot AI.
          </p>
        </motion.div>

        {/* Accordion */}
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
                className="saas-card overflow-hidden bg-[#111827] border border-slate-800/80 rounded-[24px]"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left"
                >
                  <span className="text-lg font-bold text-white pr-4">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-8 h-8 rounded-full bg-[#1E293B] border border-slate-700/80 flex items-center justify-center text-slate-300 shrink-0"
                  >
                    <ChevronDown size={18} />
                  </motion.div>
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
                      <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0 border-t border-slate-800/80 text-base text-[#94A3B8] leading-relaxed font-normal">
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
