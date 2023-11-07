import {PokemonId} from '@/types/game/pokemon';
import {SleepdexMap, SleepdexStyleId} from '@/types/game/sleepdex';
import {SleepStyleId, SleepStyleOfMap} from '@/types/game/sleepStyle';
import {toUnique} from '@/utils/array';


type ToSleepdexByMapIdOpts = {
  pokemonId: PokemonId,
  styleId: SleepStyleId,
};

export const toSleepdexStyleId = ({pokemonId, styleId}: ToSleepdexByMapIdOpts): SleepdexStyleId => (
  `${pokemonId}-${styleId}`
);

export type IsInSleepdexOpts = {
  pokemonId: PokemonId,
  styleId: SleepStyleId,
  sleepdex: SleepdexMap,
};

export const isInSleepdex = ({pokemonId, styleId, sleepdex}: IsInSleepdexOpts) => {
  const sleepdexId = toSleepdexStyleId({pokemonId, styleId});
  return sleepdex[sleepdexId];
};

export const getAvailableSleepStyles = (sleepStyles: SleepStyleOfMap[]) => (
  toUnique(sleepStyles.flatMap(({styles}) => styles.map(({style}) => style)))
);
