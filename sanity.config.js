import "@/styles/sanity.scss";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation";
import schemaTypes from "@/sanity/schemaTypes";
import clientConfig from "./sanity/config/clientConfig";
import { baseUrl, organization } from "./lib/constants";
import { locations } from "./sanity/utils/presentation";
import { codeInput } from "@sanity/code-input";
import { media } from "sanity-plugin-media";
import { structure } from "./sanity/structure";
import { copyPastePlugin } from "@superside-oss/sanity-plugin-copy-paste";
import { BulkDelete } from "sanity-plugin-bulk-delete";
import { viewPageAction } from "./sanity/actions/viewPageAction";
import { openInEditorAction } from "./sanity/actions/openInEditorAction";

const singletonActions = new Set(["publish", "discardChanges", "restore"]);
const singletonTypes = new Set(["site_settings", "global_team"]);

export default defineConfig({
  name: "default",
  title: `${organization} Studio`,
  basePath: "/studio",
  ...clientConfig,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      name: "editor",
      title: "Editor",
      previewUrl: {
        draftMode: {
          enable: `${baseUrl}/api/draft`,
        },
      },
      resolve: { locations },
    }),
    visionTool(),
    codeInput(),
    media(),
    copyPastePlugin(),
    BulkDelete({ schemaTypes }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    actions: (input, context) => {
      if (singletonTypes.has(context.schemaType)) {
        return input.filter(({ action }) => action && singletonActions.has(action));
      }
      if (["page", "post"].includes(context.schemaType)) {
        return [...input, viewPageAction, openInEditorAction];
      }
      return input;
    },
  },
});
