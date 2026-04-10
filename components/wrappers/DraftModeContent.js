"use client";

import { VisualEditing } from "next-sanity/visual-editing";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function DraftModeContent() {
  const pathname = usePathname();
  const [inIframe, setInIframe] = useState(null); // null = unknown (SSR), then resolved

  useEffect(() => {
    setInIframe(window.self !== window.top);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("draft-mode");

    // In the Sanity Presentation tool, prevent link navigation so the editor
    // overlays can intercept clicks correctly. Also listen for block focus
    // messages so we can scroll the selected block into view.
    if (inIframe) {
      const preventAnchorNavigation = (event) => {
        const target = event.target.closest("a");
        if (target && target.tagName === "A") {
          event.preventDefault();
          const originalOpacity = target.style.opacity;
          target.style.opacity = "0.7";
          setTimeout(() => {
            target.style.opacity = originalOpacity;
          }, 150);
        }
      };
      document.addEventListener("click", preventAnchorNavigation, true);

      // Scroll-to-block: when the editor focuses a block path, scroll the
      // matching block wrapper into view.
      const handleEditorMessage = (event) => {
        const type = event.data?.type;
        // Sanity sends "presentation/focus" with data.path when a field is selected
        if (type !== "presentation/focus") return;
        const path = event.data?.data?.path;
        if (!path) return;

        // Path looks like: page_builder[_key=="abc123"].title
        // Extract the _key value to find the matching wrapper div.
        const keyMatch = path.match(/_key=="([^"]+)"/);
        if (!keyMatch) return;

        const el = document.querySelector(
          `[data-sanity-block-key="${keyMatch[1]}"]`
        );
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      };
      window.addEventListener("message", handleEditorMessage);

      return () => {
        document.removeEventListener("click", preventAnchorNavigation, true);
        window.removeEventListener("message", handleEditorMessage);
        document.documentElement.classList.remove("draft-mode");
      };
    }

    return () => {
      document.documentElement.classList.remove("draft-mode");
    };
  }, [inIframe]);

  // Still resolving — render nothing visible yet so there's no flash
  if (inIframe === null) return <VisualEditing />;

  // Inside Sanity's Presentation tool iframe — just the editing overlay, no UI chrome
  if (inIframe) {
    return <VisualEditing />;
  }

  // Outside the editor (shared preview link) — show a top preview bar
  const exitHref = `/api/disable-draft?returnTo=${encodeURIComponent(pathname)}`;

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.5rem 1.25rem",
          backgroundColor: "#18181b",
          color: "#fff",
          fontSize: "0.8125rem",
          fontWeight: 500,
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#22c55e",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          Previewing draft
        </span>
        <a
          href={exitHref}
          style={{
            color: "#a1a1aa",
            textDecoration: "none",
            fontSize: "0.75rem",
            padding: "0.25rem 0.625rem",
            border: "1px solid #3f3f46",
            borderRadius: 6,
            transition: "color 0.15s, border-color 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.borderColor = "#71717a";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#a1a1aa";
            e.currentTarget.style.borderColor = "#3f3f46";
          }}
        >
          Exit preview
        </a>
      </div>
      {/* Spacer so page content isn't hidden behind the bar */}
      <div style={{ height: 37 }} />
    </>
  );
}
