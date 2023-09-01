import React from 'react';

import {Flex} from '@/components/layout/flex';
import {Popup} from '@/components/popup';
import {RatingResult} from '@/components/shared/pokemon/rating/main';
import {RatingPopupControl, RatingResultProps} from '@/components/shared/pokemon/rating/type';


type Props = Omit<RatingResultProps, 'request'> & {
  ratingControl: RatingPopupControl,
};

export const RatingResultPopup = ({ratingControl, ...props}: Props) => {
  const {state, setState} = ratingControl;

  return (
    <Popup show={state.show} setShow={(show) => setState((original) => ({...original, show}))}>
      <Flex direction="col" noFullWidth className="sm:w-[90vw]">
        <RatingResult request={state.request} {...props}/>
      </Flex>
    </Popup>
  );
};
