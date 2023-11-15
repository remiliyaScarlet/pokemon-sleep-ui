import React from 'react';

import {PokemonInfo, PokemonSpecialtyId} from '@/types/game/pokemon';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {PokemonProducingRate, ProducingRateOfStates} from '@/types/game/producing/rate';
import {Dimension} from '@/types/style';


export type PokemonIconsItemStatsCommonProps = {
  getItemRate: (pokemonRate: PokemonProducingRate) => ProducingRateOfStates | undefined,
  getIcon: (pokemon: PokemonInfo, dimension: Dimension) => React.ReactNode,
  targetSpecialty: PokemonSpecialtyId,
  itemAlt: string,
  itemImageSrc: string,
  isProductionIncluded?: (productions: IngredientProduction[]) => boolean,
};
