import React from 'react';

import BeakerIcon from '@heroicons/react/24/outline/BeakerIcon';
import HandThumbDownIcon from '@heroicons/react/24/outline/HandThumbDownIcon';
import HandThumbUpIcon from '@heroicons/react/24/outline/HandThumbUpIcon';
import {clsx} from 'clsx';

import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Flex} from '@/components/layout/flex';
import {Grid} from '@/components/layout/grid';
import {LazyLoad} from '@/components/layout/lazyLoad';
import {ProgressBar} from '@/components/progressBar';
import {classOfMarkStyle} from '@/styles/text/mark/style';
import {getMarkByThreshold} from '@/styles/text/mark/utils';
import {SubSkillMap} from '@/types/game/pokemon/subskill';
import {ratingMarkThreshold} from '@/ui/rating/result/const';
import {RatingDataPointUI} from '@/ui/rating/result/point';
import {RatingResult} from '@/ui/rating/result/type';
import {formatFloat, formatInt} from '@/utils/number';


type Props = {
  loading: boolean,
  result: RatingResult,
  subSkillMap: SubSkillMap,
};

export const RatingResultUI = React.forwardRef<HTMLDivElement, Props>(({
  loading,
  result,
  subSkillMap,
}, ref) => {
  const {
    samples,
    rank,
    percentage,
    percentile,
    points,
  } = result;
  const textMarkStyle = getMarkByThreshold(percentile, ratingMarkThreshold);

  return (
    <LazyLoad ref={ref} loading={loading} loadingFullHeight className={clsx(
      'info-section relative gap-3 [overflow-anchor:none]',
      textMarkStyle && classOfMarkStyle[textMarkStyle],
    )}>
      <Flex direction="row" center className="text-6xl md:text-8xl">
        {isNaN(percentage) ? '-' : `${formatFloat(percentage)}%`}
      </Flex>
      <Flex direction="col">
        <ProgressBar percent={percentage}/>
      </Flex>
      <Flex direction="row" className="items-end justify-center gap-1.5">
        <Flex direction="row" className="items-end justify-center gap-1.5">
          <div className="text-4xl md:text-6xl">{rank ? formatInt(rank) : '-'}</div>
          <div>/</div>
          <div>{isNaN(samples) ? '-' : formatInt(samples)}</div>
        </Flex>
        <div className="text-3xl md:text-4xl">
          {isNaN(percentile) ? '-' : <>{formatInt(percentile)}<sup>th</sup></>}
        </div>
      </Flex>
      <Flex direction="col">
        <ProgressBar percent={percentile}/>
      </Flex>
      <Grid className="grid-rows-3 gap-1.5 md:grid-cols-3 md:grid-rows-1">
        <div>
          <AnimatedCollapse show={!!points.min}>
            <RatingDataPointUI
              point={points.min}
              subSkillMap={subSkillMap}
              icon={<HandThumbDownIcon/>}
              className="bg-red-500/10"
            />
          </AnimatedCollapse>
        </div>
        <div>
          <AnimatedCollapse show={!!points.current}>
            <RatingDataPointUI
              point={points.current}
              subSkillMap={subSkillMap}
              icon={<BeakerIcon/>}
              className="bg-slate-500/10"
            />
          </AnimatedCollapse>
        </div>
        <div>
          <AnimatedCollapse show={!!points.max}>
            <RatingDataPointUI
              point={points.max}
              subSkillMap={subSkillMap}
              icon={<HandThumbUpIcon/>}
              className="bg-green-500/10"
            />
          </AnimatedCollapse>
        </div>
      </Grid>
    </LazyLoad>
  );
});
RatingResultUI.displayName = 'RatingResultUI';
