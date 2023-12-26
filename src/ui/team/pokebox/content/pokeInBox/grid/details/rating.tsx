import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {RatingRelativeStrength} from '@/components/shared/pokemon/rating/units/relativeStrength';
import {PokeInBoxRatingStats} from '@/ui/team/pokebox/content/pokeInBox/common/rating/main';
import {useCalculatePokeInBoxRating} from '@/ui/team/pokebox/content/pokeInBox/hook';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';


export const PokeInBoxGridRating = (props: PokeInBoxCommonProps) => {
  const ratingReturn = useCalculatePokeInBoxRating(props);

  const {baseDiffPercent} = ratingReturn.result;

  return (
    <Flex>
      <RatingRelativeStrength baseDiffPercent={baseDiffPercent}/>
      <PokeInBoxRatingStats {...ratingReturn}/>
    </Flex>
  );
};
