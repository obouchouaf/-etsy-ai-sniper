"use client";

import { useState, useCallback } from "react";
import { sampleData, ParsedData } from "@/lib/sampleData";
import { parseCSV } from "@/lib/csvParser";
import { generateSummary } from "@/lib/generateSummary";
import StatCard from "@/components/StatCard";
import UploadZone from "@/components/UploadZone";
import { ViewsChart, RevenueChart, TopVideosChart } from "@/components/Charts";
import CountriesTable from "@/components/CountriesTable";
import SummaryPanel from "@/components/SummaryPanel";

function exportPDF() {
  window.print();
}

export default function Home() {
  const [data, setData] = useState<ParsedData>(sampleData);
  const [isSample, setIsSample] = useState(true);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleUpload = useCallback((text: string, name?: string) => {
    try {
      const parsed = parseCSV(text);
      setData(parsed);
      setIsSample(false);
      setFileName(name || "uploaded.csv");
    } catch {
      alert("Could not parse CSV. Please use a YouTube Analytics export file.");
    }
  }, []);

  const summary = generateSummary(data);

  return (
    <div className="min-h-screen" style={{ background: "#0f1117" }}>
      {/* Header */}
      <header className="border-b border-white/[0.07] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <span className="font-bold text-white text-lg tracking-tight">AtlasReports</span>
          <span className="text-white/30 text-sm hidden sm:block">YouTube Analytics</span>
        </div>
        <div className="flex items-center gap-3">
          {isSample && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/25">
              Demo Data
            </span>
          )}
          {fileName && !isSample && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
              {fileName}
            </span>
          )}
          <button
            onClick={exportPDF}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export PDF
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Upload zone */}
        <UploadZone onUpload={(text) => handleUpload(text, "uploaded.csv")} />

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Views"
            value={data.totalViews.toLocaleString()}
            icon={
              <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
            color="bg-indigo-500/15"
          />
          <StatCard
            label="Total Revenue"
            value={`$${data.totalRevenue.toLocaleString()}`}
            icon={
              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            color="bg-emerald-500/15"
          />
          <StatCard
            label="Average RPM"
            value={`$${data.avgRPM}`}
            icon={
              <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            }
            color="bg-amber-500/15"
          />
          <StatCard
            label="Videos Tracked"
            value={data.topVideos.length.toString()}
            icon={
              <svg className="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>
            }
            color="bg-rose-500/15"
          />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ViewsChart data={data.viewsByDay} />
          <RevenueChart data={data.revenueByDay} />
        </div>

        {/* Top videos + countries */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TopVideosChart data={data.topVideos} />
          <CountriesTable data={data.topCountries} />
        </div>

        {/* AI Summary */}
        <SummaryPanel summary={summary} />

        <footer className="text-center text-white/20 text-xs py-4">
          AtlasReports — Built for music labels, artists &amp; YouTube managers
        </footer>
      </main>
    </div>
  );
}
