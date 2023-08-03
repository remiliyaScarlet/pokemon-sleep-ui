import {getRequestConfig} from 'next-intl/server';

import {locales} from '@/const/website';


export default getRequestConfig(async ({locale}) => {
  if (!locales.includes(locale)) {
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
