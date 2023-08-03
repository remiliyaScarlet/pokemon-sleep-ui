import {TeamProductionStatsGrouped, TeamProductionStatsSingle} from '@/ui/team/analysis/result/type';


type GroupProductionStatsOpts = {
  stats: TeamProductionStatsSingle[],
  key: keyof TeamProductionStatsSingle,
};

export const groupProductionStats = <K extends keyof TeamProductionStatsGrouped>({
  stats,
  key,
}: GroupProductionStatsOpts) => {
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
  }, {} as TeamProductionStatsGrouped[K]);
};
