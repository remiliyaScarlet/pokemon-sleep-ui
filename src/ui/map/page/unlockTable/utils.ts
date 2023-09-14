import {PokemonSleepTypeId} from '@/types/game/pokemon';
import {SleepdexMap} from '@/types/game/sleepdex';
import {SleepStyleDataFlattened} from '@/types/game/sleepStyle';
import {MapUnlockAccumulator, MapUnlockAccumulatorEnergy} from '@/ui/map/page/unlockTable/type';
import {toSleepdexStyleId} from '@/utils/game/sleepdex';
import {isSameRank} from '@/utils/game/snorlax';


type IsInSleepdexOpts = {
  data: SleepStyleDataFlattened,
  sleepdex: SleepdexMap,
};

export const isInSleepdex = ({data, sleepdex}: IsInSleepdexOpts) => {
  const {pokemonId, style} = data;

  const sleepdexId = toSleepdexStyleId({pokemonId, styleId: style.style});
  return sleepdex[sleepdexId];
};

type GetUpdatedAccumulatorOpts = IsInSleepdexOpts & {
  original: MapUnlockAccumulator,
  sleepType: PokemonSleepTypeId,
  current: MapUnlockAccumulatorEnergy,
};

export const getUpdatedAccumulator = ({
  original,
  sleepType,
  current,
  ...opts
}: GetUpdatedAccumulatorOpts): MapUnlockAccumulator => {
  const {unlockable, unlocked, energy} = original;

  return {
    unlocked: {...unlocked, [sleepType]: (unlocked[sleepType] ?? 0) + (isInSleepdex(opts) ? 1 : 0)},
    unlockable: {...unlockable, [sleepType]: (unlockable[sleepType] ?? 0) + 1},
    energy: (
      energy.current && isSameRank(current.rank, energy.current?.rank) ?
        energy :
        {previous: energy.current, current}
    ),
  };
};
