"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import { organization } from "@/lib/constants";
import { stegaClean } from "@sanity/client/stega";
import Image from "next/image";
import urlFor from "@/lib/imageUrlBuilder";
import { Phone, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────
// Helpers (same as HeaderVariant01)
// ─────────────────────────────────────────────────────────────
const updateActiveStatusByKey = (data, uid) => {
  let itemFoundAtLevel = false;
  const updatedData = data.map((item) => {
    if (item.uid === uid) {
      itemFoundAtLevel = true;
      return { ...item, active: item.active ? false : true };
    }
    return item;
  });
  return updatedData.map((item) => {
    if (window.innerWidth >= 992) {
      if (itemFoundAtLevel && item.uid !== uid) {
        return { ...item, active: false };
      }
    }
    if (item.links && item.links.length > 0) {
      return { ...item, links: updateActiveStatusByKey(item.links, uid) };
    }
    return item;
  });
};

const getActiveStatusByKey = (data, uid) => {
  for (let item of data) {
    if (item.uid === uid) return item.active !== undefined ? item.active : null;
    if (item.links && item.links.length > 0) {
      const result = getActiveStatusByKey(item.links, uid);
      if (result !== null) return result;
    }
  }
  return null;
};

// ─────────────────────────────────────────────────────────────
// Desktop nav item — recursive, hover + keyboard, 3 levels
// ─────────────────────────────────────────────────────────────
const DesktopNavItem = ({ elem, depth = 1 }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const closeTimer = useRef(null);
  const hasChildren = elem?.links?.length > 0;
  const dest = stegaClean(elem.destination);
  const isNested = depth > 1;

  // Delay close so the mouse can cross the gap between trigger and dropdown
  const handleMouseEnter = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") setOpen(false);
    if ((e.key === "Enter" || e.key === " ") && hasChildren) {
      e.preventDefault();
      setOpen((v) => !v);
    }
  };

  // Top-level: V01 style (0.9rem semibold, heading color, no underline)
  // Nested: smaller, normal weight — shadcn dropdown item style
  const linkBase = cn(
    "transition-colors duration-150 outline-none ![text-decoration:none] hover:![text-decoration:none] !text-[var(--t-heading-color)] hover:!text-[var(--t-primary-branding-color)] focus-visible:!text-[var(--t-primary-branding-color)] focus-visible:outline-2 focus-visible:outline-[var(--t-primary-branding-color)] focus-visible:outline-offset-2 focus-visible:rounded-sm",
    !isNested ? "whitespace-nowrap text-[0.9rem] font-semibold" : "text-[0.875rem] font-semibold"
  );

  return (
    <li
      ref={ref}
      role="none"
      className={cn(
        "relative list-none",
        // Shadcn-style hover bg on dropdown items
        isNested && "mx-0.5 rounded-md hover:bg-[var(--t-light-background-color)] transition-colors duration-100 border-b border-[var(--t-border-color)]/50 last:border-0"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={cn("flex items-center", isNested && "w-full")}>
        {dest ? (
          <Link
            href={dest}
            role="menuitem"
            onKeyDown={handleKeyDown}
            className={cn(
              linkBase,
              !isNested
                ? (hasChildren ? "pl-3 pr-1 py-2" : "px-3 py-2")
                : "flex-1 px-2 py-2.5"
            )}
          >
            {elem.title}
          </Link>
        ) : (
          <span
            role="presentation"
            className={cn(
              linkBase, "select-none opacity-60",
              !isNested
                ? (hasChildren ? "pl-3 pr-1 py-2" : "px-3 py-2")
                : "flex-1 px-2 py-2.5"
            )}
          >
            {elem.title}
          </span>
        )}

        {hasChildren && (
          <button
            type="button"
            aria-expanded={open}
            aria-haspopup="menu"
            aria-label={`${open ? "Close" : "Open"} ${elem.title} submenu`}
            onKeyDown={handleKeyDown}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "flex-shrink-0 flex items-center justify-center transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-[var(--t-primary-branding-color)] rounded !text-[var(--t-heading-color)]",
              // Clearly show open state
              open ? "opacity-100" : "opacity-40 hover:opacity-80",
              !isNested ? "pr-2 pl-0.5 py-2" : "pr-2 py-2.5"
            )}
          >
            <ChevronDown
              size={12}
              strokeWidth={2.5}
              className={cn(
                "transition-transform duration-200",
                !isNested && (open ? "rotate-180" : "rotate-0"),
                isNested && (open ? "rotate-0" : "-rotate-90")
              )}
            />
          </button>
        )}
      </div>

      {/* Dropdown panel — shadcn style */}
      {hasChildren && open && (
        <ul
          role="menu"
          className={cn(
            "absolute z-50 min-w-[200px] bg-[var(--t-cp-base-white)] border border-[var(--t-border-color)] rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.06)] pt-1.5 pb-1 list-none m-0 p-0",
            !isNested ? "top-full left-0 mt-1" : "top-0 left-full ml-1 -mt-1"
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {elem.links.map((child) => (
            <DesktopNavItem
              key={child._key ?? child.uid}
              elem={child}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

// ─────────────────────────────────────────────────────────────
// Mobile nav item — uses HeaderVariant01 CSS classes
// ─────────────────────────────────────────────────────────────
const MobileNavItem = ({ elem, depth = 1, navigationState, handleNavigationState }) => {
  const hasChildren = elem?.links?.length > 0;
  const dest = stegaClean(elem.destination);
  const isActive = getActiveStatusByKey(navigationState, elem.uid);

  return (
    <li
      className={`b__header__variant01__menu-item b__header__variant01__menu-item-depth-${depth} ${hasChildren ? `b__header__variant01__menu-item--has-children` : ``} ${isActive ? `b__header__variant01__menu-item--active` : ``}`}
      role="none"
    >
      <div className="b__header__variant01__menu-item__text">
        {dest ? (
          <Link href={dest}>{elem.title}</Link>
        ) : (
          <span>{elem.title}</span>
        )}
        {hasChildren && (
          <button
            type="button"
            aria-expanded={!!isActive}
            aria-label={`${isActive ? "Close" : "Open"} ${elem.title} submenu`}
            className="m-0 d-flex justify-content-center align-items-center b__header__variant01__menu-item__icon u__cursor-pointer"
            onClick={() => handleNavigationState(elem.uid)}
          >
            <span className="sr-only">Expand submenu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              style={{ width: "18px", height: "18px" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
        )}
      </div>
      {hasChildren && (
        <ul role="menu">
          {elem.links.map((child) => (
            <MobileNavItem
              key={child._key ?? child.uid}
              elem={child}
              depth={depth + 1}
              navigationState={navigationState}
              handleNavigationState={handleNavigationState}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

// ─────────────────────────────────────────────────────────────
// Header
// ─────────────────────────────────────────────────────────────
const HeaderVariant02 = ({ navigationSchema, siteSettings }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(65);
  const [navigationState, setNavigationState] = useState(navigationSchema?.items);
  const [subMenusToggledByTab, setSubMenusToggledByTab] = useState(false);
  const pathname = usePathname();
  const headerBarRef = useRef(null);
  const items = navigationSchema?.items ?? [];

  const handleNavigationState = (id) => {
    setNavigationState(updateActiveStatusByKey(navigationState, id));
    if (window.innerWidth >= 992) setSubMenusToggledByTab(true);
  };

  // Track actual header bar height for drawer positioning
  useEffect(() => {
    if (!headerBarRef.current) return;
    const ro = new ResizeObserver(() => {
      setHeaderHeight((headerBarRef.current?.offsetHeight ?? 65) - 1);
    });
    ro.observe(headerBarRef.current);
    setHeaderHeight(headerBarRef.current.offsetHeight);
    return () => ro.disconnect();
  }, []);

  // Sticky scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setNavigationState(navigationSchema?.items);
  }, [pathname]);

  // Reset nav state on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) setNavigationState(navigationSchema?.items);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset submenu state on mouse move (keyboard-toggled submenus)
  useEffect(() => {
    const handleMouseMove = () => {
      if (subMenusToggledByTab) {
        setNavigationState(navigationSchema?.items);
        setSubMenusToggledByTab(false);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [subMenusToggledByTab]);

  const logo = siteSettings?.logo?.asset ? (
    <Image
      className="h-[44px] w-auto object-contain"
      width={500}
      height={500}
      src={urlFor(siteSettings.logo).url()}
      alt={siteSettings.logo.alt ?? organization ?? "Logo"}
      sizes="200px"
    />
  ) : (
    <span className="font-bold text-xl u__font-family-heading tracking-tight u__heading-color">
      {organization || ""}
    </span>
  );

  return (
    <>
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999999] focus:px-5 focus:py-2.5 focus:bg-[var(--t-cp-base-white)] focus:text-[var(--t-heading-color)] focus:rounded-full focus:shadow-lg focus:text-sm focus:font-semibold focus:outline-2 focus:outline-[var(--t-primary-branding-color)] focus:[text-decoration:none]"
      >
        Skip to content
      </a>

      {/* ── Header bar ── */}
      <header
        ref={headerBarRef}
        role="banner"
        className={cn(
          "sticky top-0 inset-x-0 z-[99999] text-[var(--t-heading-color)] bg-transparent transition-[padding] duration-300 ease-in-out",
          !scrolled && "border-b border-[var(--t-border-color)]",
          scrolled && "min-[1200px]:pt-3 min-[1200px]:px-4"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between gap-6 transition-[box-shadow,background-color,backdrop-filter] duration-300 ease-in-out",
            "container py-2.5 min-[1200px]:rounded-full",
            !scrolled && "bg-[var(--t-cp-base-white)]",
            scrolled && [
              "bg-[var(--t-cp-base-white)]/80",
              "backdrop-blur-md",
              "shadow-[0_2px_12px_rgba(0,0,0,0.08)]",
              "dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)]",
              "dark:border dark:border-[var(--t-border-color)]",
              "min-[1200px]:!max-w-[1320px]",
              "min-[1200px]:!px-8",
            ]
          )}
        >
          {/* Logo */}
          <Link href="/" aria-label="Go to homepage" className="shrink-0">
            {logo}
          </Link>

          {/* Desktop nav */}
          <nav
            role="navigation"
            aria-label="Main navigation"
            className="hidden min-[992px]:flex items-center flex-1 justify-end"
          >
            <ul
              role="menubar"
              aria-label="Main menu"
              className="flex items-center gap-4 list-none m-0 p-0"
            >
              {items.map((elem) => (
                <DesktopNavItem
                  key={elem._key ?? elem.uid}
                  elem={elem}
                  depth={1}
                />
              ))}
            </ul>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden min-[992px]:flex items-center gap-2 shrink-0">
            {siteSettings?.header_button_title && (
              <Button
                title={siteSettings.header_button_title}
                destination={siteSettings.header_button_destination}
                theme="primary"
              />
            )}
            {siteSettings?.header_click_to_call_title && (
              <Button
                icon={Phone}
                iconPosition="before"
                theme="secondary"
                title={siteSettings.header_click_to_call_title}
                destination={siteSettings.header_click_to_call_destination}
              />
            )}
          </div>

          {/* Hamburger — mobile only */}
          <div className="min-[992px]:hidden b__header__variant01__hamburger-wrapper">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              type="button"
              role="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="b__header__variant02__mobile-nav"
              className={`c__hamburger ${menuOpen ? `c__hamburger--active` : ``}`}
            >
              <span className="c__hamburger__line c__hamburger__line-top" />
              <span className="c__hamburger__line c__hamburger__line-middle" />
              <span className="c__hamburger__line c__hamburger__line-bottom" />
            </button>
          </div>
        </div>

        {/* ── Mobile bottom drawer — inside header so absolute positioning anchors to sticky header ── */}
        <div
          id="b__header__variant02__mobile-nav"
          className={`b__header__variant01__nav-wrapper b__header__variant01__nav-wrapper-small ${menuOpen ? `b__header__variant01__nav-wrapper-small--active` : ``}`}
        >
          {/* Override top: 83px from V01 CSS — V02 header is shorter (py-2.5 + 44px logo ≈ 65px) */}
          <div className="b__header__variant01__navigation-board" style={{ top: `${headerHeight}px` }}>
            <nav className="b__header__variant01__nav" aria-label="Mobile navigation">
              <ul role="menu">
                {items.map((elem) => (
                  <MobileNavItem
                    key={elem._key ?? elem.uid}
                    elem={elem}
                    depth={1}
                    navigationState={navigationState}
                    handleNavigationState={handleNavigationState}
                  />
                ))}
              </ul>
              <div className="mt-4 pt-2">
                {siteSettings?.header_click_to_call_title && (
                  <div className="mb-[1rem]">
                    <Button
                      icon={Phone}
                      iconPosition="before"
                      theme="secondary"
                      className="text-center w-full"
                      title={siteSettings.header_click_to_call_title}
                      destination={siteSettings.header_click_to_call_destination}
                    />
                  </div>
                )}
                {siteSettings?.header_button_title && (
                  <Button
                    className="text-center w-full"
                    title={siteSettings.header_button_title}
                    destination={siteSettings.header_button_destination}
                    theme="primary"
                  />
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Backdrop tint — same as HeaderVariant01 */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`b__header__variant01__navigation-board__tint ${menuOpen ? `b__header__variant01__navigation-board__tint--active` : ``}`}
        style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
      />
    </>
  );
};

export default HeaderVariant02;
