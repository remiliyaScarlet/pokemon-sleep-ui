import React from 'react';

import {Flex} from '@/components/layout/flex/common';


type Props = {
  loading: boolean,
  countToShow: number,
  total: number,
};

export const PokeboxCount = ({loading, countToShow, total}: Props) => {
  return (
    <Flex direction="row" className="justify-end gap-1">
      {loading ?
        '-':
        <>
          <div>{countToShow}</div>
          <div>/</div>
          <div>{total}</div>
          <div>({(countToShow / total * 100).toFixed(2)}%)</div>
        </>}
    </Flex>
  );
};
