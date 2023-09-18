import React from 'react';

import {Flex} from '@/components/layout/flex';
import {Popup} from '@/components/popup';
import {RatingResult} from '@/components/shared/pokemon/rating/main';
import {RatingPopupControl, RatingResultProps} from '@/components/shared/pokemon/rating/type';
import {Optional} from '@/utils/type';


type Props = Optional<Omit<RatingResultProps, 'request'>, 'pokemon' | 'pokemonProducingParams'> & {
  ratingControl: RatingPopupControl,
};

export const RatingResultPopup = ({ratingControl, pokemon, pokemonProducingParams, ...props}: Props) => {
  const {state, setState} = ratingControl;

  return (
    <Popup show={state.show} setShow={(show) => setState((original) => ({...original, show}))}>
      <Flex direction="col" noFullWidth className="sm:w-[90vw]">
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
