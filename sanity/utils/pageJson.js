// Only editable page fields may be imported; document IDs and revisions stay intact.
export function parsePageJson(text, allowedBlockTypes) {
  const page = JSON.parse(text);
  if (!page || Array.isArray(page) || page._type !== "page") {
    throw new Error('Paste a page object with "_type": "page".');
  }
  if (!page.title || !page.meta_title || !/^[a-z0-9_\/-]+$/.test(page.slug?.current || "")) {
    throw new Error("The page needs a title, meta_title, and a valid slug.current.");
  }
  if (!Array.isArray(page.page_builder)) {
    throw new Error("The page needs a page_builder array.");
  }
  const keys = new Set();
  for (const block of page.page_builder) {
    if (!block || !allowedBlockTypes.includes(block._type) || !block.block_category || !block._key) {
      throw new Error("Each block needs a supported _type, block_category, and _key.");
    }
    if (keys.has(block._key)) throw new Error("Page builder block keys must be unique.");
    keys.add(block._key);
  }
  const fields = ["title", "slug", "meta_title", "meta_description", "seo_no_index", "featured_image", "scoped_css", "page_builder"];
  return Object.fromEntries(fields.filter((field) => Object.hasOwn(page, field)).map((field) => [field, page[field]]));
}
