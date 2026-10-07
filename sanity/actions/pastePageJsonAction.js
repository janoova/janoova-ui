import { useState } from "react";
import { useDocumentOperation } from "sanity";
import { Stack, Text, TextArea, Button, Card } from "@sanity/ui";
import pageBuilderBlocks from "../schemaTypes/blocks";
import { parsePageJson } from "../utils/pageJson";

export function pastePageJsonAction({ id, type, onComplete }) {
  const { patch } = useDocumentOperation(id, type);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const close = () => {
    setOpen(false);
    onComplete();
  };

  return {
    label: "Paste Page JSON",
    disabled: Boolean(patch.disabled),
    onHandle: () => { setError(""); setOpen(true); },
    dialog: open && {
      type: "dialog",
      header: "Paste Page JSON",
      onClose: close,
      content: (
        <Stack space={4} padding={4}>
          <Text size={1}>Apply JSON to this page draft. Supplied fields, including the page builder, replace their current values. Review the draft before publishing.</Text>
          <TextArea
            aria-label="Page JSON"
            rows={16}
            value={text}
            onChange={(event) => setText(event.currentTarget.value)}
            placeholder={'{"_type": "page", "title": "...", "page_builder": [...]}'}
          />
          {error && <Card tone="critical" padding={3}><Text size={1}>{error}</Text></Card>}
          <Button
            text="Apply to Draft"
            tone="primary"
            disabled={!text.trim() || Boolean(patch.disabled)}
            onClick={() => {
              try {
                const fields = parsePageJson(text, pageBuilderBlocks.map((block) => block.name));
                patch.execute([{ set: fields }]);
                setText("");
                close();
              } catch (err) {
                setError(err.message || "Could not apply this JSON.");
              }
            }}
          />
        </Stack>
      ),
    },
  };
}
