import React from 'react';

import BeakerIcon from '@heroicons/react/24/outline/BeakerIcon';
import HandThumbDownIcon from '@heroicons/react/24/outline/HandThumbDownIcon';
import HandThumbUpIcon from '@heroicons/react/24/outline/HandThumbUpIcon';
import {clsx} from 'clsx';

import {CollapsibleFull} from '@/components/layout/collapsible/full';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {LazyLoad} from '@/components/layout/lazyLoad';
import {ProgressBar} from '@/components/progressBar';
import {PokemonDataIcon} from '@/components/shared/pokemon/dataIcon';
import {ratingMarkThresholdByPr} from '@/components/shared/pokemon/rating/const';
import {RatingDataPointUI} from '@/components/shared/pokemon/rating/point';
import {PokemonRatingRelativeStrength} from '@/components/shared/pokemon/rating/relativeStrength';
import {RatingResultProps} from '@/components/shared/pokemon/rating/type';
import {useRatingWorker} from '@/hooks/rating/hook';
import {classOfMarkStyle} from '@/styles/text/mark/style';
import {getMarkByThreshold} from '@/styles/text/mark/utils';
import {PokemonKeyLevel} from '@/types/game/pokemon/level';
import {formatFloat, formatInt} from '@/utils/number';


type Props = Omit<RatingResultProps, 'pokemonMaxLevel'> & {
  level: PokemonKeyLevel,
};

export const RatingResultOfLevelUI = ({
  request,
  level,
  pokemon,
  pokemonProducingParams,
  berryDataMap,
  ingredientChainMap,
  ingredientMap,
  subSkillMap,
}: Props) => {
  const [loading, setLoading] = React.useState(false);
  const collapsible = useCollapsible();
  const {result, resetResult, rate} = useRatingWorker({
    setLoading,
    opts: {
      level,
      pokemon,
      pokemonProducingParams,
      berryDataMap,
      subSkillMap,
      ingredientChainMap,
      ingredientMap,
    },
  });

  React.useEffect(() => {
    resetResult();
  }, [request]);

  React.useEffect(() => {
    if (!request) {
      return;
    }

    rate(request.setup);
  }, [request?.timestamp]);

  const {
    samples,
    rank,
    percentage,
    percentile,
    baseDiffPercent,
    points,
  } = result;
  const textMarkStyle = getMarkByThreshold(percentile, ratingMarkThresholdByPr);

  return (
    <LazyLoad loading={loading} loadingFullHeight className="info-section relative gap-3">
      <Flex direction="row" className={clsx('gap-0.5', textMarkStyle && classOfMarkStyle[textMarkStyle])}>
        <Flex direction="col" center noFullWidth>
          <PokemonDataIcon src="/images/generic/lv.png" alt="Lv" invert dimension="h-10 w-10"/>
          <div className="text-xl">{level}</div>
        </Flex>
        <Flex direction="col" className="gap-3">
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
          <Flex direction="col">
            <ProgressBar percent={percentile}/>
          </Flex>
          <Flex direction="row" className="items-end justify-center gap-1.5">
            <Flex direction="row" className="items-end justify-center gap-1">
              <div className="text-4xl">{rank ? formatInt(rank) : '-'}</div>
              <div>/</div>
              <div>{isNaN(samples) ? '-' : formatInt(samples)}</div>
            </Flex>
            <div className="text-2xl">
              {isNaN(percentage) ? '-' : `${formatFloat(percentage)}%`}
            </div>
          </Flex>
          <Flex direction="col">
            <ProgressBar percent={percentage}/>
          </Flex>
        </Flex>
      </Flex>
      <CollapsibleFull state={collapsible} disabled={!points.min && !points.current && !points.max} button={
        <Flex direction="row" center className="gap-1">
          <div className="h-6 w-6">
            <HandThumbDownIcon/>
          </div>
          <div className="h-6 w-6">
            <HandThumbUpIcon/>
          </div>
        </Flex>
      }>
        <Grid className="grid-rows-3 gap-1.5">
          <RatingDataPointUI
            point={points.max}
            subSkillMap={subSkillMap}
            icon={<HandThumbUpIcon/>}
            className="bg-green-500/10"
          />
          <RatingDataPointUI
            point={points.current}
            subSkillMap={subSkillMap}
            icon={<BeakerIcon/>}
            className="bg-slate-500/10"
          />
          <RatingDataPointUI
            point={points.min}
            subSkillMap={subSkillMap}
            icon={<HandThumbDownIcon/>}
            className="bg-red-500/10"
          />
        </Grid>
      </CollapsibleFull>
    </LazyLoad>
  );
};
