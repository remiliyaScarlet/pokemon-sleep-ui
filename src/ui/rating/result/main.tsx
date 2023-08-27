import React from 'react';

import {Grid} from '@/components/layout/grid';
import {RatingResultOfLevelUI} from '@/ui/rating/result/single';
import {ratingKeyLevels, RatingResultUiProps} from '@/ui/rating/result/type';


export const RatingResultUI = React.forwardRef<HTMLDivElement, RatingResultUiProps>(({
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

RatingResultUI.displayName = 'RatingResultUI';
