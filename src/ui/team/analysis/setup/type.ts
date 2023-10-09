import {BerryId} from '@/types/game/berry';
import {IngredientId} from '@/types/game/ingredient';
import {PokemonProducingRate, ProducingRate} from '@/types/game/producing/rate';
import {TeamAnalysisSlotName} from '@/types/teamAnalysis';
import {Indexable} from '@/utils/type';


export type TeamProducingStatsTotal = {
  berry: ProducingRate,
  ingredient: ProducingRate | null,
};

export type TeamProducingStatsSingle = PokemonProducingRate & {
  total: ProducingRate,
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
