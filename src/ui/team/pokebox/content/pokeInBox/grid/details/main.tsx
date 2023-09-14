import React from 'react';

import {PokeInBoxGridFrequency} from '@/ui/team/pokebox/content/pokeInBox/grid/details/frequency';
import {PokeInBoxGridInfo} from '@/ui/team/pokebox/content/pokeInBox/grid/details/info';
import {PokeInBoxGridMaxCarry} from '@/ui/team/pokebox/content/pokeInBox/grid/details/maxCarry';
import {PokeInBoxGridProductionBerry} from '@/ui/team/pokebox/content/pokeInBox/grid/details/productionBerry';
import {
  PokeInBoxGridProductionIngredient,
} from '@/ui/team/pokebox/content/pokeInBox/grid/details/productionIngredient';
import {PokeInBoxGridProductionTotal} from '@/ui/team/pokebox/content/pokeInBox/grid/details/productionTotal';
import {PokeInBoxGridRating} from '@/ui/team/pokebox/content/pokeInBox/grid/details/rating';
import {PokeInBoxGridSkills} from '@/ui/team/pokebox/content/pokeInBox/grid/details/skills';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';


type Props = PokeInBoxCommonProps & {
  displayType: PokeboxViewerDisplay['displayOfGrid'],
};

export const PokeInBoxDetails = (props: Props) => {
  const {displayType} = props;

  if (displayType === 'productionTotal') {
    return <PokeInBoxGridProductionTotal {...props}/>;
  }

  if (displayType === 'productionBerry') {
    return <PokeInBoxGridProductionBerry {...props}/>;
  }

  if (displayType === 'productionIngredient') {
    return <PokeInBoxGridProductionIngredient {...props}/>;
  }

  if (displayType === 'rating') {
    return <PokeInBoxGridRating {...props}/>;
  }

  if (displayType === 'skills') {
    return <PokeInBoxGridSkills {...props}/>;
  }

  if (displayType === 'frequency') {
    return <PokeInBoxGridFrequency {...props}/>;
  }

  if (displayType === 'maxCarry') {
    return <PokeInBoxGridMaxCarry {...props}/>;
  }

  if (displayType === 'info') {
    return <PokeInBoxGridInfo {...props}/>;
  }

  console.error(`Unhandled Pokebox poke-in-box details display type: ${displayType satisfies never}`);
};
