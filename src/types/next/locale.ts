export const locales = [
  'en',
  'zh',
  'ja',
  'kr',
  'de',
] as const;

export type Locale = typeof locales[number];
