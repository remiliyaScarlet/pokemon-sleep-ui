import {
  pokedexSortExclusion,
  PokedexSortExclusion,
  pokemonSortTypeOfSkillValue,
  PokemonSortTypeOfSkillValue,
} from '@/components/shared/pokemon/sorter/type';


export const isPokedexSortExclusion = (sort: string): sort is PokedexSortExclusion => {
  return pokedexSortExclusion.includes(sort as PokedexSortExclusion);
};

export const isPokemonSortSkillValue = (sort: string): sort is PokemonSortTypeOfSkillValue => {
  return pokemonSortTypeOfSkillValue.includes(sort as PokemonSortTypeOfSkillValue);
};
