import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function FinalCTA() {
  return (
    <section className="py-20 relative bg-white/40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative max-w-3xl mx-auto px-6 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-6 shadow-sm">
          <Sparkles size={14} />
          Ready to level up your career?
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
          Start Your AI-Powered <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Career Journey Today</span>
        </h2>
        <p className="text-zinc-600 mt-4 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          Upload your resume and receive ATS compatibility scores, skill roadmaps, and interview practice in under 30 seconds.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <Link
            to="/upload"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold hover:opacity-90 transition">
            Start Free Trial
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default FinalCTA;
