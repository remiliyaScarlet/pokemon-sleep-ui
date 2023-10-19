import React from 'react';

import {clsx} from 'clsx';

import {UserActivationDataAtClient} from '@/types/mongo/activation';
import {UserActivationUiControl} from '@/ui/admin/activation/type';
import {isExpiringSoon} from '@/ui/admin/activation/utils';


type Props = {
  data: UserActivationDataAtClient,
  control: UserActivationUiControl,
  button: React.ReactNode,
};

export const UserActivationUnit = ({data, control, button}: Props) => {
  const {userId} = data;
  const {showActivation} = control;

  return (
    <button key={userId} onClick={() => showActivation(data)} className={clsx(
      'truncate p-2',
      isExpiringSoon({data, now: new Date()}) ? 'button-clickable button-warn-bg' : 'button-clickable-bg',
    )}>
      {button}
    </button>
  );
};
