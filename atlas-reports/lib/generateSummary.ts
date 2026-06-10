import { ParsedData } from "./sampleData";

export function generateSummary(data: ParsedData): string {
  const { totalViews, totalRevenue, avgRPM, topVideos, topCountries, viewsByDay, revenueByDay } = data;

  // Trend analysis: compare first vs second half of days
  const mid = Math.floor(viewsByDay.length / 2);
  const firstHalfViews = viewsByDay.slice(0, mid).reduce((s, d) => s + d.views, 0);
  const secondHalfViews = viewsByDay.slice(mid).reduce((s, d) => s + d.views, 0);
  const firstHalfRev = revenueByDay.slice(0, mid).reduce((s, d) => s + d.revenue, 0);
  const secondHalfRev = revenueByDay.slice(mid).reduce((s, d) => s + d.revenue, 0);

  const viewsTrend = secondHalfViews > firstHalfViews ? "increased" : "decreased";
  const revTrend = secondHalfRev > firstHalfRev ? "increased" : "decreased";
  const viewsDelta = firstHalfViews > 0 ? Math.abs(((secondHalfViews - firstHalfViews) / firstHalfViews) * 100).toFixed(1) : "N/A";
  const revDelta = firstHalfRev > 0 ? Math.abs(((secondHalfRev - firstHalfRev) / firstHalfRev) * 100).toFixed(1) : "N/A";

  const topVideo = topVideos[0];
  const topCountry = topCountries[0];

  const lines: string[] = [];

  lines.push("## Executive Summary\n");

  lines.push("### Performance Overview");
  lines.push(
    `During the reporting period, the channel generated **${totalViews.toLocaleString()} total views** and **$${totalRevenue.toLocaleString()} in estimated revenue**, with an average RPM of **$${avgRPM}**.\n`
  );

  lines.push("### What Increased");
  if (viewsTrend === "increased") {
    lines.push(`- **Views ${viewsTrend} by ${viewsDelta}%** in the second half of the period compared to the first half — a strong positive trend indicating growing audience reach.`);
  }
  if (revTrend === "increased") {
    lines.push(`- **Revenue ${revTrend} by ${revDelta}%**, suggesting improved monetization efficiency or higher-value content performing well.`);
  }
  if (viewsTrend !== "increased" && revTrend !== "increased") {
    lines.push(`- The channel maintained consistent engagement throughout the period.`);
  }
  lines.push("");

  lines.push("### What Decreased");
  if (viewsTrend === "decreased") {
    lines.push(`- **Views ${viewsTrend} by ${viewsDelta}%** in the second half — this may reflect seasonal patterns or reduced upload frequency.`);
  }
  if (revTrend === "decreased") {
    lines.push(`- **Revenue ${revTrend} by ${revDelta}%**, which could be linked to lower advertiser demand or a shift in content type.`);
  }
  if (viewsTrend !== "decreased" && revTrend !== "decreased") {
    lines.push(`- No significant decline detected in core metrics during this period.`);
  }
  lines.push("");

  lines.push("### Possible Reasons");
  lines.push(`- **Top performing video**: "${topVideo?.title}" dominated with ${topVideo?.views.toLocaleString()} views, suggesting strong audience interest in this content category.`);
  lines.push(`- **Top market**: ${topCountry?.country} accounts for the highest viewership — audience demographics and advertiser rates in this region directly impact RPM.`);
  lines.push(`- Algorithm boosts, seasonal trends, or social media shares may have contributed to performance spikes.\n`);

  lines.push("### Client-Friendly Recommendations");
  lines.push(`1. **Double down on top content**: "${topVideo?.title}" is resonating — create follow-up or series content in the same niche.`);
  lines.push(`2. **Optimize for ${topCountry?.country}**: Tailor thumbnails, titles, and posting schedules to peak engagement times in this market.`);
  lines.push(`3. **Improve RPM**: Review ad settings and consider enabling mid-roll ads on longer videos (8+ minutes) to maximize monetization.`);
  lines.push(`4. **Increase upload consistency**: Regular uploads improve algorithmic visibility and subscriber retention.`);
  lines.push(`5. **Analyze drop-off**: For videos with high views but lower revenue, check audience retention reports to identify drop-off points.`);

  return lines.join("\n");
}
