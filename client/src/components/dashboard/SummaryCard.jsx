import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

function SummaryCard({ summary = "" }) {
  if (!summary) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl p-6 relative overflow-hidden"
    >
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500" />

      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
          <Sparkles size={16} className="text-blue-400" />
        </div>
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
          Professional Summary
        </h3>
      </div>

      <p className="text-slate-300 leading-relaxed text-[15px]">
        {summary}
      </p>
    </motion.div>
  );
}

export default SummaryCard;
