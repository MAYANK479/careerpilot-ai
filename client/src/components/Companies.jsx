import { motion } from "framer-motion";

const companies = [
  { name: "Amazon", logo: "AMZN" },
  { name: "Google", logo: "GOOGL" },
  { name: "Microsoft", logo: "MSFT" },
  { name: "Adobe", logo: "ADBE" },
  { name: "Oracle", logo: "ORCL" },
  { name: "Infosys", logo: "INFY" },
  { name: "TCS", logo: "TCS" },
];

function Companies() {
  return (
    <section className="py-16 border-y border-slate-800/80 bg-[#030712]/60">
      <div className="max-w-[1400px] mx-auto px-6 text-center">
        <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest mb-10">
          Trusted by candidates interviewed at world-class companies
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {companies.map((company, i) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#111827] border border-slate-800/80 hover:border-blue-500/40 transition-all duration-300 shadow-sm"
            >
              <span className="text-lg font-black tracking-tight text-[#94A3B8] group-hover:text-white transition-colors font-mono">
                {company.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Companies;
