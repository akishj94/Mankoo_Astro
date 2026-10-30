
import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Products",
  type: "document",

  groups: [
    { name: "basic", title: "Basic Information", default: true },
    { name: "pageContent", title: "Product Page Content" },
    { name: "details", title: "Product Details" },
    { name: "technical", title: "Technical Specifications" },
    { name: "inquiry", title: "Inquiry CTA" },
    { name: "seo", title: "SEO" },
  ],

  fields: [
    // Basic information
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      group: "basic",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      group: "basic",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      group: "basic",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
      group: "basic",
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),

    // Block 1: Hero
    defineField({
      name: "hero",
      title: "1. Hero",
      type: "object",
      group: "pageContent",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "Power Presses",
        }),
        defineField({
          name: "heading",
          title: "Hero Heading",
          type: "string",
          description: "Defaults conceptually to the product name; enter a custom heading if needed.",
        }),
        defineField({
          name: "tagline",
          title: "Tagline",
          type: "string",
          description: 'Example: "Built to keep stamping."',
        }),
        defineField({
          name: "subLine",
          title: "Supporting Line",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "backgroundVideo",
          title: "Background Video",
          type: "file",
          options: { accept: "video/*" },
        }),        
        defineField({
          name: "primaryCtaLabel",
          title: "Primary Button Label",
          type: "string",
          initialValue: "Get a quote",
        }),
        defineField({
          name: "primaryCtaLinkType",
          title: "Primary Button Link Type",
          type: "string",
          options: {
            list: [
              { title: "Internal Link", value: "internal" },
              { title: "External URL", value: "external" },
            ],
            layout: "radio",
          },
          initialValue: "internal",
        }),
        defineField({
          name: "primaryCtaInternalLink",
          title: "Primary Button Internal Link",
          type: "reference",
          to: [
            { type: "page" },
            { type: "product" },
            { type: "post" },
          ],
          hidden: ({ parent }) => parent?.primaryCtaLinkType !== "internal",
          validation: (Rule) =>
            Rule.custom((value, context) => {
              const parent = context.parent as
                | { primaryCtaLinkType?: string }
                | undefined;

              if (parent?.primaryCtaLinkType === "internal" && !value) {
                return "Select an internal destination.";
              }

              return true;
            }),
        }),
        defineField({
          name: "primaryCtaExternalUrl",
          title: "Primary Button External URL",
          type: "url",
          hidden: ({ parent }) => parent?.primaryCtaLinkType !== "external",
          validation: (Rule) =>
            Rule.custom((value, context) => {
              const parent = context.parent as
                | { primaryCtaLinkType?: string }
                | undefined;

              if (parent?.primaryCtaLinkType === "external" && !value) {
                return "Enter an external URL.";
              }

              return true;
            }),
        }),
        
      ],
    }),


    // Block 2: Three pillar cards
    defineField({
      name: "introText",
      title: "Section Heading",
      type: "text",
      rows: 2,
      group: "pageContent",
      description: "Main heading for the pillar cards section.",
    }),

    defineField({
      name: "highlightText",
      title: "Highlighted Text",
      type: "text",
      rows: 3,
      group: "pageContent",
      description:
        "Supporting text displayed with muted styling beneath or alongside the main heading.",
    }),
    defineField({
      name: "pillars",
      title: "2. Pillar Cards",
      type: "array",
      group: "pageContent",
      description: "Add the three reasons to choose this press.",
      validation: (Rule) => Rule.max(3),
      of: [
        {
          type: "object",
          name: "productPillar",
          title: "Pillar",
          fields: [
            defineField({
              name: "heading",
              title: "Heading",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "copy",
              title: "Copy",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  title: "Alt Text",
                  type: "string",
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "heading", media: "image" },
            prepare({ title, media }) {
              return { title: title || "Pillar card", media };
            },
          },
        },
      ],
    }),

    // Block 3: Product Stats
    defineField({
      name: "productStats",
      title: "3. Product Stats",
      type: "object",
      group: "pageContent",
      fields: [
        defineField({
          name: "label",
          title: "Subheading/Subtitle",
          type: "string",
          initialValue: "Engineering",
        }),
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
        }),
        defineField({
          name: "copy",
          title: "Copy",
          type: "text",
          rows: 4,
        }),
        defineField({
          name: "image",
          title: "Wide Machine Image",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
        }),
      ],
    }),

    // Block 4: Four key numbers
    defineField({
      name: "keyNumbers",
      title: "3. Key Numbers",
      type: "array",
      group: "pageContent",
      description: "Use four headline figures. Enter units as part of the value if appropriate.",
      validation: (Rule) => Rule.max(4),
      of: [
        {
          type: "object",
          name: "productKeyNumber",
          title: "Key Number",
          fields: [
            defineField({
              name: "label",
              title: "Subheading/Subtitle",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              description: 'Example: "32–250 Tons" or "35–60 SPM".',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        },
      ],
    }),

    // Blocks 5–6: Build and control feature blocks
    defineField({
      name: "featureBlocks",
      title: "5–6. Feature Blocks",
      type: "array",
      group: "pageContent",
      description: "Add the Build and Control blocks in the desired display order.",
      validation: (Rule) => Rule.max(2),
      of: [
        {
          type: "object",
          name: "productFeatureBlock",
          title: "Feature Block",
          fields: [
            // defineField({
            //   name: "featureType",
            //   title: "Feature Type",
            //   type: "string",
            //   options: {
            //     list: [
            //       { title: "Build", value: "build" },
            //       { title: "Control", value: "control" },
            //       { title: "Other", value: "other" },
            //     ],
            //   },
            // }),
            defineField({
              name: "heading",
              title: "Heading",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            // defineField({
            //   name: "hook",
            //   title: "One-Line Hook",
            //   type: "string",
            // }),
            defineField({
              name: "copy",
              title: "Copy",
              type: "text",
              rows: 4,
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  title: "Alt Text",
                  type: "string",
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "heading", subtitle: "featureType", media: "image" },
            prepare({ title, subtitle, media }) {
              return {
                title: title || "Feature block",
                subtitle,
                media,
              };
            },
          },
        },
      ],
    }),

    // Block 7: Tonnage bands
    defineField({
      name: "tonnageBands",
      title: "7. Tonnage Selector",
      type: "array",
      group: "pageContent",
      description: "Each band groups models and has a short description.",
      of: [
        {
          type: "object",
          name: "productTonnageBand",
          title: "Tonnage Band",
          fields: [
            defineField({
              name: "title",
              title: "Band Title",
              type: "string",
              description: 'Example: "32–40 T".',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "models",
              title: "Models",
              type: "array",
              of: [{ type: "string" }],
              description: 'Example: "32", "40".',
            }),
            defineField({
              name: "lead",
              title: "Bold Lead",
              type: "string",
            }),
            defineField({
              name: "copy",
              title: "Supporting Copy",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "image",
              title: "Machine Image",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  title: "Alt Text",
                  type: "string",
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "lead", media: "image" },
          },
        },
      ],
    }),

    // Block 8: Applications carousel
    defineField({
      name: "applications",
      title: "8. Applications Carousel",
      type: "array",
      group: "pageContent",
      description: "Add applications such as blanking, piercing, forming, drawing, and automatic feeding.",
      of: [
        {
          type: "object",
          name: "productApplication",
          title: "Application",
          fields: [
            defineField({
              name: "heading",
              title: "Heading",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "copy",
              title: "Copy",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "image",
              title: "Application Image",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  title: "Alt Text",
                  type: "string",
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "heading", media: "image" },
            prepare({ title, media }) {
              return { title: title || "Application", media };
            },
          },
        },
      ],
    }),

    // Block 9 is managed by the Technical Specifications group below.

    // Block 10: Downloads
    defineField({
      name: "downloads",
      title: "10. Downloads",
      type: "object",
      group: "pageContent",
      fields: [
        defineField({
          name: "brochureLabel",
          title: "Brochure Button Label",
          type: "string",
          initialValue: "Download the brochure (PDF)",
        }),
        defineField({
          name: "foundationDrawingLabel",
          title: "Foundation Drawing Button Label",
          type: "string",
          initialValue: "Request a foundation drawing",
        }),
        defineField({
          name: "foundationDrawingUrl",
          title: "Foundation Drawing Request URL",
          type: "url",
          description: "Optional URL for the drawing request form or contact page.",
        }),
      ],
    }),

    // Block 10: Final CTA band
    defineField({
      name: "finalCta",
      title: "10. Final CTA Band",
      type: "object",
      group: "pageContent",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          initialValue: "Put this press on your shop floor.",
        }),
        defineField({
          name: "copy",
          title: "Copy",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "buttonLabel",
          title: "Button Label",
          type: "string",
          initialValue: "Talk to our engineers",
        }),
        defineField({
          name: "buttonUrl",
          title: "Button URL",
          type: "url",
        }),
        defineField({
          name: "backgroundImage",
          title: "CTA Background Image",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
        }),
        // defineField({
        //   name: "contactPhone",
        //   title: "Contact Phone",
        //   type: "string",
        // }),
        // defineField({
        //   name: "contactEmail",
        //   title: "Contact Email",
        //   type: "string",
        //   validation: (Rule) => Rule.email(),
        // }),
      ],
    }),

    // Product details
    defineField({
      name: "description",
      title: "Full Description",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
      group: "details",
    }),
    
    defineField({
      name: "brochures",
      title: "Product Brochures",
      type: "array",
      group: "details",
      description: "Upload PDF brochures and provide a label for each download.",
      of: [
        {
          type: "object",
          name: "productBrochure",
          title: "Brochure",
          fields: [
            defineField({
              name: "label",
              title: "Download Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "file",
              title: "PDF File",
              type: "file",
              options: { accept: ".pdf,application/pdf" },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "label",
              filename: "file.asset.originalFilename",
            },
            prepare({ title, filename }) {
              return {
                title: title || "Untitled brochure",
                subtitle: filename || "No PDF uploaded",
              };
            },
          },
        },
      ],
    }),

    // defineField({
    //   name: "relatedProducts",
    //   title: "Related Products",
    //   type: "array",
    //   of: [{ type: "reference", to: [{ type: "product" }] }],
    //   group: "details",
    //   validation: (Rule) =>
    //     Rule.unique().custom((items) => {
    //       if (!items) return true;
    //       return items.some((item: any) => item?._ref === undefined)
    //         ? "Every related product must be selected."
    //         : true;
    //     }),
    // }),
    defineField({
      name: "featured",
      title: "Featured Product",
      type: "boolean",
      initialValue: false,
      group: "details",
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      group: "details",
    }),

    // Technical specifications
    defineField({
      name: "specifications",
      title: "Technical Specifications",
      type: "productSpecifications",
      group: "technical",
    }),

    // SEO
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "seo",
      group: "seo",
    }),
  ],

  preview: {
    select: {
      title: "name",
      media: "featuredImage",
    },
    prepare({ title, media }) {
      return {
        title: title || "Untitled product",
        subtitle: "Product",
        media,
      };
    },
  },
});
