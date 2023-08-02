import {ProductionRate} from '@/types/game/pokemon';
import {EnergyAnalysisSlotName} from '@/ui/energy/analysis/type';


export type IngredientProductionStats = {
  quantity: ProductionRate,
  energy: ProductionRate,
};

export type EnergyProductionStatsSingle = {
  berry: ProductionRate,
  ingredient: ProductionRate,
};

export type EnergyProductionStatsBySlot = {[slot in EnergyAnalysisSlotName]: EnergyProductionStatsSingle | null};

export type EnergyProductionStats = {
  bySlot: EnergyProductionStatsBySlot,
  total: EnergyProductionStatsSingle,
  overall: ProductionRate,
};

export type EnergyFinalEstimateInput = {
  endsAt: string,
  currentEnergy: number,
};
