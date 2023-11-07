import {useTranslations} from 'next-intl';

import {SleepStyleId} from '@/types/game/sleepStyle';


export const useSleepStyleName = (styleId: SleepStyleId) => {
  const t = useTranslations(`Game.SleepFace.${styleId}`);
  const t2 = useTranslations('Game.SleepFace.onSnorlax');

  if (styleId === 'onSnorlax') {
    return t2('Default');
  }

  return t(styleId.toString());
};
