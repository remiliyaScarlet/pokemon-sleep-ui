import React from 'react';

import {PokemonInfo} from '@/types/game/pokemon';
import {SleepdexMap} from '@/types/game/sleepdex';


export type PokemonSleepStyleProps = {
  pokemon: PokemonInfo,
  sleepdex: SleepdexMap,
  setSleepdex: React.Dispatch<React.SetStateAction<SleepdexMap>>,
};
