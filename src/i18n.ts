import {defaultLocale} from '@/const/website';
import {Locale} from '@/types/next/locale';
import {isLocale} from '@/utils/i18n';


export const getMessages = async (locale: string): Promise<IntlMessages> => {
  let localeToUse = locale;
  if (!isLocale(locale)) {
    localeToUse = defaultLocale satisfies Locale;
  }

  const [UI, Game] = await Promise.all([
    import(`../messages/ui-${localeToUse}.json`),
    import(`../messages/game-${localeToUse}.json`),
  ]);

  return {
    UI: UI.default,
    Game: Game.default,
  };
};
