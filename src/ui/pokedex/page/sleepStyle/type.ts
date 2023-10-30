import React from 'react';

import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonBranchData} from '@/types/game/pokemon/branch';
import {SleepdexMap} from '@/types/game/sleepdex';


export type PokemonSleepStyleProps = {
  pokemon: PokemonInfo,
  pokemonBranch: PokemonBranchData | null,
  sleepdex: SleepdexMap,
  setSleepdex: React.Dispatch<React.SetStateAction<SleepdexMap>>,
};
