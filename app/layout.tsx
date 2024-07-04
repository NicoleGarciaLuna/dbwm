import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DBWM - Database Web Microempresarias",
  description: "Manage and analyze data for microentrepreneurs efficiently",
  keywords: "microentrepreneurs, database, management, analysis",
  authors: [{ name: "Your Organization Name" }],
  openGraph: {
    title: "DBWM - Database Web Microempresarias",
    description: "Manage and analyze data for microentrepreneurs efficiently",
    type: "website",
    url: "https://your-website-url.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
