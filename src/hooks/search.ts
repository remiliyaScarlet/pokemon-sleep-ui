import React from 'react';


export type UseSearchableDataOpts<TData> = {
  search: string,
  data: TData[],
  getKeyword: (data: TData) => string,
  getSorter?: (a: TData, b: TData) => number,
};

export const useSearchableData = <TData>({
  search,
  data,
  getKeyword,
  getSorter,
}: UseSearchableDataOpts<TData>): TData[] => {
  const dataWithSearch = React.useMemo(() => {
    let dataToMap = data;

    if (getSorter) {
      dataToMap = dataToMap.sort(getSorter);
    }

    return dataToMap
      .map((data) => ({
        data,
        keyword: getKeyword(data).toUpperCase(),
      }));
  }, [data, getKeyword]);

  return React.useMemo(() => {
    return dataWithSearch
      .filter(({keyword}) => search && keyword.includes(search.toUpperCase()))
      .map(({data}) => data);
  }, [data, search]);
};
