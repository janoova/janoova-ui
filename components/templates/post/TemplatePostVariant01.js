import PostVariant01 from "@/components/blocks/post/PostVariant01";
import FeedVariant01 from "@/components/blocks/feed/FeedVariant01";
import { HeroVariant03 } from "@/components/blocks/hero";

const TemplatePostVariant01 = ({ data, feedData, ctaData }) => {
  return (
    <>
      <PostVariant01 data={data} />
      <hr />
      <FeedVariant01 data={feedData} />
      <HeroVariant03 data={ctaData} />
    </>
  );
};

export default TemplatePostVariant01;
