import {OcrAllowedPixel, OcrStatus} from '@/components/ocr/type';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';
import {OcrLocale} from '@/types/ocr/locale';


// https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html
export const ocrLocaleToTesseract: {[lang in OcrLocale]: string} = {
  en: 'eng',
  ja: 'jpn',
  zh: 'chi_tra',
};

export const ocrStatusToI18nId: {[status in OcrStatus]: I18nMessageKeysOfNamespace<'UI.Ocr.Status'>} = {
  ready: 'Ready',
  thresholding: 'Thresholding',
  loadingOcr: 'LoadingOcr',
  recognizing: 'Recognizing',
  completed: 'Completed',
};

// https://github.com/RaenonX-PokemonSleep/pokemon-sleep-ui/issues/315#issuecomment-1806765459
export const ocrAllowedPixels: OcrAllowedPixel[] = [
  // Pokemon Name
  {basis: {r: 57, g: 57, b: 57}, range: 6},
  // Active / White
  {basis: {r: 106, g: 50, b: 16}, range: 6},
  // Inactive / White
  {basis: {r: 185, g: 173, b: 170}, range: 6},
  // Active / Blue
  {basis: {r: 6, g: 19, b: 63}, range: 6},
  // Inactive / Blue
  {basis: {r: 155, g: 162, b: 173}, range: 6},
  // Active / Gold
  {basis: {r: 114, g: 46, b: 2}, range: 6},
  // Inactive / Gold
  {basis: {r: 185, g: 164, b: 126}, range: 6},
  // Nature
  {basis: {r: 69, g: 69, b: 69}, range: 6},
];
