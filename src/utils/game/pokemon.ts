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
  pokedex: PokemonInfo[],
  sleepStyleMap: PokemonSleepDataMap,
};

export const getPokedexWithField = ({pokedex, sleepStyleMap}: GetPokedexWithMapOpts): PokemonInfoWithMap[] => {
  return pokedex.map((pokemon) => ({
    info: pokemon,
    mapsAvailable: toUnique(sleepStyleMap[pokemon.id]?.map(({mapId}) => mapId) ?? []),
  }));
};
