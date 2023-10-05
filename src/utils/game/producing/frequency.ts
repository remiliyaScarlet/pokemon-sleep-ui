import {durationOfDay} from '@/const/common';
import {PokemonInfo} from '@/types/game/pokemon';
import {NatureId} from '@/types/game/pokemon/nature';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {PokemonProducingRate, ProducingValueOfStates} from '@/types/game/producing/rate';
import {ProducingStateOfRate} from '@/types/game/producing/state';
import {toSum} from '@/utils/array';
import {getNatureMultiplier} from '@/utils/game/nature';
import {GetSpecificItemRateOfSessionCommonOpts} from '@/utils/game/producing/type';
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

type GetFrequencyFromItemRateOfSessionsOpts = Omit<GetSpecificItemRateOfSessionCommonOpts, 'period'> & {
  multiplier: number,
};

export const getFrequencyFromItemRateOfSessions = ({
  rate,
  produceType,
  produceItemSplit,
  sleepStateSplit,
  multiplier,
}: GetFrequencyFromItemRateOfSessionsOpts): ProducingValueOfStates => {
  multiplier /= produceItemSplit;

  const awake = multiplier * rate.awake.frequency;
  const sleepVacant = multiplier * rate.sleep.frequency;
  const sleepFilled = produceType === 'berry' ? rate.sleep.frequency : Infinity;
  const equivalent = 1 / (
    sleepStateSplit.awake / awake +
    sleepStateSplit.sleepVacant / sleepVacant +
    sleepStateSplit.sleepFilled / sleepFilled
  );

  return {awake, sleepVacant, sleepFilled, equivalent};
};

type GetEquivalentFrequencyFromPokemonRateOpts = {
  rate: PokemonProducingRate,
  state: ProducingStateOfRate,
};

export const getEquivalentFrequencyFromPokemonRate = ({rate, state}: GetEquivalentFrequencyFromPokemonRateOpts) => {
  const {berry, ingredient} = rate;
  const dailyCount = (
    durationOfDay / berry.frequency[state] +
    toSum(Object.values(ingredient).map(({frequency}) => durationOfDay / frequency[state]))
  );

  return durationOfDay / dailyCount;
};
