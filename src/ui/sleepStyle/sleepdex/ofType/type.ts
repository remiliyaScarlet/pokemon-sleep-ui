import {PokemonInfo, PokemonSleepTypeId} from '@/types/game/pokemon';
import {SleepdexCommonProps} from '@/ui/sleepStyle/sleepdex/type';


export type SleepdexOfSleepTypeProps = SleepdexCommonProps & {
  sleepType: PokemonSleepTypeId,
  pokemonListOfSleepType: PokemonInfo[],
};
