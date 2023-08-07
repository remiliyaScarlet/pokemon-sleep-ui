import {PokemonInfo} from '@/types/mongo/pokemon';
import {AnalysisStats} from '@/ui/analysis/page/calc/type';


export type AnalysisStatsUiProps = {
  pokemon: PokemonInfo,
  stats: AnalysisStats,
};
