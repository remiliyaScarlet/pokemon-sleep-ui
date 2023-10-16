import React from 'react';

import {PopupCommon} from '@/components/popup/common/main';
import {PokemonLinkPopupContent} from '@/components/shared/pokemon/linkPopup/content';
import {PokemonLinkPopupState} from '@/components/shared/pokemon/linkPopup/type';


type Props = {
  state: PokemonLinkPopupState,
  setState: React.Dispatch<React.SetStateAction<PokemonLinkPopupState>>,
};

export const PokemonLinkPopup = ({state, setState}: Props) => {
  return (
    <PopupCommon show={state.show} setShow={(show) => setState((original) => ({...original, show}))}>
      {state.pokemon && <PokemonLinkPopupContent pokemon={state.pokemon}/>}
    </PopupCommon>
  );
};
