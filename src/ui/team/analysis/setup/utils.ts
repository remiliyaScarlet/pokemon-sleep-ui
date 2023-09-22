import {ProducingRateOfItem} from '@/types/game/producing/rate';
import {TeamProducingStatsGroupedOfItem} from '@/ui/team/analysis/setup/type';


export const groupProducingStats = (
  rates: ProducingRateOfItem[],
): TeamProducingStatsGroupedOfItem<number> => {
  return rates.reduce((group, single) => {
    const {id, quantity, dailyEnergy} = single;

    group[id] = {
      quantity: (group[id]?.quantity ?? 0) + quantity,
      dailyEnergy: (group[id]?.dailyEnergy ?? 0) + dailyEnergy,
    };
    return group;
  }, {} as TeamProducingStatsGroupedOfItem<number>);
};
