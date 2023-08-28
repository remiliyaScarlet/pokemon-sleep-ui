import {createTranslator} from 'next-intl';

import {locales} from '@/const/website';
import {getMessages} from '@/i18n';
import {I18nNamespaces} from '@/types/i18n';
import {Locale} from '@/types/next/locale';


export const isLocale = (locale: string): locale is Locale => {
  return locales.includes(locale);
};

type GetI18nTranslatorOpts = {
  locale: Locale,
  namespace: I18nNamespaces,
};

export const getI18nTranslator = async ({locale, namespace}: GetI18nTranslatorOpts) => {
  const messages = await getMessages(locale);
  return createTranslator({
    locale,
    messages,
    namespace,
  });
};
