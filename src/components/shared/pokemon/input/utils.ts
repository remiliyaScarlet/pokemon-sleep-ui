import {isFilterIncludingSome, isFilterMismatchOnSingle} from '@/components/input/filter/utils/check';
import {
  PokemonInputFilter,
  PokemonInputFilterCheckExclusion,
  PokemonInputType,
} from '@/components/shared/pokemon/input/type';
import {PokemonInfo} from '@/types/game/pokemon';


const filterChecker: {[inputType in PokemonInputType]: PokemonInputFilterCheckExclusion} = {
  pokemonType: ({filter, pokemon}) => isFilterMismatchOnSingle({
    filter,
    filterKey: 'pokemonType',
    id: pokemon.type,
  }),
  specialty: ({filter, pokemon}) => isFilterMismatchOnSingle({
    filter,
    filterKey: 'specialty',
    id: pokemon.specialty,
  }),
  sleepType: ({filter, pokemon}) => isFilterMismatchOnSingle({
    filter,
    filterKey: 'sleepType',
    id: pokemon.sleepType,
  }),
  ingredientFixed: ({filter, pokemon}) => isFilterMismatchOnSingle({
    filter,
    filterKey: 'ingredientFixed',
    id: pokemon.ingredients.fixed,
  }),
  ingredientRandom: ({filter, pokemon}) => !isFilterIncludingSome({
    filter,
    filterKey: 'ingredientRandom',
    ids: pokemon.ingredients.random ?? [],
  }),
  berry: ({filter, pokemon}) => isFilterMismatchOnSingle({
    filter,
    filterKey: 'berry',
    id: pokemon.berry.id,
  }),
  mainSkill: ({filter, pokemon}) => isFilterMismatchOnSingle({
    filter,
    filterKey: 'mainSkill',
    id: pokemon.skill,
  }),
  evolutionStage: ({filter, pokemon}) => isFilterMismatchOnSingle({
    filter,
    filterKey: 'evolutionStage',
    id: pokemon.evolution.stage,
  }),
};

export const isPokemonIncludedFromFilter = (filter: PokemonInputFilter, pokemon: PokemonInfo) => {
  return !Object.values(filterChecker).some((checker) => checker({filter, pokemon}));
};

export const generatePokemonInputFilter = (): PokemonInputFilter => ({
  pokemonType: {},
  sleepType: {},
  specialty: {},
  ingredientFixed: {},
  ingredientRandom: {},
  berry: {},
  mainSkill: {},
  evolutionStage: {},
});
