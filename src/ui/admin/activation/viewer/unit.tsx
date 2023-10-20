import React from 'react';

import {clsx} from 'clsx';

import {ActivationDataAtClient} from '@/types/mongo/activation';
import {ActivationUiControl} from '@/ui/admin/activation/type';
import {isExpiringSoon} from '@/ui/admin/activation/utils';


type Props = {
  data: ActivationDataAtClient,
  control: ActivationUiControl,
  button: React.ReactNode,
};

export const ActivationUnit = ({data, control, button}: Props) => {
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
