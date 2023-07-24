import {locales} from '@/const';
import {Locale} from '@/types/next/locale';


export const isLocale = (locale: string): locale is Locale => {
  return locales.includes(locale);
};
