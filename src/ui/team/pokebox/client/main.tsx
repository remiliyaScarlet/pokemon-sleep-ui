'use client';
import React from 'react';

import {UserDataLazyLoadPokeboxSorted} from '@/components/shared/userData/lazyLoad/pokeboxSorted';
import {PokeboxLoadedClient} from '@/ui/team/pokebox/client/loaded';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';


export const PokeboxClient = (props: PokeboxCommonProps) => {
  return (
    <UserDataLazyLoadPokeboxSorted
      render={(pokeInBoxList) => <PokeboxLoadedClient pokeInBoxList={pokeInBoxList} {...props}/>}
    />
  );
};
