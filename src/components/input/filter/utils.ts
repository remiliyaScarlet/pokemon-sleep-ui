import {toggleClass} from '@/components/input/filter/const';
import {FilterInputOnClickProps, FilterInputProps} from '@/components/input/filter/type';
import {classNames} from '@/utils/react';
import {KeysOfType} from '@/utils/type';


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
}: GetSingleSelectOnClickPropsOpts<TFilter, TData>): FilterInputOnClickProps<TId> => {
  return {
    isActive: (id) => filter[filterKey] === id,
    onClick: (id) => setFilter((original) => ({
      ...original,
      [filterKey]: original[filterKey] === id ? null : id,
    })),
  };
};
