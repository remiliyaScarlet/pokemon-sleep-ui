import {
  FilterInclusionMap,
  FilterInputOnClickProps,
  FilterInputProps,
  FilterWithInclusionMap,
} from '@/components/input/filter/type';
import {classNames} from '@/utils/react';
import {Indexable, KeysOfType} from '@/utils/type';


export const getTextFilterButtonClass = (isActive: boolean) => classNames(
  'px-2 whitespace-nowrap text-sm',
  getFilterInputButtonClass(isActive),
);

export const getIconFilterButtonClass = (isActive: boolean) => classNames(
  'w-8',
  getFilterInputButtonClass(isActive),
);

const getFilterInputButtonClass = (isActive: boolean) => classNames(
  'relative h-8 rounded-full',
  getToggleButtonClass(isActive),
);

export const getToggleButtonClass = (isActive: boolean) => classNames(
  isActive ? 'button-toggle-active' : 'button-toggle-inactive',
);

export type GetSingleSelectOnClickPropsOpts<TFilter, TData> = FilterInputProps<TFilter> & {
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

export type GetMultiSelectOnClickPropsOpts<
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
