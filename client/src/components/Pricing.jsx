import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, Sparkles, Zap } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Essential AI tools for students & active job seekers.",
    features: [
      "3 Resume ATS Scans / mo",
      "Basic Skill Gap Analysis",
      "1 AI Voice Mock Interview (3 Qs)",
      "Standard Job Description Match",
      "Public Roadmaps Access",
    ],
    cta: "Get Started Free",
    link: "/upload",
    featured: false,
  },
  {
    name: "Pro Candidate",
    price: "$19",
    period: "per month",
    desc: "Complete career acceleration suite for serious job seekers.",
    features: [
      "Unlimited Resume ATS Scans",
      "AI Resume Bullet Rewriter & Optimizer",
      "Unlimited Voice AI Mock Interviews",
      "Personalized 8-Week Skill Roadmaps",
      "Portfolio Project Blueprints & Specs",
      "1-Click Tailored Cover Letters",
    ],
    cta: "Start 7-Day Trial",
    link: "/upload",
    featured: true,
  },
  {
    name: "Enterprise / Bootcamp",
    price: "$99",
    period: "per cohort / mo",
    desc: "For universities, coding bootcamps & talent agencies.",
    features: [
      "Everything in Pro Candidate",
      "Cohort Analytics Dashboard",
      "Bulk PDF Resume Analysis API",
      "Custom Interview Role Creation",
      "Dedicated Account Manager",
    ],
    cta: "Contact Sales",
    link: "/upload",
    featured: false,
  },
];

function Pricing() {
  return (
    <section id="pricing" className="py-28 lg:py-32 relative bg-[#030712] border-t border-slate-800/80">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block mb-4">
            Simple Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-white leading-tight tracking-tight">
            Invest in Your Dream Career
          </h2>
          <p className="text-lg lg:text-[18px] text-[#94A3B8] mt-4 leading-relaxed font-normal">
            No hidden fees. Upgrade or cancel anytime. All plans include full access to local AI features.
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`saas-card p-8 bg-[#111827] rounded-[24px] flex flex-col justify-between relative ${
                plan.featured
                  ? "border-2 border-blue-500 shadow-2xl shadow-blue-500/20 scale-105 z-10"
                  : "border border-slate-800/80"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                  Most Popular Choice
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">{plan.desc}</p>

                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-5xl font-black text-white tracking-tight">{plan.price}</span>
                  <span className="text-sm text-[#94A3B8] font-semibold">{plan.period}</span>
                </div>

                <div className="space-y-3.5 mb-8">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-slate-200">
                      <div className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                        <Check size={12} />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to={plan.link}
                className={`w-full py-4 rounded-full text-center text-sm font-bold transition-all duration-300 ${
                  plan.featured
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30"
                    : "bg-[#1E293B] hover:bg-slate-700 text-white border border-slate-700/80"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
