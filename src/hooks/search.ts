import React from 'react';


export type UseSearchableDataOpts<TData> = {
  search: string,
  data: TData[],
  getKeyword: (data: TData) => string,
};

export const useSearchableData = <TData>({search, data, getKeyword}: UseSearchableDataOpts<TData>) => {
  const dataWithSearch = React.useMemo(() => data.map((data) => ({
    ...data,
    keyword: getKeyword(data).toUpperCase(),
  })), [data, getKeyword]);

  return React.useMemo(() => {
    return dataWithSearch.filter(({keyword}) => search && keyword.includes(search.toUpperCase()));
  }, [data, search]);
};
