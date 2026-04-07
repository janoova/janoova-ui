import { EyeOpenIcon } from "@sanity/icons";
import { baseUrl } from "@/lib/constants";

export function viewPageAction({ type, draft, published }) {
  const doc = draft || published;
  const slug = doc?.slug?.current;

  if (!slug) return null;

  const directory = type === "post" ? "/blog" : "";
  const path = slug === "index" ? "" : `/${slug}`;
  const href = `${baseUrl}${[directory, path].filter(Boolean).join("")}`;

  return {
    label: "View Page",
    icon: EyeOpenIcon,
    onHandle: () => {
      window.open(href, "_blank");
    },
  };
}
