import {PokemonId} from '@/types/game/pokemon';
import {SleepdexMap} from '@/types/game/sleepdex';
import {SleepStyleId} from '@/types/game/sleepStyle';
import {toSleepdexStyleId} from '@/utils/game/sleepdex';


export type IsInSleepdexOpts = {
  pokemonId: PokemonId,
  styleId: SleepStyleId,
  sleepdex: SleepdexMap,
};

export const isInSleepdex = ({pokemonId, styleId, sleepdex}: IsInSleepdexOpts) => {
  const sleepdexId = toSleepdexStyleId({pokemonId, styleId});
  return sleepdex[sleepdexId];
};
