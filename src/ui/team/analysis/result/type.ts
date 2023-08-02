import {ProductionRate} from '@/types/game/pokemon';
import {TeamAnalysisSlotName} from '@/ui/team/analysis/type';


export type IngredientProductionStats = {
  quantity: ProductionRate,
  energy: ProductionRate,
};

export type TeamProductionStatsSingle = {
  berry: ProductionRate,
  ingredient: ProductionRate,
};

export type TeamProductionStatsBySlot = {[slot in TeamAnalysisSlotName]: TeamProductionStatsSingle | null};

export type TeamProductionStats = {
  bySlot: TeamProductionStatsBySlot,
  total: TeamProductionStatsSingle,
  overall: ProductionRate,
};

export type TeamFinalEstimateInput = {
  endsAt: string,
  currentEnergy: number,
};
