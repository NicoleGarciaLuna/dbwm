import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
    <html lang="es">
      <body className={inter.className}>
        <div id="skip-link">
          <a href="#main-content" className="sr-only focus:not-sr-only">
            Skip to main content
          </a>
        </div>
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
