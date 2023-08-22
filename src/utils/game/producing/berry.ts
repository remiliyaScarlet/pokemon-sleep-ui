import {BerryData} from '@/types/game/berry';
import {ProducingRateCommonParams, ProducingRateOfItem} from '@/types/game/producing/rate';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {getNatureMultiplier} from '@/utils/game/nature';
import {defaultBerryProbability, defaultHelperCount, defaultLevel} from '@/utils/game/producing/const';
import {getFrequencyFromPokemon} from '@/utils/game/producing/frequency';
import {getProducingRateBase} from '@/utils/game/producing/rate';


export type GetBerryProducingRateOpts = ProducingRateCommonParams & {
  snorlaxFavorite: SnorlaxFavorite,
  berryData: BerryData,
};

export const getBerryProducingRate = ({
  level,
  pokemon,
  subSkillBonus,
  helperCount,
  natureId,
  snorlaxFavorite,
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
  const isSnorlaxFavorite = snorlaxFavorite[berryData.id] ?? false;

  return {
    id: pokemon.berry.id,
    ...getProducingRateBase({
      frequency: baseFrequency / (probability - (1 - ingredientNatureMultiplier)),
      // Specialty handling is already included in `pokemon.berry.quantity`
      count: pokemon.berry.quantity + (subSkillBonus?.berryCount ?? 0),
      picks: 1,
      energyPerCount: (berryData.energy[(level ?? defaultLevel) - 1]?.energy ?? NaN) * (isSnorlaxFavorite ? 2 : 1),
    }),
  };
};
