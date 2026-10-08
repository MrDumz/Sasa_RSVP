import type { Metadata } from "next";
import { Baloo_2, Fredoka, Nunito, Pacifico } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({ subsets: ["latin"], variable: "--font-display" });
const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-accent" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-body" });
const pacifico = Pacifico({ subsets: ["latin"], weight: "400", variable: "--font-cursive" });

export const metadata: Metadata = {
  title: "Samantha's Magical 7th Birthday",
  description: "Join us for Samantha's magical 7th birthday celebration.",
  openGraph: {
    title: "Samantha's Magical 7th Birthday",
    description: "December 5, 2026 at 3:00 PM",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${baloo.variable} ${fredoka.variable} ${nunito.variable} ${pacifico.variable}`}>{children}</body>
    </html>
  );
}