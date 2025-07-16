// app/layout.tsx
import type { Metadata } from "next";
import { mont } from '@/app/ui/fonts';
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import ClientWrapper from "@/app/client-wrapper"; // new component you'll create

export const metadata: Metadata = {
  title: {
    template: "%s | Cooper's Corner",
    default: "Cooper's Corner",
  },
  description: 'Maker Portfolio | High School Student at Montgomery Blair.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mont.className} antialiased`}>
        <ClientWrapper /> {/* Handles client-side geolocation */}
        {children}
        <Analytics />
      </body>
    </html>
  );
}
