import type { Metadata, Viewport } from "next";
import "./globals.css";
import { hackerMono, manrope } from '@/app/ui/fonts';
import { ServiceWorkerUnregister } from "@/app/components/ServiceWorkerUnregister";
import { Analytics } from "@vercel/analytics/next"

const siteName = "Cooper's Corner";
const siteUrl = 'https://cooperscorner.vercel.app/';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    template: "%s | Cooper's Corner",
    default: siteName,
  },
  description: 'Cooper’s Corner — robots, web apps, PCBs, and more. Incoming Stanford freshman; previously ranked 1st in the world in debate and 2nd in robotics.',
  openGraph: {
    siteName,
    type: 'website',
  },

  // Icons for the Browser Tab (Favicon). SVG first for modern browsers, PNG
  // and ICO as fallbacks.
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-touch-icon.png',
  },

};

// Keeps mobile browser chrome on the page's own paper/charcoal instead of a
// default white or black bar.
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f0eee7' },
    { media: '(prefers-color-scheme: dark)', color: '#191715' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${manrope.variable} ${hackerMono.variable} antialiased`}>
        <script
          id="website-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: siteName,
              alternateName: 'cooperscorner.vercel.app',
              url: siteUrl,
            }).replace(/</g, '\\u003c'),
          }}
        />
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
