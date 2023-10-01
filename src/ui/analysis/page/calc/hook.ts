import React from 'react';

import {useWorker} from '@/hooks/worker';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {CalculatedUserSettings} from '@/types/userData/settings';
import {AnalysisStats, GetAnalysisStatsOpts} from '@/ui/analysis/page/calc/type';
import {AnalysisPageCommonProps} from '@/ui/analysis/page/type';


type Props =
  Omit<AnalysisPageCommonProps, 'pokemonList' | 'mapMeta' | 'preloadedSettings'> &
  CalculatedUserSettings & {
    level: number,
    ingredients: IngredientProduction[],
    pokemonToAnalyze: PokemonInfo[],
    snorlaxFavorite: SnorlaxFavorite,
    setStats: (stats: AnalysisStats) => void,
    setLoading: (loading: boolean) => void,
    calculateDeps: React.DependencyList,
  };

export const useCalculationWorker = ({
  pokemon,
  pokemonProducingParamsMap,
  ingredients,
  ingredientMap,
  ingredientChainMap,
  berryDataMap,
  sleepStyleMap,
  level,
  pokemonToAnalyze,
  snorlaxFavorite,
  bonus,
  sleepDurations,
  setStats,
  setLoading,
  calculateDeps,
}: Props) => {
  const {work} = useWorker<GetAnalysisStatsOpts, AnalysisStats>({
    workerName: 'Analysis Calculator',
    generateWorker: () => new Worker(new URL('main.worker', import.meta.url)),
    onCompleted: (result) => {
      setLoading(false);
      setStats(result);
    },
    onError: () => setLoading(false),
  });

  const requestStats = () => {
    work({
      level,
      pokemonList: pokemonToAnalyze,
      pokemon,
      pokemonProducingParamsMap,
      ingredients,
      ingredientChainMap,
      ingredientMap,
      berryDataMap,
      sleepStyleMap,
      snorlaxFavorite,
      bonus,
      sleepDurations,
    });
    setLoading(true);
  };

  React.useEffect(() => {
    requestStats();
  }, calculateDeps);
};
