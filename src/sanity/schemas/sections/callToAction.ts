import { defineField, defineType } from "sanity";
import { CallToActionIcon } from "@/components/sanity/PageBuilderIcons";

const CallToAction = defineType({
  name: "CallToAction",
  title: "Call to action",
  icon: CallToActionIcon,
  description:
    "Call to actions er fremtrædende bokse eller knapper, der opfordrer brugeren til at udføre en bestemt handling, f.eks. at klikke videre på relaterede sider på hjemmesiden eller tage kontakt til Jer. Call to actions gør oplevelsen mere intuitiv og flydende for brugeren.",
  type: "object",
  groups: [
    { title: "Indhold", name: "content" },
    { title: "Design", name: "design" },
    { title: "indstillinger", name: "settings" },
  ],
  fields: [
    {
      group: "content",
      name: "callToActions",
      title: "Call to actions",
      type: "array",
      of: [
        {
          name: "callToAction",
          icon: CallToActionIcon,
          title: "Call to action",
          type: "object",
          groups: [
            { title: "Medie", name: "medie" },
            { title: "Tekst", name: "text" },
            { title: "Link", name: "link" },
          ],
          fields: [
            // heading
            defineField({
              group: "text",
              name: "heading",
              title: "Overskrift",
              type: "string",
              description:
                "Overskriften er det første, brugeren ser, og skal være kort og præcis. Den skal beskrive, hvad brugeren får ud af at klikke på knappen.",
            }),
            // subheading
            defineField({
              group: "text",
              name: "subheading",
              title: "Underoverskrift",
              type: "string",
              description:
                "Underoverskriften er en kort beskrivelse af overskriften og skal uddybe, hvad brugeren får ud af at klikke på knappen.",
            }),
            // link
            defineField({
              group: "link",
              name: "link",
              title: "Link",
              type: "link",
              validation: (Rule) => Rule.required(),
            }),
            {
              group: "medie",
              name: "MediaObject",
              title: "Medie",
              type: "MediaObject",
            },
          ],
        },
      ],
    },
    {
      name: "design",
      type: "design",
      group: "design",
    },

    {
      group: "settings",
      name: "SectionSettings",
      title: "Indstillinger",
      type: "SectionSettings",
    },
  ],
  preview: {
    select: {
      title: "Call to action",
      amountofCTAs: "callToActions",
      media: "callToActions.0.image",
    },
    prepare({ title, amountofCTAs, media }) {
      return {
        title: "Call to action",
        subtitle: `Antal ${Object.keys(amountofCTAs).length} Call to actions`,

        media: media,
      };
    },
  },
});

export { CallToAction };
