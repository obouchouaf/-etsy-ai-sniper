"use client";

interface SummaryPanelProps {
  summary: string;
}

export default function SummaryPanel({ summary }: SummaryPanelProps) {
  const lines = summary.split("\n");

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-xl bg-violet-500/20">
          <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
        </div>
        <div>
          <h3 className="text-base font-semibold text-white">AI Executive Summary</h3>
          <p className="text-xs text-white/40">Generated automatically from your data</p>
        </div>
      </div>
      <div className="space-y-2 text-sm text-white/75 leading-relaxed">
        {lines.map((line, i) => {
          if (!line.trim()) return <div key={i} className="h-2" />;
          if (line.startsWith("## ")) return <h2 key={i} className="text-lg font-bold text-white mt-2">{line.replace("## ", "")}</h2>;
          if (line.startsWith("### ")) return <h3 key={i} className="text-sm font-semibold text-indigo-300 mt-3">{line.replace("### ", "")}</h3>;
          // Bold text
          const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return <strong key={j} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
            }
            return part;
          });
          if (line.match(/^\d+\./)) return <p key={i} className="pl-4">{parts}</p>;
          if (line.startsWith("- ")) return <p key={i} className="pl-4 flex gap-2"><span className="text-indigo-400 mt-0.5">•</span><span>{parts.map((p, j) => typeof p === "string" ? p.replace(/^- /, "") : p)}</span></p>;
          return <p key={i}>{parts}</p>;
        })}
      </div>
    </div>
  );
}
