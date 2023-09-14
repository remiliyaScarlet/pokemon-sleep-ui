import React from 'react';

import {PokeInBoxGridRating} from '@/ui/team/pokebox/content/pokeInBox/grid/details/rating';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';


export const PokeInBoxRatingInRow = (props: PokeInBoxCommonProps) => {
  return <PokeInBoxGridRating {...props}/>;
};
