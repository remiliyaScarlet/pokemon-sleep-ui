import {PokemonId, PokemonInfo, PokemonInfoWithMap} from '@/types/game/pokemon';
import {PokemonSleepDataMap} from '@/types/game/sleepStyle';
import {toUnique} from '@/utils/array';


export const getRelatedPokemonIds = ({evolution}: PokemonInfo): PokemonId[] => {
  const relatedId: PokemonId[] = evolution.next.map(({id}) => id);

  if (evolution.previous) {
    relatedId.push(evolution.previous);
  }

  return relatedId;
};

type GetPokedexWithMapOpts = {
  pokemonList: PokemonInfo[],
  sleepStyleMap: PokemonSleepDataMap,
};

export const getPokedexWithField = ({pokemonList, sleepStyleMap}: GetPokedexWithMapOpts): PokemonInfoWithMap[] => {
  return pokemonList.map((pokemon) => ({
    info: pokemon,
    mapsAvailable: toUnique(sleepStyleMap[pokemon.id]?.map(({mapId}) => mapId) ?? []),
  }));
};
