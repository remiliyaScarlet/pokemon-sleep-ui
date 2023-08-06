import {PokemonId} from '@/types/mongo/pokemon';
import {SleepMapId} from '@/types/mongo/sleepStyle';
import {AnalysisPageCommonProps} from '@/ui/analysis/page/type';


export type AnalysisStatsCommon = {
  related: PokemonId[],
  totalCount: number,
};

export type AnalysisStatsGrouped = AnalysisStatsCommon & {
  sharedCount: number,
};

export type AnalysisStatsContinuous = AnalysisStatsCommon & {
  percentile: number | null,
  percentage: number | null,
  rank: number | null,
};

export type AnalysisStatsProducingRate = {
  count: AnalysisStatsContinuous,
  energy: AnalysisStatsContinuous,
};

export type AnalysisStatsSleepStyle = {
  mapId: SleepMapId,
  first: AnalysisStatsContinuous,
  last: AnalysisStatsContinuous,
};

export type AnalysisStats = {
  pokemon: {
    type: AnalysisStatsGrouped,
    specialty: AnalysisStatsGrouped,
    sleepType: AnalysisStatsGrouped,
    ingredient: {
      fixed: AnalysisStatsGrouped,
      random: AnalysisStatsGrouped[],
    },
    berry: AnalysisStatsGrouped,
    mainSkill: AnalysisStatsGrouped,
    sleepStyle: AnalysisStatsSleepStyle[],
  },
  producingRate: {
    berry: AnalysisStatsProducingRate,
    ingredient: AnalysisStatsProducingRate | null,
  },
};

export type GetAnalysisStatsCommonOpts<TSample> = {
  samples: TSample[],
  getPokemonId: (sample: TSample) => PokemonId,
};

export type GetAnalysisStatsOpts = AnalysisPageCommonProps & {
  level: number,
};
