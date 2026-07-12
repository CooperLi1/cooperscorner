import type { Metadata } from "next";
import "./globals.css";
import { hackerMono, manrope } from '@/app/ui/fonts';
import { ServiceWorkerUnregister } from "@/app/components/ServiceWorkerUnregister";
import { Analytics } from "@vercel/analytics/next"


export const metadata: Metadata = {
  title: {
    template: "%s | Cooper's Corner",
    default: "Cooper's Corner",
  },
  description: 'Maker Portfolio | Rising Stanford freshman and full-stack maker.',

  // Icons for the Browser Tab (Favicon)
  icons: {
    icon: '/favicon.ico', // Standard favicon (default)
    shortcut: '/favicon-32x32.png', // Common shortcut icon
    apple: '/apple-touch-icon.png', // Apple Touch Icon for mobile
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${manrope.variable} ${hackerMono.variable} antialiased`}>
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;animation:none !important}[data-reveal-line]::before{transform:none !important}`}</style>
        </noscript>
        <ServiceWorkerUnregister />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
