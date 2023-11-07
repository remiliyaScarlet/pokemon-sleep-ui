import {useTranslations} from 'next-intl';

import {PokemonId} from '@/types/game/pokemon';
import {SleepStyleId} from '@/types/game/sleepStyle';


type UseSleepStyleNameOpts = {
  pokemonId: PokemonId,
  sleepStyleId: SleepStyleId | null,
};

export const useSleepStyleName = ({pokemonId, sleepStyleId}: UseSleepStyleNameOpts) => {
  const t = useTranslations(`Game.SleepFace.${pokemonId}`);
  const t2 = useTranslations('Game.SleepFace.onSnorlax');

  if (!sleepStyleId) {
    return null;
  }

  if (sleepStyleId === 'onSnorlax') {
    return t2('Default');
  }

  return t(sleepStyleId.toString());
};
