
import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Products",
  type: "document",
  groups: [
    { name: "basic", title: "Basic Information", default: true },
    { name: "details", title: "Product Details" },
    { name: "technical", title: "Technical Specifications" },
    { name: "inquiry", title: "Inquiry CTA" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
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
      name: "modelNumber",
      title: "Model Number",
      type: "string",
      group: "basic",
    }),
    defineField({
      name: "category",
      title: "Product Category",
      type: "reference",
      to: [{ type: "productCategory" }],
      group: "basic",
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
    defineField({
      name: "gallery",
      title: "Product Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt Text", type: "string" }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        },
      ],
      group: "details",
    }),
    defineField({
      name: "description",
      title: "Full Description",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
      group: "details",
    }),
    defineField({
      name: "features",
      title: "Key Features",
      type: "array",
      of: [{ type: "string" }],
      group: "details",
    }),
    defineField({
      name: "applications",
      title: "Applications",
      type: "array",
      of: [{ type: "string" }],
      group: "details",
    }),
    defineField({
      name: "specifications",
      title: "Technical Specifications",
      type: "array",
      of: [{ type: "specification" }],
      group: "technical",
    }),
    defineField({
      name: "brochure",
      title: "Product Brochure",
      type: "file",
      options: { accept: ".pdf" },
      group: "details",
    }),
    defineField({
      name: "relatedProducts",
      title: "Related Products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
      group: "details",
      validation: (Rule) =>
        Rule.unique().custom((items) => {
          if (!items) return true;
          return items.some((item: any) => item?._ref === undefined)
            ? "Every related product must be selected."
            : true;
        }),
    }),
    defineField({
      name: "inquiryCtaLabel",
      title: "Inquiry Button Label",
      type: "string",
      initialValue: "Enquire About This Product",
      group: "inquiry",
    }),
    defineField({
      name: "inquiryMessage",
      title: "Prefilled Inquiry Message",
      type: "text",
      rows: 2,
      description: "Optional message to prefill in the inquiry form.",
      group: "inquiry",
    }),
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
      subtitle: "modelNumber",
      media: "featuredImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle || "Product",
        media,
      };
    },
  },
});
