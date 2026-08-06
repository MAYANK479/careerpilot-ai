import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

// Benefits brief – answers "Why should I care?"
const benefits = [
  { icon: <CheckCircle size={20} className="text-blue-500" />, text: "Beat ATS filters" },
  { icon: <CheckCircle size={20} className="text-blue-500" />, text: "Practice real interviews" },
  { icon: <CheckCircle size={20} className="text-blue-500" />, text: "Build stronger resumes" },
  { icon: <CheckCircle size={20} className="text-blue-500" />, text: "Track your progress" },
  { icon: <CheckCircle size={20} className="text-blue-500" />, text: "Learn faster" },
];

function BenefitsBrief() {
  return (
    <section className="py-20 bg-[#050816] text-white" id="why-care">
      <div className="max-w-3xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-8"
        >
          Why CareerPilot?
        </motion.h2>
        <ul className="space-y-4">
          {benefits.map((b, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center space-x-3 text-lg"
            >
              {b.icon}
              <span>{b.text}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default BenefitsBrief;
