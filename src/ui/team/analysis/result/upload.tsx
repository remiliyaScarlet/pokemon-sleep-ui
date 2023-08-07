import React from 'react';

import {UserDataUploadControlRow} from '@/components/shared/control/upload';
import {TeamAnalysisTeamSetup} from '@/ui/team/analysis/type';


type Props = {
  setup: TeamAnalysisTeamSetup,
};

export const TeamAnalysisUploadSetup = ({setup}: Props) => {
  return <UserDataUploadControlRow opts={{type: 'teamAnalysisSetup', data: setup}}/>;
};
