import {PokemonId} from '@/types/game/pokemon';
import {SleepdexMap, SleepdexStyleId} from '@/types/game/sleepdex';
import {PokemonSleepDataMap, SleepStyleId, SleepStyleOfMap} from '@/types/game/sleepStyle';
import {toUnique} from '@/utils/array';
import {isNotNullish} from '@/utils/type';


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

export const getAvailableSleepStyles = (sleepStyles: SleepStyleOfMap[]): SleepStyleId[] => (
  toUnique(sleepStyles.flatMap(({styles}) => styles.map(({style}) => style)))
);

export const getAllPossibleSleepStyles = (sleepData: PokemonSleepDataMap): SleepdexStyleId[] => {
  return toUnique(Object.values(sleepData).filter(isNotNullish).flatMap((sleepStyles) => (
    sleepStyles.flatMap(({pokemonId, styles}) => (
      styles.map(({style}) => toSleepdexStyleId({pokemonId, styleId: style}))
    ))
  )));
};
