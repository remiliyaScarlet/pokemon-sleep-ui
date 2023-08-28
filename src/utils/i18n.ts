import {createTranslator} from 'next-intl';

import {defaultLocale, locales} from '@/const/website';
import {I18nNamespaces} from '@/types/i18n';
import {Locale} from '@/types/next/locale';


export const isLocale = (locale: string): locale is Locale => {
  return locales.includes(locale);
};

export const getMessages = async (locale: string) => {
  let localeToUse = locale;
  if (!isLocale(locale)) {
    localeToUse = defaultLocale satisfies Locale;
  }

  const [UI, Game] = await Promise.all([
    import(`../../messages/ui-${localeToUse}.json`),
    import(`../../messages/game-${localeToUse}.json`),
  ]);

  return {
    UI: UI.default,
    Game: Game.default,
  };
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
