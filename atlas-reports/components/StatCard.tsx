"use client";

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  color: string;
}

export default function StatCard({ label, value, icon, trend, trendUp, color }: StatCardProps) {
  return (
    <div className="glass rounded-2xl p-6 flex flex-col gap-3 glass-hover transition-all duration-200">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white/50">{label}</span>
        <div className={`p-2 rounded-xl ${color}`}>{icon}</div>
      </div>
      <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
      {trend && (
        <div className={`text-xs font-medium ${trendUp ? "text-emerald-400" : "text-rose-400"}`}>
          {trendUp ? "▲" : "▼"} {trend}
        </div>
      )}
    </div>
  );
}
