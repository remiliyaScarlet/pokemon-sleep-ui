import {PokemonInfo} from '@/types/mongo/pokemon';
import {AnalysisStatsGrouped, GetAnalysisStatsCommonOpts} from '@/ui/analysis/page/calc/type';


type GetAnalysisStatsOfGroupedOpts<TSample> = Pick<GetAnalysisStatsCommonOpts<TSample>, 'samples'> & {
  isMatched: (sample: TSample) => boolean,
};

export const getAnalysisStatsOfGrouped = ({
  samples,
  isMatched,
}: GetAnalysisStatsOfGroupedOpts<PokemonInfo>): AnalysisStatsGrouped => {
  const related = samples.filter((sample) => isMatched(sample)).map(({id}) => id);

  return {
    related,
    sharedCount: related.length,
    totalCount: samples.length,
  };
};
