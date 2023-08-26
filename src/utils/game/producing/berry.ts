import {BerryData} from '@/types/game/berry';
import {ProducingRateCommonParams, ProducingRateOfItem} from '@/types/game/producing/rate';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {toSum} from '@/utils/array';
import {getNatureMultiplier} from '@/utils/game/nature';
import {defaultHelperCount, defaultLevel} from '@/utils/game/producing/const';
import {getFrequencyFromPokemon} from '@/utils/game/producing/frequency';
import {getProducingRateBase} from '@/utils/game/producing/rate';
import {getProbabilitySplit} from '@/utils/game/producing/split';
import {getSubSkillBonusValue} from '@/utils/game/subSkill';


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

  const probability = getProbabilitySplit({type: 'berry', subSkillBonus});
  const ingredientNatureMultiplier = getNatureMultiplier({id: natureId, effect: 'frequencyOfIngredient'});
  const isSnorlaxFavorite = snorlaxFavorite[berryData.id] ?? false;

  return {
    id: pokemon.berry.id,
    ...getProducingRateBase({
      frequency: baseFrequency / probability * ingredientNatureMultiplier,
      // Specialty handling is already included in `pokemon.berry.quantity`
      count: pokemon.berry.quantity + toSum(getSubSkillBonusValue(subSkillBonus, 'berryCount')),
      picks: 1,
      energyPerCount: (berryData.energy[(level ?? defaultLevel) - 1]?.energy ?? NaN) * (isSnorlaxFavorite ? 2 : 1),
    }),
  };
};
