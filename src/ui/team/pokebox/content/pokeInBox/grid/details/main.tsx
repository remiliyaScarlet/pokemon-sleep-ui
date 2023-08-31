import React from 'react';

import {PokeInBoxInfo} from '@/ui/team/pokebox/content/pokeInBox/grid/details/info';
import {PokeInBoxProductionBerry} from '@/ui/team/pokebox/content/pokeInBox/grid/details/productionBerry';
import {
  PokeInBoxProductionIngredient,
} from '@/ui/team/pokebox/content/pokeInBox/grid/details/productionIngredient';
import {PokeInBoxProductionTotal} from '@/ui/team/pokebox/content/pokeInBox/grid/details/productionTotal';
import {PokeInBoxRating} from '@/ui/team/pokebox/content/pokeInBox/grid/details/rating';
import {PokeInBoxSkills} from '@/ui/team/pokebox/content/pokeInBox/grid/details/skills';
import {PokeInBoxStats} from '@/ui/team/pokebox/content/pokeInBox/grid/details/stats';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';


export const PokeInBoxDetails = (props: PokeInBoxCommonProps) => {
  const {displayType} = props;

  if (displayType === 'productionTotal') {
    return <PokeInBoxProductionTotal {...props}/>;
  }

  if (displayType === 'productionBerry') {
    return <PokeInBoxProductionBerry {...props}/>;
  }

  if (displayType === 'productionIngredient') {
    return <PokeInBoxProductionIngredient {...props}/>;
  }

  if (displayType === 'rating') {
    return <PokeInBoxRating {...props}/>;
  }

  if (displayType === 'skills') {
    return <PokeInBoxSkills {...props}/>;
  }

  if (displayType === 'stats') {
    return <PokeInBoxStats {...props}/>;
  }

  if (displayType === 'info') {
    return <PokeInBoxInfo {...props}/>;
  }

  console.error(`Unhandled Pokebox poke-in-box details display type: ${displayType satisfies never}`);
};
