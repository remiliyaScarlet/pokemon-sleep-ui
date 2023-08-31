import React from 'react';

import {PokeInBoxGrid} from '@/ui/team/pokebox/content/pokeInBox/grid/main';
import {PokeInBoxTable} from '@/ui/team/pokebox/content/pokeInBox/table/main';
import {PokeInBoxViewCommonProps} from '@/ui/team/pokebox/content/pokeInBox/type';


export const PokeInBoxView = (props: PokeInBoxViewCommonProps) => {
  const {filter} = props;

  if (filter.viewType === 'table') {
    return <PokeInBoxTable {...props}/>;
  }

  if (filter.viewType === 'grid') {
    return <PokeInBoxGrid {...props}/>;
  }

  console.error(`Unhandled view type of Pokebox view: ${filter.viewType satisfies never}`);
};
