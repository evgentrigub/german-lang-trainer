import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "German A2 Reading Trainer",
  description: "Offline-first German A2 reading comprehension trainer for Goethe Institut exam preparation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <div className="min-h-screen bg-gray-50">
            {/* Navigation Header */}
            <div className="bg-white border-b border-gray-200">
              <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
                <nav className="flex space-x-6">
                  <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Home
                  </Link>
                  <Link href="/practice" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Practice
                  </Link>
                  <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Dashboard
                  </Link>
                </nav>
                <LanguageSelector />
              </div>
            </div>
            
            {/* Main Content */}
            <div className="min-h-screen bg-gray-50">
              {children}
            </div>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
