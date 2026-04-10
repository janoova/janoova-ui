import "@/app/(frontend)/globals.css";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata = {
  robots: { index: false, follow: false },
};

export default function InternalLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className={`${geistSans.className} bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
