import React from 'react';

import {useUserDataActor} from '@/hooks/userData/actor';
import {ActivationDataAtClient} from '@/types/mongo/activation';
import {ActivationUiControl, ActivationUiState} from '@/ui/admin/activation/type';
import {generateInitialActivationPropertiesAtClient} from '@/ui/admin/activation/utils';
import {toIsoDateString} from '@/utils/date';


type UseActivationUiOpts = {
  activations: ActivationDataAtClient[],
};

export const useActivationUI = ({activations}: UseActivationUiOpts): ActivationUiControl | null => {
  const [state, setState] = React.useState<ActivationUiState>({
    // Keep a copy of the data to save refreshes that could create large I/O
    data: activations,
    popup: {
      show: false,
      data: {
        // Dummy values, should be overwritten on show (by calling `showActivation()`
        userId: '',
        generatedAt: toIsoDateString(new Date()),
        key: '',
        ...generateInitialActivationPropertiesAtClient(),
      },
    },
  });

  const {actAsync, status} = useUserDataActor({statusToast: true});

  if (!actAsync) {
    return null;
  }

  const {popup} = state;

  const setPopupShow = (show: boolean) => setState((original): ActivationUiState => ({
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
    showActivation: (data: ActivationDataAtClient) => setState((original): ActivationUiState => ({
      ...original,
      popup: {
        show: true,
        data,
      },
    })),
    actAsync,
    status,
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
