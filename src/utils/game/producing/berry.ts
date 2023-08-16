import {ProducingRateOfItem} from '@/types/game/producing/rate';
import {BerryData} from '@/types/mongo/berry';
import {getNatureMultiplier} from '@/utils/game/nature';
import {defaultBerryProbability, defaultHelperCount, defaultLevel} from '@/utils/game/producing/const';
import {getFrequencyFromPokemon} from '@/utils/game/producing/frequency';
import {getProducingRateBase} from '@/utils/game/producing/rate';
import {GetProducingRateCommonOpts} from '@/utils/game/producing/type';


export type GetBerryProducingRateOpts = GetProducingRateCommonOpts & {
  isSnorlaxFavorite: boolean,
  berryData: BerryData,
};

export const getBerryProducingRate = ({
  level,
  pokemon,
  subSkillBonus,
  helperCount,
  natureId,
  isSnorlaxFavorite,
  berryData,
}: GetBerryProducingRateOpts): ProducingRateOfItem => {
  const baseFrequency = getFrequencyFromPokemon({
    level,
    pokemon,
    subSkillBonus: subSkillBonus ?? {},
    helperCount: helperCount ?? defaultHelperCount,
    natureId,
  });

  const probability = (defaultBerryProbability - (subSkillBonus?.ingredientProbability ?? 0)) / 100;
  const ingredientNatureMultiplier = getNatureMultiplier({id: natureId, effect: 'frequencyOfIngredient'});

  return {
    id: pokemon.berry.id,
    ...getProducingRateBase({
      frequency: baseFrequency / (probability - (1 - ingredientNatureMultiplier)),
      // Specialty handling is already included in `pokemon.berry.quantity`
      count: pokemon.berry.quantity + (subSkillBonus?.berryCount ?? 0),
      possibilities: 1,
      energyPerCount: (berryData.energy[(level ?? defaultLevel) - 1]?.energy ?? NaN) * (isSnorlaxFavorite ? 2 : 1),
    }),
  };
};
