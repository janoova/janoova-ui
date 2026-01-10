"use client";

import { useEffect, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";

const SmoothScrollLogic = () => {
  const searchParams = useSearchParams();

  const scrollToSection = useCallback((sectionId) => {
    // Clean the section ID - remove any leading # if present
    const cleanSectionId = sectionId.startsWith("#")
      ? sectionId.slice(1)
      : sectionId;

    const element = document.getElementById(cleanSectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return true;
    } else {
      console.warn(`Element with ID "${cleanSectionId}" not found`);
      return false;
    }
  }, []);

  // Handle smooth scroll links with #scroll: prefix
  const handleSmoothScrollClick = useCallback(
    (e) => {
      // Check if the clicked element or its parent is a link
      const link = e.target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // Handle #scroll: pattern only
      let sectionId = null;

      if (href.startsWith("#scroll:")) {
        sectionId = href.replace("#scroll:", "");
      }

      if (sectionId) {
        e.preventDefault();
        e.stopPropagation();

        // Add a small delay to ensure any other handlers complete
        requestAnimationFrame(() => {
          scrollToSection(sectionId);
        });
      }
    },
    [scrollToSection]
  );

  // Handle scroll_to_section query parameter on page load
  useEffect(() => {
    const scroll_to_section = searchParams?.get("scroll_to_section");

    if (scroll_to_section) {
      // Use a longer delay and multiple attempts to ensure the page is fully rendered
      const attemptScroll = (attempts = 0) => {
        const success = scrollToSection(scroll_to_section);

        // If scrolling failed and we haven't tried too many times, try again
        if (!success && attempts < 5) {
          setTimeout(() => attemptScroll(attempts + 1), 200);
        }
      };

      // Initial attempt after a short delay
      setTimeout(() => attemptScroll(), 100);
    }
  }, [searchParams, scrollToSection]);

  // Add click event listener for smooth scroll links
  useEffect(() => {
    // Use capture phase to ensure we catch the event before other handlers
    document.addEventListener("click", handleSmoothScrollClick, true);

    return () => {
      document.removeEventListener("click", handleSmoothScrollClick, true);
    };
  }, [handleSmoothScrollClick]);

  return null;
};

const SmoothScrollHandler = () => {
  return (
    <Suspense fallback={null}>
      <SmoothScrollLogic />
    </Suspense>
  );
};

export default SmoothScrollHandler;
