import { Tag } from "@mynaui/icons-react";
import { defineField } from "sanity";

export default {
  name: "category",
  title: "Kategori",
  type: "document",
  icon: Tag,
  fields: [
    defineField({
      name: "title",
      title: "Navn",
      description: "Navnet på medarbejder",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
};
