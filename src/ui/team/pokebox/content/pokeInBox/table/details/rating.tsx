import React from 'react';

import {Flex} from '@/components/layout/flex';
import {PokeInBoxRatingStats} from '@/ui/team/pokebox/content/pokeInBox/common/rating/rating';
import {PokeInBoxRelativeStrength} from '@/ui/team/pokebox/content/pokeInBox/common/rating/relativeStrength';
import {useCalculatePokeInBoxRating} from '@/ui/team/pokebox/content/pokeInBox/hook';
import {PokeInBoxTableDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/table/details/type';


export const PokeInBoxTableRating = (props: PokeInBoxTableDetailsProps) => {
  const ratingReturn = useCalculatePokeInBoxRating(props);

  const {baseDiffPercent} = ratingReturn.result;

  return (
    <Flex direction="row" center noFullWidth className="w-72 gap-1.5">
      <PokeInBoxRatingStats {...ratingReturn}/>
      <div className="w-32">
        <PokeInBoxRelativeStrength baseDiffPercent={baseDiffPercent}/>
      </div>
    </Flex>
  );
};
