import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

import { SpeedInsights } from "@vercel/speed-insights/next";
import GoogleAnalytics from "./components/GoogleAnalytics";
import MetaPixel from "./components/MetaPixel";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Million Dollar Blueprint | Design Your Million-Dollar Future",
  description: "Master the 5 skills AI can't replace. Learn frameworks from Fortune 100 companies like Amazon, Google, McKinsey, and Goldman Sachs.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-64.png', sizes: '64x64', type: 'image/png' },
      { url: '/favicon-128.png', sizes: '128x128', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          <GoogleAnalytics />
          <MetaPixel />
          {children}

          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
