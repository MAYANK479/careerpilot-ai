import React from "react";
import { motion } from "framer-motion";
import { Users, Target, Star } from "lucide-react";

const cards = [
  { icon: <Users size={32} className="text-blue-400" />, label: "Students", value: "25K+" },
  { icon: <Target size={32} className="text-blue-400" />, label: "ATS Success", value: "92%" },
  { icon: <Star size={32} className="text-blue-400" />, label: "Rating", value: "4.9★" },
];

function TrustCards() {
  return (
    <section className="py-20 bg-[#050816] text-white" id="trust">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          Trusted by many
        </motion.h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {cards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center bg-[#0A0F1C] rounded-xl p-6 w-64"
            >
              {c.icon}
              <span className="mt-4 text-2xl font-semibold">{c.value}</span>
              <span className="text-sm text-[#94A3B8]">{c.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustCards;
