import { getSiteSettings } from "@/sanity/utils/queries";
import ModalVariant01Client from "./client/ModalVariant01Client";

const ModelVariant01 = async ({ data = {}, index }) => {
  const siteSettings = await getSiteSettings();
  return (
    <>
      <ModalVariant01Client
        index={index}
        siteSettings={siteSettings}
        data={data}
      />
    </>
  );
};

export default ModelVariant01;
