"use client";

import { useEffect } from "react";

export default function ForceRefreshLinks() {
  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest("a");

      if (!link) return;

      const href = link.getAttribute("href");

      // Skip if no href or if it's a hash link
      if (!href || href.startsWith("#")) return;

      // Skip if it's an external link
      if (link.hostname && link.hostname !== window.location.hostname) return;

      // Skip if it has target="_blank" or similar
      if (link.target && link.target !== "_self") return;

      // Skip if modifier keys are pressed (user wants new tab)
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

      // Prevent default SPA behavior and stop propagation
      e.preventDefault();
      e.stopPropagation();

      // Force full page reload
      window.location.href = href;
    };

    // Attach click listener to document with capture phase to intercept early
    document.addEventListener("click", handleClick, true);

    // Cleanup
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  return null;
}
