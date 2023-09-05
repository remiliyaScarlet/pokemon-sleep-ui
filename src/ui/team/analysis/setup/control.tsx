import React from 'react';

import RectangleStackIcon from '@heroicons/react/24/outline/RectangleStackIcon';
import {useSession} from 'next-auth/react';

import {InputRow} from '@/components/input/filter/row';
import {ClickableIconButton} from '@/components/shared/common/button/clickable';
import {UserDataUploadButton} from '@/components/shared/userData/upload';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {TeamAnalysisSetup} from '@/ui/team/analysis/type';


type Props = {
  setup: TeamAnalysisSetup,
  snorlaxFavorite: SnorlaxFavorite,
};

export const TeamAnalysisSetupControl = ({setup, snorlaxFavorite}: Props) => {
  const {status} = useSession();

  return (
    <InputRow className="justify-end gap-2">
      <ClickableIconButton onClick={() => void 0} disabled={status !== 'authenticated'}>
        <RectangleStackIcon/>
      </ClickableIconButton>
      <UserDataUploadButton opts={{type: 'teamAnalysisSetup', data: {...setup, snorlaxFavorite}}}/>
    </InputRow>
  );
};
