import { CalendarUp } from "@mynaui/icons-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Begivenhed",
  type: "document",
  icon: CalendarUp,
  groups: [
    { name: "content", title: "Indhold" },
    { name: "pageBuilder", title: "Sideopbygning"},
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Udvalgt billede',
      description: 'Billedet der vises i "begivenheder" oversigten og på selve begivenheden',
      group: 'content',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Beskrivelse',
      description: 'En kort beskrivelse af begivenheden',
      group: 'content',
    }),
    defineField({
      name: 'date',
      type: 'datetime',
      title: 'Dato',
      description: 'Dato og tidspunkt for begivenheden',
      group: 'content',
      options: {
        dateFormat: 'DD-MM-YYYY',
        timeFormat: 'HH:mm',
        timeStep: 15,
      },
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      group: "pageBuilder",
      name: 'pageBuilder',
      title: 'Indhold',
      description: 'Indholdet på siden',
      type: 'pageBuilder',
    }),

    defineField({
      group: "seo",
      title: "SEO",
      description: "SEO indstillinger",
      name: 'seoGroup',
      type: 'seoGroup',
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      image: "image",
    },
      prepare: ({ title, date, image}) => ({
        title: title,
        subtitle: date ? new Date(date).toLocaleDateString('da-DK', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Ingen dato angivet',
        media: image,
       }),

  },
});
