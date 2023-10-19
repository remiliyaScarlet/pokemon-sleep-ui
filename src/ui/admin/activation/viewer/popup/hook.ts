import React from 'react';

import {UserActivationDataAtClient} from '@/types/mongo/activation';
import {UserActivationPopupState, UseUserActivationPopupReturn} from '@/ui/admin/activation/viewer/popup/type';


export const useUserActivationPopup = (): UseUserActivationPopupReturn => {
  const [state, setState] = React.useState<UserActivationPopupState>({
    show: false,
    data: null,
  });

  return {
    show: state.show,
    data: state.data,
    setData: setState,
    setShow: (show: boolean) => setState((original) => ({
      ...original,
      show,
    })),
    showActivation: (data: UserActivationDataAtClient) => setState({
      show: true,
      data,
    }),
  };
};
