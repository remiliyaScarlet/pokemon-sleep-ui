import React from 'react';

import {PokeInBoxFrequencyInGrid} from '@/ui/team/pokebox/content/pokeInBox/grid/details/frequency';
import {PokeInBoxInfo} from '@/ui/team/pokebox/content/pokeInBox/grid/details/info';
import {PokeInBoxMaxCarryInGrid} from '@/ui/team/pokebox/content/pokeInBox/grid/details/maxCarry';
import {PokeInBoxProductionBerry} from '@/ui/team/pokebox/content/pokeInBox/grid/details/productionBerry';
import {PokeInBoxProductionIngredient} from '@/ui/team/pokebox/content/pokeInBox/grid/details/productionIngredient';
import {PokeInBoxProductionTotal} from '@/ui/team/pokebox/content/pokeInBox/grid/details/productionTotal';
import {PokeInBoxRating} from '@/ui/team/pokebox/content/pokeInBox/grid/details/rating';
import {PokeInBoxSkills} from '@/ui/team/pokebox/content/pokeInBox/grid/details/skills';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';


type Props = PokeInBoxCommonProps & {
  displayType: PokeboxViewerDisplay['displayOfGrid'],
};

export const PokeInBoxDetails = (props: Props) => {
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

  if (displayType === 'frequency') {
    return <PokeInBoxFrequencyInGrid {...props}/>;
  }

  if (displayType === 'maxCarry') {
    return <PokeInBoxMaxCarryInGrid {...props}/>;
  }

  if (displayType === 'info') {
    return <PokeInBoxInfo {...props}/>;
  }

  console.error(`Unhandled Pokebox poke-in-box details display type: ${displayType satisfies never}`);
};
