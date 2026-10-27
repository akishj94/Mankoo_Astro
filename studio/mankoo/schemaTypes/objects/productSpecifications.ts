
import { defineField, defineType } from 'sanity';

export const productSpecifications = defineType({
  name: 'productSpecifications',
  title: 'Technical Specifications',
  type: 'object',

  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Technical Specification',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),

    defineField({
      name: 'capacities',
      title: 'Capacity Configurations',
      description:
        'Add each machine capacity. Each configuration has its own specifications and optional additional specification group.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'modelConfiguration',
          title: 'Model Configuration',          
          fields: [
            defineField({
              name: 'modelTitle',
              title: 'Model Title',
              type: 'string',              
              description: 'Add Model Label',
              initialValue: 'Model',
            }),

            defineField({
              name: 'modelName',
              title: 'Model Name',
              type: 'string',
            }),

            defineField({
              name: 'specifications',
              title: 'Specifications',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'technicalSpecificationRow',
                  title: 'Specification Row',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Specification Name',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),

                    defineField({
                      name: 'unit',
                      title: 'Unit',
                      type: 'string',
                      description:
                        'For example: mm, HP, kN, SPM. Leave blank if not applicable.',
                    }),

                    defineField({
                      name: 'value',
                      title: 'Value',
                      type: 'string',
                      description:
                        'Use text to support values such as 200, 1500 x 1200, or --.',
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'label',
                      value: 'value',
                      unit: 'unit',
                    },
                    prepare({ title, value, unit }) {
                      return {
                        title: title || 'Untitled specification',
                        subtitle: [value, unit]
                          .filter(Boolean)
                          .join(' '),
                      };
                    },
                  },
                },
              ],
            }),

            defineField({
              name: 'additionalSpecifications',
              title: 'Additional Specification Group',
              description:
                'Optional group, for example Die Cushion. Leave empty if this capacity has no additional specifications.',
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Group Title',
                  type: 'string',
                  initialValue: 'Die Cushion',
                  validation: (Rule) => Rule.required(),
                }),

                defineField({
                  name: 'specifications',
                  title: 'Specifications',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      name: 'additionalTechnicalSpecificationRow',
                      title: 'Specification Row',
                      fields: [
                        defineField({
                          name: 'label',
                          title: 'Specification Name',
                          type: 'string',
                          validation: (Rule) => Rule.required(),
                        }),

                        defineField({
                          name: 'unit',
                          title: 'Unit',
                          type: 'string',
                          description:
                            'For example: mm, HP, kN. Leave blank if not applicable.',
                        }),

                        defineField({
                          name: 'value',
                          title: 'Value',
                          type: 'string',
                          validation: (Rule) => Rule.required(),
                        }),
                      ],
                      preview: {
                        select: {
                          title: 'label',
                          value: 'value',
                          unit: 'unit',
                        },
                        prepare({ title, value, unit }) {
                          return {
                            title: title || 'Untitled specification',
                            subtitle: [value, unit]
                              .filter(Boolean)
                              .join(' '),
                          };
                        },
                      },
                    },
                  ],
                }),
              ],
            }),
          ],

          preview: {
            select: {
              capacity: 'capacity',
              unit: 'capacityUnit',
            },
            prepare({ capacity, unit }) {
              return {
                title:
                  capacity != null
                    ? `${capacity} ${unit || ''}`.trim()
                    : 'New Capacity Configuration',
              };
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.required().min(1),
    }),
  ],

  preview: {
    select: {
      title: 'heading',
      subtitle: 'subtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Technical Specifications',
        subtitle,
      };
    },
  },
});
