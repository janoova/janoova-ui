import "@/app/(frontend)/globals.css";
import { Outfit } from "next/font/google";

const globalFont = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-outfit",
});

export default function InternalLayout({ children }) {
  return (
    <html lang="en" className={globalFont.variable}>
      <body className={`${globalFont.className} bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
