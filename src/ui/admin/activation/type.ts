import {ActivationDataAtClient, ActivationInfo} from '@/types/mongo/activation';
import {UserIdToEmailMap} from '@/types/mongo/auth';
import {ReactStateUpdaterFromOriginal} from '@/types/react';
import {UserDataActionStatus, UserDataActorAsync} from '@/types/userData/main';


export type AdminActivationServerDataProps = {
  userIdEmailMap: UserIdToEmailMap,
  preloaded: {
    activations: ActivationDataAtClient[],
  },
};

export type ActivationUiState = {
  data: ActivationDataAtClient[],
  popup: {
    show: boolean,
    info: ActivationInfo,
  },
};

export type ActivationUiControl = {
  state: ActivationUiState,
  setState: ReactStateUpdaterFromOriginal<ActivationUiState>,
  setPopupShow: (show: boolean) => void,
  showActivation: (info: ActivationInfo) => void,
  actAsync: UserDataActorAsync,
  status: UserDataActionStatus,
  updateActivation: (info: ActivationInfo) => void,
  deleteActivation: () => void,
};

export type ActivationUiCommonProps = AdminActivationServerDataProps & {
  control: ActivationUiControl,
};
