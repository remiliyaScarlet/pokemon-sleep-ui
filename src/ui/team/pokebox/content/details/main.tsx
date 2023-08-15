import React from 'react';

import {PokeboxPokeInBoxInfo} from '@/ui/team/pokebox/content/details/info';
import {PokeboxPokeInBoxProducing} from '@/ui/team/pokebox/content/details/production';
import {PokeboxPokeInBoxSkills} from '@/ui/team/pokebox/content/details/skills';
import {PokeboxPokeInBoxStats} from '@/ui/team/pokebox/content/details/stats';
import {PokeboxPokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';


export const PokeboxPokeInBoxDetails = (props: PokeboxPokeInBoxCommonProps) => {
  const {displayType} = props;

  if (displayType === 'production') {
    return <PokeboxPokeInBoxProducing {...props}/>;
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
