import {getAnalysisStatsOfPokemon} from '@/ui/analysis/page/calc/pokemon/main';
import {getAnalysisStatsOfProducingRate} from '@/ui/analysis/page/calc/producingRate/main';
import {AnalysisStats, GetAnalysisStatsOpts} from '@/ui/analysis/page/calc/type';


export const getAnalysisStats = (opts: GetAnalysisStatsOpts): AnalysisStats => {
  return {
    pokemon: getAnalysisStatsOfPokemon(opts),
    producingRate: getAnalysisStatsOfProducingRate(opts),
  };
};
