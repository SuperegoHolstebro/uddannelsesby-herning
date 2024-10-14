import { defineField, defineType } from "sanity";

export const SectionSettings = defineType({
  type: "object",
  name: "SectionSettings",
  title: "Design",
  options: {},
  fields: [
    defineField({
      name: "anchor",
      type: "slug",
    }),
  ],
});
