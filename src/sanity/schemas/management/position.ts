export default {
  name: "position",
  title: "position",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Navn",
      description: "titel på stillingen",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection: { title: any; }) {
      const { title } = selection;
      return {
        title: title,
      };
    },
  },
};