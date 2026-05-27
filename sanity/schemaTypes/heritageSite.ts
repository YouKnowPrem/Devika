import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'heritageSite',
  title: 'Heritage Site',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Name',
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
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
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
      name: 'district',
      title: 'District',
      type: 'string',
      options: {
        list: [
          // Jammu Region Districts
          { title: 'Jammu', value: 'Jammu' },
          { title: 'Samba', value: 'Samba' },
          { title: 'Kathua', value: 'Kathua' },
          { title: 'Udhampur', value: 'Udhampur' },
          { title: 'Reasi', value: 'Reasi' },
          { title: 'Rajouri', value: 'Rajouri' },
          { title: 'Poonch', value: 'Poonch' },
          { title: 'Ramban', value: 'Ramban' },
          { title: 'Doda', value: 'Doda' },
          { title: 'Kishtwar', value: 'Kishtwar' },
          
          // Kashmir Region Districts
          { title: 'Srinagar', value: 'Srinagar' },
          { title: 'Budgam', value: 'Budgam' },
          { title: 'Ganderbal', value: 'Ganderbal' },
          { title: 'Anantnag', value: 'Anantnag' },
          { title: 'Pulwama', value: 'Pulwama' },
          { title: 'Shopian', value: 'Shopian' },
          { title: 'Kulgam', value: 'Kulgam' },
          { title: 'Baramulla', value: 'Baramulla' },
          { title: 'Kupwara', value: 'Kupwara' },
          { title: 'Bandipora', value: 'Bandipora' },
          
          // Ladakh Region Districts
          { title: 'Leh', value: 'Leh' },
          { title: 'Kargil', value: 'Kargil' },
        ],
      },
    }),
    defineField({
      name: 'locationDetails',
      title: 'Specific Location Description',
      type: 'string',
      description: 'e.g. 5km east of Anantnag town, near the mountain ridge',
    }),
    defineField({
      name: 'era',
      title: 'Historical Era/Period',
      type: 'string',
      description: 'e.g. 8th Century AD (Utpala Dynasty), Mughal Era, Dogra Dynasty',
    }),
    defineField({
      name: 'significance',
      title: 'Cultural Significance',
      type: 'string',
      description: 'e.g. Ancient Temple Ruins, Sufi Shrine, Archaeological Marvel',
    }),
    defineField({
      name: 'custodians',
      title: 'Key Custodians',
      type: 'string',
      description: 'e.g. Archaeological Survey of India (ASI), State Archives Department',
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
              description: 'A brief description of this photo for the slideshow carousel.',
            },
          ],
        },
      ],
      description: 'Multiple images that will render as an interactive slideshow carousel in the middle of the page.',
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
      name: 'body',
      title: 'Detailed History & Story (Rich Text)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})
