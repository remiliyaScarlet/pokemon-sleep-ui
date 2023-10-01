import React from 'react';

import {Flex} from '@/components/layout/flex';
import {MapIndexSleepdexCompletionOfMap} from '@/ui/map/common/type';
import {formatFloat} from '@/utils/number';


type Props = {
  sleepdexCompletionOfMap: MapIndexSleepdexCompletionOfMap,
};

export const MapSleepdexUnlockCount = ({sleepdexCompletionOfMap}: Props) => {
  const {completed, total} = sleepdexCompletionOfMap;

  return (
    <Flex direction="row" className="gap-1 whitespace-nowrap">
      <div>{completed}</div>
      <div>/</div>
      <div>{total}</div>
      <div>({formatFloat(completed / total * 100)}%)</div>
    </Flex>
  );
};
