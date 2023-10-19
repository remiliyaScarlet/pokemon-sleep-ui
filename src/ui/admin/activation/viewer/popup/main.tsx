import React from 'react';

import {PopupCommon} from '@/components/popup/common/main';
import {UseUserActivationPopupReturn} from '@/ui/admin/activation/viewer/popup/type';


type Props = {
  state: UseUserActivationPopupReturn,
};

export const UserActivationPopup = ({state}: Props) => {
  const {data} = state;

  if (!data) {
    return null;
  }

  return (
    <PopupCommon {...state}>
      {data.userId}
    </PopupCommon>
  );
};
