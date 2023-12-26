import React from 'react';

import {clsx} from 'clsx';

import {FadingLayout} from '@/components/layout/fading/main';
import {Flex} from '@/components/layout/flex/common';
import {ProgressBar} from '@/components/progressBar';
import {ratingMarkThresholdByPr} from '@/components/shared/pokemon/rating/const';
import {RatingRelativeStrength} from '@/components/shared/pokemon/rating/units/relativeStrength';
import {classOfMarkStyle} from '@/styles/text/mark/style';
import {getMarkByThreshold} from '@/styles/text/mark/utils';
import {RatingWeightedStats, RatingWeightedStatsBasis} from '@/types/game/pokemon/rating/config';
import {formatFloat, formatInt} from '@/utils/number/format';


export type RatingWeightedStatsUiProps = {
  stats: RatingWeightedStats,
  basis: RatingWeightedStatsBasis,
};

export const RatingWeightedStatsUI = ({stats, basis}: RatingWeightedStatsUiProps) => {
  const {percentile, percentage, relativeStrength} = stats;

  const heightClass = 'h-12';
  const percentileMark = getMarkByThreshold(percentile, ratingMarkThresholdByPr);

  return (
    <Flex center className={heightClass}>
      <FadingLayout
        current={basis}
        contents={{
          percentile: (
            <Flex noFullWidth className={clsx('justify-around gap-1', heightClass)}>
              <Flex direction="row" noFullWidth className={clsx(
                'items-end justify-center gap-1 text-3xl',
                percentileMark && classOfMarkStyle[percentileMark],
              )}>
                {isNaN(percentile) ? '-' : <><span className="text-lg">PR</span>{formatInt(percentile)}</>}
              </Flex>
              <ProgressBar percent={percentile} classBarHeight="h-1.5"/>
            </Flex>
          ),
          percentage: (
            <Flex center noFullWidth className={clsx('justify-around gap-1', heightClass)}>
              <div className="text-3xl">
                {isNaN(percentage) ? '-' : `${formatFloat(percentage)}%`}
              </div>
              <ProgressBar percent={percentage} classBarHeight="h-1.5"/>
            </Flex>
          ),
          relativeStrength: (
            <RatingRelativeStrength
              baseDiffPercent={relativeStrength}
              iconDimension="h-7 w-7"
              className={clsx('text-3xl', heightClass)}
            />
          ),
        }}
      />
    </Flex>
  );
};
