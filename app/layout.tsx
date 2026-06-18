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
  title: "Recurv — Stop chasing payments. Start running your business.",
  description:
    "Recurv handles the full collection cycle — from payment authorisation to reconciliation — across membership dues, payment plans, rent, subscriptions, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      style={{ background: "#FFFFFF" }}
    >
      <body style={{ margin: 0, fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
