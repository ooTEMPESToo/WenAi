import { defineField, defineType } from "sanity";

export const startup = defineType({
  name: "startup",
  title: "Startup",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "views",
      type: "number",
    }),
    defineField({
      name: "description",
      type: "text",
    }),
    defineField({
      name: "category",
      type: "string",
      validation: (Rule) =>
        Rule.min(1).max(20).required().error("Please enter a category"),
    }),
    defineField({
      name: "image",
      title: "Startup Image",
      type: "object",
      fields: [
        defineField({
          name: "assetRef",
          title: "Upload Image",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "url",
          title: "Image URL",
          type: "url",
        }),
      ],
      validation: (Rule) =>
        Rule.custom((field) => {
          if (!field?.assetRef && !field?.url) {
            return "Please upload an image or provide a valid image URL";
          }
          return true;
        }),
    }),
    defineField({
      name: "pitch",
      type: "markdown",
    }),
  ],
});
