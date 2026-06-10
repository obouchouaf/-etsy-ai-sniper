export interface VideoRow {
  date: string;
  videoTitle: string;
  views: number;
  revenue: number;
  rpm: number;
  country: string;
  subscribersGained: number;
}

export interface ParsedData {
  rows: VideoRow[];
  totalViews: number;
  totalRevenue: number;
  avgRPM: number;
  topVideos: { title: string; views: number; revenue: number }[];
  topCountries: { country: string; views: number; revenue: number }[];
  viewsByDay: { date: string; views: number }[];
  revenueByDay: { date: string; revenue: number }[];
}

const titles = [
  "How to Mix Like a Pro | Tutorial",
  "Best Hip Hop Beats 2024 | No Copyright",
  "Lo-Fi Study Music 3 Hours",
  "Artist Interview: Behind the Lyrics",
  "Top 10 Music Production Tips",
  "Chill Vibes Playlist | 2 Hours",
  "Studio Session Vlog | Making a Hit",
  "Music Theory Basics for Beginners",
  "Best Free VST Plugins 2024",
  "Live Concert Highlights | World Tour",
  "Drum Programming Guide",
  "Mixing Vocals Like a Major Label",
];

const countries = ["United States", "United Kingdom", "Brazil", "Germany", "India", "France", "Canada", "Australia", "Mexico", "Japan"];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function dateStr(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split("T")[0];
}

function generateRows(): VideoRow[] {
  const rows: VideoRow[] = [];
  for (let day = 29; day >= 0; day--) {
    const date = dateStr(day);
    const numVideos = Math.floor(randomBetween(3, 7));
    for (let i = 0; i < numVideos; i++) {
      const title = titles[Math.floor(Math.random() * titles.length)];
      const views = Math.floor(randomBetween(500, 15000));
      const rpm = parseFloat(randomBetween(1.5, 8.0).toFixed(2));
      const revenue = parseFloat(((views / 1000) * rpm).toFixed(2));
      const country = countries[Math.floor(Math.random() * countries.length)];
      const subscribersGained = Math.floor(randomBetween(0, 50));
      rows.push({ date, videoTitle: title, views, revenue, rpm, country, subscribersGained });
    }
  }
  return rows;
}

export function computeMetrics(rows: VideoRow[]): ParsedData {
  const totalViews = rows.reduce((s, r) => s + r.views, 0);
  const totalRevenue = rows.reduce((s, r) => s + r.revenue, 0);
  const avgRPM = totalViews > 0 ? parseFloat(((totalRevenue / totalViews) * 1000).toFixed(2)) : 0;

  // Top videos
  const videoMap = new Map<string, { views: number; revenue: number }>();
  rows.forEach((r) => {
    const cur = videoMap.get(r.videoTitle) || { views: 0, revenue: 0 };
    videoMap.set(r.videoTitle, { views: cur.views + r.views, revenue: cur.revenue + r.revenue });
  });
  const topVideos = [...videoMap.entries()]
    .sort((a, b) => b[1].views - a[1].views)
    .slice(0, 10)
    .map(([title, v]) => ({ title, views: v.views, revenue: parseFloat(v.revenue.toFixed(2)) }));

  // Top countries
  const countryMap = new Map<string, { views: number; revenue: number }>();
  rows.forEach((r) => {
    const cur = countryMap.get(r.country) || { views: 0, revenue: 0 };
    countryMap.set(r.country, { views: cur.views + r.views, revenue: cur.revenue + r.revenue });
  });
  const topCountries = [...countryMap.entries()]
    .sort((a, b) => b[1].views - a[1].views)
    .slice(0, 10)
    .map(([country, v]) => ({ country, views: v.views, revenue: parseFloat(v.revenue.toFixed(2)) }));

  // By day
  const dayViewMap = new Map<string, number>();
  const dayRevMap = new Map<string, number>();
  rows.forEach((r) => {
    dayViewMap.set(r.date, (dayViewMap.get(r.date) || 0) + r.views);
    dayRevMap.set(r.date, (dayRevMap.get(r.date) || 0) + r.revenue);
  });
  const sortedDates = [...new Set(rows.map((r) => r.date))].sort();
  const viewsByDay = sortedDates.map((date) => ({ date, views: dayViewMap.get(date) || 0 }));
  const revenueByDay = sortedDates.map((date) => ({ date, revenue: parseFloat((dayRevMap.get(date) || 0).toFixed(2)) }));

  return { rows, totalViews, totalRevenue: parseFloat(totalRevenue.toFixed(2)), avgRPM, topVideos, topCountries, viewsByDay, revenueByDay };
}

export const sampleData: ParsedData = computeMetrics(generateRows());
