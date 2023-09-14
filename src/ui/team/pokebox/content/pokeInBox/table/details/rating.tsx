import React from 'react';

import {Flex} from '@/components/layout/flex';
import {PokeInBoxTableDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/table/details/type';
import {PokeInBoxRatingInRow} from '@/ui/team/pokebox/content/pokeInBox/table/rating';


export const PokeInBoxTableRating = (props: PokeInBoxTableDetailsProps) => {
  return (
    <Flex direction="col" noFullWidth className="w-52">
      <PokeInBoxRatingInRow {...props}/>
    </Flex>
  );
};
