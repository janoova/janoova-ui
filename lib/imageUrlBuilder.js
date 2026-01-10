import imageUrlBuilder from "@sanity/image-url";
import clientConfig from "@/sanity/config/clientConfig";

const builder = imageUrlBuilder(clientConfig);

const urlFor = (source) => {
  return builder.image(source);
};

export default urlFor;
