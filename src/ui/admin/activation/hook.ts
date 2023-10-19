import React from 'react';

import {useUserDataActor} from '@/hooks/userData/actor';
import {UserActivationDataAtClient} from '@/types/mongo/activation';
import {UserActivationUiControl, UserActivationUiState} from '@/ui/admin/activation/type';
import {generateInitialUserActivationPropertiesAtClient} from '@/ui/admin/activation/utils';
import {toIsoDateString} from '@/utils/date';


type UseUserActivationUiOpts = {
  activations: UserActivationDataAtClient[],
};

export const useUserActivationUI = ({activations}: UseUserActivationUiOpts): UserActivationUiControl | null => {
  const [state, setState] = React.useState<UserActivationUiState>({
    // Keep a copy of the data to save refreshes that could create large I/O
    data: activations,
    popup: {
      show: false,
      data: {
        // Dummy values, should be overwritten on show (by calling `showActivation()`
        userId: '',
        generatedAt: toIsoDateString(new Date()),
        key: '',
        ...generateInitialUserActivationPropertiesAtClient(),
      },
    },
  });

  const {actAsync} = useUserDataActor({statusToast: true});

  if (!actAsync) {
    return null;
  }

  const {popup} = state;

  const setPopupShow = (show: boolean) => setState((original): UserActivationUiState => ({
    ...original,
    popup: {
      ...original.popup,
      show,
    },
  }));

  return {
    state,
    setState,
    setPopupShow,
    showActivation: (data: UserActivationDataAtClient) => setState((original): UserActivationUiState => ({
      ...original,
      popup: {
        show: true,
        data,
      },
    })),
    actAsync,
    updateActivation: async (updated) => {
      await actAsync({
        action: 'upload',
        options: {
          type: 'admin.activation.update',
          data: updated,
        },
      });
      setState(({data, popup}) => ({
        data: data.map((single) => single.key === updated.key ? updated : single),
        popup: {
          ...popup,
          show: false,
        },
      }));
    },
    deleteActivation: async () => {
      await actAsync({
        action: 'upload',
        options: {
          type: 'admin.activation.delete',
          data: popup.data.key,
        },
      });
      setState(({data, popup}) => ({
        data: data.filter(({key}) => popup.data.key !== key),
        popup: {
          ...popup,
          show: false,
        },
      }));
    },
  };
};
