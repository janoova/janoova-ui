import React from "react";
import { headers } from "next/headers";
import HeaderVariant01 from "@/components/blocks/header/HeaderVariant01";
import HeaderVariant02 from "@/components/blocks/header/HeaderVariant02";
import HeaderVariantStarter from "@/components/blocks/header/HeaderVariantStarter";
import AnnouncementBar from "@/components/blocks/header/AnnouncementBar";
import FooterVariant02 from "@/components/blocks/footer/FooterVariant02";
import { getNavigationBySlug, getSiteSettings } from "@/sanity/utils/queries";

const Layout = async ({ children }) => {
  const data = await getNavigationBySlug(`header`);
  const quickMenu = await getNavigationBySlug(`quick-menu`);
  const siteSettings = await getSiteSettings();

  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isStarterSite = pathname.includes("/starters/");

  const headerVariant = siteSettings?.header_variant ?? "variant02";

  const renderHeader = () => {
    if (headerVariant === "variant01_basic")
      return <HeaderVariant01 siteSettings={siteSettings} navigationSchema={data} />;
    if (headerVariant === "variant01_glass")
      return <HeaderVariant01 siteSettings={siteSettings} navigationSchema={data} glass />;
    return <HeaderVariant02 siteSettings={siteSettings} navigationSchema={data} />;
  };

  return (
    <>
      {!isStarterSite && <AnnouncementBar siteSettings={siteSettings} />}
      {isStarterSite ? (
        <HeaderVariantStarter />
      ) : (
        renderHeader()
      )}
      <main id="main-content" className="overflow-hidden">
        {children}
      </main>
      <FooterVariant02
        navigationSchema={quickMenu}
        siteSettings={siteSettings}
      />
    </>
  );
};

export default Layout;
