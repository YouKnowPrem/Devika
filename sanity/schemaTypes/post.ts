import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      options: {
        list: [
          { title: 'Jammu', value: 'Jammu' },
          { title: 'Kashmir', value: 'Kashmir' },
          { title: 'Ladakh', value: 'Ladakh' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'A brief description of the article used in lists or cards.',
      rows: 3,
    }),
    defineField({
      name: 'era',
      title: 'Historical Era/Period',
      type: 'string',
      description: 'e.g. 9th Century AD, Dogra Dynasty, Mughal Rule',
    }),
    defineField({
      name: 'significance',
      title: 'Cultural Significance',
      type: 'string',
      description: 'e.g. Archaeological Monument, Sufi Pilgrimage Site, Oral Tradition',
    }),
    defineField({
      name: 'locationDetails',
      title: 'Specific Location',
      type: 'string',
      description: 'e.g. Anantnag District, Kashmir Valley',
    }),
    defineField({
      name: 'custodians',
      title: 'Key Custodians',
      type: 'string',
      description: 'e.g. Archaeological Survey of India (ASI), Local Community Trust',
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery (Carousel)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'A short descriptive caption for this slideshow image.',
            },
          ],
        },
      ],
      description: 'Multiple images that will render as an interactive carousel in the middle of the article.',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
