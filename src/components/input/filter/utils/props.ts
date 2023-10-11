import {clsx} from 'clsx';

import {
  FilterInclusionMap,
  FilterInputOnClickProps,
  FilterInputSetFromOriginalProps,
  FilterWithInclusionMap,
  FilterWithUpdaterProps,
} from '@/components/input/filter/type';
import {Indexable, KeysOfType} from '@/utils/type';


export const getToggleButtonClass = (isActive: boolean) => clsx(
  isActive ? 'button-toggle-active' : 'button-toggle-inactive',
);

export const getTextFilterButtonClass = (isActive: boolean) => clsx(
  'whitespace-nowrap px-2 text-sm',
  getFilterInputButtonClass(isActive),
);

export const getIconFilterButtonClass = (isActive: boolean) => clsx('w-8', getFilterInputButtonClass(isActive));

const getFilterInputButtonClass = (isActive: boolean) => clsx(
  'relative h-8 rounded-full',
  getToggleButtonClass(isActive),
);

export type GetSingleSelectOnClickPropsOpts<TFilter, TData> = FilterWithUpdaterProps<TFilter> & {
  filterKey: KeysOfType<TFilter, TData | null>,
  allowNull?: boolean,
};

export const getSingleSelectOnClickProps = <TFilter, TData, TId>({
  filter,
  setFilter,
  filterKey,
  allowNull = true,
}: GetSingleSelectOnClickPropsOpts<TFilter, TData>): FilterInputOnClickProps<TId> => ({
  isActive: (id) => filter[filterKey] === id,
  onClick: (id) => setFilter((original) => ({
    ...original,
    [filterKey]: original[filterKey] === id ? (allowNull ? null : id) : id,
  } satisfies TFilter)),
});

export type GetMultiSelectOnClickPropsOpts<
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable
> = FilterInputSetFromOriginalProps<TFilter> & {
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
    } satisfies TFilter)),
  };
};
