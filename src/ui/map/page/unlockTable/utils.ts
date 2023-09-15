import {PokemonSleepTypeId} from '@/types/game/pokemon';
import {MapUnlockAccumulator, MapUnlockAccumulatorEnergy} from '@/ui/map/page/unlockTable/type';
import {isSameRank} from '@/utils/game/snorlax';
import {isInSleepdex, IsInSleepdexOpts} from '@/utils/sleepdex';


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
