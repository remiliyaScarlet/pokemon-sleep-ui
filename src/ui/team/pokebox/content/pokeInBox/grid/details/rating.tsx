import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PokeInBoxRatingStats} from '@/ui/team/pokebox/content/pokeInBox/common/rating/rating';
import {PokeInBoxRelativeStrength} from '@/ui/team/pokebox/content/pokeInBox/common/rating/relativeStrength';
import {useCalculatePokeInBoxRating} from '@/ui/team/pokebox/content/pokeInBox/hook';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';


export const PokeInBoxGridRating = (props: PokeInBoxCommonProps) => {
  const ratingReturn = useCalculatePokeInBoxRating(props);

  const {baseDiffPercent} = ratingReturn.result;

  return (
    <Flex>
      <PokeInBoxRelativeStrength baseDiffPercent={baseDiffPercent}/>
      <PokeInBoxRatingStats {...ratingReturn}/>
    </Flex>
  );
};
