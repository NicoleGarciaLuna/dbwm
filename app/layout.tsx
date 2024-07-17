import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";

export const metadata: Metadata = {
  title: "Microempresarias TCU - 781",
  description: "Manage and analyze data for microentrepreneurs efficiently",
  keywords: "microentrepreneurs, database, management, analysis",
  authors: [{ name: "UCR Occidente" }],
  openGraph: {
    title: "Microempresarias TCU - 781",
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
