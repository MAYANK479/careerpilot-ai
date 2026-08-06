import React from "react";
import { motion } from "framer-motion";

// Placeholder company data – replace with real partners if available
const companies = [
  { name: "TechCorp", logo: "https://via.placeholder.com/80x40?text=TechCorp" },
  { name: "Innova", logo: "https://via.placeholder.com/80x40?text=Innova" },
  { name: "FutureSoft", logo: "https://via.placeholder.com/80x40?text=FutureSoft" },
  { name: "Alpha Systems", logo: "https://via.placeholder.com/80x40?text=Alpha+Systems" },
];

function CompaniesMarquee() {
  return (
    <section className="py-12 bg-[#050816] overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap animate-marquee"
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {companies.concat(companies).map((c, i) => (
          <div key={i} className="inline-block mx-6">
            <img src={c.logo} alt={c.name} className="h-8" />
          </div>
        ))}
      </motion.div>
    </section>
  );
}

export default CompaniesMarquee;
