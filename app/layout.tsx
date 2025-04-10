import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { mont } from '@/app/ui/fonts';
import Logo from "@/app/ui/images/Logo";
import DarkModeToggle from "@/app/components/darkmodetoggle";
import "./globals.css";

 
export const metadata: Metadata = {
  title: {
    template: "%s | Cooper's Corner",
    default: "Cooper's Corner",
  },
  description: 'Maker Portfolio | High School Student at Montgomery Blair.',

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
    <html lang="en">
      <body className={`${mont.className} antialiased`}>
          {children}
      </body>
    </html>
  );
}
