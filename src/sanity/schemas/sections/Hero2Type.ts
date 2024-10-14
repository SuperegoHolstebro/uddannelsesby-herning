import { defineField, defineType } from "sanity";
import { HeroIcon } from "@/components/sanity/PageBuilderIcons";
export const Hero2Type = defineType({
  name: "Hero2",
  type: "object",
  icon: HeroIcon,
  groups: [
    { title: "Media", name: "media" },
    { title: "Design", name: "design" },
    { title: "Content", name: "content" },
    { title: "Indstillinger", name: "settings" },
  ],
  description:
    "Banneret fungerer som et sidehoved, der skaber blikfang fra første øjekast og gør siden overskuelig.",
  title: "Hero 2",
  fields: [
    defineField({
      group: "content",
      name: "title",
      type: "string",
      title: "Titel",
    }),
    {
      group: "media",
      name: "MediaObject",
      title: "Medie",
      type: "MediaObject",
    },
    {
      group: "settings",
      name: "SectionSettings",
      title: "Indstillinger",
      type: "SectionSettings",
    },
    {
      group: "design",
      name: "design",
      title: "Design",
      type: "design",
    },
  ],
  preview: {
    select: {
      title: "title",
      tagline: "tagline",
      type: "type",
      media: "image",
    },
    prepare({ title, tagline, media }) {
      return {
        title: title || "Ingen titel",
        type: "Hero",
        subtitle: "Topbanner",
        media,
      };
    },
  },
});
