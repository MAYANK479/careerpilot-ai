import React from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Mic,
  Calendar,
  Bookmark,
  Activity,
  Settings,
  Bell,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

function HeatmapGrid() {
  const squares = Array.from({ length: 42 }).map((_, i) => {
    // Generate some random-looking activity
    const activityLevel = Math.random();
    let bgClass = "bg-[#111B2E]"; // Empty
    if (activityLevel > 0.9) bgClass = "bg-blue-400";
    else if (activityLevel > 0.7) bgClass = "bg-blue-500";
    else if (activityLevel > 0.4) bgClass = "bg-blue-600/60";
    else if (activityLevel > 0.2) bgClass = "bg-blue-900/40";

    return (
      <div key={i} className={`w-3 h-3 rounded-sm ${bgClass}`} />
    );
  });

  return (
    <div className="p-4 rounded-xl bg-[#111B2E] border border-white/5">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-bold text-slate-400">Activity Heatmap</span>
        <span className="text-xs text-blue-400 font-medium">Last 6 weeks</span>
      </div>
      <div className="flex flex-wrap gap-1">
        {squares}
      </div>
    </div>
  );
}

function BarChart() {
  const data = [
    { label: "Frontend", value: 90 },
    { label: "Backend", value: 75 },
    { label: "System Design", value: 60 },
    { label: "Behavioral", value: 85 },
  ];

  return (
    <div className="p-4 rounded-xl bg-[#111B2E] border border-white/5 flex flex-col h-full justify-between">
      <span className="text-xs font-bold text-slate-400 mb-4 block">Skill Radar</span>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
              <span>{item.label}</span>
              <span>{item.value}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#0E1424]">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${item.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-full bg-gradient-to-r from-blue-600 to-purple-500 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardPreview() {
  const sidebarItems = [
    { name: "Dashboard", icon: LayoutDashboard, active: true },
    { name: "Resume", icon: FileText, active: false },
    { name: "Interviews", icon: Mic, active: false },
    { name: "Calendar", icon: Calendar, active: false },
    { name: "Saved Jobs", icon: Bookmark, active: false },
    { name: "Skill Graph", icon: Activity, active: false },
    { name: "Settings", icon: Settings, active: false },
  ];

  const recentActivity = [
    { action: "Resume Analyzed", item: "Senior_Frontend.pdf", time: "2 hours ago", color: "text-emerald-400 bg-emerald-400/10" },
    { action: "Mock Interview", item: "System Design (Google)", time: "Yesterday", color: "text-purple-400 bg-purple-400/10" },
    { action: "Job Match", item: "Staff Engineer @ Stripe", time: "2 days ago", color: "text-blue-400 bg-blue-400/10" },
  ];

  return (
    <section className="py-36 bg-[#050816] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block mb-6">
            Complete Application
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-[1.1] tracking-tight">
            Not Just a Landing Page. <br className="hidden sm:block" /> A Full SaaS Product.
          </h2>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="saas-card bg-[#0E1424] rounded-2xl sm:rounded-[32px] overflow-hidden flex flex-col lg:flex-row border border-white/10 shadow-2xl"
        >
          {/* Sidebar (3 cols) */}
          <div className="w-full lg:w-64 bg-[#050816]/50 border-b lg:border-b-0 lg:border-r border-white/5 p-4 sm:p-6 shrink-0 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
            <div className="hidden lg:flex items-center gap-2 mb-8 px-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white">
                <LayoutDashboard size={16} />
              </div>
              <span className="font-bold text-white">CareerPilot OS</span>
            </div>

            {sidebarItems.map((item) => (
              <div
                key={item.name}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all shrink-0 cursor-pointer ${
                  item.active
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon size={16} />
                {item.name}
              </div>
            ))}
          </div>

          {/* Workspace (9 cols) */}
          <div className="flex-1 p-6 sm:p-8 bg-transparent">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-white">Welcome back, Alex</h3>
              <div className="w-10 h-10 rounded-full bg-[#111B2E] border border-white/5 flex items-center justify-center text-slate-300 relative cursor-pointer">
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                { label: "Overall Readiness", value: "91/100", highlight: "Top 2%" },
                { label: "Target Skills", value: "14/17", highlight: "3 missing" },
                { label: "Mock Interviews", value: "3", highlight: "Ready" },
              ].map((stat, i) => (
                <div key={i} className="p-5 rounded-xl bg-[#111B2E] border border-white/5">
                  <span className="text-xs font-bold text-slate-400 block mb-1">{stat.label}</span>
                  <span className="text-3xl font-black text-white block mb-1">{stat.value}</span>
                  <span className="text-xs font-medium text-blue-400">{stat.highlight}</span>
                </div>
              ))}
            </div>

            {/* Middle Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                {/* Recent Activity */}
                <div className="p-5 rounded-xl bg-[#111B2E] border border-white/5 h-full">
                  <span className="text-xs font-bold text-slate-400 block mb-4">Recent Activity</span>
                  <div className="space-y-3">
                    {recentActivity.map((activity, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[#0E1424] border border-white/5">
                        <div>
                          <p className="text-sm font-bold text-white">{activity.item}</p>
                          <p className="text-[11px] text-slate-400">{activity.time}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded border border-white/5 ${activity.color}`}>
                          {activity.action}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <BarChart />
              </div>
            </div>

            {/* Heatmap */}
            <HeatmapGrid />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-xl shadow-blue-600/20 transition-all duration-300"
          >
            Open Dashboard <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default DashboardPreview;
