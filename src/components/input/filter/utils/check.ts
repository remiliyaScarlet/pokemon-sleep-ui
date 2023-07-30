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

type IsFilterMatchingAllProps<
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable,
> = IsFilterCommonProps<TFilter, TId> & {
  ids: TId[],
  idInFilterToIdForCheck: (key: string) => TId,
  onIdsEmpty: boolean,
};

export const isFilterMatchingAll = <
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable
>({filter, filterKey, ids, idInFilterToIdForCheck, onIdsEmpty}: IsFilterMatchingAllProps<TFilter, TId>) => (
  Object.entries(filter[filterKey])
    .filter(([_, filterValue]) => !!filterValue)
    .every(([idInFilter]) => ids.length === 0 ? onIdsEmpty : ids.includes(idInFilterToIdForCheck(idInFilter)))
);

type IsFilterMatchingSomeProps<
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable,
> = IsFilterCommonProps<TFilter, TId> & {
  ids: TId[],
};

export const isFilterMatchingSome = <
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable
>({filter, filterKey, ids}: IsFilterMatchingSomeProps<TFilter, TId>) => (
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
