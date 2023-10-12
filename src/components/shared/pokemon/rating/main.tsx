import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {RatingResultOfLevelUI} from '@/components/shared/pokemon/rating/single';
import {RatingResultProps} from '@/components/shared/pokemon/rating/type';
import {pokemonKeyLevels} from '@/types/game/pokemon/level';


const RatingResultInternal = ({
  pokemonMaxLevel,
  ...props
}: RatingResultProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  return (
    <Flex className="gap-2">
      <AdsUnit/>
      <Grid ref={ref} className="grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
        {pokemonKeyLevels
          .filter((level) => level <= pokemonMaxLevel)
          .sort((a, b) => a - b)
          .map((level) => (
            <RatingResultOfLevelUI key={level} level={level} {...props}/>
          ))}
      </Grid>
    </Flex>
  );
};

export const RatingResult = React.forwardRef(RatingResultInternal);
