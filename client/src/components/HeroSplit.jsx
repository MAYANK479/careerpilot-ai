import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCountUp } from "../hooks/useCountUp";

function HeroSplit() {
  const { count: users, ref: usersRef } = useCountUp(25000, 2000, 0);
  const { count: ats, ref: atsRef } = useCountUp(94, 2000, 0);
  const { count: interviews, ref: interviewsRef } = useCountUp(89, 2000, 0);

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center bg-[#050816] text-white py-20">
      <motion.div
        className="lg:w-1/2 px-6"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Land Your Dream Job Faster with AI
        </h1>
        <p className="text-lg text-[#94A3B8] mb-8 max-w-md">
          AI‑powered resume analysis, interview simulation, and personalized career roadmaps.
        </p>
        <Link
          to="/upload"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium transition-transform hover:-translate-y-0.5"
        >
          Get Started Free <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
        <div className="mt-12 flex flex-col sm:flex-row gap-6 text-center">
          <div>
            <span ref={usersRef} className="text-2xl font-bold text-white" />+
            <p className="text-sm text-[#94A3B8]">Active Users</p>
          </div>
          <div>
            <span ref={atsRef} className="text-2xl font-bold text-white" />%
            <p className="text-sm text-[#94A3B8]">ATS Success</p>
          </div>
          <div>
            <span ref={interviewsRef} className="text-2xl font-bold text-white" />%
            <p className="text-sm text-[#94A3B8]">Interview Rate</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="lg:w-1/2 flex justify-center mt-12 lg:mt-0"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-80 h-80 bg-[#0A0F1C] rounded-xl flex items-center justify-center text-[#94A3B8]">
          Illustration
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSplit;
