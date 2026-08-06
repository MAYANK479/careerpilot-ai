import React from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from "recharts";

// Mock data for the dashboard demo
const lineData = [
  { month: "Jan", score: 65 },
  { month: "Feb", score: 72 },
  { month: "Mar", score: 78 },
  { month: "Apr", score: 85 },
  { month: "May", score: 88 },
  { month: "Jun", score: 92 },
];

const barData = [
  { skill: "Frontend", level: 90 },
  { skill: "Backend", level: 75 },
  { skill: "System Design", level: 60 },
  { skill: "Behavioral", level: 85 },
];

function DashboardDemo() {
  return (
    <section className="py-24 bg-[#050816] text-white" id="dashboard-demo">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold tracking-tight">Live Dashboard Demo</h2>
          <p className="mt-4 text-[#94A3B8]">See how your progress visualises across time and skill areas.</p>
        </motion.div>

        {/* Charts grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Line chart – readiness over months */}
          <motion.div
            className="p-6 rounded-xl bg-[#0E1424] border border-white/5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 text-lg font-medium text-white">Readiness Score Over Time</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lineData}>
                <XAxis dataKey="month" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" domain={[0, 100]} />
                <Tooltip contentStyle={{ background: "#0E1424", border: "none" }} />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="url(#gradientLine)"
                  strokeWidth={3}
                  dot={{ stroke: "#4F46E5", strokeWidth: 2, r: 4, fill: "#4F46E5" }}
                />
                {/* Gradient definition */}
                <defs>
                  <linearGradient id="gradientLine" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Bar chart – skill levels */}
          <motion.div
            className="p-6 rounded-xl bg-[#0E1424] border border-white/5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 text-lg font-medium text-white">Skill Radar</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis type="number" domain={[0, 100]} stroke="#94A3B8" hide />
                <YAxis dataKey="skill" type="category" stroke="#94A3B8" />
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#111B2E" />
                <Tooltip contentStyle={{ background: "#0E1424", border: "none" }} />
                <Bar dataKey="level" fill="url(#gradientBar)" radius={[0, 8, 8, 0]} />
                <defs>
                  <linearGradient id="gradientBar" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#A78BFA" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default DashboardDemo;
