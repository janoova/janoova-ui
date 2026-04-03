import { draftMode } from "next/headers";
import DraftModeLoader from "@/components/wrappers/DraftModeLoader.js";

export default async function VisualEditingControls() {
  const { isEnabled } = await draftMode();

  return <>{isEnabled && <DraftModeLoader />}</>;
}
