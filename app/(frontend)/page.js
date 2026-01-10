import PageBuilder from "@/components/wrappers/PageBuilder";
import { getMetaData } from "@/lib/seo";
import { getPageBySlug } from "@/sanity/utils/queries";
import { notFound } from "next/navigation";

const homepagePath = "index";

export default async function Page() {
  const data = await getPageBySlug(homepagePath);
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

export const generateMetadata = async () => {
  const data = await getPageBySlug(homepagePath);
  if (!data) return {};
  return await getMetaData(data);
};
