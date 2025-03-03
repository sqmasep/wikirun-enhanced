import { describe, it, expect } from "vitest";
import {
  WIKIPEDIA_PROTOCOL,
  WIKIPEDIA_DOMAIN,
  WIKIPEDIA_API_PATH,
  getAPIUrl,
  getLanguageFromUrl,
} from "../url";

describe("url", () => {
  it("should return the correct API URL", () => {
    expect(getAPIUrl("en")).toBe(
      `${WIKIPEDIA_PROTOCOL}en.${WIKIPEDIA_DOMAIN}${WIKIPEDIA_API_PATH}`
    );
  });

  it("should get the language from the URL", () => {
    expect(getLanguageFromUrl("https://en.wikipedia.org/wiki/Chess")).toBe(
      "en"
    );
    expect(getLanguageFromUrl("https://fr.wikipedia.org/wiki/Chess")).toBe(
      "fr"
    );
    expect(getLanguageFromUrl("https://google.com")).toThrowError();
  });
});
