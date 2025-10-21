import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import LeadMagnetPopup from "./components/LeadMagnetPopup";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Million Dollar Blueprint | Design Your Million-Dollar Future",
  description: "Master the 5 skills AI can't replace. Learn frameworks from Fortune 100 companies like Amazon, Google, McKinsey, and Goldman Sachs.",
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-64.png', sizes: '64x64', type: 'image/png' },
      { url: '/favicon-128.png', sizes: '128x128', type: 'image/png' },
    ],
    apple: { url: '/favicon-256.png', sizes: '256x256', type: 'image/png' },
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
          {children}
          <LeadMagnetPopup />
        </Providers>
      </body>
    </html>
  );
}
