import { motion } from "framer-motion";

function getScoreColor(score) {
  if (score >= 71) return { stroke: "#10b981", bg: "rgba(16, 185, 129, 0.1)", label: "text-emerald-400" };
  if (score >= 41) return { stroke: "#f59e0b", bg: "rgba(245, 158, 11, 0.1)", label: "text-amber-400" };
  return { stroke: "#ef4444", bg: "rgba(239, 68, 68, 0.1)", label: "text-red-400" };
}

function AtsScoreGauge({ score = 0, rating = "" }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const dashOffset = circumference - progress;
  const colors = getScoreColor(score);

  return (
    <div className="glass rounded-2xl p-8 flex flex-col items-center justify-center glow-hover">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">
        ATS Score
      </h3>

      <div className="relative w-40 h-40">
        {/* Background circle */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="rgba(148, 163, 184, 0.1)"
            strokeWidth="8"
          />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={colors.stroke}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          />
        </svg>

        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className={`text-4xl font-extrabold ${colors.label}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-slate-500 mt-1">/ 100</span>
        </div>
      </div>

      {rating && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-4"
        >
          <span
            className="text-sm font-semibold px-4 py-1.5 rounded-full"
            style={{ backgroundColor: colors.bg, color: colors.stroke }}
          >
            {rating}
          </span>
        </motion.div>
      )}
    </div>
  );
}

export default AtsScoreGauge;
