import { HeroVariant03 } from "@/components/blocks/hero";
import ArchiveVariant01 from "@/components/blocks/archive/ArchiveVariant01";

const TemplateArchiveVariant01 = ({
  heroData,
  bodyData,
  prevPageDestination,
  nextPageDestination,
}) => {
  return (
    <>
      <HeroVariant03 index={0} data={heroData} />
      <ArchiveVariant01
        data={bodyData}
        prevPageDestination={prevPageDestination}
        nextPageDestination={nextPageDestination}
      />
    </>
  );
};

export default TemplateArchiveVariant01;
