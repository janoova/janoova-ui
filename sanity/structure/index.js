import { StructureResolver } from "sanity/structure";
import { VscMultipleWindows, VscServerProcess } from "react-icons/vsc";
import { MdArticle } from "react-icons/md";
import { FormSubmissionsLink } from "./FormSubmissionsLink";

export const structure = (S) =>
  S.list()
    .title("Base")
    .items([
      S.documentTypeListItem("page").title("Pages").icon(VscMultipleWindows),
      S.documentTypeListItem("post").title("Posts"),
      S.documentTypeListItem("post_category").title("Post Categories"),
      S.listItem()
        .title("Global Testimonials")
        .id("global_testimonials")
        .child(
          S.document()
            .schemaType("global_testimonials")
            .documentId("global_testimonials")
        ),
      S.divider(),
      S.documentTypeListItem("form").title("Forms"),
      S.listItem()
        .title("Form Submissions")
        .id("form-submissions-dashboard")
        .child(S.component(FormSubmissionsLink).title("Form Submissions")),
      S.documentTypeListItem("navigation").title("Navigation"),
      S.divider(),
      // Singletons
      S.listItem()
        .title("Site Settings")
        .id("site_settings")
        .child(
          S.document().schemaType("site_settings").documentId("site_settings")
        ),
    ]);
