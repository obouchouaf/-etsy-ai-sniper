"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

interface DayData {
  date: string;
  views?: number;
  revenue?: number;
}

function formatDate(dateStr: string) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return dateStr;
  }
}

const CustomTooltip = ({ active, payload, label, prefix = "" }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-xl p-3 text-sm shadow-xl">
        <p className="text-white/60 mb-1">{formatDate(label)}</p>
        <p className="text-white font-semibold">
          {prefix}{typeof payload[0].value === "number" ? payload[0].value.toLocaleString() : payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export function ViewsChart({ data }: { data: DayData[] }) {
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-base font-semibold text-white/80 mb-4">Views by Day</h3>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="date" tickFormatter={formatDate} tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
          <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={2} fill="url(#viewsGrad)" dot={false} activeDot={{ r: 4, fill: "#6366f1" }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RevenueChart({ data }: { data: DayData[] }) {
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-base font-semibold text-white/80 mb-4">Revenue by Day</h3>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="date" tickFormatter={formatDate} tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
          <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
          <Tooltip content={<CustomTooltip prefix="$" />} />
          <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fill="url(#revGrad)" dot={false} activeDot={{ r: 4, fill: "#10b981" }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TopVideosChart({ data }: { data: { title: string; views: number }[] }) {
  const shortened = data.map((d) => ({ ...d, shortTitle: d.title.length > 28 ? d.title.slice(0, 28) + "…" : d.title }));
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-base font-semibold text-white/80 mb-4">Top 10 Videos by Views</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={shortened} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
          <XAxis type="number" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v} />
          <YAxis type="category" dataKey="shortTitle" width={160} tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11 }} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="views" fill="#6366f1" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
