import React from 'react';

import {UserActivationDataAtClient} from '@/types/mongo/activation';
import {UseUserActivationPopupReturn} from '@/ui/admin/activation/viewer/popup/type';


type Props = {
  data: UserActivationDataAtClient,
  popup: UseUserActivationPopupReturn,
  button: React.ReactNode,
};

export const UserActivationUnit = ({data, popup, button}: Props) => {
  const {userId} = data;

  return (
    <button key={userId} className="button-clickable-bg truncate p-2" onClick={() => popup.showActivation(data)}>
      {button}
    </button>
  );
};
