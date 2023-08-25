import {BerryId} from '@/types/game/berry';
import {IngredientId} from '@/types/game/ingredient';
import {ProducingRate, ProducingRateOfItem} from '@/types/game/producing/rate';
import {TeamAnalysisSlotName} from '@/ui/team/analysis/type';
import {Indexable} from '@/utils/type';


export type IngredientProducingStats = {
  quantity: ProducingRate,
  energy: ProducingRate,
};

export type TeamProducingStatsTotal = {
  berry: ProducingRate,
  ingredient: ProducingRate | null,
};

export type TeamProducingStatsSingle = {
  berry: ProducingRateOfItem,
  ingredient: ProducingRateOfItem[],
};

export type TeamProducingStatsBySlot = {[slot in TeamAnalysisSlotName]: TeamProducingStatsSingle | null};

export type TeamProducingStatsGroupedOfItem<TId extends Indexable> = {[id in TId]?: ProducingRate};

export type TeamProducingStatsGrouped = {
  berry: TeamProducingStatsGroupedOfItem<BerryId>,
  ingredient: TeamProducingStatsGroupedOfItem<IngredientId>,
};

export type TeamProducingStats = {
  bySlot: TeamProducingStatsBySlot,
  total: TeamProducingStatsTotal,
  grouped: TeamProducingStatsGrouped,
  overall: ProducingRate,
};

export type TeamFinalEstimateInput = {
  endsAt: string,
  currentEnergy: number,
};
