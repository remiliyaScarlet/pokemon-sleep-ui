import React from 'react';

import {ClickableIconButton} from '@/components/shared/common/button/clickable';
import {actionStatusIcon} from '@/components/shared/userData/const';
import {useUserDataActor} from '@/hooks/userData/actor/main';
import {UserDataActionStatus} from '@/types/userData/main';
import {UserDataUploadOpts} from '@/types/userData/upload';


type Props = {
  opts: UserDataUploadOpts,
  isSubmit?: false,
  statusOverride?: never,
} | {
  opts?: never,
  isSubmit: true,
  statusOverride: UserDataActionStatus,
};

export const UserDataUploadButton = ({opts, isSubmit, statusOverride}: Props) => {
  const {act, status} = useUserDataActor();

  return (
    <ClickableIconButton disabled={!act || status === 'processing'} isSubmit={isSubmit} onClick={() => {
      if (isSubmit || !act) {
        return;
      }

      act({action: 'upload', options: opts});
    }}>
      {actionStatusIcon[statusOverride ?? status]}
    </ClickableIconButton>
  );
};
