import {EffectiveBonus} from '@/types/game/bonus';
import {IngredientId} from '@/types/game/ingredient';
import {PokemonInfo} from '@/types/game/pokemon';
import {NatureId} from '@/types/game/pokemon/nature';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {CarryLimitInfo, FullPackStats} from '@/types/game/producing/carryLimit';
import {ProducingState} from '@/types/game/producing/state';


export type ProducingRate = {
  quantity: number,
  dailyEnergy: number,
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
  fullPackStats: FullPackStats,
  carryLimitInfo: CarryLimitInfo,
  berry: ProducingRateOfItem,
  ingredient: {[ingredientId in IngredientId]: ProducingRateOfItem},
};
