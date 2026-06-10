"use client";

interface CountriesTableProps {
  data: { country: string; views: number; revenue: number }[];
}

export default function CountriesTable({ data }: CountriesTableProps) {
  const maxViews = Math.max(...data.map((d) => d.views), 1);
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-base font-semibold text-white/80 mb-4">Top 10 Countries</h3>
      <div className="space-y-3">
        {data.map((row, i) => (
          <div key={row.country} className="flex items-center gap-3">
            <span className="text-xs text-white/30 w-5 text-right">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-white/80 truncate">{row.country}</span>
                <div className="flex gap-3 ml-2 text-xs text-white/50 shrink-0">
                  <span>{row.views.toLocaleString()}</span>
                  <span className="text-emerald-400">${row.revenue.toLocaleString()}</span>
                </div>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                  style={{ width: `${(row.views / maxViews) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
