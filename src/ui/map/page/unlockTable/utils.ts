import {PokemonSleepTypeId} from '@/types/game/pokemon';
import {MapUnlockAccumulator, MapUnlockAccumulatorEnergy} from '@/ui/map/page/unlockTable/type';
import {isSameRank} from '@/utils/game/snorlax';
import {isInSleepdex, IsInSleepdexOpts} from '@/utils/sleepdex';


type GetUpdatedAccumulatorOpts = {
  original: MapUnlockAccumulator,
  current: MapUnlockAccumulatorEnergy
} & ({
  sleepType: PokemonSleepTypeId,
  inSleepdexOpts: IsInSleepdexOpts,
} | {
  sleepType?: never,
  inSleepdexOpts?: never,
});

export const getUpdatedAccumulator = ({
  original,
  sleepType,
  current,
  inSleepdexOpts,
}: GetUpdatedAccumulatorOpts): MapUnlockAccumulator => {
  const {unlockable, unlocked, energy} = original;

  return {
    unlocked: {
      ...unlocked,
      ...(
        sleepType !== undefined ?
          {[sleepType]: (unlocked[sleepType] ?? 0) + ((inSleepdexOpts && isInSleepdex(inSleepdexOpts)) ? 1 : 0)} :
          {}
      ),
    },
    unlockable: {
      ...unlockable,
      ...(
        sleepType !== undefined ?
          {[sleepType]: (unlockable[sleepType] ?? 0) + (inSleepdexOpts ? 1 : 0)} :
          {}
      ),
    },
    energy: (
      energy.current && isSameRank(current.rank, energy.current?.rank) ?
        energy :
        {previous: energy.current, current}
    ),
  };
};
