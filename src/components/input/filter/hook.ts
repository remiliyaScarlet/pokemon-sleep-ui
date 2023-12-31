import React from 'react';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {ReactStateUpdaterFromOriginal} from '@/types/react';
import {Indexable} from '@/utils/type';


type UseFilterInputOpts<TFilter, TData, TId extends Indexable> = {
  data: TData[] | ((filter: TFilter) => TData[]),
  dataToId: (data: TData) => TId,
  initialFilter: TFilter,
  isDataIncluded: (filter: TFilter, data: TData) => boolean,
  dataDeps?: React.DependencyList,
  deps?: React.DependencyList,
  onSetFilter?: (original: TFilter, updated: TFilter) => TFilter,
};

export const useFilterInput = <TFilter, TData, TId extends Indexable>({
  data,
  dataToId,
  initialFilter,
  isDataIncluded,
  dataDeps,
  deps,
  onSetFilter,
}: UseFilterInputOpts<TFilter, TData, TId>) => {
  const [filter, setFilterInternal] = React.useState<TFilter>(
    onSetFilter ? onSetFilter(initialFilter, initialFilter): initialFilter,
  );
  const dataAfterFilter = React.useMemo(() => {
    if (typeof data === 'function') {
      return data(filter);
    }

    return data;
  }, [filter, ...(dataDeps ?? [])]);

  const isIncluded = React.useMemo((): FilterInclusionMap<TId> => (
    Object.fromEntries(dataAfterFilter.map((single) => (
      [dataToId(single), isDataIncluded(filter, single)]
    ))) as FilterInclusionMap<TId>
  ), [filter, ...(deps ?? [])]);

  const setFilter: ReactStateUpdaterFromOriginal<TFilter> = React.useCallback((getUpdated) => (
    setFilterInternal((original) => {
      const updated = getUpdated(original);

      if (!onSetFilter) {
        return updated;
      }

      return onSetFilter(original, updated);
    })
  ), [onSetFilter, setFilterInternal]);

  return {
    data: dataAfterFilter,
    filter,
    setFilter,
    isIncluded,
  };
};
