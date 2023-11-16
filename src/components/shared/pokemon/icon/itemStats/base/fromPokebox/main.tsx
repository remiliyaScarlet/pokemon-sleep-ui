import React from 'react';

import {
  PokemonItemStatsFromPokeboxContent,
} from '@/components/shared/pokemon/icon/itemStats/base/fromPokebox/content';
import {PokemonItemStatsFromPokeboxLayout} from '@/components/shared/pokemon/icon/itemStats/base/fromPokebox/layout';
import {
  PokemonItemStatsFromPokeboxCommonProps,
} from '@/components/shared/pokemon/icon/itemStats/base/fromPokebox/type';
import {UserDataLazyLoad} from '@/components/shared/userData/lazyLoad';


export const PokemonItemStatsFromPokebox = (
  props: Omit<PokemonItemStatsFromPokeboxCommonProps, 'pokeInBoxList'>,
) => {
  const {filter} = props;

  return (
    <PokemonItemStatsFromPokeboxLayout>
      <UserDataLazyLoad
        options={{
          type: 'pokeboxWithFilter',
          opts: filter.external,
        }}
        loadingText="Pokebox"
        content={(data, session) => (
          <PokemonItemStatsFromPokeboxContent
            session={session}
            pokeInBoxList={data?.pokeboxWithFilter ?? []}
            {...props}
          />
        )}
      />
    </PokemonItemStatsFromPokeboxLayout>
  );
};
