import React from 'react';

import {PokemonInfoWithSortingPayload, SortedPokemonInfo} from '@/components/shared/pokemon/sorter/type';
import {SortingWorkerOpts} from '@/components/shared/pokemon/sorter/worker/type';


type UseSortingWorkerOpts<
  TExtra,
  TData extends PokemonInfoWithSortingPayload<TExtra>
> = SortingWorkerOpts<TExtra, TData> & {
  triggerDeps: React.DependencyList,
  setLoading: (loading: boolean) => void,
};

export const useSortingWorker = <TExtra, TData extends PokemonInfoWithSortingPayload<TExtra>>({
  triggerDeps,
  setLoading,
  ...opts
}: UseSortingWorkerOpts<TExtra, TData>) => {
  const [sorted, setSorted] = React.useState<SortedPokemonInfo<TExtra, TData>[]>([]);
  const worker = React.useMemo(() => new Worker(new URL('main.worker', import.meta.url)), []);

  worker.onmessage = (event: MessageEvent<SortedPokemonInfo<TExtra, TData>[]>) => {
    setLoading(false);
    setSorted(event.data);
  };

  worker.onerror = (event) => {
    setLoading(false);
    console.error('Error event occurred in sorting worker', event);

    throw event;
  };

  const triggerSort = () => {
    worker.postMessage(opts satisfies SortingWorkerOpts<TExtra, TData>);
    setLoading(true);
  };

  React.useEffect(() => {
    triggerSort();
  }, triggerDeps);

  React.useEffect(() => {
    return () => worker.terminate();
  }, []);

  return sorted;
};
