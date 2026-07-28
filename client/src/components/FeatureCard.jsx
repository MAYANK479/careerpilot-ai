function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500 hover:scale-105 transition-all duration-300 shadow-lg">
      <div className="text-5xl mb-4">{icon}</div>

      <h3 className="text-2xl font-semibold text-white">
        {title}
      </h3>

      <p className="text-gray-400 mt-3">
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;