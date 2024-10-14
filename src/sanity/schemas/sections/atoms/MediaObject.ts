import { defineField, defineType } from "sanity";

export const MediaObject = defineType({
  title: "Medie",
  name: "MediaObject",
  type: "object",
  fields: [
    {
      name: "media",
      type: "object",
      title: "Medie",
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        defineField({
          name: "select",
          type: "string",
          title: "Vælg medie",
          options: {
            layout: "dropdown",
            list: [
              { title: "Billede", value: "image" },
              { title: "Video", value: "video" },
              { title: "Vimeo", value: "vimeo" },
            ],
          },
          initialValue: "image",
        }),
        /* Billede */
        {
          name: "imageObject",
          title: "Billede",
          type: "object",
          fields: [
            defineField({
              name: "image",
              type: "image",
            }),
            {
              name: "object",
              type: "object",
              options: {
                collapsed: false,
                collapsible: true,
                columns: 2,
              },
              fields: [
                defineField({
                  name: "objectFit",
                  type: "string",
                  options: {
                    list: [
                      { title: "Fill", value: "fill" },
                      { title: "Contain", value: "contain" },
                      { title: "Cover", value: "cover" },
                      { title: "None", value: "none" },
                    ],
                  },
                }),
                defineField({
                  name: "aspectRatio",
                  type: "string",
                  options: {
                    list: [
                      { title: "Landskab", value: "landscape" },
                      { title: "Portræt", value: "portrait" },
                      { title: "Kvadrat", value: "square" },
                    ],
                  },
                }),
              ],
            },
          ],
          hidden: ({ parent }) => parent?.select !== "image",
        },
        /* Video */
        {
          name: "videoObject",
          title: "Video",
          description: "Vælg en video",
          type: "object",
          hidden: ({ parent }) => parent?.select !== "video",
          fields: [
            {
              name: "video",
              type: "file",
              title: "Video",
            },
            {
              name: "thumbnail",
              type: "image",
              title: "Billede",
            },
          ],
        },
        /* Vimeo */
        {
          name: "vimeoObject",
          title: "Vimeo",
          description: "Vælg en Vimeo video",
          type: "object",
          hidden: ({ parent }) => parent?.select !== "vimeo",
          fields: [
            {
              name: "vimeo",
              type: "url",
              title: "Vimeo",
              validation: (Rule) =>
                Rule.required().uri({
                  scheme: ["http", "https"],
                  allowRelative: false,

                }),
            },
          ],
        },
      ],
    },
  ],
});
