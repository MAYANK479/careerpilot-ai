import React from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export function ErrorState({ title = "Something went wrong", message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-red-900/30 rounded-2xl bg-red-950/10">
      <div className="w-16 h-16 rounded-2xl bg-red-900/20 flex items-center justify-center mb-6 shadow-inner border border-red-500/10">
        <AlertTriangle className="w-8 h-8 text-red-400" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-red-200/70 max-w-sm mb-8">{message}</p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#111B2E] hover:bg-[#1e293b] text-white font-medium rounded-lg transition-colors border border-white/10"
        >
          <RefreshCcw size={16} />
          Try Again
        </button>
      )}
    </div>
  );
}
