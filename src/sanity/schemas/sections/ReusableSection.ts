import { defineType } from "sanity";
import { HeroIcon } from '@/components/sanity/PageBuilderIcons'
export const ReusableSectionType = defineType({
  name: "ReusableSection",
  type: "object",
  icon: HeroIcon,
  description:
    "Banneret fungerer som et sidehoved, der skaber blikfang fra første øjekast og gør siden overskuelig.",
  title: "Genbrugelig sektion",
  fields: [
      {
        name: "reusable",
        title: "Genbrugelig sektion",
        type: "reference",
        to: [{ type: "reusable" }],
      },
  ],
  preview: {
    select: {
      title: "reusable.title",
    },
    prepare({ title }) {
      return {
        title: title,
        subtitle: "Genbrugelig sektion",
      };
    },
  },
});

