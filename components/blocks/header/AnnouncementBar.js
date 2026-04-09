"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { stegaClean } from "@sanity/client/stega";

const AnnouncementBar = ({ siteSettings }) => {
  const [atTop, setAtTop] = useState(true);
  const [isDark, setIsDark] = useState(false);

  const enabled = siteSettings?.announcement_bar_enabled;
  const title = stegaClean(siteSettings?.announcement_bar_title);
  const buttonTitle = stegaClean(siteSettings?.announcement_bar_button_title);
  const buttonUrl = stegaClean(siteSettings?.announcement_bar_button_url);
  const enablePhoneSvg = siteSettings?.announcement_bar_enable_phone_svg;
  const theme = stegaClean(siteSettings?.announcement_bar_theme) || "primary";
  const customBg = stegaClean(siteSettings?.announcement_bar_custom_bg);
  const pattern = stegaClean(siteSettings?.announcement_bar_pattern) || "none";

  useEffect(() => {
    const handleScroll = () => setAtTop(window.scrollY < 8);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const checkDark = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  if (!enabled) return null;

  const lightBg =
    customBg ||
    (theme === "secondary"
      ? "var(--t-secondary-branding-color)"
      : "var(--t-primary-branding-color)");

  const barBg = isDark ? "var(--t-cp-base-white)" : lightBg;
  const barBorder = isDark ? "1px solid var(--t-border-color)" : "none";

  const c = "rgba(255,255,255,0.07)";

  const patterns = {
    grid: {
      backgroundImage: `linear-gradient(${c} 1px, transparent 1px), linear-gradient(90deg, ${c} 1px, transparent 1px)`,
      backgroundSize: "22px 22px",
    },
    diagonal: {
      backgroundImage: `repeating-linear-gradient(45deg, ${c} 0, ${c} 1px, transparent 0, transparent 50%)`,
      backgroundSize: "12px 12px",
    },
    diamonds: {
      backgroundImage: `repeating-linear-gradient(45deg, ${c} 0, ${c} 1px, transparent 0, transparent 50%), repeating-linear-gradient(135deg, ${c} 0, ${c} 1px, transparent 0, transparent 50%)`,
      backgroundSize: "16px 16px",
    },
  };

  const patternStyle = patterns[pattern] ?? null;

  const btnBg = "#ffffff";
  const btnColor =
    theme === "secondary"
      ? "var(--t-secondary-branding-color)"
      : "var(--t-primary-branding-color)";

  return (
    <div
      className="overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out"
      style={{ maxHeight: atTop ? "80px" : "0px", opacity: atTop ? 1 : 0 }}
    >
      <div
        className="c__announcement-bar relative w-full py-2.5 px-4 overflow-hidden"
        style={{ background: barBg, borderBottom: barBorder }}
      >
        {/* Pattern layer with side fade */}
        {patternStyle && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              ...patternStyle,
              maskImage:
                "linear-gradient(to right, transparent, black 14%, black 86%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 14%, black 86%, transparent)",
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto flex items-center justify-center gap-3 flex-wrap">
          {title && (
            <p className="font-bold text-sm leading-none m-0 text-white">
              {title}
            </p>
          )}

          {buttonTitle && buttonUrl && (
            <Link
              href={buttonUrl}
              className="inline-flex items-center gap-1.5 text-xs font-bold rounded-full px-3 py-1.5 transition-opacity duration-150 shrink-0 no-underline hover:opacity-85"
              style={{
                backgroundColor: btnBg,
                color: btnColor,
                textDecoration: "none",
              }}
            >
              {enablePhoneSvg && (
                <Phone className="w-3 h-3 shrink-0" fill="currentColor" strokeWidth={0} />
              )}
              {buttonTitle}
              {!enablePhoneSvg && (
                <ArrowRight className="w-3 h-3 shrink-0" strokeWidth={2.5} />
              )}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
