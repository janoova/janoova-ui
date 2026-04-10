import { draftMode } from "next/headers";
import { createClient } from "@sanity/client";
import clientConfig from "@/sanity/config/clientConfig";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Submission Detail",
  robots: { index: false, follow: false },
};

export const revalidate = 0;

const client = createClient({
  ...clientConfig,
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const CT_LOCALE_OPTS = {
  timeZone: "America/Chicago",
  dateStyle: "medium",
  timeStyle: "short",
};

function formatCT(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", CT_LOCALE_OPTS) + " CT";
}

function humanize(name) {
  return name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function SubmissionDetailPage({ params }) {
  const { id } = await params;
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

  const submission = await client.fetch(
    `*[_type == "formSubmission" && _id == $id][0] {
      _id,
      form_title,
      page_url,
      submitted_at,
      fields[] { name, value }
    }`,
    { id }
  );

  if (!submission) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <h1 className="text-xl font-semibold">Not Found</h1>
          <p className="text-muted-foreground text-sm">
            This submission does not exist.
          </p>
          <Link
            href="/internal/form-submissions"
            className="text-sm text-primary underline underline-offset-2"
          >
            Back to submissions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-10 max-w-3xl mx-auto">
      <Link
        href="/internal/form-submissions"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft size={14} />
        Back to submissions
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          {submission.form_title || "Submission"}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {formatCT(submission.submitted_at)}
        </p>
      </div>

      {submission.page_url && (
        <div className="mb-6 rounded-lg border bg-muted/40 px-4 py-3 text-sm">
          <span className="font-medium text-foreground">Page: </span>
          <span className="text-muted-foreground break-all">
            {submission.page_url}
          </span>
        </div>
      )}

      <div className="rounded-lg border divide-y">
        {submission.fields?.map((f) => (
          <div key={f.name} className="flex gap-6 px-5 py-4">
            <span className="w-40 shrink-0 text-sm font-medium text-muted-foreground">
              {humanize(f.name)}
            </span>
            <span className="text-sm break-all">{f.value || "—"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
