import React from "react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "Free",
    features: ["1 Resume Analysis", "1 Mock Interview", "Basic ATS Match"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19/mo",
    features: ["Unlimited Analyses", "Unlimited Interviews", "Full Roadmap", "Priority Support"],
    highlighted: true,
  },
];

function PricingCompact() {
  return (
    <section className="py-20 bg-[#0A0F1C] text-white" id="pricing">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-8">Pricing</h2>
        <div className="flex justify-center gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              className={`flex flex-col p-6 rounded-xl border ${plan.highlighted ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white" : "bg-[#050816] border-white/10"}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-center">{plan.name}</h3>
              <p className="text-center text-xl font-bold mb-6">{plan.price}</p>
              <ul className="space-y-2 mb-6 text-[#94A3B8]">
                {plan.features.map((f, idx) => (
                  <li key={idx}>• {f}</li>
                ))}
              </ul>
              <button className="mt-auto px-4 py-2 bg-white text-[#050816] rounded hover:bg-gray-200 transition">
                Choose {plan.name}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingCompact;
