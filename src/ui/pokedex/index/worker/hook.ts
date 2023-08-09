import React from 'react';

import {SortedPokemonInfo} from '@/ui/pokedex/index/type';
import {SortingWorkerOpts} from '@/ui/pokedex/index/worker/type';


type UseSortingWorkerOpts = SortingWorkerOpts & {
  triggerDeps: React.DependencyList,
  setLoading: (loading: boolean) => void,
};

export const useSortingWorker = ({
  triggerDeps,
  setLoading,
  ...opts
}: UseSortingWorkerOpts) => {
  const [sorted, setSorted] = React.useState<SortedPokemonInfo[]>([]);
  const worker = React.useMemo(() => new Worker(new URL('main', import.meta.url)), []);

  worker.onmessage = (event: MessageEvent<SortedPokemonInfo[]>) => {
    setLoading(false);
    setSorted(event.data);
  };

  worker.onerror = (event) => {
    setLoading(false);
    console.error('Error event occurred in sorting worker', event);

    throw event;
  };

  const triggerSort = () => {
    worker.postMessage(opts satisfies SortingWorkerOpts);
    setLoading(true);
  };

  React.useEffect(() => {
    triggerSort();
  }, triggerDeps);

  React.useEffect(() => {
    triggerSort();

    return () => worker.terminate();
  }, []);

  return sorted;
};
