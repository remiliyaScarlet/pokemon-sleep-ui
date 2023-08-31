import React from 'react';

import {clsx} from 'clsx';

import {LoadingText} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex';
import {ProgressBar} from '@/components/progressBar';
import {ratingMarkThresholdByPr} from '@/components/shared/pokemon/rating/const';
import {classOfMarkStyle} from '@/styles/text/mark/style';
import {getMarkByThreshold} from '@/styles/text/mark/utils';
import {useCalculatePokeInBoxRating} from '@/ui/team/pokebox/content/pokeInBox/hook';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {formatFloat, formatInt} from '@/utils/number';


export const PokeInBoxRating = (props: PokeInBoxCommonProps) => {
  const {result, loading} = useCalculatePokeInBoxRating(props);

  const {percentage, percentile} = result;
  const textMarkStyle = getMarkByThreshold(percentile, ratingMarkThresholdByPr);

  return (
    <Flex direction="row" className={clsx('gap-1.5', textMarkStyle && classOfMarkStyle[textMarkStyle])}>
      <Flex direction="col" center className="gap-1">
        <div>
          {
            loading ?
              <LoadingText dimension="h-4 w-4" text="%"/> :
              isNaN(percentage) ? '-' : `${formatFloat(percentage)}%`
          }
        </div>
        <ProgressBar className="w-full" percent={percentage}/>
      </Flex>
      <Flex direction="col" center className="gap-1">
        <div>
          {
            loading ?
              <LoadingText dimension="h-4 w-4" text="PR"/> :
              isNaN(percentile) ? '-' : <>{formatInt(percentile)}<sup>th</sup></>
          }
        </div>
        <ProgressBar className="w-full" percent={percentile}/>
      </Flex>
    </Flex>
  );
};
