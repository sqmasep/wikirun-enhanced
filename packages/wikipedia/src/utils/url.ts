import { WIKIPEDIA_LANGUAGES, WikipediaLanguage } from "../data/languages";

export const WIKIPEDIA_PROTOCOL = "https://";
export const WIKIPEDIA_DOMAIN = "wikipedia.org";

export const WIKIPEDIA_WIKI_PATH = "/wiki/";
export const WIKIPEDIA_API_PATH = "/w/api.php";

// ---

export function getAPIUrl(language: WikipediaLanguage): string {
  return `${WIKIPEDIA_PROTOCOL}${language}.${WIKIPEDIA_DOMAIN}${WIKIPEDIA_API_PATH}`;
}

// TODO rename this function
export function titleUrlBuilder(
  language: WikipediaLanguage,
  title: string
): string {
  return `${WIKIPEDIA_PROTOCOL}${language}.${WIKIPEDIA_DOMAIN}${WIKIPEDIA_WIKI_PATH}${title}`;
}

// ---

export function getLanguageFromUrl(url: string): WikipediaLanguage {
  const urlParts = url.split(".");
  const language = urlParts[0]?.replace(WIKIPEDIA_PROTOCOL, "");

  if (!Object.keys(WIKIPEDIA_LANGUAGES).includes(language ?? "")) {
    throw new Error(`Invalid language: ${language}`);
  }

  return language as WikipediaLanguage;
}

export function getTitleFromUrl(url: string) {
  const urlParts = url.split(`${WIKIPEDIA_DOMAIN}${WIKIPEDIA_WIKI_PATH}`);
  const title = urlParts[1];

  if (!title) {
    throw new Error(
      `Invalid URL format: could not retreive title from "${url}"`
    );
  }

  return title;
}

export function getAPIInfosUrlFromTitle(
  language: Parameters<typeof getAPIUrl>[0],
  title: string
) {
  const apiUrl = getAPIUrl(language);

  const options = new URLSearchParams({
    action: "query",
    origin: "*",
    prop: "extracts|pageimages",
    exintro: "",
    explaintext: "",
    piprop: "thumbnail",
    pithumbsize: "500",
    titles: title,
    format: "json",
  });

  const url = `${apiUrl}?${options}`;

  return url;
  // return (
  //   getAPIUrl(language) +
  //   `?action=query&origin=*&prop=extracts|pageimages&exintro&explaintext&piprop=thumbnail&pithumbsize=500&titles=${title}&format=json`
  // );
}

export function getRawHTMLUrlFromTitle(
  language: Parameters<typeof getAPIUrl>[0],
  title: string
) {
  const apiUrl = getAPIUrl(language);

  const options = new URLSearchParams({
    action: "parse",
    origin: "*",
    page: title,
    format: "json",
  });

  const url = `${apiUrl}?${options}`;

  return url;
}
