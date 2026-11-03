
import { defineField, defineType } from "sanity";

export const cta = defineType({
  name: "cta",
  title: "Call to Action",
  type: "object",
  fields: [
    defineField({
      name: "link",
      title: "Link",
      type: "linkObject",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "link.label", linkType: "link.linkType", externalUrl: "link.externalUrl" },
    prepare({ title, linkType, externalUrl }) {
      return {
        title: title || "Call to Action",
        subtitle: linkType === "external" ? externalUrl || "External URL" : "Internal Link",
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
    defineField({
      name: "heroMedia",
      title: "Background Image/Video",
      type: "mediaBlock",
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

export const mediaBlock = defineType({
  name: "mediaBlock",
  title: "Media",
  type: "object",
  fields:[
    defineField({
      name: "video",
      title: "Background Video",
      type: "file",
      options: {
        accept: "video/mp4,video/webm",
      },
      description:
        "Optional video. If provided, it takes priority over the image.",
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
  ]
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

export const newsSection = defineType({
  name: "newsSection",
  title: "News & Stories",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "News & Stories",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "News & Stories",
        subtitle: "Displays the 3 latest posts automatically",
      };
    },
  },
});
export const testimonialSection = defineType({
  name: "testimonialSection",
  title: "Testimonial Section",
  type: "object",
  fields: [
    defineField({
      name: "quote",
      title: "Client Quote",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clientName",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Client Role",
      type: "string",
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "companyLogo",
      title: "Company Logo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "portrait",
      title: "Client Portrait",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "clientName",
      subtitle: "company",
      media: "portrait",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Testimonial",
        subtitle: subtitle || "Client Testimonial",
        media,
      };
    },
  },
});

export const featureHighlightsSection = defineType({
  name: "featureHighlightsSection",
  title: "Feature Highlights (Steps Columns)",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Section Heading",
      type: "string",
      initialValue: "Why manufacturers choose Mankoo Power Presses",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "Reasons",
      type: "array",
      of: [
        {
          type: "object",
          name: "reasonItem",
          fields: [
            defineField({
              name: "title",
              title: "Reason",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
            },
            prepare({ title }) {
              return {
                title: title || "Untitled Reason",
              };
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.max(4).error("You can add a maximum of 4 reasons."),
    }),
  ],
  preview: {
    select: {
      title: "heading",
      items: "items",
    },
    prepare({ title, items }) {
      return {
        title: title || "Why Choose Us",
        subtitle: `${items?.length || 0}/4 reasons`,
      };
    },
  },
});

export const featuredProductSection = defineType({
  name: "featuredProductSection",
  title: "Featured Product",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "FEATURED PRODUCT",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "specifications",
      title: "Specifications",
      type: "array",
      of: [
        {
          type: "object",
          name: "featuredSpecification",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "value",
            },
          },
        },
      ],
    }),
    defineField({
      name: "cta",
      title: "Call to Action",
      type: "cta",
    }),
  ],
  preview: {
    select: {
      title: "heading",
      media: "backgroundImage",
    },
    prepare({ title, media }) {
      return {
        title: title || "Featured Product",
        media,
      };
    },
  },
});
export const imageTransitionSection = defineType({
  name: "imageTransitionSection",
  title: "Image Transition Section",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
    }),
    defineField({
      name: "heading",
      title: "Section Heading",
      type: "string",
    }),
    defineField({
      name: "interval",
      title: "Transition Interval (seconds)",
      type: "number",
      initialValue: 6,
      description: "How long each slide stays visible before transitioning.",
      validation: (Rule) => Rule.min(2).max(30),
    }),
    defineField({
      name: "slides",
      title: "Slides",
      type: "array",
      of: [
        {
          type: "object",
          name: "imageTransitionSlide",
          title: "Slide",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  title: "Alternative Text",
                  type: "string",
                  description:
                    "Describe the image for visitors using screen readers.",
                }),
              ],
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            select: {
              title: "title",
              media: "image",
              description: "description",
            },
            prepare({ title, media, description }) {
              return {
                title: title || "Untitled Slide",
                subtitle: description || "No description",
                media,
              };
            },
          },
        },
      ],
      validation: (Rule) =>
      Rule.max(2).error("You can add a maximum of 2 slides."),
    }),
  ],
  preview: {
    select: {
      title: "heading",
      slides: "slides",
    },
    prepare({ title, slides }) {
      return {
        title: title || "Image Transition Section",
        subtitle: `${slides?.length || 0} slides`,
      };
    },
  },
});
export const productSliderSection = defineType({
  name: "productSliderSection",
  title: "Product Slider",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "THE MACHINES RANGE",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue:
        "Seven machine families. One standard - They keep running, shift after shift, year after year.",
    }),
    defineField({
      name: "products",
      title: "Select Products",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "product" }],
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
  ],
  preview: {
    select: {
      title: "heading",
      products: "products",
    },
    prepare({ title, products }) {
      return {
        title: "Machine Slider",
        subtitle: `${products?.length ?? 0} products selected`,
      };
    },
  },
});
export const timelineSection = defineType({
  name: "timelineSection",
  title: "Timeline",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "OUR JOURNEY",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "addPlaceholderData",
      title: "Add placeholder data",
      type: "boolean",
      initialValue: false,
      description:
        "When enabled, the timeline repeats its milestones to create 18 slides.",
    }),
    defineField({
      name: "items",
      title: "Milestones",
      type: "array",
      of: [
        {
          type: "object",
          name: "timelineItem",
          fields: [
            defineField({
              name: "year",
              title: "Year",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "content",
              title: "Content",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "year",
            },
            prepare({ title, subtitle }) {
              return {
                title: title || "Untitled milestone",
                subtitle,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "heading",
      items: "items",
    },
    prepare({ title, items }) {
      return {
        title: title || "Timeline",
        subtitle: `${items?.length ?? 0} milestones`,
      };
    },
  },
});
export const pageSections = defineType({
  name: "pageSections",
  title: "Page Section",
  type: "array",
  of: [
    { type: "heroSection" },
    { type: "richTextSection" },
    { type: "mediaBlock" },
    { type: "featureGridSection" },
    { type: "productGridSection" },
    { type: "gallerySection" },
    { type: "ctaBannerSection" },
    { type: "featureHighlightsSection" },
    { type: "splitGridSection" },
    { type: "newsSection" },
    { type: "testimonialSection" },
    { type: "featuredProductSection" },
    { type: "imageTransitionSection" },
    { type: "productSliderSection" },
    { type: "timelineSection" },
  ],
});
