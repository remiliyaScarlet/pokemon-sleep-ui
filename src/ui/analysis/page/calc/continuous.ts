import {
  AnalysisStatsContinuous,
  AnalysisStatsLinkedData,
  GetAnalysisStatsCommonOpts,
} from '@/ui/analysis/page/calc/type';


export type GetAnalysisStatsOfContinuousOpts<TSample, TData> = GetAnalysisStatsCommonOpts<TSample> & {
  getValue: (sample: TSample) => number,
  getLinkedData: (sample: TSample) => AnalysisStatsLinkedData<TData>['data'],
  isLinked: (sample: TSample) => boolean,
  isCurrentRank: (sample: TSample) => boolean,
  currentValue: number,
  order?: 'asc' | 'desc',
};

export const getAnalysisStatsOfContinuous = <TSample, TData>({
  samples,
  getPokemonId,
  getValue,
  getLinkedData,
  isLinked,
  isCurrentRank,
  currentValue,
  order = 'desc',
}: GetAnalysisStatsOfContinuousOpts<TSample, TData>): AnalysisStatsContinuous<TData> => {
  const sorted = samples
    .map((sample) => ({sample, value: getValue(sample)}))
    .sort((a, b) => {
      const diff = (b.value - a.value) * (order === 'desc' ? 1 : -1);

      if (Math.abs(diff) !== 0) {
        return diff;
      }

      return getPokemonId(a.sample) - getPokemonId(b.sample);
    });

  const values = sorted.map(({value}) => value);
  const min = values.at(-1);
  const max = values.at(0);

  let rank: number | null = sorted.findIndex(({sample}) => isCurrentRank(sample)) + 1;
  if (rank === 0) {
    rank = null;
  }

  return {
    linked: sorted
      .filter(({sample}) => isLinked(sample))
      .map(({sample}) => ({pokemonId: getPokemonId(sample), data: getLinkedData(sample)})),
    rank,
    current: currentValue,
    percentage: min && max ? Math.abs((currentValue - min) / (max - min) * 100) : null,
    percentile: rank ? Math.abs((values.length + 1 - rank) / (values.length + 1) * 100) : null,
    totalCount: samples.length,
  };
};
