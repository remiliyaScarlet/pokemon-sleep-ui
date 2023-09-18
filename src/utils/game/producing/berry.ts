import {defaultHelperCount, defaultLevel} from '@/const/game/production';
import {BerryData} from '@/types/game/berry';
import {ProducingRateCommonParams, ProducingRateOfItem} from '@/types/game/producing/rate';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {toSum} from '@/utils/array';
import {getFrequencyFromPokemon} from '@/utils/game/producing/frequency';
import {getProducingRateBase} from '@/utils/game/producing/rate';
import {getProbabilitySplit} from '@/utils/game/producing/split';
import {applyBonus} from '@/utils/game/producing/utils';
import {getSubSkillBonusValue} from '@/utils/game/subSkill';


export type GetBerryProducingRateOpts = ProducingRateCommonParams & {
  snorlaxFavorite: SnorlaxFavorite,
  berryData: BerryData,
};

export const getBerryProducingRate = ({
  level,
  pokemon,
  pokemonProducingParams,
  subSkillBonus,
  helperCount,
  natureId,
  bonus,
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

  const isSnorlaxFavorite = snorlaxFavorite[berryData.id] ?? false;
  const frequency = baseFrequency / getProbabilitySplit({
    type: 'berry',
    pokemonProducingParams,
    natureId,
    subSkillBonus,
  });

  return applyBonus({
    bonus,
    data: {
      id: pokemon.berry.id,
      frequency,
      ...getProducingRateBase({
        frequency,
        // Specialty handling is already included in `pokemon.berry.quantity`
        count: pokemon.berry.quantity + toSum(getSubSkillBonusValue(subSkillBonus, 'berryCount')),
        picks: 1,
        energyPerCount: (berryData.energy[(level ?? defaultLevel) - 1]?.energy ?? NaN) * (isSnorlaxFavorite ? 2 : 1),
      }),
    },
    isIngredient: false,
  });
};
