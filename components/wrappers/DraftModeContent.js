"use client";

import { VisualEditing } from "next-sanity/visual-editing";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function DraftModeContent() {
  const pathname = usePathname();

  // Synchronous check — available immediately on first render so <VisualEditing />
  // mounts before the Studio channel times out. useIsPresentationTool() is async
  // and causes "Unable to connect" because it starts as false.
  const [disconnected, setDisconnected] = useState(false);

  const [inIframe] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.self !== window.top;
  });

  useEffect(() => {
    document.documentElement.classList.add("draft-mode");
    return () => document.documentElement.classList.remove("draft-mode");
  }, []);

  useEffect(() => {
    if (!inIframe) return;

    // When the preview tab exits, it broadcasts "draft-mode-disabled".
    // Reload the iframe so the Studio re-enables draft mode automatically.
    const channel = new BroadcastChannel("sanity-draft-mode");
    channel.onmessage = (e) => {
      if (e.data === "disabled") setDisconnected(true);
    };

    // Prevent link navigation inside the Presentation Tool iframe so
    // editor overlays can intercept clicks correctly.
    const preventAnchorNavigation = (event) => {
      const target = event.target.closest("a");
      if (target?.tagName === "A") {
        event.preventDefault();
        const orig = target.style.opacity;
        target.style.opacity = "0.7";
        setTimeout(() => { target.style.opacity = orig; }, 150);
      }
    };

    document.addEventListener("click", preventAnchorNavigation, true);
    return () => {
      document.removeEventListener("click", preventAnchorNavigation, true);
      channel.close();
    };
  }, [inIframe]);

  // Inside Sanity Presentation Tool iframe — overlays only, plus a banner if
  // the preview tab exited and disconnected draft mode.
  if (inIframe) return (
    <>
      <VisualEditing />
      {disconnected && (
        <div style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.5rem 1.25rem",
          backgroundColor: "#7f1d1d",
          color: "#fff",
          fontSize: "0.8125rem",
          fontWeight: 500,
          boxShadow: "0 -1px 3px rgba(0,0,0,0.3)",
        }}>
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{
              width: 8, height: 8, borderRadius: "50%",
              backgroundColor: "#f87171", display: "inline-block", flexShrink: 0,
            }} />
            Live preview disconnected — draft mode was exited in another tab
          </span>
          <button
            onClick={() => window.top.location.reload()}
            style={{
              background: "none", cursor: "pointer", color: "#fca5a5",
              fontSize: "0.75rem", padding: "0.25rem 0.625rem",
              border: "1px solid #991b1b", borderRadius: 6,
              transition: "color 0.15s, border-color 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#fca5a5"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#fca5a5"; e.currentTarget.style.borderColor = "#991b1b"; }}
          >
            Refresh editor
          </button>
        </div>
      )}
    </>
  );

  // Outside the editor (new tab preview) — bar only, no overlays
  const exitHref = `/api/disable-draft?returnTo=${encodeURIComponent(pathname)}`;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
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
        boxShadow: "0 -1px 3px rgba(0,0,0,0.3)",
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
        onClick={() => {
          const channel = new BroadcastChannel("sanity-draft-mode");
          channel.postMessage("disabled");
          channel.close();
        }}
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
  );
}
