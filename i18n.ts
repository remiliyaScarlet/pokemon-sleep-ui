import {getRequestConfig} from 'next-intl/server';

import {locales} from '@/const/website';
import {Locale} from '@/types/next/locale';


export default getRequestConfig(async ({locale}) => {
  let localeToUse = locale;
  if (!locales.includes(locale)) {
    localeToUse = 'zh' satisfies Locale;
  }

  const [UI, Game] = await Promise.all([
    import(`./messages/ui-${localeToUse}.json`),
    import(`./messages/game-${localeToUse}.json`),
  ]);

  return {
    messages: {
      UI: UI.default,
      Game: Game.default,
    },
  };
});
