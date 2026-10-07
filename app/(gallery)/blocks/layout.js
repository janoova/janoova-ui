import "@/app/(frontend)/globals.css";
import "@/styles/index.scss";
import { Outfit } from "next/font/google";
import StyledComponentsRegistry from "@/lib/registry";
import GlobalStyles from "@/styles/GlobalStyles";
import ThemeProvider from "@/components/wrappers/ThemeProvider";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "700"], display: "swap", variable: "--t-font-family--outfit" });

export const metadata = {
  title: "Website Block Library | Janoova",
  description: "Explore website layouts and choose the sections that suit your business.",
  robots: { index: false, follow: false },
};

export default function GalleryLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <GlobalStyles />
            {children}
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
