export const Groups = [
  {
    name: "seo",
    title: "SEO",
  },
  {
    name: "content",
    title: "Content",
  },
  {
    name: "style",
    title: "Style",
  },
];

export const QUERY_omitDrafts =
  process.env.NODE_ENV === "development"
    ? "!(_originalId match 'drafts.**')"
    : "!(_id match 'drafts.**')";
