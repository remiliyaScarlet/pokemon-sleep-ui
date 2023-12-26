import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {ProgressBar} from '@/components/progressBar';
import {LevelIcon} from '@/components/shared/icon/lv';
import {ratingMarkThresholdByPr} from '@/components/shared/pokemon/rating/const';
import {PokemonRatingRelativeStrength} from '@/components/shared/pokemon/rating/units/relativeStrength';
import {classOfMarkStyle} from '@/styles/text/mark/style';
import {getMarkByThreshold} from '@/styles/text/mark/utils';
import {RatingResultOfLevel} from '@/types/game/pokemon/rating';
import {formatFloat, formatInt, formatToAbbreviation} from '@/utils/number/format';


type Props = {
  level: number,
  result: RatingResultOfLevel,
};

export const RatingResultUI = ({level, result}: Props) => {
  const {
    samples,
    rank,
    percentage,
    percentile,
    baseDiffPercent,
  } = result;
  const textMarkStyle = getMarkByThreshold(percentile, ratingMarkThresholdByPr);

  return (
    <Flex direction="row" className={clsx('gap-0.5', textMarkStyle && classOfMarkStyle[textMarkStyle])}>
      <Flex center noFullWidth>
        <LevelIcon dimension="h-10 w-10"/>
        <div className="text-xl">{level}</div>
      </Flex>
      <Flex className="gap-3">
        <Flex direction="row" className="items-end justify-center gap-1.5">
          <Flex direction="row" className="items-end justify-center gap-1 text-6xl">
            {isNaN(percentile) ? '-' : <><span className="text-2xl">PR</span>{formatInt(percentile)}</>}
          </Flex>
          <PokemonRatingRelativeStrength
            baseDiffPercent={baseDiffPercent}
            iconDimension="h-7 w-7"
            className="text-2xl"
          />
        </Flex>
        <Flex>
          <ProgressBar percent={percentile}/>
        </Flex>
        <Flex direction="row" className="items-end justify-center gap-1.5">
          <Flex direction="row" className="items-end justify-center gap-1">
            <div className="text-2xl">{rank ? formatInt(rank) : '-'}</div>
            <div>/</div>
            <div className="whitespace-nowrap">
              {isNaN(samples) ? '-' : formatToAbbreviation({num: samples})}
            </div>
          </Flex>
          <div className="text-xl">
            {isNaN(percentage) ? '-' : `${formatFloat(percentage)}%`}
          </div>
        </Flex>
        <Flex>
          <ProgressBar percent={percentage}/>
        </Flex>
      </Flex>
    </Flex>
  );
};
