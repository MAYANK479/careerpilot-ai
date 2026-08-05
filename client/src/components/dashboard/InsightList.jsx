import { motion } from "framer-motion";

const colorThemes = {
  green: {
    accent: "text-emerald-400",
    dot: "bg-emerald-400",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/5",
  },
  amber: {
    accent: "text-amber-400",
    dot: "bg-amber-400",
    border: "border-amber-500/20",
    bg: "bg-amber-500/5",
  },
  red: {
    accent: "text-red-400",
    dot: "bg-red-400",
    border: "border-red-500/20",
    bg: "bg-red-500/5",
  },
  blue: {
    accent: "text-blue-400",
    dot: "bg-blue-400",
    border: "border-blue-500/20",
    bg: "bg-blue-500/5",
  },
  purple: {
    accent: "text-purple-400",
    dot: "bg-purple-400",
    border: "border-purple-500/20",
    bg: "bg-purple-500/5",
  },
};

function InsightList({
  title,
  items = [],
  icon,
  color = "blue",
  emptyMessage = "None detected",
}) {
  const theme = colorThemes[color] || colorThemes.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`glass rounded-2xl p-6 glow-hover`}
    >
      <div className="flex items-center gap-3 mb-4">
        {icon && (
          <span className={`text-xl ${theme.accent}`}>{icon}</span>
        )}
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
          {title}
        </h3>
        <span className="ml-auto text-xs text-slate-600 bg-slate-800 px-2 py-0.5 rounded-full">
          {items.length}
        </span>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-slate-600 italic">{emptyMessage}</p>
      ) : (
        <ul className="space-y-2.5">
          {items.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-2.5 text-sm text-slate-300"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${theme.dot} mt-1.5 shrink-0`}
              />
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

export default InsightList;
