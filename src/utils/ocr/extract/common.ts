import {OcrTranslationOfLocale} from '@/types/ocr/translation';


export type OcrExtractSingleOpts<TId> = {
  text: string,
  translations: OcrTranslationOfLocale<TId>,
};

export const ocrExtractSingle = <TId>({text, translations}: OcrExtractSingleOpts<TId>): TId | null => {
  let found = null;
  for (const [name, id] of Object.entries(translations)) {
    const index = text.indexOf(name);

    if (index < 0) {
      continue;
    }

    found = id;
    break;
  }

  return found;
};
