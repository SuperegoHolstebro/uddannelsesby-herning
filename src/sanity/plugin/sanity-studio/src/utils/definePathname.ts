import { ComponentType } from "react";
import {
  defineField,
  FieldDefinition,
  ObjectFieldProps,
  SlugValidationContext,
  SlugValue,
} from "sanity";
import { slugFieldComponent } from "../components/PathnameFieldComponent";
import { slugParams } from "../types";

export function definePathname(
  schema: slugParams = { name: "slug" }
): FieldDefinition<"slug"> {
  const slugOptions = schema?.options;

  return defineField({
    ...schema,
    name: schema.name ?? "slug",
    title: schema?.title ?? "URL",
    type: "slug",
    components: {
      ...schema.components,
      field: (schema.components?.field ??
        slugFieldComponent) as unknown as ComponentType<
        ObjectFieldProps<SlugValue>
      >,
    },
    options: {
      ...(slugOptions ?? {}),
      isUnique: slugOptions?.isUnique ?? isUnique,
    },
  });
}

async function isUnique(
  slug: string,
  context: SlugValidationContext
): Promise<boolean> {
  const { document, getClient } = context;
  const client = getClient({ apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-06-21" });
  const id = document?._id.replace(/^drafts\./, "");
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
    locale: document?.locale ?? null,
    type: document?._type,
  };
  const query = `*[_type== $type && !(_id in [$draft, $published]) && slug.current == $slug]`;
  const result = await client.fetch(query, params);
  return result.length === 0;
}
