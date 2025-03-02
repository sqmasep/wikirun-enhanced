import * as v from "valibot";
import { getAPIInfosUrlFromTitle } from "./url";
import { pageInfosResponseSchema } from "@repo/validation/wikipedia/page";

export async function getPageInfosFromTitle(
  language: Parameters<typeof getAPIInfosUrlFromTitle>[0],
  title: Parameters<typeof getAPIInfosUrlFromTitle>[1]
) {
  const url = getAPIInfosUrlFromTitle(language, title);

  const response = await fetch(url);
  const rawData = await response.json();

  const fullData = v.parse(pageInfosResponseSchema, rawData);

  const data = Object.values(fullData.query.pages)[0];

  return data;
}
