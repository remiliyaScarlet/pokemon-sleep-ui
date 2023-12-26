import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {useRatingResult} from '@/components/shared/pokemon/rating/hook';
import {RatingResultOfLevelUI} from '@/components/shared/pokemon/rating/single';
import {RatingResultTitle} from '@/components/shared/pokemon/rating/title';
import {RatingResultProps} from '@/components/shared/pokemon/rating/type';


const RatingResultInternal = ({
  pokemonMaxLevel,
  ...props
}: RatingResultProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  const {request} = props;

  const {
    validKeyLevels,
    resultMap,
    updateResultOfLevel,
  } = useRatingResult({pokemonMaxLevel, request});

  return (
    <Flex className="gap-2">
      <AdsUnit/>
      <RatingResultTitle {...props}/>
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
