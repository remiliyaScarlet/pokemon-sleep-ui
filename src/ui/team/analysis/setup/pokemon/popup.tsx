import React from 'react';

import {Popup} from '@/components/popup';
import {RatingResultPopup} from '@/components/shared/pokemon/rating/popup';
import {RatingPopupControl} from '@/components/shared/pokemon/rating/type';
import {TeamAnalysisPokemonMemberConfig} from '@/ui/team/analysis/setup/pokemon/config';
import {TeamAnalysisPokemonProps} from '@/ui/team/analysis/setup/pokemon/type';


type Props = TeamAnalysisPokemonProps & {
  showMemberConfig: boolean,
  setShowMemberConfig: React.Dispatch<React.SetStateAction<boolean>>,
  ratingControl: RatingPopupControl,
};

export const TeamAnalysisPokemonPopup = ({
  showMemberConfig,
  setShowMemberConfig,
  ratingControl,
  ...props
}: Props) => {
  return (
    <>
      <Popup show={showMemberConfig} setShow={setShowMemberConfig}>
        <TeamAnalysisPokemonMemberConfig {...props}/>
      </Popup>
      <RatingResultPopup ratingControl={ratingControl} {...props}/>
    </>
  );
};
