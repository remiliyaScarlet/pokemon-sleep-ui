import {SleepdexUpdater} from '@/hooks/sleepdex/type';
import {PokemonInfo} from '@/types/game/pokemon';
import {SleepdexMap} from '@/types/game/sleepdex';
import {SleepStyleNormalMap, SleepStyleSpecialMap} from '@/types/game/sleepStyle';


export type SleepdexDataProps = {
  pokemonList: PokemonInfo[],
  sleepStyleMap: SleepStyleNormalMap,
  sleepStyleSpecialMap: SleepStyleSpecialMap,
  preloaded: {
    sleepdex: SleepdexMap,
  },
};

export type SleepdexCommonProps = SleepdexDataProps & {
  sleepdex: SleepdexMap,
  updateSleepdex: SleepdexUpdater,
  showPokemon: (pokemon: PokemonInfo) => void,
};
