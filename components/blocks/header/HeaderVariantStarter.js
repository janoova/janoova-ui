"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import { stegaClean } from "@sanity/client/stega";
import { Phone } from "lucide-react";
import { getStarterConfig, STARTER_LOGO_SVG } from "@/lib/starterConfig";

const updateActiveStatusByKey = (data, uid) => {
  if (!data || !Array.isArray(data)) return [];

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
  if (!data || !Array.isArray(data)) return null;

  for (let item of data) {
    if (item.uid === uid) {
      return item.active !== undefined ? item.active : null;
    }
    if (item.links && item.links.length > 0) {
      const result = getActiveStatusByKey(item.links, uid);
      if (result !== null) {
        return result;
      }
    }
  }
  return null;
};

const MenuLink = ({
  depth,
  hasChildren,
  elem,
  isMobile,
  pathname,
  handleNavigationState,
  navigationState,
}) => {
  if (!elem) return null;

  const isActive = getActiveStatusByKey(navigationState, elem.uid);

  return (
    <li
      className={`b__header__variant01__menu-item b__header__variant01__menu-item-depth-${depth} ${hasChildren ? `b__header__variant01__menu-item--has-children` : ``} ${isActive ? `b__header__variant01__menu-item--active` : ``}`}
      key={elem._key}
      role="none"
    >
      <div className="b__header__variant01__menu-item__text">
        <Link href={stegaClean(elem.destination)}>{elem.title}</Link>
        {hasChildren && (
          <button
            type="button"
            aria-label="Expand submenu"
            className="m-0 d-flex justify-content-center align-items-center b__header__variant01__menu-item__icon u__cursor-pointer"
            onClick={
              hasChildren
                ? () => {
                    handleNavigationState(elem.uid);
                  }
                : null
            }
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

      {elem.links && elem.links.length > 0 && (
        <ul role="menu">
          {elem.links.map((childElem) => (
            <MenuLink
              key={childElem._key}
              depth={depth + 1}
              hasChildren={childElem.links && childElem.links.length > 0}
              elem={childElem}
              isMobile={isMobile}
              pathname={pathname}
              handleNavigationState={handleNavigationState}
              navigationState={navigationState}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const HeaderVariantStarter = () => {
  const pathname = usePathname();

  // Get starter config - all data comes from here
  const starterConfig = useMemo(() => getStarterConfig(pathname), [pathname]);

  // If no config found, return null (shouldn't happen since Layout checks first)
  if (!starterConfig) return null;

  const { menu, basePath, headerButtons } = starterConfig;

  // Extract starter name from pathname (e.g., "/starters/law/about" -> "law")
  const starterName = pathname.match(/\/starters\/([^\/]+)/)?.[1];

  const [menuOpen, setMenuOpen] = useState(false);
  const [navigationState, setNavigationState] = useState(menu?.items || []);
  const [subMenusToggledByTab, setSubMenusToggledByTab] = useState(false);

  const handleNavigationState = (id) => {
    setNavigationState(updateActiveStatusByKey(navigationState, id));
    if (window.innerWidth >= 992) {
      setSubMenusToggledByTab(true);
    }
  };

  const handleResize = () => {
    if (window.innerWidth >= 992) {
      setNavigationState(menu?.items || []);
    }
  };

  const handleMouseMove = () => {
    if (subMenusToggledByTab) {
      setNavigationState(menu?.items || []);
      setSubMenusToggledByTab(false);
    }
  };

  useEffect(() => {
    setMenuOpen(false);
    setNavigationState(menu?.items || []);

    // Add starter classes to body
    document.body.classList.add("u__starter");
    if (starterName) {
      document.body.classList.add(`u__starter--${starterName}`);
    }

    // Cleanup: remove classes when component unmounts or pathname changes
    return () => {
      document.body.classList.remove("u__starter");
      if (starterName) {
        document.body.classList.remove(`u__starter--${starterName}`);
      }
    };
  }, [pathname, menu, starterName]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [subMenusToggledByTab, menu]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [menu]);

  return (
    <>
      <header className="b__header__variant01 b__header__variant01--glass b__header__variant01--sticky">
        <div className="container">
          <Button
            linkClassName="c__button--skip-to-content"
            theme="primary"
            title={`Skip to Content`}
            destination={`#main-content`}
          />
          <div className="b__header__variant01__wrapper">
            <Link
              className="u__text-decoration-none u__inherited-anchor"
              href={basePath}
            >
              <div className="b__header__variant01__logo-wrapper u__cursor-pointer">
                <div className="b__header__variant01__logo">
                  <STARTER_LOGO_SVG />
                </div>
              </div>
            </Link>
            <div className="b__header__variant01__nav-wrapper b__header__variant01__nav-wrapper-large">
              <nav className="b__header__variant01__nav">
                <ul role="menu">
                  {menu?.items?.map((elem) => {
                    let depth = 1;
                    let hasChildren = elem?.links && elem?.links?.length > 0;
                    return (
                      <MenuLink
                        depth={depth}
                        hasChildren={hasChildren}
                        elem={elem}
                        key={elem._key}
                        pathname={pathname}
                        navigationState={navigationState}
                        handleNavigationState={handleNavigationState}
                      />
                    );
                  })}
                </ul>
                {headerButtons?.primary?.title && (
                  <Button
                    title={headerButtons.primary.title}
                    destination={headerButtons.primary.destination}
                  />
                )}
                {headerButtons?.clickToCall?.title && (
                  <div className={`ms-[1rem] hidden min-[1040px]:block`}>
                    <Button
                      icon={Phone}
                      iconPosition={`before`}
                      theme={`secondary`}
                      title={headerButtons.clickToCall.title}
                      destination={headerButtons.clickToCall.destination}
                    />
                  </div>
                )}
              </nav>
            </div>
            <div className="b__header__variant01__hamburger-wrapper">
              <button
                onClick={() => {
                  menuOpen ? setMenuOpen(false) : setMenuOpen(true);
                }}
                type="button"
                role="button"
                aria-label="Hamburger toggler"
                className={`c__hamburger ${
                  menuOpen ? `c__hamburger--active` : ``
                }`}
              >
                <span className="c__hamburger__line c__hamburger__line-top"></span>
                <span className="c__hamburger__line c__hamburger__line-middle"></span>
                <span className="c__hamburger__line c__hamburger__line-bottom"></span>
              </button>
            </div>
            <div
              className={`b__header__variant01__nav-wrapper b__header__variant01__nav-wrapper-small ${menuOpen ? `b__header__variant01__nav-wrapper-small--active` : ``}`}
            >
              <div className={`b__header__variant01__navigation-board`}>
                <nav className="b__header__variant01__nav">
                  <ul role="menu">
                    {menu?.items?.map((elem) => {
                      let depth = 1;
                      let hasChildren = elem?.links && elem?.links?.length > 0;
                      return (
                        <MenuLink
                          depth={depth}
                          hasChildren={hasChildren}
                          elem={elem}
                          key={elem._key}
                          isMobile
                          pathname={pathname}
                          navigationState={navigationState}
                          handleNavigationState={handleNavigationState}
                        />
                      );
                    })}
                  </ul>
                  <div className="mt-4 pt-2">
                    {headerButtons?.clickToCall?.title && (
                      <div className={`mb-[1rem]`}>
                        <Button
                          icon={Phone}
                          iconPosition={`before`}
                          theme={`secondary`}
                          className="text-center w-full"
                          title={headerButtons.clickToCall.title}
                          destination={headerButtons.clickToCall.destination}
                        />
                      </div>
                    )}
                    {headerButtons?.primary?.title && (
                      <Button
                        className="text-center w-full"
                        title={headerButtons.primary.title}
                        destination={headerButtons.primary.destination}
                      />
                    )}
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div
        onClick={() => {
          setMenuOpen(false);
        }}
        className={`b__header__variant01__navigation-board__tint ${menuOpen ? `b__header__variant01__navigation-board__tint--active` : ``}`}
      ></div>
    </>
  );
};

export default HeaderVariantStarter;
