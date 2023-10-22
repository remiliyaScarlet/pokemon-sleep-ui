import {ActivationDataAtClient, ActivationInfo} from '@/types/mongo/activation';
import {ReactStateUpdaterFromOriginal} from '@/types/react';
import {UserDataActionStatus, UserDataActorAsync} from '@/types/userData/main';
import {SiteAdminServerDataProps} from '@/ui/admin/type';


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

export type ActivationUiCommonProps = SiteAdminServerDataProps & {
  control: ActivationUiControl,
};
