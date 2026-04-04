import { getSiteSettings } from "@/sanity/utils/queries";
import { baseUrl, organization } from "@/lib/constants";
import urlFor from "@/lib/imageUrlBuilder";
import JsonLd from "./JsonLd";

export default async function OrganizationJsonLd() {
  const siteSettings = await getSiteSettings();
  const logo = siteSettings?.logo ? urlFor(siteSettings.logo).url() : null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: organization,
    url: baseUrl,
    ...(logo ? { logo } : {}),
  };

  return <JsonLd schema={schema} />;
}
