import { defineField } from "sanity";
import { isUniqueAcrossAllDocuments } from "@/sanity/utils/helpers";
import { uuid } from "@sanity/uuid";

export const scopedCss = {
  name: "scoped_css",
  title: "Scoped CSS",
  type: "code",
  options: {
    language: "scss",
    languageAlternatives: [{ title: "SCSS", value: "scss" }],
  },
  group: "style",
};

export const generateHeadingTagField = ({
  name,
  title,
  group = "content",
} = {}) =>
  defineField({
    name,
    title,
    type: "string",
    group,
    options: {
      list: [
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "H5", value: "h5" },
        { title: "H6", value: "h6" },
        { title: "Paragraph", value: "p" },
        { title: "Span", value: "span" },
      ],
    },
  });

export const generateHeadingSizeField = ({
  name,
  title,
  group = "content",
} = {}) =>
  defineField({
    name,
    title,
    type: "string",
    group,
    options: {
      list: [
        { title: "D1", value: "d1" },
        { title: "D2", value: "d2" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "H5", value: "h5" },
        { title: "H6", value: "h6" },
        { title: "Subtitle", value: "subtitle" },
        { title: "Paragraph", value: "p" },
      ],
    },
  });

export const generateLinkField = (name, title, depth = 2, maxDepth = 4) => {
  return {
    type: "object",
    name,
    title,
    fields: [
      defineField({
        name: "title",
        title: "Title",
        type: "string",
      }),
      defineField({
        name: "destination",
        title: "Destination",
        type: "string",
      }),
      defineField({
        name: "uid",
        title: "UID",
        type: "slug",
        description: "Please verify this is unique across all menu items",
        initialValue: uuid(),
        validation: (Rule) => Rule.required(),
        options: {
          source: () => {
            return `${uuid()}`;
          },
          isUnique: isUniqueAcrossAllDocuments,
        },
      }),
      ...(depth < maxDepth
        ? [
            defineField({
              name: "links",
              type: "array",
              of: [
                generateLinkField(
                  `link_count_${depth + 1}`,
                  `Link Count ${depth + 1}`,
                  depth + 1,
                  maxDepth
                ),
              ],
            }),
          ]
        : []),
    ],
    preview: {
      select: {
        title: "title",
        destination: "destination",
      },
      prepare: ({ title, destination }) => ({
        title,
        subtitle: destination,
      }),
    },
  };
};

export const generateBackgroundPatternField = ({
  enableFieldName = "enable_background_pattern",
  patternFieldName = "background_pattern_type",
  enableFieldTitle = "Enable Background Pattern",
  patternFieldTitle = "Background Pattern Type",
  group = "style",
} = {}) => [
  defineField({
    name: enableFieldName,
    title: enableFieldTitle,
    type: "boolean",
    initialValue: () => false,
    group,
  }),
  defineField({
    name: patternFieldName,
    title: patternFieldTitle,
    type: "string",
    group,
    hidden: ({ parent }) => !parent?.[enableFieldName],
    options: {
      list: [
        { title: "Unset", value: "" },
        { title: "Dots", value: "dots" },
        { title: "Grid", value: "grid" },
      ],
    },
  }),
];

export const generateBackgroundImageField = ({
  imageFieldName = "background_image",
  tintFieldName = "enable_background_tint",
  imageFieldTitle = "Background Image",
  tintFieldTitle = "Enable Background Tint",
  imageGroup = "content",
  tintGroup = "style",
} = {}) => [
  defineField({
    name: imageFieldName,
    title: imageFieldTitle,
    type: "image",
    group: imageGroup,
    options: { hotspot: true },
    fields: [
      {
        name: "alt",
        title: "Alt",
        type: "string",
      },
    ],
  }),
  defineField({
    name: tintFieldName,
    title: tintFieldTitle,
    type: "boolean",
    initialValue: () => false,
    group: tintGroup,
  }),
];

export const generateIconCardStyleField = ({
  name,
  title,
  group = "style",
} = {}) =>
  defineField({
    name,
    title,
    type: "string",
    group,
    options: {
      list: [
        { title: "Unset", value: "" },
        { title: "Solid", value: "solid" },
        { title: "Outlined", value: "outlined" },
        { title: "Shadow", value: "shadow" },
        { title: "Block", value: "block" },
      ],
    },
  });

