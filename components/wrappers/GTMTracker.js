"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function GTMTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousUrlRef = useRef("");
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      previousUrlRef.current = window.location.href;
      return;
    }

    if (pathname) {
      const url =
        pathname +
        (searchParams?.toString() ? `?${searchParams.toString()}` : "");

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "virtualPageView",
        page: url,
        pageUrl: window.location.href,
        pageTitle: document.title,
        previousPageUrl: previousUrlRef.current || document.referrer,
      });

      previousUrlRef.current = window.location.href;
    }
  }, [pathname, searchParams]);

  return null;
}
