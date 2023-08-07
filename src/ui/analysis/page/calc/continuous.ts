import {AnalysisStatsContinuous, GetAnalysisStatsCommonOpts} from '@/ui/analysis/page/calc/type';


export type GetAnalysisStatsOfContinuousOpts<TSample> = GetAnalysisStatsCommonOpts<TSample> & {
  getValue: (sample: TSample) => number,
  isRelated: (sample: TSample) => boolean,
  isCurrent: (sample: TSample) => boolean,
  currentValue: number,
  order?: 'asc' | 'desc',
};

export const getAnalysisStatsOfContinuous = <TSample>({
  samples,
  getPokemonId,
  getValue,
  isRelated,
  isCurrent,
  currentValue,
  order = 'desc',
}: GetAnalysisStatsOfContinuousOpts<TSample>): AnalysisStatsContinuous => {
  const sorted = samples
    .map((sample) => ({sample, value: getValue(sample)}))
    .sort((a, b) => {
      const diff = (b.value - a.value) * (order === 'desc' ? 1 : -1);

      if (Math.abs(diff) !== 0) {
        return diff;
      }

      return getPokemonId(a.sample) - getPokemonId(b.sample);
    });

  const related = sorted
    .filter(({sample}) => isRelated(sample))
    .map(({sample}) => getPokemonId(sample));

  const values = sorted.map(({value}) => value);
  const min = values.at(-1);
  const max = values.at(0);

  let rank: number | null = sorted.findIndex(({sample}) => isCurrent(sample)) + 1;
  if (rank === 0) {
    rank = null;
  }

  return {
    related,
    rank,
    percentage: min && max ? Math.abs((currentValue - min) / (max - min) * 100) : null,
    percentile: rank ? Math.abs((values.length + 1 - rank) / (values.length + 1) * 100) : null,
    totalCount: samples.length,
  };
};
