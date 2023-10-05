import {ProducingRateOfStates} from '@/types/game/producing/rate';
import {stateOfRateToShow} from '@/ui/team/analysis/setup/const';
import {TeamProducingStatsGroupedOfItem} from '@/ui/team/analysis/setup/type';


export const groupProducingStats = (
  rates: ProducingRateOfStates[],
): TeamProducingStatsGroupedOfItem<number> => {
  return rates.reduce((group, single) => {
    const {id, quantity, dailyEnergy} = single;

    group[id] = {
      quantity: (group[id]?.quantity ?? 0) + quantity[stateOfRateToShow],
      dailyEnergy: (group[id]?.dailyEnergy ?? 0) + dailyEnergy[stateOfRateToShow],
    };
    return group;
  }, {} as TeamProducingStatsGroupedOfItem<number>);
};
