import React from 'react';

import {PokemonLinkPopupState, UsePokemonLinkPopupReturn} from '@/components/shared/pokemon/linkPopup/type';


export const usePokemonLinkPopup = (): UsePokemonLinkPopupReturn => {
  const [state, setState] = React.useState<PokemonLinkPopupState>({
    show: false,
    pokemon: null,
  });

  return {
    state,
    setState,
    showPokemon: (pokemon) => setState({show: true, pokemon}),
  };
};
