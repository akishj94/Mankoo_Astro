
import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "identity", title: "Brand & Identity", default: true },
    { name: "header", title: "Header & Navigation" },
    { name: "footer", title: "Footer" },
    { name: "contact", title: "Contact Information" },
    { name: "legal", title: "Legal Information" },
    { name: "seo", title: "Default SEO" },
  ],
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      group: "identity",
      initialValue: "Mankoo Presses",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Primary Logo",
      type: "image",
      options: { hotspot: true },
      group: "identity",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logoAlt",
      title: "Logo Alt Text",
      type: "string",
      group: "identity",
      initialValue: "Mankoo Presses",
    }),
    defineField({
      name: "footerLogo",
      title: "Footer Logo",
      type: "image",
      options: { hotspot: true },
      group: "identity",
    }),
    defineField({
      name: "FooterlogoAlt",
      title: "Footer Logo Alt Text",
      type: "string",
      group: "identity",
      initialValue: "Mankoo Presses",
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      group: "identity",
    }),
    defineField({
      name: "headerNavigation",
      title: "Header Navigation",
      type: "array",
      of: [{ type: "navigationItem" }],
      group: "header",
    }),   
    defineField({
      name: "whatsAppLink",
      title: "WhatsApp URL",
      type: "url",
      group: "header",
    }),
   
    
defineField({
  name: "footerNavigation",
  title: "Footer Columns",
  description: "Configure footer columns and their links.",
  type: "array",
  of: [
    {
      type: "object",
      name: "footerColumn",
      title: "Footer Column",
      fields: [
        defineField({
          name: "title",
          title: "Column Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "menuType",
          title: "Menu Type",
          type: "string",
          options: {
            list: [
              { title: "Navigation Menu", value: "navigation" },
              { title: "Social Menu", value: "social" },
            ],
            layout: "radio",
          },
          initialValue: "navigation",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "links",
          title: "Navigation Links",
          type: "array",
          of: [
            {
              type: "object",
              name: "footerLink",
              title: "Footer Link",
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
                  to: [
                    { type: "page" },
                    { type: "product" },
                    { type: "post" },
                  ],
                  hidden: ({ parent }) =>
                    parent?.linkType !== "internal",
                  validation: (Rule) =>
                    Rule.custom((value, context) => {
                      const parent = context.parent as
                        | { linkType?: string }
                        | undefined;

                      return parent?.linkType === "internal" && !value
                        ? "Select an internal destination."
                        : true;
                    }),
                }),
                defineField({
                  name: "externalUrl",
                  title: "External URL",
                  type: "url",
                  hidden: ({ parent }) =>
                    parent?.linkType !== "external",
                  validation: (Rule) =>
                    Rule.custom((value, context) => {
                      const parent = context.parent as
                        | { linkType?: string }
                        | undefined;

                      return parent?.linkType === "external" && !value
                        ? "Enter an external URL."
                        : true;
                    }),
                }),
              ],
              preview: {
                select: {
                  title: "label",
                  linkType: "linkType",
                },
                prepare({ title, linkType }) {
                  return {
                    title: title || "Untitled footer link",
                    subtitle:
                      linkType === "external"
                        ? "External URL"
                        : "Internal Link",
                  };
                },
              },
            },
          ],
          hidden: ({ parent }) => parent?.menuType !== "navigation",
        }),
      ],
      preview: {
        select: {
          title: "title",
          menuType: "menuType",
        },
        prepare({ title, menuType }) {
          return {
            title: title || "Untitled Column",
            subtitle:
              menuType === "social"
                ? "Social Menu"
                : "Navigation Menu",
          };
        },
      },
    },
  ],
  group: "footer",
}),
defineField({
  name: "copyrightText",
  title: "Copyright Text",
  description: "Copyright text displayed in the footer.",
  type: "string",
  group: "legal",
}),

defineField({
  name: "legalLinks",
  title: "Legal Links",
  description: "Add links such as Privacy Policy, Terms & Conditions, etc.",
  type: "array",
  of: [
    {
      type: "object",
      name: "legalLink",
      title: "Legal Link",
      fields: [
        defineField({
          name: "label",
          title: "Label",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "internalLink",
          title: "Internal Link",
          type: "reference",
          to: [
            { type: "page" },
          ],
          // validation: (Rule) => Rule.required(),
        }),
      ],
      preview: {
        select: {
          title: "label",
        },
        prepare({ title }) {
          return {
            title: title || "Untitled Legal Link",
          };
        },
      },
    },
  ],
  group: "legal",
}),
defineField({
  name: "socialLinks",
  title: "Social Links",
  type: "array",
  of: [
    {
      type: "object",
      name: "socialLink",
      fields: [
        defineField({
          name: "label",
          title: "Label",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "url",
          title: "Link",
          type: "url",
          // validation: (Rule) => Rule.required(),
        }),
      ],
      preview: {
        select: {
          title: "label",
          subtitle: "url",
        },
      },
    },
  ],
  group: "footer",
}),
defineField({
    name: "email",
    title: "Contact Email",
    type: "array",
    of: [{ type: "string" }],
    group: "contact",
  }),
    defineField({
      name: "phone",
      title: "Contact Phone",
      type: "array",
      of: [{ type: "string" }],
      group: "contact",
    }),
    defineField({
      name: "address",
      title: "Business Address",
      type: "text",
      rows: 3,
      group: "contact",
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
