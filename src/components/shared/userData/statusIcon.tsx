import React from 'react';

import {actionStatusIcon} from '@/components/shared/userData/const';
import {UserDataActionStatus} from '@/types/userData/main';


type Props = {
  status: UserDataActionStatus,
  onWaitingOverride?: React.ReactNode,
};

export const UserActionStatusIcon = ({status, onWaitingOverride}: Props) => {
  if (status === 'waiting' && onWaitingOverride) {
    return onWaitingOverride;
  }

  return actionStatusIcon[status];
};
