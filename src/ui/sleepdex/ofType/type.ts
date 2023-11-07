import {PokemonInfo, PokemonSleepTypeId} from '@/types/game/pokemon';
import {SleepdexCommonProps} from '@/ui/sleepdex/type';


export type SleepdexOfSleepTypeProps = SleepdexCommonProps & {
  sleepType: PokemonSleepTypeId,
  pokemonListOfSleepType: PokemonInfo[],
};
