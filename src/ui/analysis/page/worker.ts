import React from 'react';

import {EffectiveBonus} from '@/types/game/bonus';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {AnalysisStats, GetAnalysisStatsOpts} from '@/ui/analysis/page/calc/type';
import {AnalysisPageCommonProps} from '@/ui/analysis/page/type';


type Props = Omit<AnalysisPageCommonProps, 'pokemonList' | 'mapMeta' | 'preloadedSettings'> & {
  level: number,
  ingredients: IngredientProduction[],
  pokemonToAnalyze: PokemonInfo[],
  snorlaxFavorite: SnorlaxFavorite,
  bonus: EffectiveBonus,
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
  setStats,
  setLoading,
  calculateDeps,
}: Props) => {
  const worker = React.useMemo(() => new Worker(new URL('calc/worker', import.meta.url)), []);

  worker.onmessage = (event) => {
    setLoading(false);
    setStats(event.data);
  };

  worker.onerror = (event) => {
    setLoading(false);
    console.error('Error event occurred in analysis worker', event);

    throw event;
  };

  const requestStats = () => {
    worker.postMessage({
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
    } satisfies GetAnalysisStatsOpts);
    setLoading(true);
  };

  React.useEffect(() => {
    requestStats();
  }, calculateDeps);

  React.useEffect(() => {
    requestStats();

    return () => worker.terminate();
  }, []);
};
