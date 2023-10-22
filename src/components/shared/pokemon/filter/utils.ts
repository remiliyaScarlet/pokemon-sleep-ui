import {isFilterIncludingSome, isFilterMismatchOnSingle} from '@/components/input/filter/utils/check';
import {
  pokemonIngredientInputToLevel,
  PokemonInputFilter,
  PokemonInputFilterCheckExclusion,
  PokemonInputFilterCheckingOpts,
  PokemonInputFilterExtended,
  PokemonInputType,
  pokemonInputTypeOfIngredients,
  PokemonInputTypeOfIngredients,
} from '@/components/shared/pokemon/filter/type';
import {PokemonInfo} from '@/types/game/pokemon';
import {toUnique} from '@/utils/array';
import {isNotNullish} from '@/utils/type';


const filterCheckToExclude: {[inputType in PokemonInputType]: PokemonInputFilterCheckExclusion} = {
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
  ...Object.fromEntries(pokemonInputTypeOfIngredients.map((inputType) => [
    inputType,
    (({filter, pokemon, ingredientChainMap}) => !isFilterIncludingSome({
      filter,
      filterKey: inputType,
      ids: ingredientChainMap[pokemon.ingredientChain]
        .ingredients[pokemonIngredientInputToLevel[inputType]]
        .map(({id}) => id),
    })) satisfies PokemonInputFilterCheckExclusion,
  ])) as Record<PokemonInputTypeOfIngredients, PokemonInputFilterCheckExclusion>,
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
  evolutionStage: ({filter, pokemon}) => {
    if (!isFilterMismatchOnSingle({
      filter,
      filterKey: 'evolutionStage',
      id: pokemon.evolution.stage,
    })) {
      return false;
    }

    return !!filter.evolutionStage.final && !!pokemon.evolution.next.length;
  },
};

export const isPokemonIncludedFromFilter = (opts: PokemonInputFilterCheckingOpts) => {
  return !Object.values(filterCheckToExclude).some((checker) => checker(opts));
};

export const isPokemonInputTypeOfIngredients = (type: string): type is PokemonInputTypeOfIngredients => {
  return pokemonInputTypeOfIngredients.includes(type as PokemonInputTypeOfIngredients);
};

export const generatePokemonInputFilter = (): PokemonInputFilter => ({
  pokemonType: {},
  sleepType: {},
  specialty: {},
  ingredient1: {},
  ingredient2: {},
  ingredient3: {},
  berry: {},
  mainSkill: {},
  evolutionStage: {},
});

export const generatePokemonInputFilterExtended = (): PokemonInputFilterExtended => ({
  ...generatePokemonInputFilter(),
  level: 1,
  mapId: {},
  snorlaxFavorite: {},
});

type GetFilterIdsFromPokemonOpts<TId> = {
  pokemonList: PokemonInfo[],
  toId: (single: PokemonInfo) => TId | TId[] | null | undefined,
};

export const getFilterIdsFromPokemon = <TId extends number>({
  pokemonList,
  toId,
}: GetFilterIdsFromPokemonOpts<TId>) => {
  return toUnique(pokemonList.flatMap(toId))
    .filter(isNotNullish)
    .sort((a, b) => a - b);
};
