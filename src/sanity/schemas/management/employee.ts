
import IconPickerInput from "@/components/sanity/IconPickerInput";

export default {
  name: "employee",
  title: "Employee",
  type: "document",

  groups: [
    { title: "Personlige oplysninger", name: "personalInformation" },
    { title: "Stilling detaljer", name: "positionDetails" },
    { title: "Kontaktoplysninger", name: "contactInformation" },
    { title: "Medier", name: "media" },
    { title: "Social", name: "socialer" }, // Updated field group name
  ],

  fields: [
    {
      name: "title",
      title: "Navn",
      description: "Navnet på medarbejder",
      type: "string",
      group: "personalInformation",
    },
    {
      name: "email",
      title: "Email",
      description: "Email til medarbejderen",
      type: "string",
      group: "contactInformation",
    },
    {
      name: "phone",
      title: "Telefonnummer",
      description: "Telefonnummer til medarbejderen",
      type: "string",
      group: "contactInformation",
    },
    {
      name: "image",
      options: {
        hotspot: true,
      },
      title: "Billede",
      description: "Billede af medarbejderen",
      type: "image",
      group: "media",
    },
    {
      name: "employeePosition",
      title: "Medarbejder Stilling",
      description: "Stillingen på medarbejderen",
      options: {
        collapsible: true,
      },
      type: "object",
      group: "positionDetails",
      fields: [
        {
          name: "simplePosition",
          type: "boolean",
          title: "Simple Position",
          description: "Check this if the employee has a simple position",
          options: {
            layout: "checkbox",
          },
          initialValue: true,
        },
        {
          name: "position",
          title: "Position",
          type: "string",
          //hide if simplePosition is true
          hidden: ({ parent }) => parent?.simplePosition === false,
        },
        {
          name: "stilling",
          title: "Stilling",
          type: "array",
          of: [
            {
              name: "positionTags",
              title: "PositionTags",
              type: "reference",
              to: [{ type: "position" }],
            },
          ],
        },
      ],
    },
    {
      group: "socialer",
      name: "socials",
      title: "Social media",
      description: "Social media links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              type: "string",
              title: "",

              components: {
                input: IconPickerInput,
              },
              options: {
                list: [
                  { title: "Facebook", value: "facebook" },
                  { title: "Instagram", value: "instagram" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Twitter", value: "twitter" },
                  { title: "Github", value: "github" },
                  { title: "Google", value: "google" },
                  { title: "Youtube", value: "youtube" },
                  { title: "Apple", value: "apple" },
                  { title: "Snapchat", value: "snapchat" },
                  { title: "Pinterest", value: "pinterest" },
                  { title: "Figma", value: "figma" },
                  { title: "Dribble", value: "dribble" },
                  { title: "Reddit", value: "reddit" },
                  { title: "Discord", value: "discord" },
                  { title: "Tiktok", value: "tiktok" },
                  { title: "Clubhouse", value: "clubhouse" },
                  { title: "Slack", value: "slack" },
                ],
              },
            },
            {
              name: "url",
              type: "url",
              title: "URL",
              description: "URL for the selected social media platform",
              hidden: ({ parent }) => !parent?.platform,
            },
          ],
          preview: {
            select: {
              title: "platform",
              subtitle: "url",
            },
          },
        },
      ],
    },
  ],

  preview: {
    select: {
      title: "title",
      media: "image",
      position: "employeePosition.position",
    },
    prepare(selection) {
      const { title, media, position } = selection;
      return {
        title: title,
        media: media,
        subtitle: position,
      };
    },
  },
};
