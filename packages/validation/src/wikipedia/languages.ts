import * as v from "valibot";
import { WIKIPEDIA_LANGUAGES_KEYS } from "@repo/wikipedia/data/languages";

export const wikipediaLanguageSchema = v.picklist(WIKIPEDIA_LANGUAGES_KEYS);
