import * as v from "valibot";

export const pageIdSchema = v.number();
export const titleSchema = v.string();
export const extractSchema = v.string();
export const thumbnailSchema = v.object({
  source: v.pipe(v.string(), v.url()),
  width: v.number(),
  height: v.number(),
});

export const pageInfosResponseSchema = v.object({
  query: v.object({
    pages: v.record(
      v.string(),
      v.object({
        pageid: pageIdSchema,
        ns: v.number(),
        title: titleSchema,
        extract: extractSchema,
        thumbnail: thumbnailSchema,
      })
    ),
  }),
});
