
import { defineField, defineType } from "sanity";

export const redirect = defineType({
  name: "redirect",
  title: "URL Redirects",
  type: "document",
  fields: [
    defineField({
      name: "sourcePath",
      title: "Old Path",
      type: "string",
      description: "Example: /old-product-page",
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) return true;
          if (!value.startsWith("/")) {
            return "Use a path starting with /.";
          }
          if (value.startsWith("//")) {
            return "Protocol-relative paths are not allowed.";
          }
          return true;
        }),
    }),
    defineField({
      name: "destination",
      title: "Destination",
      type: "string",
      description:
        "Use a local path such as /products/new-model or an approved absolute URL.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "statusCode",
      title: "Redirect Type",
      type: "number",
      options: {
        list: [
          { title: "301 — Permanent", value: 301 },
          { title: "302 — Temporary", value: 302 },
          { title: "308 — Permanent, preserve method", value: 308 },
        ],
      },
      initialValue: 301,
      validation: (Rule) =>
        Rule.required().custom((value) =>
          [301, 302, 308].includes(Number(value))
            ? true
            : "Select a supported redirect status."
        ),
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "notes",
      title: "Internal Notes",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: "sourcePath",
      subtitle: "destination",
      active: "active",
    },
    prepare({ title, subtitle, active }) {
      return {
        title: title || "New redirect",
        subtitle: `${active ? "Active" : "Inactive"} → ${subtitle || "No destination"}`,
      };
    },
  },
});
