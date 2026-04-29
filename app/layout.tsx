import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "dprplx — Software distilled to its essence",
  description:
    "A holding company building a focused portfolio of software products. Each one shaped by a single principle: the beauty of simplicity.",
  metadataBase: new URL("https://dprplx.com"),
  openGraph: {
    title: "dprplx — Software distilled to its essence",
    description:
      "A holding company building a focused portfolio of software products. Each one shaped by a single principle: the beauty of simplicity.",
    url: "https://dprplx.com",
    siteName: "dprplx",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "dprplx — Software distilled to its essence",
    description:
      "A holding company building a focused portfolio of software products.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
