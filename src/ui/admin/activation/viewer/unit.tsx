import React from 'react';

import {clsx} from 'clsx';

import {ActivationInfo} from '@/types/mongo/activation';
import {ActivationUiControl} from '@/ui/admin/activation/type';
import {isExpiringSoon} from '@/ui/admin/activation/utils';


type Props = {
  activationInfo: ActivationInfo,
  control: ActivationUiControl,
  button: React.ReactNode,
};

export const ActivationUnit = ({activationInfo, control, button}: Props) => {
  const {data} = activationInfo;
  const {showActivation} = control;

  return (
    <button type="button" onClick={() => showActivation(activationInfo)} className={clsx(
      'truncate p-2',
      isExpiringSoon({data, now: new Date()}) ? 'button-clickable button-warn-bg' : 'button-clickable-bg',
    )}>
      {button}
    </button>
  );
};
