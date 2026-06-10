import Papa from "papaparse";
import { VideoRow, computeMetrics, ParsedData } from "./sampleData";

type RawRow = Record<string, string>;

const DATE_KEYS = ["date", "day", "period"];
const TITLE_KEYS = ["video title", "title", "video", "content", "video name"];
const VIEWS_KEYS = ["views", "view count", "impressions"];
const REVENUE_KEYS = ["revenue", "estimated revenue", "earnings", "monetized playbacks revenue", "ad revenue"];
const RPM_KEYS = ["rpm", "revenue per mille", "revenue per 1000 views"];
const COUNTRY_KEYS = ["country", "geography", "location", "country of viewer"];
const SUBS_KEYS = ["subscribers gained", "subscribers", "new subscribers", "sub gained"];

function matchKey(headers: string[], candidates: string[]): string | undefined {
  const lower = headers.map((h) => h.toLowerCase().trim());
  for (const c of candidates) {
    const idx = lower.findIndex((h) => h.includes(c));
    if (idx !== -1) return headers[idx];
  }
  return undefined;
}

export function parseCSV(text: string): ParsedData {
  const result = Papa.parse<RawRow>(text.trim(), {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false,
  });

  const headers = result.meta.fields || [];

  const dateKey = matchKey(headers, DATE_KEYS);
  const titleKey = matchKey(headers, TITLE_KEYS);
  const viewsKey = matchKey(headers, VIEWS_KEYS);
  const revenueKey = matchKey(headers, REVENUE_KEYS);
  const rpmKey = matchKey(headers, RPM_KEYS);
  const countryKey = matchKey(headers, COUNTRY_KEYS);
  const subsKey = matchKey(headers, SUBS_KEYS);

  const rows: VideoRow[] = result.data.map((row, i) => {
    const views = viewsKey ? parseFloat(row[viewsKey]) || 0 : 0;
    const revenue = revenueKey ? parseFloat(row[revenueKey]) || 0 : 0;
    const rpm = rpmKey ? parseFloat(row[rpmKey]) || (views > 0 ? (revenue / views) * 1000 : 0) : views > 0 ? (revenue / views) * 1000 : 0;
    return {
      date: dateKey ? row[dateKey] : `Day ${i + 1}`,
      videoTitle: titleKey ? row[titleKey] || "Unknown Video" : "Unknown Video",
      views,
      revenue,
      rpm: parseFloat(rpm.toFixed(2)),
      country: countryKey ? row[countryKey] || "Unknown" : "Unknown",
      subscribersGained: subsKey ? parseFloat(row[subsKey]) || 0 : 0,
    };
  });

  return computeMetrics(rows);
}
