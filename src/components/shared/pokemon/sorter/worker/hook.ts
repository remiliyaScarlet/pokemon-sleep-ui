import React from 'react';

import {PokemonInfoWithSortingPayload, SortedPokemonInfo} from '@/components/shared/pokemon/sorter/type';
import {SortingWorkerOpts} from '@/components/shared/pokemon/sorter/worker/type';
import {useWorker} from '@/hooks/worker';


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
  const {work} = useWorker<SortingWorkerOpts<TExtra, TData>, SortedPokemonInfo<TExtra, TData>[]>({
    workerName: 'Pokemon Sorter',
    generateWorker: () => new Worker(new URL('main.worker', import.meta.url)),
    onCompleted: (result) => {
      setLoading(false);
      setSorted(result);
    },
    onError: () => setLoading(false),
  });

  const triggerSort = () => {
    work(opts);
    setLoading(true);
  };

  React.useEffect(() => {
    triggerSort();
  }, triggerDeps);

  return sorted;
};
