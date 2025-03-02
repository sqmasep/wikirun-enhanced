import * as v from "valibot";
import { playCountSchema } from "./stats";
import { wikipediaLanguageSchema } from "./wikipedia/languages";

const MAP_NAME_MIN_LENGTH = 1;
const MAP_NAME_MAX_LENGTH = 100;

const MAP_DESCRIPTION_MIN_LENGTH = 1;
const MAP_DESCRIPTION_MAX_LENGTH = 255;

// How many checkpoints can a round have
const MAP_ROUND_MIN_LENGTH = 2;
const MAP_ROUND_MAX_LENGTH = 42;

// How many rounds can a map have
const MAP_ROUNDS_MIN_LENGTH = 1;
const MAP_ROUNDS_MAX_LENGTH = 200_000;

export const mapNameSchema = v.pipe(
  v.string(),
  v.minLength(MAP_NAME_MIN_LENGTH, "Please provide a name"),
  v.maxLength(
    MAP_NAME_MAX_LENGTH,
    `Name is over ${MAP_NAME_MAX_LENGTH} characters`
  )
);

export const mapDescriptionSchema = v.pipe(
  v.string(),
  v.minLength(MAP_DESCRIPTION_MIN_LENGTH, "Please provide a description"),
  v.maxLength(
    MAP_DESCRIPTION_MAX_LENGTH,
    `Description is over ${MAP_DESCRIPTION_MAX_LENGTH} characters`
  )
);

// One wikipedia page is called a checkpoint
export const checkpoint = v.pipe(v.string(), v.url());

// One round
export const roundSchema = v.pipe(
  v.array(checkpoint),
  v.minLength(MAP_ROUND_MIN_LENGTH),
  v.maxLength(MAP_ROUND_MAX_LENGTH)
);
// How many rounds can a map have. A game can have multiple rounds.
export const roundsSchema = v.pipe(
  v.array(roundSchema),
  v.minLength(MAP_ROUNDS_MIN_LENGTH),
  v.maxLength(MAP_ROUNDS_MAX_LENGTH)
);

// export const mapTagsSchema = v.array(v.string());
export const mapTagsSchema = v.array(v.object({ name: v.string() }));

export const mapSchema = v.object({
  lang: wikipediaLanguageSchema,
  name: mapNameSchema,
  description: mapDescriptionSchema,
  playCount: playCountSchema,
  rounds: roundsSchema,
  tags: mapTagsSchema,
});

export type MapSchemaInput = v.InferInput<typeof mapSchema>;
export type MapSchemaOutput = v.InferOutput<typeof mapSchema>;
