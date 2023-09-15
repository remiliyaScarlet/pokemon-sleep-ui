import React from 'react';

import {useUserDataActor} from '@/hooks/userData/actor';
import {PokemonId} from '@/types/game/pokemon';
import {SleepdexData, SleepdexMap} from '@/types/game/sleepdex';
import {SleepStyleId} from '@/types/game/sleepStyle';
import {toSleepdexStyleId} from '@/utils/game/sleepdex';
import {isInSleepdex} from '@/utils/sleepdex';


type UpdateSleepdexOpts = {
  pokemonId: PokemonId,
  styleId: SleepStyleId,
};

type UseUpdateSleepdexOpts = {
  sleepdex: SleepdexMap,
  setSleepdex: React.Dispatch<React.SetStateAction<SleepdexMap>>,
};

export const useUpdateSleepdex = ({sleepdex, setSleepdex}: UseUpdateSleepdexOpts) => {
  const {act} = useUserDataActor({statusToast: true});

  return (opts: UpdateSleepdexOpts) => {
    const {pokemonId, styleId} = opts;

    if (!act) {
      return;
    }

    const sleepdexId = toSleepdexStyleId({pokemonId, styleId});
    const inSleepdex = isInSleepdex({sleepdex, ...opts});
    const sleepdexData: SleepdexData = {pokemonId, styleId};

    act({
      action: 'upload',
      options: {
        type: inSleepdex ? 'sleepdex.unmark' : 'sleepdex.mark',
        data: sleepdexData,
      },
    });
    setSleepdex((original) => {
      if (!inSleepdex) {
        return {...original, [sleepdexId]: sleepdexData};
      }

      const updated = {...original};
      delete updated[sleepdexId];

      return updated;
    });
  };
};
