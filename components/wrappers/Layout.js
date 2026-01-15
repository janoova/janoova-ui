import React from "react";
import { headers } from "next/headers";
import HeaderVariant01 from "@/components/blocks/header/HeaderVariant01";
import HeaderVariantStarter from "@/components/blocks/header/HeaderVariantStarter";
import FooterVariant02 from "@/components/blocks/footer/FooterVariant02";
import { getNavigationBySlug, getSiteSettings } from "@/sanity/utils/queries";

const Layout = async ({ children }) => {
  const data = await getNavigationBySlug(`header`);
  const quickMenu = await getNavigationBySlug(`quick-menu`);
  const siteSettings = await getSiteSettings();

  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isStarterSite = pathname.includes("/starters/");

  return (
    <>
      {isStarterSite ? (
        <HeaderVariantStarter />
      ) : (
        <HeaderVariant01 siteSettings={siteSettings} navigationSchema={data} />
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
