import React from 'react';

import {PokemonRatingRelativeStrength} from '@/components/shared/pokemon/rating/units/relativeStrength';


type Props = {
  baseDiffPercent: number,
};

export const PokeInBoxRelativeStrength = ({baseDiffPercent}: Props) => {
  return <PokemonRatingRelativeStrength baseDiffPercent={baseDiffPercent}/>;
};
