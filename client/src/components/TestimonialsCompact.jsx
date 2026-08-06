import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  { author: "Jane Doe", role: "Senior Engineer", quote: "CareerPilot AI helped me land my dream job in just two weeks. The interview simulator was a game changer.", avatar: "https://i.pravatar.cc/80?img=1" },
  { author: "John Smith", role: "Product Manager", quote: "The roadmap gave me a clear learning path. My resume score improved dramatically.", avatar: "https://i.pravatar.cc/80?img=2" },
  { author: "Emily Chen", role: "Data Scientist", quote: "I loved the privacy‑first approach. The AI suggestions felt truly personalized.", avatar: "https://i.pravatar.cc/80?img=3" },
];

function TestimonialsCompact() {
  return (
    <section className="py-20 bg-[#0A0F1C] text-white" id="testimonials">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">What our users say</h2>
        <ul className="space-y-8">
          {testimonials.map((t, i) => (
            <motion.li
              key={i}
              className="bg-[#0E1424] p-6 rounded-xl glassmorphism"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <p className="text-lg text-[#94A3B8] mb-4">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center">
                <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="font-semibold text-white">{t.author}</p>
                  <p className="text-sm text-[#94A3B8]">{t.role}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default TestimonialsCompact;
