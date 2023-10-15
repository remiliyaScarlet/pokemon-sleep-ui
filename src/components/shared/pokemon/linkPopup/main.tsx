import React from 'react';

import {Popup} from '@/components/popup';
import {PokemonLinkPopupContent} from '@/components/shared/pokemon/linkPopup/content';
import {PokemonLinkPopupState} from '@/components/shared/pokemon/linkPopup/type';


type Props = {
  state: PokemonLinkPopupState,
  setState: React.Dispatch<React.SetStateAction<PokemonLinkPopupState>>,
};

export const PokemonLinkPopup = ({state, setState}: Props) => {
  return (
    <Popup show={state.show} setShow={(show) => setState((original) => ({...original, show}))}>
      {state.pokemon && <PokemonLinkPopupContent pokemon={state.pokemon}/>}
    </Popup>
  );
};
