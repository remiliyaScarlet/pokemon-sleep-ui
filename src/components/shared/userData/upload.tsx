import React from 'react';

import {ClickableIconButton} from '@/components/shared/common/button/clickable';
import {actionStatusIcon} from '@/components/shared/userData/const';
import {useUserDataActor} from '@/hooks/userData/actor';
import {UserDataUploadOpts} from '@/types/userData/upload';


type Props = {
  opts: UserDataUploadOpts,
  isSubmit?: boolean,
};

export const UserDataUploadButton = ({opts, isSubmit}: Props) => {
  const {act, status} = useUserDataActor();

  return (
    <ClickableIconButton disabled={!act || status === 'processing'} isSubmit={isSubmit} onClick={() => (
      act && act({action: 'upload', options: opts})
    )}>
      {actionStatusIcon[status]}
    </ClickableIconButton>
  );
};
