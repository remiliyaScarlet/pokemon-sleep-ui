import {ProductionRate} from '@/types/game/pokemon';
import {EnergyAnalysisSlotNames} from '@/ui/energy/analysis/type';


export type IngredientProductionStats = {
  quantity: ProductionRate,
  energy: ProductionRate,
};

export type ProductionStatsSingle = {
  berry: ProductionRate,
};

export type ProductionStatsBySlot = {[slot in EnergyAnalysisSlotNames]: ProductionStatsSingle | null};

export type ProductionStats = {
  bySlot: ProductionStatsBySlot,
  total: ProductionStatsSingle,
};
