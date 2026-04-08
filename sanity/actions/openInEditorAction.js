import { EditIcon } from "@sanity/icons";

export function openInEditorAction({ type, draft, published }) {
  const doc = draft || published;
  const slug = doc?.slug?.current;

  if (!slug) return null;

  const directory = type === "post" ? "/blog" : "";
  const path = slug === "index" ? "" : `/${slug}`;
  const previewPath = [directory, path].filter(Boolean).join("") || "/";

  // ?preview= is explicitly preserved by Sanity's presentation tool router
  const href = `/studio/editor?preview=${encodeURIComponent(previewPath)}`;

  return {
    label: "Open in Editor",
    icon: EditIcon,
    onHandle: () => {
      window.location.href = href;
    },
  };
}
