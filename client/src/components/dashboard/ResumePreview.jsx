import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Copy, Check, ChevronDown, ChevronUp } from "lucide-react";

function ResumePreview({ text = "" }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!text) return null;

  const displayText = expanded ? text : text.slice(0, 1200);
  const isTruncated = text.length > 1200;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass rounded-2xl p-6 glow-hover"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
            <FileText size={16} className="text-slate-400" />
          </div>
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Extracted Text
          </h3>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition px-3 py-1.5 rounded-lg hover:bg-slate-800"
        >
          {copied ? (
            <>
              <Check size={14} className="text-emerald-400" />
              Copied
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy
            </>
          )}
        </button>
      </div>

      <pre className="whitespace-pre-wrap text-sm text-slate-400 leading-relaxed max-h-80 overflow-auto font-mono bg-slate-950/50 rounded-xl p-4">
        {displayText}
        {isTruncated && !expanded && "..."}
      </pre>

      {isTruncated && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition mx-auto"
        >
          {expanded ? (
            <>
              <ChevronUp size={14} />
              Show less
            </>
          ) : (
            <>
              <ChevronDown size={14} />
              Show full text
            </>
          )}
        </button>
      )}
    </motion.div>
  );
}

export default ResumePreview;
