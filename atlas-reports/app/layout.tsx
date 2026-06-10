import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AtlasReports — YouTube Analytics",
  description: "Turn YouTube Analytics CSV files into client-ready performance reports.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
