import {getAnalysisStatsOfPokemon} from '@/ui/analysis/page/calc/pokemon/main';
import {getAnalysisStatsOfProducingRate} from '@/ui/analysis/page/calc/producingRate/main';
import {AnalysisStats, GetAnalysisStatsOpts} from '@/ui/analysis/page/calc/type';


const onMessage = ({data}: MessageEvent<GetAnalysisStatsOpts>) => {
  const analysisStats: AnalysisStats = {
    pokemon: getAnalysisStatsOfPokemon(data),
    producingRate: getAnalysisStatsOfProducingRate(data),
  };

  postMessage(analysisStats);
};

addEventListener('message', onMessage);
