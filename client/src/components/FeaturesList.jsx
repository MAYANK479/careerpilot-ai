import React from "react";
import { motion } from "framer-motion";
import { Zap, BarChart2, Gift, CheckCircle, Shield } from "lucide-react";

const features = [
  { icon: Zap, title: "Resume Analysis", description: "Get a score and actionable feedback for your resume instantly." },
  { icon: BarChart2, title: "Interview Simulator", description: "Practice with AI‑generated technical questions and get real‑time feedback." },
  { icon: Gift, title: "Career Roadmap", description: "Personalised learning path with weekly milestones to master in‑demand skills." },
  { icon: CheckCircle, title: "ATS Optimization", description: "Keyword matching and formatting tips to beat applicant tracking systems." },
  { icon: Shield, title: "Privacy First", description: "Your data is encrypted and never stored after the session." },
];

function FeaturesList() {
  return (
    <section className="py-24 bg-[#0A0F1C] text-white" id="features">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Key Features</h2>
        <ul className="space-y-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.li
                key={i}
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Icon className="w-8 h-8 text-blue-500 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-1">{f.title}</h3>
                  <p className="text-[#94A3B8]">{f.description}</p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default FeaturesList;
