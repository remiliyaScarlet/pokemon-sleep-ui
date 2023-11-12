import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {CompletionResultUI} from '@/components/shared/completion/main';


export type PokeboxCountProps = {
  loading: boolean,
  countToShow: number,
  total: number,
};

export const PokeboxCount = ({loading, countToShow, total}: PokeboxCountProps) => {
  return (
    <Flex direction="row" noFullWidth className="justify-end gap-1">
      {loading ? '-': <CompletionResultUI completed={countToShow} total={total} className="self-end"/>}
    </Flex>
  );
};
