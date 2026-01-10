"use client";

import { VisualEditing } from "next-sanity/visual-editing";
import { useEffect } from "react";

const anchorStyle = {
  position: "fixed",
  bottom: "1rem",
  right: "1rem",
  borderBottomRightRadius: "0",
  borderBottomLeftRadius: "0",
  fontSize: "0.75rem",
  lineHeight: "1rem",
  opacity: 1,
  backgroundColor: "#000",
  padding: "0.5rem 1rem",
  borderRadius: "7px",
  color: "#fff",
  fontWeight: 600,
  textDecoration: "none",
  zIndex: `999`,
  ":hover": { backgroundColor: `#999`, textDecoration: `none` },
};

export default function DraftModeContent() {
  useEffect(() => {
    // Add draft mode class to html element
    document.documentElement.classList.add("draft-mode");

    // Function to prevent anchor navigation but allow editing
    const preventAnchorNavigation = (event) => {
      const target = event.target.closest("a");
      if (target && target.tagName === "A") {
        // Allow the disable draft mode button to work
        if (target.getAttribute("href") === "/api/disable-draft") {
          return;
        }

        // Only prevent navigation, don't stop event propagation
        // This allows Sanity's editing events to still work
        event.preventDefault();

        // Optional: Add subtle visual feedback
        const originalOpacity = target.style.opacity;
        target.style.opacity = "0.7";
        setTimeout(() => {
          target.style.opacity = originalOpacity;
        }, 150);
      }
    };

    // Add event listeners
    document.addEventListener("click", preventAnchorNavigation, true);

    // Cleanup
    return () => {
      document.removeEventListener("click", preventAnchorNavigation, true);

      // Remove draft mode class when leaving draft mode
      document.documentElement.classList.remove("draft-mode");
    };
  }, []);

  return (
    <>
      <VisualEditing />
      <a style={anchorStyle} href="/api/disable-draft">
        Disable draft mode
      </a>
    </>
  );
}
