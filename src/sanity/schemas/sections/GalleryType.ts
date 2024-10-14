// ./schemas/videoType.js

import { defineType } from "sanity";
import { MediaIcon } from "@/components/sanity/PageBuilderIcons";
export const Gallery = defineType({
  name: "Gallery",
  type: "object",
  icon: MediaIcon,
  title: "Gallery",
  fields: [
    {
      name: "images",
      type: "array",
      title: "Images",
      of: [
        {
          name: "image",
          type: "image",
          title: "Image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
            },
          ],
        },
      ],
      options: {
        layout: "grid",
      },
    },

    
    /* {
      // group: 'settings',
      name: "SectionSettings",
      title: "Indstillinger",
      type: "SectionSettings",
    }, */
  ],
  preview: {
    select: {
      images: "images",
      image: "images.0",
    },
    prepare(selection) {
      const { images, image } = selection;

      return {
        title: `Galleri med ${Object.keys(images).length} billeder`,
        subtitle: `Alt text: `,
        media: image,
      };
    },
  },
});
