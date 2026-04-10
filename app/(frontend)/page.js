import PageBuilder from "@/components/wrappers/PageBuilder";
import { getMetaData } from "@/lib/seo";
import { getPageBySlug } from "@/sanity/utils/queries";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";

const homepagePath = "index";

export default async function Page() {
  const { isEnabled: isPreview } = await draftMode();
  const data = await getPageBySlug(homepagePath);
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

export const generateMetadata = async () => {
  const data = await getPageBySlug(homepagePath);
  if (!data) return {};
  return await getMetaData(data);
};
