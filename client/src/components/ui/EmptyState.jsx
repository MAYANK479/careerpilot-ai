import React from "react";
import { Link } from "react-router-dom";

export function EmptyState({ icon: Icon, title, description, actionLabel, actionTo, actionOnClick }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-slate-700/50 rounded-2xl bg-[#0E1424]/50">
      <div className="w-16 h-16 rounded-2xl bg-[#111B2E] flex items-center justify-center mb-6 shadow-inner border border-white/5">
        <Icon className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-[#94A3B8] max-w-sm mb-8">{description}</p>
      
      {actionLabel && (
        actionTo ? (
          <Link
            to={actionTo}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors shadow-lg shadow-blue-500/20"
          >
            {actionLabel}
          </Link>
        ) : (
          <button
            onClick={actionOnClick}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors shadow-lg shadow-blue-500/20"
          >
            {actionLabel}
          </button>
        )
      )}
    </div>
  );
}
