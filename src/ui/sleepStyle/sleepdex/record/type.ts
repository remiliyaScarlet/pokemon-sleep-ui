import {PokemonInfo} from '@/types/game/pokemon';
import {SleepdexMap} from '@/types/game/sleepdex';
import {SleepStyleNormalMap, SleepStyleSpecialMap} from '@/types/game/sleepStyle';


export type SleepdexRecordDataProps = {
  pokemonList: PokemonInfo[],
  sleepStyleMap: SleepStyleNormalMap,
  sleepStyleSpecialMap: SleepStyleSpecialMap,
  preloaded: {
    sleepdex: SleepdexMap,
  },
};
