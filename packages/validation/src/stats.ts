import * as v from "valibot";

export const playCountSchema = v.pipe(
  v.number(),
  v.integer(),
  v.minValue(0, "Playcount can't be negative")
);
