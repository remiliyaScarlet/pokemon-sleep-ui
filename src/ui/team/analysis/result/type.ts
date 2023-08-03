import {ProductionRate, ProductionRateOfItem} from '@/types/game/pokemon';
import {BerryId} from '@/types/mongo/berry';
import {IngredientId} from '@/types/mongo/ingredient';
import {TeamAnalysisSlotName} from '@/ui/team/analysis/type';


export type IngredientProductionStats = {
  quantity: ProductionRate,
  energy: ProductionRate,
};

export type TeamProductionStatsByItem<T> = {
  berry: T,
  ingredient: T | null,
};

export type TeamProductionStatsTotal = TeamProductionStatsByItem<ProductionRate>;

export type TeamProductionStatsSingle = TeamProductionStatsByItem<ProductionRateOfItem>;

export type TeamProductionStatsBySlot = {[slot in TeamAnalysisSlotName]: TeamProductionStatsSingle | null};

export type TeamProductionStatsGrouped = {
  berry: {[id in BerryId]?: ProductionRate},
  ingredient: {[id in IngredientId]?: ProductionRate},
};

export type TeamProductionStats = {
  bySlot: TeamProductionStatsBySlot,
  total: TeamProductionStatsTotal,
  grouped: TeamProductionStatsGrouped,
  overall: ProductionRate,
};

export type TeamFinalEstimateInput = {
  endsAt: string,
  currentEnergy: number,
};
