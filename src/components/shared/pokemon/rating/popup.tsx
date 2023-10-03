import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {Popup} from '@/components/popup';
import {RatingResult} from '@/components/shared/pokemon/rating/main';
import {RatingPopupControl, RatingResultProps} from '@/components/shared/pokemon/rating/type';


type Props = Omit<RatingResultProps, 'request'> & {
  ratingControl: RatingPopupControl,
};

export const RatingResultPopup = ({ratingControl, pokemon, pokemonProducingParams, ...props}: Props) => {
  const {state, setState} = ratingControl;

  return (
    <Popup show={state.show} setShow={(show) => setState((original) => ({...original, show}))}>
      <Flex noFullWidth className="sm:w-[90vw]">
        {
          pokemon && pokemonProducingParams &&
          <RatingResult
            request={state.request}
            pokemon={pokemon}
            pokemonProducingParams={pokemonProducingParams}
            {...props}
          />
        }
      </Flex>
    </Popup>
  );
};
