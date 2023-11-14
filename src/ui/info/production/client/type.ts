import {PokemonInputFilter} from '@/components/shared/pokemon/filter/type';
import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';


export const producingParamsSort = [
  'id',
  'ingredientRate',
  'skillRate',
] as const;

export type ProducingParamsSort = typeof producingParamsSort[number];

export type ProducingParamsFilter = PokemonInputFilter & {
  sort: ProducingParamsSort,
};

export type ProducingParamsDisplayResult = {
  pokemonInfo: PokemonInfo,
  params: PokemonProducingParams,
  show: boolean,
};

export type ProducingParamsMaximum = {
  ingredientRate: number,
  skillRate: number,
};
