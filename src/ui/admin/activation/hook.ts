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
      info: {
        // Dummy values, should be overwritten on show (by calling `showActivation()`
        type: 'data',
        data: {
          userId: '',
          generatedAt: toIsoDateString(new Date()),
          key: '',
          ...generateInitialActivationPropertiesAtClient(),
        },
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
    showActivation: (info) => setState((original): ActivationUiState => ({
      ...original,
      popup: {show: true, info},
    })),
    actAsync,
    status,
    updateActivation: async (info) => {
      const {type, data} = info;

      if (type === 'key') {
        await actAsync({
          action: 'upload',
          options: {type: 'admin.activation.update.key', data},
        });
        setState(({data, popup}) => ({
          data,
          popup: {
            ...popup,
            show: false,
          },
        }));
        return;
      }

      if (type === 'data') {
        await actAsync({
          action: 'upload',
          options: {type: 'admin.activation.update.data', data},
        });
        setState(({data, popup}) => ({
          data: data.map((single) => single.key === info.data.key ? info.data : single),
          popup: {
            ...popup,
            show: false,
          },
        }));
        return;
      }

      throw new Error(`Unhandled activation info update of type: ${type satisfies never}`);
    },
    deleteActivation: async () => {
      await actAsync({
        action: 'upload',
        options: {
          type: 'admin.activation.delete',
          data: popup.info.data.key,
        },
      });
      setState(({data, popup}) => ({
        data: data.filter(({key}) => popup.info.data.key !== key),
        popup: {
          ...popup,
          show: false,
        },
      }));
    },
  };
};
