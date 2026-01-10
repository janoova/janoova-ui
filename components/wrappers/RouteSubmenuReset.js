"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RouteSubmenuReset() {
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.add("u__disable-header-submenu");

    const timeout = setTimeout(() => {
      document.body.classList.remove("u__disable-header-submenu");
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
