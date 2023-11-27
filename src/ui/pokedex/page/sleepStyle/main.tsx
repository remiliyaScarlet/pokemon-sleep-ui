import React from 'react';

import {UserDataLazyLoad} from '@/components/shared/userData/lazyLoad';
import {PokemonSleepStylesLoaded} from '@/ui/pokedex/page/sleepStyle/loaded';
import {PokemonDataProps} from '@/ui/pokedex/page/type';


export const PokemonSleepStyles = (props: PokemonDataProps) => {
  const {pokemon} = props;

  return (
    <UserDataLazyLoad
      options={{type: 'sleepdexOfPokemon', opts: {pokemonId: pokemon.id}}}
      loadingText="Sleepdex"
      content={(data) => (
        <PokemonSleepStylesLoaded
          initialSleepdex={data?.sleepdexOfPokemon ?? {}}
          {...props}
        />
      )}
    />
  );
};
