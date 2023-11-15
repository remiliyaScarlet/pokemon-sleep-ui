import React from 'react';

import {
  PokemonItemStatsCalcResult,
  PokemonItemStatsWorkerOpts,
} from '@/components/shared/pokemon/icon/itemStats/worker/type';
import {useWorker} from '@/hooks/worker';


type UsePokemonProducingStatsWorkerOpts = PokemonItemStatsWorkerOpts & {
  setLoading: (loading: boolean) => void,
};

export const usePokemonProducingStats = ({setLoading, ...opts}: UsePokemonProducingStatsWorkerOpts) => {
  const {
    pokedex,
    pokemonProducingParamsMap,
    pokemonIngredientProduction,
    berryDataMap,
    ingredientMap,
    ingredientChainMap,
    level,
    behavior,
    bonus,
    sleepDurations,
  } = opts;

  const [
    producingStats,
    setProducingStats,
  ] = React.useState<PokemonItemStatsCalcResult[]>([]);

  const {work} = useWorker<PokemonItemStatsWorkerOpts, PokemonItemStatsCalcResult[]>({
    workerName: 'Pokemon Stats Calculator',
    generateWorker: () => new Worker(new URL('main.worker', import.meta.url)),
    onCompleted: (result) => {
      setLoading(false);
      setProducingStats(result);
    },
    onError: () => setLoading(false),
  });

  const calculate = () => {
    // Explicit to avoid copying unwanted properties
    work({
      pokedex,
      pokemonProducingParamsMap,
      pokemonIngredientProduction,
      berryDataMap,
      ingredientMap,
      ingredientChainMap,
      level,
      bonus,
      sleepDurations,
      behavior,
    });
    setLoading(true);
  };

  React.useEffect(() => {
    calculate();
  }, [level, bonus, sleepDurations, pokemonIngredientProduction]);

  return producingStats;
};
