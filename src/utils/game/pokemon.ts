import {PokemonId, PokemonInfo, PokemonInfoWithMap} from '@/types/game/pokemon';
import {PokemonBranchData} from '@/types/game/pokemon/branch';
import {SleepStyleNormalMap} from '@/types/game/sleepStyle';
import {toUnique} from '@/utils/array';


type GetRelatedPokemonIdsOpts = {
  pokemon: PokemonInfo,
  branchData: PokemonBranchData | null,
};

export const getRelatedPokemonIds = ({pokemon, branchData}: GetRelatedPokemonIdsOpts): PokemonId[] => {
  const {evolution} = pokemon;

  const relatedId: PokemonId[] = evolution.next.map(({id}) => id);

  if (evolution.previous) {
    relatedId.push(evolution.previous);
  }

  if (branchData) {
    relatedId.push(branchData.pokemonId, ...branchData.branches);
  }

  return relatedId;
};

type GetPokedexWithMapOpts = {
  pokemonList: PokemonInfo[],
  sleepStyleMap: SleepStyleNormalMap,
};

export const getPokedexWithField = ({pokemonList, sleepStyleMap}: GetPokedexWithMapOpts): PokemonInfoWithMap[] => {
  return pokemonList.map((pokemon) => ({
    info: pokemon,
    mapsAvailable: toUnique(sleepStyleMap[pokemon.id]?.map(({mapId}) => mapId) ?? []),
  }));
};

type GetEvolutionCountFromPokemonInfoOpts = {
  pokemon: PokemonInfo,
};

export const getEvolutionCountFromPokemonInfo = ({pokemon}: GetEvolutionCountFromPokemonInfoOpts) => {
  const {evolution} = pokemon;

  return evolution.stage - 1;
};

export const getPokemonMaxEvolutionCount = (pokemonList: PokemonInfo[]) => (
  Math.max(...pokemonList.map(({evolution}) => evolution.stage))
);

type GetPokemonSleepStyleId = {
  pokemonId: number,
  branch: PokemonBranchData | null | undefined,
};

export const getPokemonSleepStyleId = ({pokemonId, branch}: GetPokemonSleepStyleId): PokemonId => {
  if (branch && branch.branches.includes(pokemonId)) {
    return branch.pokemonId;
  }

  return pokemonId;
};
