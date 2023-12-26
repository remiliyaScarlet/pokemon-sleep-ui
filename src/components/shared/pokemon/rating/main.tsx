import React from 'react';

import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import {useTranslations} from 'next-intl';

import {AdsUnit} from '@/components/ads/main';
import {FilterTextInput} from '@/components/input/filter/preset/text';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {useRatingResult} from '@/components/shared/pokemon/rating/hook';
import {RatingResultOfLevelUI} from '@/components/shared/pokemon/rating/single';
import {RatingResultProps} from '@/components/shared/pokemon/rating/type';
import {RatingResultTitle} from '@/components/shared/pokemon/rating/units/title';
import {RatingWeightedStatsUI} from '@/components/shared/pokemon/rating/units/weightedStats';
import {defaultRatingWeight, ratingWeightedStatsBasisI18nId} from '@/const/game/rating';
import {ratingWeightedStatsBasis, RatingWeightedStatsBasis} from '@/types/game/pokemon/rating';
import {getRatingWeightedStats} from '@/utils/game/rating/result/weighted';


const RatingResultInternal = ({
  pokemonMaxLevel,
  ...props
}: RatingResultProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  const {request} = props;

  const [basis, setBasis] = React.useState<RatingWeightedStatsBasis>('percentile');
  const {
    validKeyLevels,
    resultMap,
    updateResultOfLevel,
  } = useRatingResult({pokemonMaxLevel, request});
  const t = useTranslations('UI.Rating.WeightedStatsBasis');

  const weightedStats = getRatingWeightedStats({
    activeKeyLevels: validKeyLevels,
    result: resultMap,
    weight: defaultRatingWeight,
  });

  return (
    <Flex className="gap-2">
      <AdsUnit/>
      <FilterTextInput
        title={
          <Flex center>
            <ChartBarIcon className="h-6 w-6"/>
          </Flex>
        }
        onClick={(basis) => setBasis(basis)}
        isActive={(current) => current === basis}
        ids={[...ratingWeightedStatsBasis]}
        idToText={(basis) => t(ratingWeightedStatsBasisI18nId[basis])}
      />
      <Flex className="items-center gap-1.5 md:flex-row">
        <Flex>
          <RatingResultTitle {...props}/>
        </Flex>
        <Flex>
          <RatingWeightedStatsUI stats={weightedStats} basis={basis}/>
        </Flex>
      </Flex>
      <Grid ref={ref} className="grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
        {validKeyLevels.map((level) => {
          const result = resultMap[level];

          if (!result) {
            return null;
          }

          return (
            <RatingResultOfLevelUI
              key={level}
              level={level}
              result={result}
              onRated={updateResultOfLevel}
              {...props}
            />
          );
        })}
      </Grid>
    </Flex>
  );
};

export const RatingResult = React.forwardRef(RatingResultInternal);
