import {ActivationDataAtClient} from '@/types/mongo/activation';
import {ReactStateUpdaterFromOriginal} from '@/types/react';
import {UserDataActionStatus, UserDataActorAsync} from '@/types/userData/main';
import {SiteAdminServerDataProps} from '@/ui/admin/type';


export type ActivationUiState = {
  data: ActivationDataAtClient[],
  popup: {
    show: boolean,
    data: ActivationDataAtClient
  },
};

export type ActivationUiControl = {
  state: ActivationUiState,
  setState: ReactStateUpdaterFromOriginal<ActivationUiState>,
  setPopupShow: (show: boolean) => void,
  showActivation: (data: ActivationDataAtClient) => void,
  actAsync: UserDataActorAsync,
  status: UserDataActionStatus,
  updateActivation: (updated: ActivationDataAtClient) => void,
  deleteActivation: () => void,
};

export type ActivationUiCommonProps = SiteAdminServerDataProps & {
  control: ActivationUiControl,
};
