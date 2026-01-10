"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function HeadingTagsDisplayInner() {
  const searchParams = useSearchParams();
  const showHeadingTags = searchParams.get("show_heading_tags") === "true";

  useEffect(() => {
    // Function to add heading tags
    const addHeadingTags = () => {
      const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      headings.forEach((heading) => {
        // Check if tag is already added to avoid duplicates
        if (!heading.querySelector(".heading-tag")) {
          const tag = heading.tagName;
          const span = document.createElement("span");
          span.style.color = "red";
          span.style.webkitTextFillColor = "red";
          span.className = "heading-tag";
          span.textContent = `[${tag}]`;
          heading.prepend(span);
        }
      });
    };

    // Function to remove heading tags
    const removeHeadingTags = () => {
      const tags = document.querySelectorAll(".heading-tag");
      tags.forEach((tag) => {
        tag.remove();
      });
    };

    if (showHeadingTags) {
      // Add tags initially
      addHeadingTags();

      // Set up observer to add tags to dynamically added headings
      const observer = new MutationObserver(() => {
        addHeadingTags();
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      return () => {
        observer.disconnect();
        removeHeadingTags();
      };
    } else {
      // Remove tags if parameter is not present or false
      removeHeadingTags();
    }
  }, [showHeadingTags]);

  return null;
}

export default function HeadingTagsDisplay() {
  return (
    <Suspense fallback={null}>
      <HeadingTagsDisplayInner />
    </Suspense>
  );
}
