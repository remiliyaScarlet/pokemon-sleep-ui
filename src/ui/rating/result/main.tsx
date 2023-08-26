import React from 'react';

import {Flex} from '@/components/layout/flex';
import {LazyLoad} from '@/components/layout/lazyLoad';
import {RatingResult} from '@/ui/rating/result/type';
import {formatFloat, formatInt} from '@/utils/number';


type Props = {
  loading: boolean,
  result: RatingResult,
};

export const RatingResultUI = ({loading, result}: Props) => {
  // TODO: loading mark to match the section height
  // TODO: result to show PR / % gauge
  const {
    samples,
    rank,
    percentage,
    percentile,
  } = result;

  return (
    <LazyLoad loading={loading} className="info-section relative gap-3">
      <Flex direction="row" center className="text-8xl">
        {formatFloat(percentage)}%
      </Flex>
      <Flex direction="row" className="items-end justify-center gap-1.5">
        <Flex direction="row" className="items-end justify-center gap-1.5">
          <div className="text-6xl">{rank ? formatInt(rank) : '-'}</div>
          <div>/</div>
          <div>{samples ? formatInt(samples) : '-'}</div>
        </Flex>
        <div className="text-4xl">
          {formatInt(percentile)}<sup>th</sup>
        </div>
      </Flex>
    </LazyLoad>
  );
};
