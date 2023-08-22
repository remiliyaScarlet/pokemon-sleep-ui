import {natureEffectIdMap} from '@/const/game/pokemon';
import {natureData} from '@/data/nature';
import {NatureEffectType, NatureId} from '@/types/game/pokemon/nature';


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

  const isFrequencyEffect = effect === 'frequencyOfBase' || effect === 'frequencyOfIngredient';

  const isExpOrStaminaEffect = effect === 'energy' || effect === 'exp';

  if (natureDataToUse.buff === natureEffectIdMap[effect]) {
    if (isFrequencyEffect) {
      return 0.9;
    }

    if (isExpOrStaminaEffect) {
      return 0.8;
    }
  }

  if (natureDataToUse.nerf === natureEffectIdMap[effect]) {
    if (isFrequencyEffect) {
      return 1.1;
    }

    if (isExpOrStaminaEffect) {
      return 1.2;
    }
  }

  return 1;
};
