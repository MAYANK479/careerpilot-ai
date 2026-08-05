import React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Zap, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "forever",
    description: "Perfect for exploring the platform and analyzing a single resume.",
    features: [
      "1 AI Resume Analysis",
      "Basic ATS Keyword Match",
      "Standard Cover Letter",
      "1 AI Mock Interview",
    ],
    cta: "Start for Free",
    popular: false,
    icon: Sparkles,
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "Everything you need to land your dream job faster with AI.",
    features: [
      "Unlimited Resume Scans",
      "Advanced AI Rewriting",
      "Unlimited Cover Letters",
      "Weekly Mock Interviews",
      "Custom Career Roadmap",
      "Priority Email Support",
    ],
    cta: "Get Pro Access",
    popular: true,
    icon: Zap,
  },
  {
    name: "Lifetime",
    price: "$199",
    period: "one-time",
    description: "Permanent access to all features for your entire career journey.",
    features: [
      "All Pro Features",
      "Lifetime Updates",
      "1-on-1 Strategy Session",
      "Exclusive Discord Community",
      "Early Access to Beta Features",
    ],
    cta: "Get Lifetime",
    popular: false,
    icon: Check,
  }
];

function Pricing() {
  return (
    <section className="py-32 bg-[#050816] relative overflow-hidden" id="pricing">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block mb-6">
            Simple Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-[1.1] tracking-tight">
            Invest in Your Career
          </h2>
          <p className="text-lg text-[#94A3B8] mt-6 leading-relaxed font-normal">
            No hidden fees. No surprise charges. Choose the plan that best fits your job search timeline.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative flex flex-col saas-card p-8 rounded-3xl transition-all duration-300 ${
                  plan.popular
                    ? "bg-[#0E1424] border-blue-500/50 shadow-[0_0_40px_rgba(59,130,246,0.15)] md:-translate-y-4"
                    : "bg-[#0A0F1C] border-white/5 hover:border-white/10"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                      plan.popular ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-white/5 text-slate-400 border-white/10"
                    }`}>
                      <Icon size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  </div>
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-4xl sm:text-5xl font-black text-white">{plan.price}</span>
                    <span className="text-[#94A3B8] font-medium mb-1">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">{plan.description}</p>
                </div>

                <div className="flex-1 space-y-4 mb-8">
                  <p className="text-xs font-bold text-white uppercase tracking-wider mb-4">Includes</p>
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-300 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                      : "bg-[#111B2E] hover:bg-[#1e293b] text-white border border-white/10"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
