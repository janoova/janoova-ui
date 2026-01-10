import { projectId } from "@/lib/constants";

const clientConfig = {
  projectId: projectId,
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-07-31",
  stega: {
    enabled: false,
    studioUrl: "/studio",
  },
};

export default clientConfig;
