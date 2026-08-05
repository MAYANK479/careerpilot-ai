import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "SDE Intern @ Amazon",
    text: "CareerPilot's ATS analysis helped me identify missing keywords. Went from getting zero callbacks to landing 3 interviews in a week.",
    rating: 5,
    avatar: "PS",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Rahul Verma",
    role: "Frontend Developer @ Flipkart",
    text: "The AI mock interview feature is insane. Practicing with speech-to-text and getting instant feedback on my communication was a game changer.",
    rating: 5,
    avatar: "RV",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Ananya Gupta",
    role: "ML Engineer @ Google",
    text: "I used the job matching tool for every application. The keyword coverage analysis helped me tailor each resume version perfectly.",
    rating: 5,
    avatar: "AG",
    color: "from-emerald-500 to-teal-500",
  },
  {
    name: "Arjun Reddy",
    role: "CS Student @ IIT Delhi",
    text: "Best part? It runs completely offline on my laptop. No API keys, no subscriptions. Just upload and get professional-grade analysis.",
    rating: 5,
    avatar: "AR",
    color: "from-amber-500 to-orange-500",
  },
  {
    name: "Sneha Patel",
    role: "Backend Developer @ Microsoft",
    text: "The cover letter generator saved me hours. One click and I had a tailored letter that actually matched the job requirements.",
    rating: 5,
    avatar: "SP",
    color: "from-rose-500 to-pink-500",
  },
  {
    name: "Vikram Singh",
    role: "DevOps Engineer @ Razorpay",
    text: "The GitHub analyzer gave me honest feedback about my repos and READMEs. Made my profile significantly more professional.",
    rating: 5,
    avatar: "VS",
    color: "from-slate-400 to-blue-400",
  },
];

function Testimonials() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">
            Testimonials
          </span>
          <h2 className="text-4xl font-extrabold mt-3">
            Loved by{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Job Seekers
            </span>
          </h2>
        </motion.div>
      </div>

      {/* Scrolling cards */}
      <div className="relative">
        <div className="flex gap-6 animate-marquee" style={{ width: "max-content" }}>
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="w-[340px] shrink-0 glass rounded-2xl p-6"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    className="text-amber-400 fill-amber-400"
                  />
                ))}
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-xs font-bold text-white`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}

export default Testimonials;
