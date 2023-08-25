import {ProducingRateOfItem} from '@/types/game/producing/rate';
import {TeamProducingStatsGroupedOfItem} from '@/ui/team/analysis/setup/type';
import {Indexable} from '@/utils/type';


export const groupProducingStats = <TId extends Indexable>(
  rates: ProducingRateOfItem<TId>[],
): TeamProducingStatsGroupedOfItem<TId> => {
  return rates.reduce((group, single) => {
    const {id, quantity, dailyEnergy} = single;

    group[id] = {
      quantity: (group[id]?.quantity ?? 0) + quantity,
      dailyEnergy: (group[id]?.dailyEnergy ?? 0) + dailyEnergy,
    };
    return group;
  }, {} as TeamProducingStatsGroupedOfItem<TId>);
};
