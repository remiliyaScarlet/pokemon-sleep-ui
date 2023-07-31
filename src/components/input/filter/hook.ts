import React from 'react';

import {FilterInclusionMap} from '@/components/input/filter/type';
import {Indexable} from '@/utils/type';


type UseFilterInputOpts<TFilter, TData, TId extends Indexable> = {
  data: TData[],
  dataToId: (data: TData) => TId,
  initialFilter: TFilter,
  isDataIncluded: (filter: TFilter, data: TData) => boolean,
  deps?: React.DependencyList,
};

export const useFilterInput = <TFilter, TData, TId extends Indexable>({
  data,
  dataToId,
  initialFilter,
  isDataIncluded,
  deps,
}: UseFilterInputOpts<TFilter, TData, TId>) => {
  const [filter, setFilter] = React.useState<TFilter>(initialFilter);
  const isIncluded = React.useMemo((): FilterInclusionMap<TId> => (
    Object.fromEntries(data.map((single) => (
      [dataToId(single), isDataIncluded(filter, single)]
    ))) as FilterInclusionMap<TId>
  ), [filter, ...(deps ?? [])]);

  return {filter, setFilter, isIncluded};
};
