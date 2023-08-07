import React from 'react';

import {PokemonInfo} from '@/types/mongo/pokemon';
import {AnalysisStats, GetAnalysisStatsOpts} from '@/ui/analysis/page/calc/type';
import {AnalysisPageCommonProps} from '@/ui/analysis/page/type';


type Props = Omit<AnalysisPageCommonProps, 'pokedex'> & {
  level: number,
  pokemonToAnalyze: PokemonInfo[],
  setStats: (stats: AnalysisStats) => void,
  setLoading: (loading: boolean) => void,
  calculateDeps: React.DependencyList,
};

export const useCalculationWorker = ({
  pokemon,
  ingredientMap,
  berryDataMap,
  sleepStyleMap,
  level,
  pokemonToAnalyze,
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
      pokedex: pokemonToAnalyze,
      pokemon,
      ingredientMap,
      berryDataMap,
      sleepStyleMap,
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
