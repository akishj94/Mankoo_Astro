
import {defineField, defineType} from 'sanity'

export const navigationItem = defineType({
  name: 'navigationItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          {title: 'Internal Link', value: 'internal'},
          {title: 'External URL', value: 'external'},
        ],
        layout: 'radio',
      },
      initialValue: 'internal',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'internalLink',
      title: 'Internal Link',
      type: 'reference',
      to: [
        {type: 'page'},
        {type: 'product'},
        {type: 'post'},
        {type: 'productCategory'},
        {type: 'blogCategory'},
      ],
      hidden: ({parent}) => parent?.linkType !== 'internal',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as
            | {linkType?: string}
            | undefined

          if (parent?.linkType === 'internal' && !value) {
            return 'Select an internal destination.'
          }

          return true
        }),
    }),

    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      hidden: ({parent}) => parent?.linkType !== 'external',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as
            | {linkType?: string}
            | undefined

          if (parent?.linkType === 'external' && !value) {
            return 'Enter an external URL.'
          }

          return true
        }),
    }),

    defineField({
      name: 'children',
      title: 'Submenu Items',
      type: 'array',
      of: [{type: 'navigationItem'}],
      description:
        'Add child links here. A submenu is rendered when this list contains items.',
    }),

    defineField({
      name: 'megaMenuImages',
      title: 'Mega Menu Image',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              description:
                'Describe the image for accessibility. Leave empty only if the image is purely decorative.',
              // validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      description:
        'Optional image displayed beside this item’s submenu. Maximum 1 image.',
      validation: (Rule) => Rule.max(1),
      options: {
        layout: 'grid',
      },
    }),
  ],

  preview: {
    select: {
      title: 'label',
      children: 'children',
      images: 'megaMenuImages',
    },
    prepare({title, children, images}) {
      const childCount = children?.length ?? 0
      const imageCount = images?.length ?? 0

      return {
        title: title || 'Untitled navigation item',
        subtitle: [
          childCount ? `${childCount} submenu item(s)` : undefined,
          imageCount ? 'Mega menu image set' : undefined,
        ]
          .filter(Boolean)
          .join(' · '),
      }
    },
  },
})
