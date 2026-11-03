import { defineField, defineType } from "sanity";

export const linkObject = defineType({
  name: "linkObject",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
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
      name: "internalLink",
      title: "Internal Link",
      type: "reference",
      to: [{ type: "page" }, { type: "product" }, { type: "post" }],
      hidden: ({ parent }) => parent?.linkType !== "internal",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { linkType?: string } | undefined;
          return parent?.linkType === "internal" && !value
            ? "Select an internal destination."
            : true;
        }),
    }),
    defineField({
      name: "externalUrl",
      title: "External URL",
      type: "url",
      hidden: ({ parent }) => parent?.linkType !== "external",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { linkType?: string } | undefined;
          return parent?.linkType === "external" && !value
            ? "Enter an external URL."
            : true;
        }),
    }),
    defineField({
      name: "openInNewTab",
      title: "Open in new tab",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "label", linkType: "linkType", internalLink: "internalLink", externalUrl: "externalUrl" },
    prepare({ title, linkType, internalLink, externalUrl }) {
      return {
        title: title || "Untitled link",
        subtitle: linkType === "external" ? externalUrl || "External URL" : internalLink?._ref || "Internal Link",
      };
    },
  },
});
