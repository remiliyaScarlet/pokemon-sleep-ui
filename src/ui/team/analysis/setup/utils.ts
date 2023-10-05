import {ProductionPeriod} from '@/types/game/producing/display';
import {ProducingRateOfStates} from '@/types/game/producing/rate';
import {stateOfRateToShow} from '@/ui/team/analysis/setup/const';
import {TeamProducingStatsGroupedOfItem} from '@/ui/team/analysis/setup/type';


type GroupProducingStatsOpts = {
  period: ProductionPeriod,
  rates: ProducingRateOfStates[],
};

export const groupProducingStats = ({
  period,
  rates,
}: GroupProducingStatsOpts): TeamProducingStatsGroupedOfItem<number> => {
  return rates.reduce((group, single) => {
    const {id, quantity, energy} = single;

    group[id] = {
      period,
      quantity: (group[id]?.quantity ?? 0) + quantity[stateOfRateToShow],
      energy: (group[id]?.energy ?? 0) + energy[stateOfRateToShow],
    };
    return group;
  }, {} as TeamProducingStatsGroupedOfItem<number>);
};
