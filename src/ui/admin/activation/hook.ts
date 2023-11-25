import React from 'react';

import {useUserDataActor} from '@/hooks/userData/actor/main';
import {ActivationUiControl, ActivationUiState, AdminActivationPreloadedData} from '@/ui/admin/activation/type';
import {generateInitialActivationPropertiesAtClient} from '@/ui/admin/activation/utils';
import {toIsoDateString} from '@/utils/date';


type UseActivationUiOpts = {
  preloaded: AdminActivationPreloadedData,
};

export const useActivationUI = ({preloaded}: UseActivationUiOpts): ActivationUiControl | null => {
  const [state, setState] = React.useState<ActivationUiState>({
    // Keep a copy of the data to save refreshes that could create large I/O
    ...preloaded,
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
        setState(({data, key, popup}) => ({
          key: key.map((single) => single.key === info.data.key ? info.data : single),
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
        setState(({key, data, popup}) => ({
          key,
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
      setState(({key, data, popup}) => ({
        key: key.filter(({key}) => popup.info.data.key !== key),
        data: data.filter(({key}) => popup.info.data.key !== key),
        popup: {
          ...popup,
          show: false,
        },
      }));
    },
  };
};
