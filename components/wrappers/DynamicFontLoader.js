"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Font configurations for each starter
const starterFonts = {
  law: {
    family: "Lora",
    weights: ["400", "700"],
    variable: "--t-font-family--lora",
  },
  medical: {
    family: "Inter",
    weights: ["400", "600", "700"],
    variable: "--t-font-family--inter",
  },
  restaurant: {
    family: "Playfair Display",
    weights: ["400", "700"],
    variable: "--t-font-family--playfair",
  },
  // Add more starter fonts here...
};

export default function DynamicFontLoader() {
  const pathname = usePathname();

  useEffect(() => {
    // Extract starter slug from pathname
    const starterMatch = pathname?.match(/\/starters\/([^\/]+)/);

    if (!starterMatch || !starterMatch[1]) return;

    const starterSlug = starterMatch[1];
    const fontConfig = starterFonts[starterSlug];

    if (!fontConfig) return;

    // Check if font is already loaded
    const existingLink = document.querySelector(
      `link[data-starter-font="${starterSlug}"]`
    );
    if (existingLink) return;

    // Build Google Fonts URL
    const fontFamily = fontConfig.family.replace(/ /g, "+");
    const weights = fontConfig.weights.join(";");
    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontFamily}:wght@${weights}&display=swap`;

    // Create and append link element
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = fontUrl;
    link.setAttribute("data-starter-font", starterSlug);
    document.head.appendChild(link);

    // Set CSS variable
    document.documentElement.style.setProperty(
      fontConfig.variable,
      `'${fontConfig.family}', var(--t-font-family-system)`
    );

    // Cleanup function
    return () => {
      const linkToRemove = document.querySelector(
        `link[data-starter-font="${starterSlug}"]`
      );
      if (linkToRemove) {
        linkToRemove.remove();
      }
    };
  }, [pathname]);

  return null;
}
