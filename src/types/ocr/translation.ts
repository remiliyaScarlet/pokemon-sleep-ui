import {OcrLocale} from '@/types/ocr/locale';


export type OcrTranslationOfLocale<TTarget> = {[text in string]: TTarget};

export type OcrTranslationOfLocales<TTranslations> = {[locale in OcrLocale]: TTranslations};
