import React from 'react';

import {PokemonInfo, PokemonSpecialtyId} from '@/types/game/pokemon';
import {PokemonProducingRate, ProducingRateOfStates} from '@/types/game/producing/rate';
import {Dimension} from '@/types/style';


export type PokemonItemStatsCommonProps = {
  getItemRate: (pokemonRate: PokemonProducingRate) => ProducingRateOfStates | undefined,
  getIcon: (pokemon: PokemonInfo, dimension: Dimension) => React.ReactNode,
  targetSpecialty: PokemonSpecialtyId,
};
