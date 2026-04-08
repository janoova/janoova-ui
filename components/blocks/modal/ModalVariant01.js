import { getSiteSettings } from "@/sanity/utils/queries";
import ModalVariant01Loader from "./ModalVariant01Loader";

const ModelVariant01 = async ({ data = {}, index }) => {
  const siteSettings = await getSiteSettings();
  return (
    <ModalVariant01Loader
      index={index}
      siteSettings={siteSettings}
      data={data}
    />
  );
};

export default ModelVariant01;
