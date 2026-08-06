import React from "react";
import { motion } from "framer-motion";

function ProblemBlock() {
  return (
    <section className="py-24 bg-[#0A0F1C] text-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Struggling to get noticed by recruiters?
        </motion.h2>
        <motion.p
          className="text-lg text-[#94A3B8]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Traditional resumes get lost in ATS. Our AI‑powered platform analyses your resume, simulates interviews, and provides a personalised roadmap to help you land the job you want.
        </motion.p>
      </div>
    </section>
  );
}

export default ProblemBlock;
