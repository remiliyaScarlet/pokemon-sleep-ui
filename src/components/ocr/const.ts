import {OcrStatus} from '@/components/ocr/type';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';
import {Pixel} from '@/types/image';
import {OcrLocale} from '@/types/ocr/locale';


// https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html
export const ocrLocaleToTesseract: {[lang in OcrLocale]: string} = {
  en: 'eng',
  ja: 'jpn',
  zh: 'chi_tra',
};

export const ocrStatusToI18nId: {[status in OcrStatus]: I18nMessageKeysOfNamespace<'UI.Ocr.Status'>} = {
  error: 'Error',
  ready: 'Ready',
  thresholding: 'Thresholding',
  loadingOcr: 'LoadingOcr',
  recognizing: 'Recognizing',
  completed: 'Completed',
};

// https://github.com/RaenonX-PokemonSleep/pokemon-sleep-ui/issues/315#issuecomment-1806765459
export const ocrAllowedPixels: Pixel[] = [
  // Pokemon Name
  {r: 57, g: 57, b: 57},
  // Active / White
  {r: 106, g: 50, b: 16},
  // Inactive / White
  {r: 185, g: 173, b: 170},
  // Active / Blue
  {r: 6, g: 19, b: 63},
  // Inactive / Blue
  {r: 155, g: 162, b: 173},
  // Active / Gold
  {r: 114, g: 46, b: 2},
  // Inactive / Gold
  {r: 185, g: 164, b: 126},
  // Nature
  {r: 69, g: 69, b: 69},
];
