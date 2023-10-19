import React from 'react';

import {UserActivationDataAtClient} from '@/types/mongo/activation';
import {UserActivationUiControl} from '@/ui/admin/activation/type';


type Props = {
  data: UserActivationDataAtClient,
  control: UserActivationUiControl,
  button: React.ReactNode,
};

export const UserActivationUnit = ({data, control, button}: Props) => {
  const {userId} = data;
  const {showActivation} = control;

  return (
    <button key={userId} className="button-clickable-bg truncate p-2" onClick={() => showActivation(data)}>
      {button}
    </button>
  );
};
