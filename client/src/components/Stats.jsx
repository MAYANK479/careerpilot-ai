import { motion } from "framer-motion";

function Stats() {
  const stats = [
    { number: "100%", label: "Private & Local" },
    { number: "Free", label: "No API Key Needed" },
    { number: "10+", label: "Analysis Insights" },
  ];

  return (
    <section className="max-w-5xl mx-auto py-16 px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="glass rounded-2xl p-8 text-center hover:border-blue-500/30 transition-all duration-300 glow-hover"
          >
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {stat.number}
            </h2>
            <p className="text-slate-400 mt-2 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Stats;