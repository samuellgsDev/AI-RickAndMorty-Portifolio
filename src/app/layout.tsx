import type { Metadata } from "next";
import { Geist, Geist_Mono, Creepster, Press_Start_2P } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const creepster = Creepster({
  weight: "400",
  variable: "--font-creepster",
  subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
    weight: "400",
    variable: "--font-press-start",
    subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Samuel Gadelha | Multiverse Developer Portfolio",
  description: "Wubba Lubba Dub Dub! Full-stack developer traversing dimensions with .NET, React, AI, and interdimensional caffeine. Explore my projects across the multiverse!",
  keywords: ["developer", "portfolio", "full-stack", ".NET", "React", "TypeScript", "AI", "Rick and Morty"],
  authors: [{ name: "Samuel Gadelha" }],
  creator: "Samuel Gadelha",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://samuellgs.dev",
    siteName: "Samuel Gadelha Portfolio",
    title: "Samuel Gadelha | Multiverse Developer",
    description: "Full-stack developer creating APIs, automations, and scalable systems across the multiverse.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Samuel Gadelha Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Samuel Gadelha | Multiverse Developer",
    description: "Full-stack developer traversing dimensions with code.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  }
};

import { MultiverseProvider } from "@/context/MultiverseContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${creepster.variable} ${pressStart2P.variable} antialiased cursor-none`}
      >
        <MultiverseProvider>
            {children}
        </MultiverseProvider>
      </body>
    </html>
  );
}
