import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {ProgressBar} from '@/components/progressBar';
import {formatFloat} from '@/utils/number/format';


type Props = {
  percentage: number,
  classOfValue: `text-${string}`,
  classBarHeight?: `h-${number}`,
  className?: string,
  noFullWidth?: boolean,
};

export const RankingResultPercentage = ({
  percentage,
  classOfValue,
  classBarHeight,
  className,
  noFullWidth,
}: Props) => {
  return (
    <Flex noFullWidth={noFullWidth ?? true} className={clsx('gap-1', className)}>
      <Flex direction="row" noFullWidth className={clsx(
        'items-end justify-center gap-1',
        classOfValue,
      )}>
        {isNaN(percentage) ? '-' : `${formatFloat(percentage)}%`}
      </Flex>
      <ProgressBar percent={percentage} classBarHeight={classBarHeight}/>
    </Flex>
  );
};
