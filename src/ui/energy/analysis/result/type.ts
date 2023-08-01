import {ProductionRate} from '@/types/game/pokemon';
import {EnergyAnalysisSlotName} from '@/ui/energy/analysis/type';


export type IngredientProductionStats = {
  quantity: ProductionRate,
  energy: ProductionRate,
};

export type ProductionStatsSingle = {
  berry: ProductionRate,
  ingredient: ProductionRate,
};

export type ProductionStatsBySlot = {[slot in EnergyAnalysisSlotName]: ProductionStatsSingle | null};

export type ProductionStats = {
  bySlot: ProductionStatsBySlot,
  total: ProductionStatsSingle,
  overall: ProductionRate,
};
