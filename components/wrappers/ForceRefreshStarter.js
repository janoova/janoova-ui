"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ForceRefreshStarter = ({ basePath }) => {
  const pathname = usePathname();

  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      )
        return;

      const isLeavingStarter = !href.startsWith(basePath);

      if (isLeavingStarter) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        window.location.href = href;
      }
    };

    document.addEventListener("click", handleClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, [basePath, pathname]);

  return null;
};

export default ForceRefreshStarter;
