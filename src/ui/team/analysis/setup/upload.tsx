import React from 'react';

import {UserDataUploadControlRow} from '@/components/shared/userData/upload';
import {SnorlaxFavorite, TeamAnalysisTeamSetup} from '@/ui/team/analysis/type';


type Props = {
  setup: TeamAnalysisTeamSetup,
  snorlaxFavorite: SnorlaxFavorite,
};

export const TeamAnalysisUploadSetup = ({setup, snorlaxFavorite}: Props) => {
  return <UserDataUploadControlRow opts={{type: 'teamAnalysisSetup', data: {...setup, snorlaxFavorite}}}/>;
};
