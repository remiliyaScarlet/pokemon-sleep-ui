import {durationOfDay} from '@/const/common';
import {goodCampTicketBonus} from '@/const/game/bonus';
import {PokemonInfo} from '@/types/game/pokemon';
import {NatureId} from '@/types/game/pokemon/nature';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {HelperBonusEffect} from '@/types/game/producing/helperBonus';
import {PokemonProducingRate, ProducingValueOfStates} from '@/types/game/producing/rate';
import {ProducingStateOfRate} from '@/types/game/producing/state';
import {UserCalculationBehavior} from '@/types/userData/settings';
import {toSum} from '@/utils/array';
import {getNatureMultiplier} from '@/utils/game/nature';
import {helperBonusSimpleMultiplier} from '@/utils/game/producing/const';
import {getHelperBonusMultiplier} from '@/utils/game/producing/multiplier';
import {GetSpecificItemRateOfSessionCommonOpts} from '@/utils/game/producing/type';
import {getSubSkillBonusValue} from '@/utils/game/subSkill/effect';
import {roundDown} from '@/utils/number/round';


type GetBaseFrequencyOpts = {
  level: number,
  frequency: PokemonInfo['stats']['frequency'],
  natureId: NatureId | null,
  subSkillBonusRates: number[],
  helperBonusEffect: HelperBonusEffect,
  behavior: UserCalculationBehavior,
};

const getBaseFrequency = ({
  level,
  frequency,
  natureId,
  subSkillBonusRates,
  helperBonusEffect,
  behavior,
}: GetBaseFrequencyOpts) => {
  const {context} = helperBonusEffect;

  let bonus = (1 - (level - 1) * 0.002);
  bonus *= getNatureMultiplier({id: natureId, effect: 'frequencyOfBase'});
  // https://x.com/emuptea/status/1711238322780266825
  // 0.35 is the mandatory cap from the officials
  bonus *= (
    1 -
    Math.min(
      0.35,
      toSum(subSkillBonusRates) / 100 + (context === 'team' ? getHelperBonusMultiplier(helperBonusEffect.stack) : 0),
    )
  );

  if (context === 'single' && helperBonusEffect.active) {
    bonus /= helperBonusSimpleMultiplier;
  }

  if (behavior.goodCampTicket) {
    bonus /= goodCampTicketBonus.frequencyDivisor;
  }

  bonus = roundDown({value: bonus, decimals: 4});

  return roundDown({value: frequency * bonus, decimals: 0});
};

export type GetFrequencyFromPokemonOpts = Pick<
  GetBaseFrequencyOpts,
  'behavior' | 'helperBonusEffect' | 'natureId'
> & {
  level: number,
  subSkillBonus: GroupedSubSkillBonus,
  pokemon: PokemonInfo,
};

export const getBaseFrequencyFromPokemon = ({
  subSkillBonus,
  pokemon,
  ...opts
}: GetFrequencyFromPokemonOpts): number => {
  const {stats} = pokemon;

  return getBaseFrequency({
    frequency: stats.frequency,
    subSkillBonusRates: getSubSkillBonusValue(subSkillBonus, 'frequency'),
    ...opts,
  });
};

type GetFrequencyFromItemRateOfSessionsOpts = Omit<GetSpecificItemRateOfSessionCommonOpts, 'period'>;

export const getFrequencyFromItemRateOfSessions = ({
  rate,
  produceType,
  produceItemSplit,
  sleepStateSplit,
}: GetFrequencyFromItemRateOfSessionsOpts): ProducingValueOfStates => {
  const multiplier = 1 / produceItemSplit;

  const awake = multiplier * rate.awake.frequency;
  const sleepVacant = multiplier * rate.sleep.frequency;
  const sleepFilled = produceType === 'berry' ? rate.sleep.frequency : Infinity;

  const unfilledOnlyDivisor = (
    sleepStateSplit.awake / awake +
    sleepStateSplit.sleepVacant / sleepVacant
  );

  const unfilledOnly = 1 / unfilledOnlyDivisor;
  const equivalent = 1 / (unfilledOnlyDivisor + sleepStateSplit.sleepFilled / sleepFilled);

  return {awake, sleepVacant, sleepFilled, equivalent, unfilledOnly};
};

type GetHelpingCountFromPokemonRateOpts = {
  rate: PokemonProducingRate,
  state: ProducingStateOfRate,
};

export const getDailyHelpsOfStateFromPokemonRate = ({rate, state}: GetHelpingCountFromPokemonRateOpts) => {
  const {berry, ingredient} = rate;

  return durationOfDay * (
    1 / berry.frequency[state] +
    toSum(Object.values(ingredient).map(({frequency}) => 1 / frequency[state]))
  );
};

export const getFrequencyOfStateFromPokemonRate = (opts: GetHelpingCountFromPokemonRateOpts) => {
  return durationOfDay / getDailyHelpsOfStateFromPokemonRate(opts);
};
