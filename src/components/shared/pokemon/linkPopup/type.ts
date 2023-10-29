import React from 'react';

import {PokemonInfo} from '@/types/game/pokemon';


export type PokemonLinkPopupState = {
  show: boolean,
  pokemon: PokemonInfo | null,
};

export type UsePokemonLinkPopupReturn = {
  state: PokemonLinkPopupState,
  setState: React.Dispatch<React.SetStateAction<PokemonLinkPopupState>>,
  showPokemon: (pokemon: PokemonInfo) => void,
};
