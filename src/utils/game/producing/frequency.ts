import {durationOfDay} from '@/const/common';
import {PokemonInfo} from '@/types/game/pokemon';
import {NatureId} from '@/types/game/pokemon/nature';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {ProduceType} from '@/types/game/producing/common';
import {PokemonProducingRate, ProducingRateOfItemOfSessions} from '@/types/game/producing/rate';
import {ProducingSleepStateSplit} from '@/types/game/producing/split';
import {toSum} from '@/utils/array';
import {getNatureMultiplier} from '@/utils/game/nature';
import {getSubSkillBonusValue} from '@/utils/game/subSkill';


type GetBaseFrequencyOpts = {
  level: number,
  frequency: PokemonInfo['stats']['frequency'],
  natureId: NatureId | null,
  subSkillBonusRates: number[],
  helperCount: number,
};

const getBaseFrequency = ({
  level,
  frequency,
  natureId,
  subSkillBonusRates,
  helperCount,
}: GetBaseFrequencyOpts) => {
  frequency *= (1 - (level - 1) * 0.002);
  frequency *= getNatureMultiplier({id: natureId, effect: 'frequencyOfBase'});
  frequency *= (1 - toSum(subSkillBonusRates) / 100);
  frequency *= 0.95 ** helperCount;

  return frequency;
};

export type GetFrequencyFromPokemonOpts = Pick<GetBaseFrequencyOpts, 'helperCount' | 'natureId'> & {
  level: number,
  subSkillBonus: GroupedSubSkillBonus,
  pokemon: PokemonInfo,
};

export const getBaseFrequencyFromPokemon = ({
  level,
  subSkillBonus,
  pokemon,
  helperCount,
  natureId,
}: GetFrequencyFromPokemonOpts): number => {
  const {stats} = pokemon;

  return getBaseFrequency({
    level,
    frequency: stats.frequency,
    subSkillBonusRates: getSubSkillBonusValue(subSkillBonus, 'frequency'),
    helperCount,
    natureId,
  });
};

export type GetFrequencyFromItemRateOfSessionsOpts = {
  produceType: ProduceType,
  produceItemSplit: number,
  rate: ProducingRateOfItemOfSessions,
  sleepStateSplit: ProducingSleepStateSplit,
};

export const getFrequencyFromItemRateOfSessions = ({
  produceType,
  produceItemSplit,
  rate,
  sleepStateSplit,
}: GetFrequencyFromItemRateOfSessionsOpts): number => {
  const {sleep, awake} = rate;

  return (
    1 /
    produceItemSplit /
    (
      (sleepStateSplit.awake / awake.frequency) +
      (sleepStateSplit.sleepVacant / sleep.frequency) +
      (produceType === 'berry' ? (sleepStateSplit.sleepFilled / sleep.frequency) : 0)
    )
  );
};

export const getEquivalentFrequencyFromPokemonRate = ({berry, ingredient}: PokemonProducingRate) => {
  const dailyCount = (
    durationOfDay / berry.frequency +
    durationOfDay / (Object.values(ingredient).at(0)?.frequency ?? NaN)
  );

  return durationOfDay / dailyCount;
};
