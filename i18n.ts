import {getRequestConfig} from 'next-intl/server';

import {locales} from '@/const';
import {Locale} from '@/types/next/locale';


export default getRequestConfig(async ({locale}) => {
  // https://github.com/microsoft/TypeScript/issues/31018
  // https://fettblog.eu/typescript-array-includes/
  if (!locales.includes(locale as Locale)) {
    return {};
  }

  const [UI, Game] = await Promise.all([
    import(`./messages/ui-${locale}.json`),
    import(`./messages/game-${locale}.json`),
  ]);

  return {
    messages: {
      UI: UI.default,
      Game: Game.default,
    },
  };
});
