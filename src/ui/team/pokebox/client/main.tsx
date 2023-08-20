'use client';
import React from 'react';

import {UserDataLazyLoad} from '@/components/shared/userData/lazyLoad';
import {PokeboxLoadedClient} from '@/ui/team/pokebox/client/loaded';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';


export const PokeboxClient = (props: PokeboxCommonProps) => {
  return (
    <UserDataLazyLoad
      type="pokebox"
      loadingText="Pokebox"
      content={(data) => (
        <PokeboxLoadedClient initialPokebox={data?.pokebox ?? {}} {...props}/>
      )}
    />
  );
};
