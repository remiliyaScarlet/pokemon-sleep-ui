import React from 'react';

import {UserDataUploadControlRow} from '@/components/shared/userData/upload';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {TeamAnalysisSetup} from '@/ui/team/analysis/type';


type Props = {
  setup: TeamAnalysisSetup,
  snorlaxFavorite: SnorlaxFavorite,
};

export const TeamAnalysisUploadSetup = ({setup, snorlaxFavorite}: Props) => {
  return <UserDataUploadControlRow opts={{type: 'teamAnalysisSetup', data: {...setup, snorlaxFavorite}}}/>;
};
