import React from 'react';

import {Grid} from '@/components/layout/grid';
import {RatingResultOfLevelUI} from '@/components/shared/pokemon/rating/single';
import {RatingResultProps} from '@/components/shared/pokemon/rating/type';
import {ratingKeyLevels} from '@/types/game/pokemon/rating';


export const RatingResult = React.forwardRef<HTMLDivElement, RatingResultProps>(({
  pokemonMaxLevel,
  ...props
}, ref) => {
  return (
    <Grid ref={ref} className="grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
      {ratingKeyLevels
        .filter((level) => level <= pokemonMaxLevel)
        .sort((a, b) => a - b)
        .map((level) => (
          <RatingResultOfLevelUI key={level} level={level} {...props}/>
        ))}
    </Grid>
  );
});

RatingResult.displayName = 'RatingResult';
