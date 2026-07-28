function Stats() {
  const stats = [
    { number: "25K+", label: "Resumes Reviewed" },
    { number: "98%", label: "ATS Accuracy" },
    { number: "1200+", label: "Job Matches" },
  ];

  return (
    <section className="max-w-5xl mx-auto py-16 px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center hover:border-blue-500 transition"
          >
            <h2 className="text-4xl font-bold text-blue-500">
              {stat.number}
            </h2>

            <p className="text-gray-400 mt-2">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;