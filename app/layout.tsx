import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "dprplx — An agency that rebuilds how businesses work",
  description:
    "dprplx is an agency that helps businesses rebuild how they operate for the age of agents — leaner, clearer, and built to run themselves.",
  metadataBase: new URL("https://dprplx.com"),
  openGraph: {
    title: "dprplx — An agency that rebuilds how businesses work",
    description:
      "dprplx is an agency that helps businesses rebuild how they operate for the age of agents — leaner, clearer, and built to run themselves.",
    url: "https://dprplx.com",
    siteName: "dprplx",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "dprplx — An agency that rebuilds how businesses work",
    description:
      "dprplx is an agency that helps businesses rebuild how they operate for the age of agents — leaner, clearer, and built to run themselves.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
