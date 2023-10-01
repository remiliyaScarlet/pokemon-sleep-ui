import {OcrStatus} from '@/components/ocr/type';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';
import {OcrLocale} from '@/types/ocr/locale';


// https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html
export const ocrLocaleToTesseract: {[lang in OcrLocale]: string} = {
  en: 'eng',
  ja: 'jpn',
};

export const ocrStatusToI18nId: {[status in OcrStatus]: I18nMessageKeysOfNamespace<'UI.Ocr.Status'>} = {
  ready: 'Ready',
  thresholding: 'Thresholding',
  loadingOcr: 'LoadingOcr',
  recognizing: 'Recognizing',
  completed: 'Completed',
};

export const ocrThreshold = 180;
