"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Select from "react-select";

const GOOGLE_FONTS = [
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Oswald",
  "Source Sans Pro",
  "Raleway",
  "Poppins",
  "Merriweather",
  "PT Sans",
  "Ubuntu",
  "Playfair Display",
  "Nunito",
  "Mukta",
  "Rubik",
  "Work Sans",
  "Noto Sans",
  "Fira Sans",
  "Quicksand",
  "Karla",
  "Bebas Neue",
  "Libre Baskerville",
  "Anton",
  "Inconsolata",
  "Cabin",
  "Crimson Text",
  "Barlow",
  "Titillium Web",
  "Bitter",
  "Dosis",
  "Exo 2",
  "Josefin Sans",
  "Archivo",
  "Hind",
  "Yanone Kaffeesatz",
  "DM Sans",
  "Inter",
  "Manrope",
  "Space Grotesk",
  "Lexend",
  "Plus Jakarta Sans",
  "Sora",
  "Outfit",
  "Jost",
  "IBM Plex Sans",
  "Red Hat Display",
  "Epilogue",
  "Space Mono",
  "JetBrains Mono",
  "Spectral",
  "Kanit",
  "Oxygen",
  "Heebo",
  "Mulish",
  "Prompt",
  "Arimo",
  "Exo",
  "Hind Siliguri",
  "Libre Franklin",
  "Fjalla One",
  "Varela Round",
  "Signika Negative",
  "Assistant",
  "Overpass",
  "EB Garamond",
  "Lora",
  "Maven Pro",
  "Zilla Slab",
  "Noto Serif",
  "Abel",
  "Righteous",
  "Pacifico",
  "Acme",
  "Lobster",
  "Comfortaa",
  "Fredoka",
  "IBM Plex Mono",
  "Staatliches",
  "Permanent Marker",
  "Dancing Script",
  "Shadows Into Light",
  "Indie Flower",
  "Alfa Slab One",
  "Saira Condensed",
  "Tajawal",
  "Catamaran",
  "Barlow Condensed",
  "Cairo",
  "Noto Sans JP",
  "Noto Sans KR",
  "Noto Sans TC",
  "Noto Sans SC",
  "Philosopher",
  "Urbanist",
  "Albert Sans",
  "Public Sans",
  "Figtree",
  "Bricolage Grotesque",
  "Onest",
  "Syne",
  "General Sans",
];

const WEIGHTS = [
  { label: "Thin (100)", value: "100" },
  { label: "Light (300)", value: "300" },
  { label: "Normal (400)", value: "400" },
  { label: "Medium (500)", value: "500" },
  { label: "Semibold (600)", value: "600" },
  { label: "Bold (700)", value: "700" },
  { label: "Extrabold (800)", value: "800" },
  { label: "Black (900)", value: "900" },
];

const customStyles = {
  control: (base, state) => ({
    ...base,
    borderColor: state.isFocused ? "#000" : "#d1d5db",
    borderWidth: "2px",
    borderRadius: "8px",
    boxShadow: state.isFocused ? "0 0 0 1px #000" : "none",
    "&:hover": {
      borderColor: "#000",
    },
    minHeight: "42px",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#000"
      : state.isFocused
        ? "#f3f4f6"
        : "white",
    color: state.isSelected ? "#fff" : "#000",
    fontFamily: state.data.fontFamily || "inherit",
    fontSize: "16px",
    padding: "10px 12px",
    cursor: "pointer",
    "&:active": {
      backgroundColor: "#000",
    },
  }),
  singleValue: (base, state) => ({
    ...base,
    fontFamily: state.data.fontFamily || "inherit",
    fontSize: "16px",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "8px",
    border: "2px solid #e5e7eb",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
    maxHeight: "300px",
  }),
};

function FontSelectorContent() {
  const searchParams = useSearchParams();
  const [showSelector, setShowSelector] = useState(false);
  const [headingFont, setHeadingFont] = useState({
    label: "Outfit",
    value: "Outfit",
    fontFamily: "Outfit",
  });
  const [bodyFont, setBodyFont] = useState({
    label: "Outfit",
    value: "Outfit",
    fontFamily: "Outfit",
  });
  const [headingWeight, setHeadingWeight] = useState({
    label: "Bold (700)",
    value: "700",
  });
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const fontOptions = GOOGLE_FONTS.map((font) => ({
    label: font,
    value: font,
    fontFamily: font,
  }));

  const applyFonts = (hFont, bFont, hWeight) => {
    // Update CSS variables
    document.documentElement.style.setProperty(
      "--t-font-family-heading",
      `"${hFont}", var(--t-font-family-system)`
    );
    document.documentElement.style.setProperty(
      "--t-font-family-body",
      `"${bFont}", var(--t-font-family-system)`
    );
    document.documentElement.style.setProperty(
      "--t-font-weight-heading",
      hWeight
    );

    // Save to localStorage
    localStorage.setItem(
      "fontSettings",
      JSON.stringify({
        headingFont: hFont,
        bodyFont: bFont,
        headingWeight: hWeight,
      })
    );
  };

  useEffect(() => {
    const customizeFont = searchParams?.get("customize_font");
    setShowSelector(customizeFont === "true");

    if (customizeFont === "true") {
      const savedSettings = localStorage.getItem("fontSettings");
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setHeadingFont({
          label: settings.headingFont,
          value: settings.headingFont,
          fontFamily: settings.headingFont,
        });
        setBodyFont({
          label: settings.bodyFont,
          value: settings.bodyFont,
          fontFamily: settings.bodyFont,
        });
        const weight = WEIGHTS.find((w) => w.value === settings.headingWeight);
        setHeadingWeight(weight || { label: "Bold (700)", value: "700" });
      }

      const fontFamilies = GOOGLE_FONTS.map(
        (font) =>
          font.replace(/ /g, "+") + ":wght@100;300;400;500;600;700;800;900"
      ).join("&family=");

      const link = document.createElement("link");
      link.href = `https://fonts.googleapis.com/css2?family=${fontFamilies}&display=swap`;
      link.rel = "stylesheet";

      link.onload = () => setFontsLoaded(true);
      document.head.appendChild(link);

      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    }
  }, [searchParams]);

  useEffect(() => {
    if (fontsLoaded) {
      applyFonts(headingFont.value, bodyFont.value, headingWeight.value);
    }
  }, [headingFont, bodyFont, headingWeight, fontsLoaded]);

  if (!showSelector) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-96 max-h-[600px] overflow-y-auto">
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Heading Font
            </label>
            <Select
              value={headingFont}
              onChange={(option) => setHeadingFont(option)}
              options={fontOptions}
              styles={customStyles}
              isSearchable={true}
              placeholder="Select heading font..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Heading Weight
            </label>
            <Select
              value={headingWeight}
              onChange={(option) => setHeadingWeight(option)}
              options={WEIGHTS}
              styles={customStyles}
              isSearchable={false}
              placeholder="Select weight..."
            />
          </div>

          <div className="border-t border-gray-200 my-4"></div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Body Font
            </label>
            <Select
              value={bodyFont}
              onChange={(option) => setBodyFont(option)}
              options={fontOptions}
              styles={customStyles}
              isSearchable={true}
              placeholder="Select body font..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FontSelector() {
  return (
    <Suspense fallback={null}>
      <FontSelectorContent />
    </Suspense>
  );
}
