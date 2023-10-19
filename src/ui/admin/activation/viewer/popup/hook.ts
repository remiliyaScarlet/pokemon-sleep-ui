import React from 'react';

import {UserActivationDataAtClient} from '@/types/mongo/activation';
import {generateInitialUserActivationPropertiesAtClient} from '@/ui/admin/activation/utils';
import {UserActivationPopupState, UseUserActivationPopupReturn} from '@/ui/admin/activation/viewer/popup/type';
import {toIsoDateString} from '@/utils/date';


export const useUserActivationPopup = (): UseUserActivationPopupReturn => {
  const [state, setState] = React.useState<UserActivationPopupState>({
    show: false,
    data: {
      // Dummy values, should be overwritten on show (by calling `showActivation()`
      userId: '',
      generatedAt: toIsoDateString(new Date()),
      key: '',
      ...generateInitialUserActivationPropertiesAtClient(),
    },
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
