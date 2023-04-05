import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      title: 'Approved',
      name: 'approved',
      type: 'boolean',
      description:'we have to approve this comment for publication',
      
    }),

    defineField({
        name: 'email',
        type: 'string',
      }),
      defineField({
        name: 'comment',
        type: 'text',
      }),
      defineField({
        name: 'post',
        type: 'reference',
        to:{type: 'post'}
      }),
  ],
})
