import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackgroundGrid from "@/components/background-grid";
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "paww.malwr.es | CTF Documentation",
  description: "Just a NPC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col relative text-foreground overflow-x-hidden">
        <BackgroundGrid />
        <div className="max-w-6xl mx-auto w-full px-6 flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
