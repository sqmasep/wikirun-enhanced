import { WikipediaLanguage } from "../data/languages";

export const WIKIPEDIA_PROTOCOL = "https://";
export const WIKIPEDIA_DOMAIN = "wikipedia.org";

export const WIKIPEDIA_WIKI_PATH = "/wiki/";
export const WIKIPEDIA_API_PATH = "/w/api.php";

// ---

export function getAPIUrl(language: WikipediaLanguage): string {
  return `${WIKIPEDIA_PROTOCOL}${language}.${WIKIPEDIA_DOMAIN}${WIKIPEDIA_API_PATH}`;
}

export function titleUrlBuilder(
  language: WikipediaLanguage,
  title: string
): string {
  return `${WIKIPEDIA_PROTOCOL}${language}.${WIKIPEDIA_DOMAIN}${WIKIPEDIA_WIKI_PATH}${title}`;
}

// ---

export function getLanguageFromUrl(url: string) {
  const urlParts = url.split(".");
  const language = urlParts[0].replace(WIKIPEDIA_PROTOCOL, "");
  return language;
}

export function getTitleFromUrl(url: string) {
  const urlParts = url.split(`${WIKIPEDIA_DOMAIN}${WIKIPEDIA_WIKI_PATH}`);
  const title = urlParts[1];
  return title;
}

export function getAPIInfosUrlFromTitle(
  language: Parameters<typeof titleUrlBuilder>[0],
  title: Parameters<typeof titleUrlBuilder>[1]
) {
  return (
    getAPIUrl(language) +
    `?action=query&prop=extracts|pageimages&exintro&explaintext&piprop=thumbnail&pithumbsize=500&titles=${title}&format=json`
  );
}
