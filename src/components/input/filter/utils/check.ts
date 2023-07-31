import {FilterInclusionMap, FilterWithInclusionMap} from '@/components/input/filter/type';
import {Indexable, KeysOfType} from '@/utils/type';


type IsFilterCommonProps<
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable
> = {
  filter: TFilter,
  filterKey: KeysOfType<TFilter, FilterInclusionMap<TId>>,
};

type IsFilterConditionActiveProps<
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable
> = IsFilterCommonProps<TFilter, TId>;

export const isFilterConditionActive = <
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable
>({filter, filterKey}: IsFilterConditionActiveProps<TFilter, TId>) => (
  Object.values(filter[filterKey]).some((value) => value)
);

type IsDataIncludingAllOfFilterProps<
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable,
> = IsFilterCommonProps<TFilter, TId> & {
  ids: TId[],
  idInFilterToIdForCheck: (key: string) => TId,
  onIdsEmpty: boolean,
};

export const isDataIncludingAllOfFilter = <
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable
>({filter, filterKey, ids, idInFilterToIdForCheck, onIdsEmpty}: IsDataIncludingAllOfFilterProps<TFilter, TId>) => (
  Object.entries(filter[filterKey])
    .filter(([_, filterValue]) => !!filterValue)
    .every(([idInFilter]) => ids.length === 0 ? onIdsEmpty : ids.includes(idInFilterToIdForCheck(idInFilter)))
);

type IsFilterIncludingDataProps<
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable,
> = IsFilterCommonProps<TFilter, TId> & {
  ids: TId[],
};

export const isFilterIncludingAllOfData = <
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable
>({filter, filterKey, ids}: IsFilterIncludingDataProps<TFilter, TId>) => (
  !isFilterConditionActive({filter, filterKey}) || ids.every((id) => filter[filterKey][id])
);

export const isFilterIncludingSome = <
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable
>({filter, filterKey, ids}: IsFilterIncludingDataProps<TFilter, TId>) => (
  !isFilterConditionActive({filter, filterKey}) || ids.some((id) => filter[filterKey][id])
);

type IsFilterMismatchOnSingleProps<
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable,
> = IsFilterCommonProps<TFilter, TId> & {
  id: TId | undefined | null,
};

export const isFilterMismatchOnSingle = <
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable
>({filter, filterKey, id}: IsFilterMismatchOnSingleProps<TFilter, TId>) => {
  if (!isFilterConditionActive({filter, filterKey})) {
    return false;
  }

  if (id === null || id === undefined) {
    return true;
  }

  return !filter[filterKey][id];
};
