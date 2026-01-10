import { StructureResolver } from "sanity/structure";
import { VscMultipleWindows, VscServerProcess } from "react-icons/vsc";
import { MdArticle } from "react-icons/md";

export const structure = (S) =>
  S.list()
    .title("Base")
    .items([
      S.documentTypeListItem("page").title("Pages").icon(VscMultipleWindows),
      S.documentTypeListItem("post").title("Posts"),
      S.documentTypeListItem("post_category").title("Post Categories"),
      S.divider(),
      S.documentTypeListItem("form").title("Forms"),
      S.documentTypeListItem("navigation").title("Navigation"),
      S.divider(),
      // Singleton
      S.listItem()
        .title("Site Settings")
        .id("site_settings")
        .child(
          S.document().schemaType("site_settings").documentId("site_settings")
        ),
    ]);
