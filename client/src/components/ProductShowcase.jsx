import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ResumeDemo from "./ResumeDemo";
import InterviewSection from "./InterviewSection";

// Placeholder images – replace with real screenshots
const screenshots = {
  ats: "https://via.placeholder.com/800x450?text=Resume+Analysis+Preview",
  interview: "https://via.placeholder.com/800x450?text=Mock+Interview+Preview",
  dashboard: "https://via.placeholder.com/800x450?text=Dashboard+Preview",
};

const tabs = [
  { id: "ats", label: "Resume Analysis", component: <ResumeDemo />, route: "/ats" },
  { id: "interview", label: "Mock Interview", component: <InterviewSection />, route: "/interview" },
  { id: "dashboard", label: "Career Dashboard", component: <div className='p-8 text-center text-white'>Dashboard preview coming soon</div>, route: "/dashboard" },
];

function ProductShowcase() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const active = tabs.find(t => t.id === activeTab);

  return (
    <section className="py-24 bg-[#050816] text-white" id="product-showcase">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-8"
        >
          See CareerPilot in Action
        </motion.h2>

        {/* Tab navigation */}
        <div className="flex justify-center space-x-4 mb-6">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === t.id
                  ? "bg-blue-600 text-white"
                  : "bg-[#0A0F1C] text-[#94A3B8] hover:bg-[#111B2E]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Render active component */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl overflow-hidden shadow-lg"
            >
              {active.component}
            </motion.div>
          </AnimatePresence>

        {/* Caption & CTA */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-[#94A3B8] mt-6 mb-4"
        >
          {active.label} – quick preview of the feature.
        </motion.p>
        <div className="text-center">
          <Link
            to={active.route}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium hover:opacity-90 transition"
          >
            Open {active.label}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProductShowcase;
