import React from 'react';

import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import QuestionMarkCircleIcon from '@heroicons/react/24/solid/QuestionMarkCircleIcon';

import {PokemonIngredientType} from '@/types/mongo/pokemon';


type Props = {
  type: PokemonIngredientType,
};

export const PokemonIngredientTypeIcon = ({type}: Props) => {
  if (type === 'fixed') {
    return <LockClosedIcon/>;
  }

  if (type === 'random') {
    return <QuestionMarkCircleIcon/>;
  }
};
