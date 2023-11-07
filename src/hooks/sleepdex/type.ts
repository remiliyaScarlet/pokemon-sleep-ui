import React from 'react';

import {PokemonId} from '@/types/game/pokemon';
import {SleepdexMap} from '@/types/game/sleepdex';
import {SleepStyleId} from '@/types/game/sleepStyle';


export type UseUpdateSleepdexOpts = {
  sleepdex: SleepdexMap,
  setSleepdex: React.Dispatch<React.SetStateAction<SleepdexMap>>,
};

export type UpdateSleepdexOpts = {
  pokemonId: PokemonId,
  styleId: SleepStyleId,
};

export type SleepdexUpdater = (opts: UpdateSleepdexOpts) => void;
