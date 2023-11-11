export const ocrLocale = [
  'en',
  'ja',
  'zh',
] as const;

export type OcrLocale = typeof ocrLocale[number];
