import {OcrLocale} from '@/types/ocr/locale';
import {OcrTranslationOfLocale} from '@/types/ocr/translation';


export type OcrExtractCommonOpts = {
  ocrLocale: OcrLocale,
  text: string,
};

export type OcrExtractOpts<TId> = {
  text: string,
  offset: number,
  translations: OcrTranslationOfLocale<TId>,
};

export type OcrExtractSingleResult<TId> = {
  id: TId,
  index: number,
};
