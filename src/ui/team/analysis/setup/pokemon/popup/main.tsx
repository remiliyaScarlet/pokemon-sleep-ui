import React from 'react';

import {Popup} from '@/components/popup';
import {RatingResultPopup} from '@/components/shared/pokemon/rating/popup';
import {TeamAnalysisPokemonPopupContent} from '@/ui/team/analysis/setup/pokemon/popup/content';
import {TeamAnalysisPokemonPopupCommonProps} from '@/ui/team/analysis/setup/pokemon/popup/type';


export const TeamAnalysisPokemonPopup = (props: TeamAnalysisPokemonPopupCommonProps) => {
  const {state} = props;
  const {control, hide} = state;

  return (
    <>
      <Popup show={control.show} setShow={hide}>
        <TeamAnalysisPokemonPopupContent {...props}/>
      </Popup>
      <RatingResultPopup {...props}/>
    </>
  );
};
