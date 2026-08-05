import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Senior Full Stack Engineer",
    company: "Stripe",
    image: "Alex",
    quote: "The ATS scanner found exactly why I wasn't getting callbacks. After following the AI suggestions, I got 3 interviews in one week.",
    before: "0 callbacks",
    after: "3 offers",
  },
  {
    name: "Samantha Lee",
    role: "Frontend Developer",
    company: "Vercel",
    image: "Samantha",
    quote: "The mock interview feature is insanely accurate. It caught my habit of using filler words and helped me structure my system design answers.",
    before: "Nervous",
    after: "Confident",
  },
  {
    name: "David Chen",
    role: "Product Manager",
    company: "Linear",
    image: "David",
    quote: "I was transitioning from marketing to PM. The career roadmap gave me the exact skills I needed to learn, week by week.",
    before: "Lost",
    after: "Hired",
  },
  {
    name: "Jessica Taylor",
    role: "Data Scientist",
    company: "Netflix",
    image: "Jessica",
    quote: "The job matcher saved me hours. It tailored my resume for a specific Netflix JD and highlighted the exact ML algorithms I needed to mention.",
    before: "Generic resume",
    after: "95% ATS Match",
  },
];

function Testimonials() {
  return (
    <section className="py-32 bg-[#050816] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block mb-6">
            Success Stories
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-[1.1] tracking-tight">
            Loved by Engineers at <br className="hidden sm:block" /> Top Tech Companies
          </h2>
        </motion.div>
      </div>

      {/* Marquee Carousel */}
      <div className="relative w-full overflow-hidden flex pb-10">
        {/* Left/Right Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050816] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050816] to-transparent z-10 pointer-events-none" />

        <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused] gap-6 px-3">
          {[...testimonials, ...testimonials].map((item, idx) => (
            <div
              key={idx}
              className="flex-none w-[400px] saas-card p-8 bg-[#0E1424] border border-white/5 rounded-3xl whitespace-normal"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-blue-500 to-purple-500 shrink-0">
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#111B2E]">
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${item.image}&backgroundColor=transparent`} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">{item.name}</h4>
                  <p className="text-sm text-slate-400 font-medium">{item.role} @ <span className="text-white">{item.company}</span></p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-[#94A3B8] leading-relaxed mb-6">"{item.quote}"</p>

              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <div className="flex-1">
                  <span className="text-xs text-slate-500 uppercase font-bold block mb-1">Before</span>
                  <span className="text-sm font-semibold text-slate-300">{item.before}</span>
                </div>
                <div className="w-6 border-t border-dashed border-slate-600" />
                <div className="flex-1 text-right">
                  <span className="text-xs text-blue-400 uppercase font-bold block mb-1">After</span>
                  <span className="text-sm font-bold text-emerald-400">{item.after}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
