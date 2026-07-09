import type { Metadata } from "next";
import type { ReactNode } from "react";
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
  title: "Currency Calculator - USD to EUR & CHF",
  description:
    "Convert USD to EUR and CHF with current exchange rates from the European Central Bank",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen justify-center bg-linear-to-br from-gray-950 to-gray-800 p-4 pt-16">
          <main className="w-full max-w-4xl space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white">
                Currency Calculator
              </h1>
              <p className="mt-2 text-lg text-gray-300">
                USD to EUR & CHF Exchange Rates
              </p>
            </div>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
