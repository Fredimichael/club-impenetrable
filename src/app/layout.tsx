import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CLUB_NAME, CLUB_TAGLINE } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#05080e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: `${CLUB_NAME} | ${CLUB_TAGLINE}`,
  description: "Catálogo oficial exclusivo de Club Impenetrable. Indumentaria técnica de monte, artesanías nativas, sabores del monte chaqueño y experiencias.",
  keywords: ["Club Impenetrable", "catálogo", "Chaco", "monte", "artesanías", "indumentaria técnica", "experiencias"],
  openGraph: {
    title: `${CLUB_NAME} - Catálogo Oficial`,
    description: CLUB_TAGLINE,
    type: "website",
    locale: "es_AR",
    siteName: CLUB_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${CLUB_NAME} - Catálogo Oficial`,
    description: CLUB_TAGLINE,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#05080e] text-white selection:bg-emerald-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
