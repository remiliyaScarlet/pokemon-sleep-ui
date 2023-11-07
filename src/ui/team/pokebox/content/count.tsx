import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {CompletionResultUI} from '@/components/shared/completion/main';


type Props = {
  loading: boolean,
  countToShow: number,
  total: number,
};

export const PokeboxCount = ({loading, countToShow, total}: Props) => {
  return (
    <Flex direction="row" className="justify-end gap-1">
      {loading ? '-': <CompletionResultUI completed={countToShow} total={total} className="self-end"/>}
    </Flex>
  );
};
