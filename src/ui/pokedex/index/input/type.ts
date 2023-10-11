import {FilterWithUpdaterProps} from '@/components/input/filter/type';
import {pokemonSortType} from '@/components/shared/pokemon/sorter/type';
import {PokedexFilter} from '@/ui/pokedex/index/type';


export type PokedexInputProps = FilterWithUpdaterProps<PokedexFilter>;

export const pokedexDisplayType = [
  ...pokemonSortType,
  'berry',
  'ingredient',
  'mainSkill',
  'sleepType',
  'specialty',
] as const;

export type PokedexDisplayType = typeof pokedexDisplayType[number];
