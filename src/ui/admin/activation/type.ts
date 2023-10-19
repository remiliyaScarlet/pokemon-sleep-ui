import {UserActivationDataAtClient} from '@/types/mongo/activation';
import {ReactStateUpdaterFromOriginal} from '@/types/react';
import {UserDataActorAsync} from '@/types/userData/main';
import {UserDataActionStatus, UserDataActorAsync} from '@/types/userData/main';


export type UserActivationUiState = {
  data: UserActivationDataAtClient[],
  popup: {
    show: boolean,
    data: UserActivationDataAtClient
  },
};

export type UserActivationUiControl = {
  state: UserActivationUiState,
  setState: ReactStateUpdaterFromOriginal<UserActivationUiState>,
  setPopupShow: (show: boolean) => void,
  showActivation: (data: UserActivationDataAtClient) => void,
  actAsync: UserDataActorAsync,
  status: UserDataActionStatus,
  updateActivation: (updated: UserActivationDataAtClient) => void,
  deleteActivation: () => void,
};
