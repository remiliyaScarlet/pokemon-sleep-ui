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

type GetI18nTranslatorOpts<TNamespace extends I18nNamespaces> = {
  locale: Locale,
  namespace: TNamespace,
};

export const getI18nTranslator = async <TNamespace extends I18nNamespaces>({
  locale,
  namespace,
}: GetI18nTranslatorOpts<TNamespace>) => {
  const messages = await getMessages(locale);
  return createTranslator<TNamespace>({
    locale,
    messages,
    namespace,
  });
};
