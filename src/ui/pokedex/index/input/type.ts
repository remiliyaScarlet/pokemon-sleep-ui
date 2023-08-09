import {FilterInputProps} from '@/components/input/filter/type';
import {PokedexFilter} from '@/ui/pokedex/index/type';


export type PokedexInputProps = FilterInputProps<PokedexFilter>;

export const pokedexSortType = [
  'id',
  'ingredientEnergy',
  'ingredientCount',
  'berryEnergy',
  'berryCount',
  'friendshipPoint',
  'totalEnergy',
] as const;

export type PokedexSortType = typeof pokedexSortType[number];

export const pokedexDisplayType = [
  ...pokedexSortType,
  'berry',
  'mainSkill',
  'ingredient',
  'specialty',
] as const;

export type PokedexDisplayType = typeof pokedexDisplayType[number];
