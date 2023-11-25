import {ActivationDataAtClient, ActivationInfo, ActivationKeyAtClient} from '@/types/mongo/activation';
import {UserIdToEmailMap} from '@/types/mongo/auth';
import {ReactStateUpdaterFromOriginal} from '@/types/react';
import {UserDataActionStatus, UserDataActorAsync} from '@/types/userData/main';


export type AdminActivationPreloadedData = {
  key: ActivationKeyAtClient[],
  data: ActivationDataAtClient[],
};

export type AdminActivationServerDataProps = {
  userIdEmailMap: UserIdToEmailMap,
  preloaded: AdminActivationPreloadedData,
};

export type ActivationUiState = AdminActivationPreloadedData & {
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
