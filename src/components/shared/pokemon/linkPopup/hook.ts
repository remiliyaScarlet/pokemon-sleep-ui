import React from 'react';

import {PokemonLinkPopupState} from '@/components/shared/pokemon/linkPopup/type';
import {PokemonInfo} from '@/types/mongo/pokemon';


export const usePokemonLinkPopup = () => {
  const [state, setState] = React.useState<PokemonLinkPopupState>({
    show: false,
    pokemon: null,
  });

  const showPokemon = (pokemon: PokemonInfo) => setState({show: true, pokemon});

  return {state, setState, showPokemon};
};
