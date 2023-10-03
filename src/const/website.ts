import {Locale} from '@/types/next/locale';


export const localeName = {
  en: 'English',
  zh: '中文',
  ja: '日本語',
  kr: '한국어',
  de: 'Deutsch',
} as const;

export const defaultLocale: Locale = 'zh';

export const locales = Object.keys(localeName);
