import {isFilterIncludingSome, isFilterMismatchOnSingle} from '@/components/input/filter/utils/check';
import {
  PokemonInfoRequiredForInput,
  PokemonInputFilter,
  PokemonInputType,
} from '@/components/shared/pokemon/input/type';


export const isPokemonIncludedFromFilter = (
  filter: PokemonInputFilter<PokemonInputType>,
  pokemon: PokemonInfoRequiredForInput,
) => {
  if (isFilterMismatchOnSingle({filter, filterKey: 'pokemonType', id: pokemon.type})) {
    return false;
  }

  if (isFilterMismatchOnSingle({filter, filterKey: 'specialty', id: pokemon.specialty})) {
    return false;
  }

  if (isFilterMismatchOnSingle({filter, filterKey: 'sleepType', id: pokemon.sleepType})) {
    return false;
  }

  if (isFilterMismatchOnSingle({filter, filterKey: 'ingredientFixed', id: pokemon.ingredients.fixed})) {
    return false;
  }

  if (!isFilterIncludingSome({
    filter,
    filterKey: 'ingredientRandom',
    ids: pokemon.ingredients.random ?? [],
  })) {
    return false;
  }

  if (isFilterMismatchOnSingle({filter, filterKey: 'berry', id: pokemon.berry.id})) {
    return false;
  }

  return !isFilterMismatchOnSingle({filter, filterKey: 'mainSkill', id: pokemon.skill});
};
