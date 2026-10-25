
import { defineField, defineType } from "sanity";
import {getPublishedId} from 'sanity'

export const page = defineType({
  name: "page",
  title: "Pages",
  type: "document",
  groups: [
    { name: "content", title: "Page Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      group: "content",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
  name: 'isHomepage',
  title: 'Homepage',
  type: 'boolean',
  initialValue: false,
  validation: (rule) =>
    rule.custom(async (isHomepage, context) => {
      if (isHomepage !== true) {
        return true
      }

      const {document, getClient} = context

      if (!document?._id) {
        return true
      }

      const publishedId = getPublishedId(document._id)
      const draftId = `drafts.${publishedId}`

      const client = getClient({
        apiVersion: '2025-02-19',
      })

      const hasAnotherHomepage = await client.fetch<boolean>(
        `defined(*[
          _type == "page" &&
          isHomepage == true &&
          !(_id in [$publishedId, $draftId])
        ][0]._id)`,
        {
          publishedId,
          draftId,
        },
      )

      return hasAnotherHomepage
        ? 'Another page is already marked as the homepage. Unmark it before selecting this page.'
        : true
    }),
}),
    defineField({
      name: "sections",
      title: "Page Sections",
      type: "pageSections",
      group: "content",
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
      title: "title",
      slug: "slug.current",
      isHomepage: "isHomepage",
    },
    prepare({ title, slug, isHomepage }) {
      return {
        title: isHomepage ? `${title} (Homepage)` : title,
        subtitle: slug ? `/${slug}` : "No slug",
      };
    },
  },
});
