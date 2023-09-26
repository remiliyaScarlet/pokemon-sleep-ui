import {createTranslator} from 'next-intl';

import {defaultLocale, locales} from '@/const/website';
import {I18nNamespaces} from '@/types/i18n';
import {Locale} from '@/types/next/locale';


export const isLocale = (locale: string): locale is Locale => {
  return locales.includes(locale);
};

export const getMessages = async (locale: string): Promise<IntlMessages> => {
  let localeToUse = locale;
  if (!isLocale(locale)) {
    localeToUse = defaultLocale satisfies Locale;
  }

  const [UI, Game] = await Promise.all([
    import(`../../messages/ui-${localeToUse}.json`),
    import(`../../messages/game-${localeToUse}.json`),
  ]);

  return {
    Locale: locale,
    UI: UI.default,
    Game: Game.default,
  };
};

export const getMessagesOfLocales = async <TLocale extends Locale>(
  locales: TLocale[],
): Promise<{[locale in TLocale]: IntlMessages}> => {
  return Object.fromEntries(
    (await Promise.all(locales.map((locale) => getMessages(locale))))
      .map((messages) => [messages.Locale, messages]),
  ) as {[locale in TLocale]: IntlMessages};
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
