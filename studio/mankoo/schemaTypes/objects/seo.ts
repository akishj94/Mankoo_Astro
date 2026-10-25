
import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO Settings",
  type: "object",
  groups: [
    { name: "search", title: "Search engines", default: true },
    { name: "social", title: "Social sharing" },
    { name: "advanced", title: "Advanced" },
  ],
  fields: [
    defineField({
      name: "metaTitle",
      title: "SEO Title",
      type: "string",
      group: "search",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      group: "search",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "ogTitle",
      title: "Social Title",
      type: "string",
      group: "social",
    }),
    defineField({
      name: "ogDescription",
      title: "Social Description",
      type: "text",
      rows: 3,
      group: "social",
    }),
    defineField({
      name: "ogImage",
      title: "Social Sharing Image",
      type: "image",
      options: { hotspot: true },
      group: "social",
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL Override",
      type: "url",
      description:
        "Leave empty to generate the canonical URL automatically.",
      group: "advanced",
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search results",
      type: "boolean",
      initialValue: false,
      description:
        "Adds a noindex directive. This does not replace access control.",
      group: "advanced",
    }),
    defineField({
      name: "excludeFromSitemap",
      title: "Exclude from XML sitemap",
      type: "boolean",
      initialValue: false,
      group: "advanced",
    }),
  ],
});
