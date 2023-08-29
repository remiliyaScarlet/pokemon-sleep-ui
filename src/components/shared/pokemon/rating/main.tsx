import React from 'react';

import {Grid} from '@/components/layout/grid';
import {PokemonRatingResultOfLevelUI} from '@/components/shared/pokemon/rating/single';
import {PokemonRatingResultProps} from '@/components/shared/pokemon/rating/type';
import {ratingKeyLevels} from '@/types/game/pokemon/rating';


export const PokemonRatingResult = React.forwardRef<HTMLDivElement, PokemonRatingResultProps>(({
  pokemonMaxLevel,
  ...props
}, ref) => {
  return (
    <Grid ref={ref} className="grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
      {ratingKeyLevels
        .filter((level) => level <= pokemonMaxLevel)
        .sort((a, b) => a - b)
        .map((level) => (
          <PokemonRatingResultOfLevelUI key={level} level={level} {...props}/>
        ))}
    </Grid>
  );
});

PokemonRatingResult.displayName = 'PokemonRatingResult';
