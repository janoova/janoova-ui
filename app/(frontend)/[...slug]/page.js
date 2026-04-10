import PageBuilder from "@/components/wrappers/PageBuilder";
import { getMetaData } from "@/lib/seo";
import { getPageBySlug, getAllPageSlugs } from "@/sanity/utils/queries";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";

export async function generateStaticParams() {
  const pages = await getAllPageSlugs();
  return pages
    .filter((p) => p.slug && p.slug !== "index")
    .map((p) => ({ slug: p.slug.split("/") }));
}

export default async function Page({ params }) {
  const { isEnabled: isPreview } = await draftMode();
  const { slug } = await params;
  const slugPath = slug.join("/");
  const data = await getPageBySlug(slugPath);
  if (!data) {
    return notFound();
  }

  return (
    <>
      {data?.scoped_css?.code && (
        <style dangerouslySetInnerHTML={{ __html: data.scoped_css.code }} />
      )}
      {data?.page_builder?.map((elem, index) => (
        <PageBuilder
          key={elem._key}
          data={elem}
          index={index}
          docId={isPreview ? data._id : undefined}
          docType={isPreview ? data._type : undefined}
        />
      ))}
    </>
  );
}

export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  const slugPath = slug.join("/");
  const data = await getPageBySlug(slugPath);
  if (!data) return {};
  return await getMetaData(data);
};
