import PageBuilder from "@/components/wrappers/PageBuilder";
import { getMetaData } from "@/lib/seo";
import { getPageBySlug } from "@/sanity/utils/queries";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { slug } = await params;
  const slugPath = slug.join("/");
  const data = await getPageBySlug(slugPath);
  if (!data) {
    return notFound();
  }

  return (
    <>
      {data?.page_builder?.map((elem, index) => {
        return <PageBuilder key={elem._key} data={elem} index={index} />;
      })}
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
