import React from "react";
import HeaderVariant01 from "@/components/blocks/header/HeaderVariant01";
import FooterVariant02 from "@/components/blocks/footer/FooterVariant02";
import { getNavigationBySlug, getSiteSettings } from "@/sanity/utils/queries";

const Layout = async ({ children }) => {
  const data = await getNavigationBySlug(`header`);
  const quickMenu = await getNavigationBySlug(`quick-menu`);
  const siteSettings = await getSiteSettings();
  return (
    <>
      <HeaderVariant01 siteSettings={siteSettings} navigationSchema={data} />
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
