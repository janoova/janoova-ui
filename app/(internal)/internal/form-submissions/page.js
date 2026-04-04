import { draftMode } from "next/headers";
import { createClient } from "@sanity/client";
import clientConfig from "@/sanity/config/clientConfig";
import FormSubmissionsClient from "./FormSubmissionsClient";

export const metadata = {
  title: "Form Submissions",
  robots: { index: false, follow: false },
};

// Always fresh — no caching for internal data
export const revalidate = 0;

const client = createClient({
  ...clientConfig,
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

export default async function FormSubmissionsPage() {
  const draft = await draftMode();

  if (!draft.isEnabled) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <h1 className="text-xl font-semibold">Access Denied</h1>
          <p className="text-muted-foreground text-sm">
            Preview access is required to view this page.
          </p>
        </div>
      </div>
    );
  }

  const submissions = await client.fetch(
    `*[_type == "formSubmission"] | order(submitted_at desc) {
      _id,
      form_title,
      page_url,
      submitted_at,
      fields[] { name, value }
    }`
  );

  return <FormSubmissionsClient submissions={submissions} />;
}
