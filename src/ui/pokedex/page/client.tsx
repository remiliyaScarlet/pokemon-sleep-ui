'use client';
import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {PokemonBranches} from '@/ui/pokedex/page/branch/main';
import {PokemonEvolution} from '@/ui/pokedex/page/evolution/main';
import {PokemonMeta} from '@/ui/pokedex/page/meta/main';
import {PokemonProduction} from '@/ui/pokedex/page/production/main';
import {PokemonSleepStyles} from '@/ui/pokedex/page/sleepStyle/main';
import {PokemonProps} from '@/ui/pokedex/page/type';


export const PokemonClient = (props: PokemonProps) => {
  const {pokemonBranches} = props;

  const pokemonLinkPopup = usePokemonLinkPopup();

  return (
    <>
      <PokemonLinkPopup {...pokemonLinkPopup}/>
      <PokemonMeta {...props}/>
      <AdsUnit/>
      <PokemonProduction {...props}/>
      <AdsUnit/>
      <PokemonEvolution {...pokemonLinkPopup} {...props}/>
      {pokemonBranches && <AdsUnit/>}
      <PokemonBranches {...pokemonLinkPopup} {...props}/>
      <AdsUnit/>
      <PokemonSleepStyles {...props}/>
    </>
  );
};
