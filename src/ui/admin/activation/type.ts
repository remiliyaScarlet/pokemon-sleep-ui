import {UserActivationDataAtClient} from '@/types/mongo/activation';
import {ReactStateUpdaterFromOriginal} from '@/types/react';
import {UserDataActorAsync} from '@/types/userData/main';


export type UserActivationUiState = {
  popupShow: boolean,
  popupData: UserActivationDataAtClient,
};

export type UserActivationUiControl = {
  state: UserActivationUiState,
  setState: ReactStateUpdaterFromOriginal<UserActivationUiState>,
  popupShow: boolean,
  setPopupShow: (show: boolean) => void,
  data: UserActivationDataAtClient,
  showActivation: (data: UserActivationDataAtClient) => void,
  actAsync: UserDataActorAsync,
};
