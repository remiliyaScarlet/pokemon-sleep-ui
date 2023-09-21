import React from 'react';

import {
  PokemonItemStatsWorkerOpts,
  PokemonItemStatsWorkerReturn,
} from '@/components/shared/pokemon/icon/itemStats/worker/type';


type UsePokemonProducingStatsWorkerOpts = PokemonItemStatsWorkerOpts & {
  setLoading: (loading: boolean) => void,
};

export const usePokemonProducingStats = ({setLoading, ...opts}: UsePokemonProducingStatsWorkerOpts) => {
  const {
    level,
    bonus,
    noCollectDurations,
    pokemonIngredientProduction,
  } = opts;

  const [
    producingStats,
    setProducingStats,
  ] = React.useState<PokemonItemStatsWorkerReturn>([]);
  const worker = React.useMemo(() => new Worker(new URL('main.worker', import.meta.url)), []);

  worker.onmessage = (event: MessageEvent<PokemonItemStatsWorkerReturn>) => {
    setLoading(false);
    setProducingStats(event.data);
  };

  worker.onerror = (event) => {
    setLoading(false);
    console.error('Error event occurred in sorting worker', event);

    throw event;
  };

  const triggerSort = () => {
    worker.postMessage(opts satisfies PokemonItemStatsWorkerOpts);
    setLoading(true);
  };

  React.useEffect(() => {
    triggerSort();
  }, [level, bonus, noCollectDurations, pokemonIngredientProduction]);

  React.useEffect(() => {
    return () => worker.terminate();
  }, []);

  return producingStats;
};
