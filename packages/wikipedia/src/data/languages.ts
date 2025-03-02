export const WIKIPEDIA_LANGUAGES = {
  en: {
    originalName: "English",
    englishName: "English",
    code: "gb",
  },
  de: {
    originalName: "Deutsch",
    englishName: "German",
    code: "de",
  },
  fr: {
    originalName: "Français",
    englishName: "French",
    code: "fr",
  },
  it: {
    originalName: "Italiano",
    englishName: "Italian",
    code: "it",
  },
  es: {
    originalName: "Español",
    englishName: "Spanish",
    code: "es",
  },
  ru: {
    originalName: "Русский",
    englishName: "Russian",
    code: "ru",
  },
  ja: {
    originalName: "日本語",
    englishName: "Japanese",
    code: "jp",
  },
  pt: {
    originalName: "Português",
    englishName: "Portuguese",
    code: "pt",
  },
  ar: {
    originalName: "العربية",
    englishName: "Arabic",
    code: "sa",
  },
  zh: {
    originalName: "中文",
    englishName: "Chinese",
    code: "cn",
  },
} as const satisfies Record<
  string,
  { originalName: string; englishName: string; code: string }
>;

export const WIKIPEDIA_LANGUAGES_KEYS = Object.keys(
  WIKIPEDIA_LANGUAGES
) as WikipediaLanguage[];

export type WikipediaLanguage = keyof typeof WIKIPEDIA_LANGUAGES;
