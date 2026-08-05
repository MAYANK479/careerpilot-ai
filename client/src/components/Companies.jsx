import React from "react";

const companiesRow1 = ["Google", "Microsoft", "Amazon", "Meta", "Netflix", "Adobe"];
const companiesRow2 = ["Oracle", "Salesforce", "Accenture", "IBM", "Intel", "NVIDIA"];

function Companies() {
  return (
    <section className="py-20 bg-[#050816] overflow-hidden relative border-y border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 text-center mb-10">
        <p className="text-sm font-bold text-[#64748B] uppercase tracking-widest">
          Trusted by candidates interviewed at world-class companies
        </p>
      </div>

      {/* Left/Right Gradient Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050816] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050816] to-transparent z-10 pointer-events-none" />

      {/* Row 1: Left to Right Marquee */}
      <div className="flex whitespace-nowrap animate-marquee mb-8">
        {[...companiesRow1, ...companiesRow1, ...companiesRow1].map((company, i) => (
          <div
            key={`row1-${i}`}
            className="flex-none w-[250px] flex justify-center items-center"
          >
            <span className="text-3xl font-extrabold tracking-tight text-[#94A3B8]/20 hover:text-white transition-colors duration-300 cursor-default">
              {company}
            </span>
          </div>
        ))}
      </div>

      {/* Row 2: Right to Left Marquee (Reverse) */}
      <div className="flex whitespace-nowrap animate-marquee" style={{ animationDirection: 'reverse' }}>
        {[...companiesRow2, ...companiesRow2, ...companiesRow2].map((company, i) => (
          <div
            key={`row2-${i}`}
            className="flex-none w-[250px] flex justify-center items-center"
          >
            <span className="text-3xl font-extrabold tracking-tight text-[#94A3B8]/20 hover:text-white transition-colors duration-300 cursor-default">
              {company}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Companies;
