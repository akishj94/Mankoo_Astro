
import { defineField, defineType } from "sanity";

const linkFields = [
  defineField({
    name: "label",
    title: "Button Label",
    type: "string",
    validation: (Rule) => Rule.required(),
  }),

  defineField({
    name: "linkType",
    title: "Link Type",
    type: "string",
    options: {
      list: [
        { title: "Internal Link", value: "internal" },
        { title: "External URL", value: "external" },
      ],
      layout: "radio",
    },
    initialValue: "internal",
    validation: (Rule) => Rule.required(),
  }),

  defineField({
  name: "href",
  title: "Internal Link",
  type: "reference",
  to: [
    { type: "page" },
    { type: "product" },
    { type: "post" },
  ],
  hidden: ({ parent }) => parent?.linkType !== "internal",
  validation: (Rule) =>
    Rule.custom((value, context) => {
      if (context.parent?.linkType === "internal" && !value) {
        return "Select an internal destination.";
      }
      return true;
    }),
  }),

  defineField({
    name: "url",
    title: "External URL",
    type: "url",
    hidden: ({ parent }) => parent?.linkType !== "external",
    validation: (Rule) =>
      Rule.custom((value, context) => {
        const parent = context.parent;

        if (parent?.linkType === "external" && !value) {
          return "Enter an external URL.";
        }

        return true;
      }),
  }),

  defineField({
    name: "openInNewTab",
    title: "Open in new tab",
    type: "boolean",
    initialValue: false,
  }),
];

export const cta = defineType({
  name: "cta",
  title: "Call to Action",
  type: "object",
  fields: [...linkFields],
  preview: {
    select: {
      title: "label",
      linkType: "linkType",
      href: "href",
      url: "url",
    },
    prepare({ title, linkType, href, url }) {
      return {
        title: title || "Call to Action",
        subtitle:
          linkType === "external"
            ? url || "External URL"
            : href || "Internal Link",
      };
    },
  },
});

export const splitGridSection = defineType({
  name: 'splitGridSection',
  title: 'Split Grid Section',
  type: 'object',
  fields: [
    defineField({
      name: 'smallImage',
      title: 'Small Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'largeImage',
      title: 'Large Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'introText',
      title: 'Introductory Text',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'highlightText',
      title: 'Highlighted Text',
      description: 'The muted text that follows the introductory text.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'statistic',
      title: 'Statistic',
      type: 'string',
      initialValue: '50+',
    }),
    defineField({
      name: 'statisticLabel',
      title: 'Statistic Label',
      type: 'string',
      initialValue: 'YEARS IN POWER PRESSES',
    }),
    
    defineField({
      name: "link",
      title: "Link",
      type: "cta",
    }),  
  ],
  preview: {
    select: {
      title: 'introText',
      media: 'largeImage',
    },
    prepare({ title, media }) {
      return {
        title: 'Split Grid Section',
        subtitle: title,
        media,
      };
    },
  },
});

export const specification = defineType({
  name: "specification",
  title: "Technical Specification",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Specification",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "unit",
      title: "Unit",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "value" },
  },
});

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "SubTitle/ Eyebrow Text",
      type: "string",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    // defineField({
    //   name: "description",
    //   title: "Description",
    //   type: "text",
    //   rows: 3,
    // }),
    defineField({
      name: "video",
      title: "Background Video",
      type: "file",
      options: {
        accept: "video/mp4,video/webm",
      },
      description:
        "Optional background video. If provided, it takes priority over the hero image.",
    }),
    defineField({
      name: "image",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imageAlt",
      title: "Image Alt Text",
      type: "string",
    }),
    defineField({
      name: "primaryCta",
      title: "Call To Action",
      type: "cta",
    }),   
  ],
  preview: {
    select: { title: "heading", media: "image" },
    prepare({ title, media }) {
      return { title: title || "Hero Section", media };
    },
  },
});

export const richTextSection = defineType({
  name: "richTextSection",
  title: "Rich Text",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Section Heading",
      type: "string",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Heading 4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (Rule) => Rule.required(),
                  }),
                  defineField({
                    name: "blank",
                    title: "Open in new tab",
                    type: "boolean",
                    initialValue: false,
                  }),
                ],
              },
            ],
          },
        },
        { type: "image", options: { hotspot: true } },
      ],
    }),
  ],
});

export const imageTextSection = defineType({
  name: "imageTextSection",
  title: "Image and Text",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "content", title: "Content", type: "text", rows: 4 }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "imageAlt", title: "Image Alt Text", type: "string" }),
    defineField({
      name: "imagePosition",
      title: "Image Position",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
        ],
        layout: "radio",
      },
      initialValue: "right",
    }),
    defineField({ name: "cta", title: "CTA", type: "cta" }),
  ],
});

export const featureGridSection = defineType({
  name: "featureGridSection",
  title: "Feature Grid",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({
      name: "columns",
      title: "Columns",
      type: "number",
      options: { list: [2, 3, 4] },
      initialValue: 3,
    }),
    defineField({
      name: "items",
      title: "Features",
      type: "array",
      of: [
        {
          type: "object",
          name: "featureItem",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
            defineField({
              name: "icon",
              title: "Icon Name",
              type: "string",
              description: "Optional icon identifier used by the frontend.",
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
            }),
          ],
          preview: {
            select: { title: "title", media: "image" },
          },
        },
      ],
    }),
  ],
});

export const productGridSection = defineType({
  name: "productGridSection",
  title: "Product Grid",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({
      name: "selectionMode",
      title: "Product Selection",
      type: "string",
      options: {
        list: [
          { title: "Choose Products", value: "manual" },
          { title: "Choose Category", value: "category" },
        ],
        layout: "radio",
      },
      initialValue: "manual",
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
      hidden: ({ parent }) => parent?.selectionMode !== "manual",
    }),
    defineField({
      name: "limit",
      title: "Maximum Products",
      type: "number",
      initialValue: 6,
      validation: (Rule) => Rule.min(1).max(24).integer(),
    }),
  ],
});

export const gallerySection = defineType({
  name: "gallerySection",
  title: "Image Gallery",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt Text", type: "string" }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
});

export const ctaBannerSection = defineType({
  name: "ctaBannerSection",
  title: "CTA Banner",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "cta", title: "CTA", type: "cta" }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});

export const pageSections = defineType({
  name: "pageSections",
  title: "Page Section",
  type: "array",
  of: [
    { type: "heroSection" },
    { type: "richTextSection" },
    { type: "imageTextSection" },
    { type: "featureGridSection" },
    { type: "productGridSection" },
    { type: "gallerySection" },
    { type: "ctaBannerSection" },
    { type: "splitGridSection" },
  ],
});
