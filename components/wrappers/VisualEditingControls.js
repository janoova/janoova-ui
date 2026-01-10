import { draftMode } from "next/headers";
import DraftModeContent from "@/components/wrappers/DraftModeContent.js";

export default async function VisualEditingControls() {
  const { isEnabled } = await draftMode();

  return <>{isEnabled && <DraftModeContent />}</>;
}
