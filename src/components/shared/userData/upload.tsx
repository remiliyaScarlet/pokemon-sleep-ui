import React from 'react';

import {ClickableIconButton} from '@/components/shared/common/button/clickable';
import {actionStatusIcon} from '@/components/shared/userData/const';
import {useUserDataActor} from '@/hooks/userData/actor';
import {UserDataUploadOpts} from '@/types/userData/upload';


type Props = {
  opts: UserDataUploadOpts,
};

export const UserDataUploadButton = ({opts}: Props) => {
  const {act, status} = useUserDataActor();

  return (
    <ClickableIconButton
      disabled={!act || status === 'processing'}
      onClick={() => act ? act({action: 'upload', options: opts}) : undefined}
    >
      {actionStatusIcon[status]}
    </ClickableIconButton>
  );
};
