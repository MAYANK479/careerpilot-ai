import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "SDE Intern @ Amazon",
    text: "CareerPilot's ATS analysis identified key skill gaps in my resume. Went from 0 callbacks to 3 interview offers in 2 weeks.",
    rating: 5,
    avatar: "PS",
  },
  {
    name: "Rahul Verma",
    role: "Frontend Developer @ Flipkart",
    text: "The AI mock interview feature is insane. Practicing with real-time speech recognition gave me immense confidence before my final rounds.",
    rating: 5,
    avatar: "RV",
  },
  {
    name: "Ananya Gupta",
    role: "ML Engineer @ Google",
    text: "I used the job matching tool for every single application. Tailoring my resume keywords bumped my shortlist rate significantly.",
    rating: 5,
    avatar: "AG",
  },
  {
    name: "Arjun Reddy",
    role: "CS Student @ IIT Delhi",
    text: "The personalized learning plans provided a clear 8-week track for my target role. Super practical and structured.",
    rating: 5,
    avatar: "AR",
  },
  {
    name: "Sneha Patel",
    role: "Backend Developer @ Microsoft",
    text: "The cover letter generator saved me hours. One click and I had a tailored letter that actually matched the job requirements.",
    rating: 5,
    avatar: "SP",
  },
];

function Testimonials() {
  return (
    <section className="py-28 lg:py-32 relative bg-[#030712] overflow-hidden border-t border-slate-800/80">
      <div className="max-w-[1400px] mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block mb-4">
            Candidate Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-white leading-tight tracking-tight">
            Loved by Students & Software Engineers
          </h2>
          <p className="text-lg lg:text-[18px] text-[#94A3B8] mt-4 leading-relaxed font-normal">
            Here is how job seekers use CareerPilot AI to land roles at top tech companies.
          </p>
        </motion.div>
      </div>

      {/* Scrolling Cards Marquee */}
      <div className="relative">
        <div className="flex gap-6 animate-marquee" style={{ width: "max-content" }}>
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="w-[380px] shrink-0 saas-card p-8 bg-[#111827] border border-slate-800 rounded-[24px] flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      size={16}
                      className="text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <p className="text-base text-[#94A3B8] leading-relaxed font-normal mb-6">
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold text-white shadow-md">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="text-xs text-[#94A3B8]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gradient Edge Fade */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030712] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030712] to-transparent pointer-events-none" />
      </div>
    </section>
  );
}

export default Testimonials;
