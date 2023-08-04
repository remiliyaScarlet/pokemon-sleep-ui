import {natureEffectIdMap} from '@/const/game/pokemon';
import {natureData} from '@/data/nature';
import {NatureEffectType, NatureId} from '@/types/game/producing/nature';


type GetNatureMultiplierOpts = {
  id: NatureId | null,
  effect: NatureEffectType,
};

export const getNatureMultiplier = ({id, effect}: GetNatureMultiplierOpts): number => {
  if (!id) {
    return 1;
  }

  const natureDataToUse = natureData.find((data) => data.id === id);

  if (!natureDataToUse) {
    return 1;
  }

  if (natureDataToUse.buff === natureEffectIdMap[effect]) {
    return 0.9;
  }

  if (natureDataToUse.nerf === natureEffectIdMap[effect]) {
    return 1.1;
  }

  return 1;
};
