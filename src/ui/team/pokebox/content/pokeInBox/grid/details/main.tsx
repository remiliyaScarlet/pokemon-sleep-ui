import React from 'react';

import {PokeboxPokeInBoxInfo} from '@/ui/team/pokebox/content/pokeInBox/grid/details/info';
import {PokeboxPokeInBoxProductionBerry} from '@/ui/team/pokebox/content/pokeInBox/grid/details/productionBerry';
import {PokeboxPokeInBoxProductionIngredient} from '@/ui/team/pokebox/content/pokeInBox/grid/details/productionIngredient';
import {PokeboxPokeInBoxProductionTotal} from '@/ui/team/pokebox/content/pokeInBox/grid/details/productionTotal';
import {PokeboxPokeInBoxSkills} from '@/ui/team/pokebox/content/pokeInBox/grid/details/skills';
import {PokeboxPokeInBoxStats} from '@/ui/team/pokebox/content/pokeInBox/grid/details/stats';
import {PokeboxPokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';


export const PokeboxPokeInBoxDetails = (props: PokeboxPokeInBoxCommonProps) => {
  const {displayType} = props;

  if (displayType === 'productionBerry') {
    return <PokeboxPokeInBoxProductionBerry {...props}/>;
  }

  if (displayType === 'productionIngredient') {
    return <PokeboxPokeInBoxProductionIngredient {...props}/>;
  }

  if (displayType === 'productionTotal') {
    return <PokeboxPokeInBoxProductionTotal {...props}/>;
  }

  if (displayType === 'stats') {
    return <PokeboxPokeInBoxStats {...props}/>;
  }

  if (displayType === 'skills') {
    return <PokeboxPokeInBoxSkills {...props}/>;
  }

  if (displayType === 'info') {
    return <PokeboxPokeInBoxInfo {...props}/>;
  }

  console.error(`Unhandled Pokebox poke-in-box details display type: ${displayType satisfies never}`);
};
