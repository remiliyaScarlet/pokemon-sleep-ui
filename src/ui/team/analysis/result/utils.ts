import {TeamProducingStatsGrouped, TeamProducingStatsSingle} from '@/ui/team/analysis/result/type';


type GroupProducingStatsOpts = {
  stats: TeamProducingStatsSingle[],
  key: keyof TeamProducingStatsSingle,
};

export const groupProducingStats = <K extends keyof TeamProducingStatsGrouped>({
  stats,
  key,
}: GroupProducingStatsOpts) => {
  return stats.reduce((group, single) => {
    const singleStats = single[key];

    if (!singleStats) {
      return group;
    }

    const {id, quantity, dailyEnergy} = singleStats;
    group[id] = {
      quantity: (group[id]?.quantity ?? 0) + quantity,
      dailyEnergy: (group[id]?.dailyEnergy ?? 0) + dailyEnergy,
    };
    return group;
  }, {} as TeamProducingStatsGrouped[K]);
};
