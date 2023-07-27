import {toggleClass} from '@/components/input/filter/const';
import {
  FilterInclusionMap,
  FilterInputOnClickProps,
  FilterInputProps,
  FilterWithInclusionMap,
} from '@/components/input/filter/type';
import {classNames} from '@/utils/react';
import {Indexable, KeysOfType} from '@/utils/type';


export const getFilterInputButtonClass = (isActive: boolean) => classNames(
  'relative h-8 px-2 rounded-full whitespace-nowrap text-sm',
  isActive ? toggleClass.active.hover : toggleClass.inactive.hover,
  isActive ? toggleClass.active.background : toggleClass.inactive.background,
);

type GetSingleSelectOnClickPropsOpts<TFilter, TData> = FilterInputProps<TFilter> & {
  filterKey: KeysOfType<TFilter, TData | null>
};

export const getSingleSelectOnClickProps = <TFilter, TData, TId>({
  filter,
  setFilter,
  filterKey,
}: GetSingleSelectOnClickPropsOpts<TFilter, TData>): FilterInputOnClickProps<TId> => ({
  isActive: (id) => filter[filterKey] === id,
  onClick: (id) => setFilter((original) => ({
    ...original,
    [filterKey]: original[filterKey] === id ? null : id,
  })),
});

type GetMultiSelectOnClickPropsOpts<
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable
> = FilterInputProps<TFilter> & {
  filterKey: KeysOfType<TFilter, FilterInclusionMap<TId>>
};

export const getMultiSelectOnClickProps = <
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable
>({
  filter,
  setFilter,
  filterKey,
}: GetMultiSelectOnClickPropsOpts<TFilter, TId>): FilterInputOnClickProps<TId> => {
  return {
    isActive: (id) => !!filter[filterKey][id],
    onClick: (id) => setFilter((original) => ({
      ...original,
      [filterKey]: {
        ...original[filterKey],
        [id]: !original[filterKey][id],
      },
    })),
  };
};

type IsFilterConditionActiveProps<
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable
> = {
  filter: TFilter,
  filterKey: KeysOfType<TFilter, FilterInclusionMap<TId>>,
};

export const isFilterConditionActive = <
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable
>({filter, filterKey}: IsFilterConditionActiveProps<TFilter, TId>) => (
  Object.values(filter[filterKey]).some((value) => value)
);


type IsFilterIncludeAllIdsProps<
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable,
> = {
  filter: TFilter,
  filterKey: KeysOfType<TFilter, FilterInclusionMap<TId>>,
  ids: TId[],
  keyToId: (key: string) => TId,
  onIdsEmpty: boolean,
};

export const isFilterMatchingGivenArray = <
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable
>({filter, filterKey, ids, keyToId, onIdsEmpty}: IsFilterIncludeAllIdsProps<TFilter, TId>) => (
  Object.entries(filter[filterKey])
    .filter(([_, ingredient]) => !!ingredient)
    .every(([idInFilter]) => ids.length === 0 ? onIdsEmpty : ids.includes(keyToId(idInFilter)))
);