export const generateResourceCardStyleField = ({
  name,
  title,
  group = "style",
} = {}) =>
  defineField({
    name,
    title,
    type: "string",
    group,
    options: {
      list: [
        { title: "Unset", value: "" },
        { title: "Default", value: "default" },
        { title: "Bordered", value: "bordered" },
      ],
    },
  });

export const generateCardColumnsField = ({
  name,
  title,
  group = "style",
} = {}) =>
  defineField({
    name,
    title,
    type: "string",
    group,
    options: {
      list: [
        { title: "Unset", value: "" },
        { title: "2", value: "2" },
        { title: "3", value: "3" },
        { title: "4", value: "4" },
      ],
    },
  });

export const generateButtonField = ({
  name,
  titleLabel = "Button Title",
  destinationLabel = "Button Destination",
  openInNewTabLabel = "Open in New Tab",
  themeLabel = "Button Theme",
  group = "content",
  initialTitle = "Learn More",
  includeTheme = true,
} = {}) => {
  const fields = [
    defineField({
      name: `${name}_title`,
      title: titleLabel,
      type: "string",
      initialValue: initialTitle,
      group,
    }),
    defineField({
      name: `${name}_destination`,
      title: destinationLabel,
      type: "string",
      group,
    }),
    defineField({
      name: `${name}_open_in_new_tab`,
      title: openInNewTabLabel,
      type: "boolean",
      initialValue: false,
      group,
      hidden: ({ parent }) => !parent?.[`${name}_destination`],
    }),
  ];
  if (includeTheme) {
    fields.push(
      defineField({
        name: `${name}_theme`,
        title: themeLabel,
        type: "string",
        initialValue: "primary",
        group,
        hidden: ({ parent }) => !parent?.[`${name}_title`],
        options: {
          list: [
            { title: "Primary", value: "primary" },
            { title: "Secondary", value: "secondary" },
            { title: "Inverted", value: "inverted" },
            { title: "Link", value: "link" },
            { title: "Ghost Primary", value: "ghost-primary" },
            { title: "Ghost Secondary", value: "ghost-secondary" },
          ],
        },
      })
    );
  }

  return fields;
};

export const generateRichtextField = (options = {}) => {
  const {
    name = "content",
    title = "Content",
    initialValue = null,
    group = "content",
  } = options;

  const defaultLoremIpsum = [
    {
      _type: "block",
      _key: "default1",
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "span1",
          text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat",
          marks: ["strong"],
        },
      ],
    },
    {
      _type: "block",
      _key: "default2",
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "span2",
          text: "Gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
          marks: [],
        },
      ],
    },
  ];

  const field = {
    name,
    title,
    type: "array",
    of: [
      {
        type: "block",
        // Custom marks including enhanced link annotation
        marks: {
          annotations: [
            {
              name: "link",
              type: "object",
              title: "Link",
              fields: [
                {
                  name: "href",
                  type: "url",
                  title: "URL",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "open_in_new_tab",
                  type: "boolean",
                  title: "Open in new tab",
                  description: "Check this to open the link in a new tab",
                  initialValue: false,
                },
              ],
            },
          ],
        },
      },
      {
        type: "image",
        fields: [
          {
            type: "string",
            name: "alt",
            title: "Alternative text",
            options: {
              isHighlighted: true,
            },
          },
          {
            type: "string",
            name: "className",
            title: "Custom CSS Class",
            description: "Add a custom CSS class name to this image",
          },
          {
            type: "string",
            name: "alignment",
            title: "Image Alignment",
            options: {
              list: [
                { title: "Start", value: "start" },
                { title: "Center", value: "center" },
                { title: "End", value: "end" },
              ],
              layout: "radio",
            },
            initialValue: "start",
          },
        ],
      },
      {
        type: "code",
        options: {
          language: "html",
          languageAlternatives: [{ title: "HTML", value: "html" }],
        },
      },
    ],
    group,
  };

  if (initialValue !== null) {
    field.initialValue = initialValue;
  } else {
    field.initialValue = defaultLoremIpsum;
  }

  return field;
};
