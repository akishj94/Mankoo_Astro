
import { defineField, defineType } from "sanity";

const specificationRow = {
  type: "object" as const,
  name: "technicalSpecificationRow",
  title: "Specification Row",
  fields: [
    defineField({
      name: "label",
      title: "Specification Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "unit",
      title: "Unit",
      type: "string",
      description: "Example: mm, kW, kN, SPM.",
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      description: "Example: 1250 × 800 or On request.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "label",
      value: "value",
      unit: "unit",
    },
    prepare({
      title,
      value,
      unit,
    }: {
      title?: string;
      value?: string;
      unit?: string;
    }) {
      return {
        title: title || "Untitled specification",
        subtitle: [value, unit].filter(Boolean).join(" "),
      };
    },
  },
};

export const productSpecifications = defineType({
  name: "productSpecifications",
  title: "Technical Specifications",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "Technical Specifications",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "capacities",
      title: "Models",
      description: "Add one configuration for each available model.",
      type: "array",
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: "object",
          name: "modelConfiguration",
          title: "Model",
          fields: [
            defineField({
              name: "modelName",
              title: "Model Name",
              type: "string",
              description:
                'Unique model name displayed in the dropdown, e.g. "100 T".',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "keySpecifications",
              title: "Key Specifications",
              type: "array",
              of: [
                {
                  ...specificationRow,
                  name: "keyTechnicalSpecificationRow",
                  title: "Key Specification",
                },
              ],
            }),
            defineField({
              name: "specificationGroups",
              title: "Full Specification Groups",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "technicalSpecificationGroup",
                  title: "Specification Group",
                  fields: [
                    defineField({
                      name: "title",
                      title: "Group Heading",
                      type: "string",
                      description:
                        "Enter a custom heading for this specification category.",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "specifications",
                      title: "Specification Rows",
                      type: "array",
                      of: [specificationRow],
                    }),
                  ],
                  preview: {
                    select: { title: "title" },
                    prepare({ title }) {
                      return { title: title || "Specification Group" };
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: "modelName" },
            prepare({ title }) {
              return { title: title || "New Model" };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "heading",
      subtitle: "subtitle",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Technical Specifications",
        subtitle,
      };
    },
  },
});
