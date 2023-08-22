import {PokemonInfo} from '@/types/game/pokemon';
import {
  AnalysisStatsGrouped,
  AnalysisStatsLinkedData,
  GetAnalysisStatsCommonOpts,
} from '@/ui/analysis/page/calc/type';


type GetAnalysisStatsOfGroupedOpts<TSample, TData> = Pick<GetAnalysisStatsCommonOpts<TSample>, 'samples'> & {
  getLinkedData: (sample: TSample) => AnalysisStatsLinkedData<TData>['data'],
  isMatched: (sample: TSample) => boolean,
};

export const getAnalysisStatsOfGrouped = <TData>({
  samples,
  getLinkedData,
  isMatched,
}: GetAnalysisStatsOfGroupedOpts<PokemonInfo, TData>): AnalysisStatsGrouped<TData> => {
  const linked = samples
    .filter((sample) => isMatched(sample))
    .map((sample) => ({pokemonId: sample.id, data: getLinkedData(sample)} satisfies AnalysisStatsLinkedData<TData>));

  return {
    linked: linked,
    sharedCount: linked.length,
    totalCount: samples.length,
  };
};
