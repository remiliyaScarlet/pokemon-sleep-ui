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

  return (
    <button key={userId} className="button-clickable-bg truncate p-2" onClick={() => control.showActivation(data)}>
      {button}
    </button>
  );
};
