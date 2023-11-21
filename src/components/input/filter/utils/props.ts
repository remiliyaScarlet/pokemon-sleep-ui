import {
  FilterInclusionMap,
  FilterInputOnClickProps,
  FilterWithInclusionMap,
  FilterWithUpdaterProps,
} from '@/components/input/filter/type';
import {Indexable, KeysOfType} from '@/utils/type';


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
> = FilterWithUpdaterProps<TFilter> & {
  filterKey: KeysOfType<TFilter, FilterInclusionMap<TId>>,
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
