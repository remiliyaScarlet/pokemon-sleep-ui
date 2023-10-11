import {FilterInclusionMap, FilterWithInclusionMap} from '@/components/input/filter/type';
import {Indexable, KeysOfType} from '@/utils/type';


export const getFilterIncludedKeys = <TId extends Indexable>(inclusionMap: FilterInclusionMap<TId>): string[] => {
  return Object.entries(inclusionMap)
    .filter(([_, selected]) => !!selected)
    .map(([key]) => key);
};

type GetFilterNewlySelectedKeysOpts<
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable,
> = {
  original: TFilter,
  updated: TFilter,
  key: KeysOfType<TFilter, FilterWithInclusionMap<TId>>,
};

export const getFilterNewlySelectedKeys = <
  TFilter extends FilterWithInclusionMap<TId>,
  TId extends Indexable,
>({original, updated, key}: GetFilterNewlySelectedKeysOpts<TFilter, TId>) => {
  const originalKeys = getFilterIncludedKeys(original[key]);
  const updatedKeys = getFilterIncludedKeys(updated[key]);

  return updatedKeys.filter((key) => !originalKeys.includes(key));
};
