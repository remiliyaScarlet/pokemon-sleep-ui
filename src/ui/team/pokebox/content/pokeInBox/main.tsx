import React from 'react';

import {PokeboxContentPokeInBoxGrid} from '@/ui/team/pokebox/content/pokeInBox/grid/main';
import {PokeboxContentPokeInBoxTable} from '@/ui/team/pokebox/content/pokeInBox/table/main';
import {PokeInBoxViewCommonProps} from '@/ui/team/pokebox/content/pokeInBox/type';


export const PokeInBoxView = (props: PokeInBoxViewCommonProps) => {
  const {filter} = props;

  if (filter.viewType === 'table') {
    return <PokeboxContentPokeInBoxTable {...props}/>;
  }

  if (filter.viewType === 'grid') {
    return <PokeboxContentPokeInBoxGrid {...props}/>;
  }

  console.error(`Unhandled view type of Pokebox view: ${filter.viewType satisfies never}`);
};
