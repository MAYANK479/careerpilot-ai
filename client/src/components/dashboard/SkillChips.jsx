import { motion } from "framer-motion";

const colorMap = {
  red: "bg-red-500/10 text-red-300 border-red-500/20",
  green: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  blue: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  amber: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  purple: "bg-purple-500/10 text-purple-300 border-purple-500/20",
};

function SkillChips({
  title,
  items = [],
  color = "blue",
  icon,
  emptyMessage = "None detected",
}) {
  const chipStyle = colorMap[color] || colorMap.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass rounded-2xl p-6 glow-hover"
    >
      <div className="flex items-center gap-3 mb-4">
        {icon && <span className="text-xl">{icon}</span>}
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
        <div className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg border ${chipStyle}`}
            >
              {item}
            </motion.span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default SkillChips;
