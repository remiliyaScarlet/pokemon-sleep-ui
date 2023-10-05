import {EffectiveBonus} from '@/types/game/bonus';
import {IngredientId} from '@/types/game/ingredient';
import {PokemonInfo} from '@/types/game/pokemon';
import {NatureId} from '@/types/game/pokemon/nature';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {CarryLimitInfo, FullPackStats} from '@/types/game/producing/carryLimit';
import {ProductionPeriod} from '@/types/game/producing/display';
import {ProducingState, ProducingStateOfRate} from '@/types/game/producing/state';


export type ProducingRate<T = number> = {
  period: ProductionPeriod,
  quantity: T,
  energy: T,
};

export type ProducingRateProportion = {
  count: number,
  picks: number,
};

export type ProducingRateOfItem = ProducingRate & {
  id: number,
  frequency: number,
};

export type ProducingRateOfItemOfSessions = {[state in ProducingState]: ProducingRateOfItem} & {
  id: number,
};

export type ProducingValueOfStates = {[state in ProducingStateOfRate]: number};

export type ProducingRateOfStates = ProducingRate<ProducingValueOfStates> & {
  id: number,
  frequency: ProducingValueOfStates,
};

export type ProducingRateSingleParams = {
  helperCount: number | null,
  subSkillBonus: GroupedSubSkillBonus | null,
  natureId: NatureId | null,
};

export type ProducingRateCommonParams = {
  level: number
  pokemon: PokemonInfo,
  frequency: number,
  bonus: EffectiveBonus,
};

export type PokemonProducingRate = {
  period: ProductionPeriod,
  fullPackStats: FullPackStats,
  carryLimitInfo: CarryLimitInfo,
  berry: ProducingRateOfStates,
  ingredient: {[ingredientId in IngredientId]: ProducingRateOfStates},
};
