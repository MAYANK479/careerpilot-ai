import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

function CTA() {
  return (
    <section className="py-24 relative">
      {/* Aurora glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative max-w-3xl mx-auto px-6 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
          <Sparkles size={14} />
          Ready to level up your career?
        </div>

        <h2 className="text-4xl md:text-5xl font-extrabold">
          Start Your AI-Powered
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Career Journey
          </span>
        </h2>

        <p className="text-slate-400 mt-5 text-lg max-w-md mx-auto">
          Upload your resume and get professional analysis in under 30
          seconds. No sign-up required.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <Link
            to="/upload"
            className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-500/25 font-semibold"
          >
            Get Started Free
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default CTA;
