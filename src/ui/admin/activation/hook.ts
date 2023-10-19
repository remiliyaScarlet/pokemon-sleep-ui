import React from 'react';

import {useUserDataActor} from '@/hooks/userData/actor';
import {UserActivationDataAtClient} from '@/types/mongo/activation';
import {UserActivationUiState, UserActivationUiControl} from '@/ui/admin/activation/type';
import {generateInitialUserActivationPropertiesAtClient} from '@/ui/admin/activation/utils';
import {toIsoDateString} from '@/utils/date';


export const useUserActivationUI = (): UserActivationUiControl | null => {
  const [state, setState] = React.useState<UserActivationUiState>({
    popupShow: false,
    popupData: {
      // Dummy values, should be overwritten on show (by calling `showActivation()`
      userId: '',
      generatedAt: toIsoDateString(new Date()),
      key: '',
      ...generateInitialUserActivationPropertiesAtClient(),
    },
  });

  const {actAsync} = useUserDataActor({statusToast: true});

  if (!actAsync) {
    return null;
  }

  return {
    popupShow: state.popupShow,
    data: state.popupData,
    state,
    setState: setState,
    setPopupShow: (show: boolean) => setState((original) => ({
      ...original,
      popupShow: show,
    })),
    showActivation: (data: UserActivationDataAtClient) => setState({
      popupShow: true,
      popupData: data,
    }),
    actAsync,
  };
};
