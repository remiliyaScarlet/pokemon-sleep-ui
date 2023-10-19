import {UserActivationDataAtClient} from '@/types/mongo/activation';
import {ReactStateUpdaterFromOriginal} from '@/types/react';


export type UserActivationPopupState = {
  show: boolean,
  data: UserActivationDataAtClient | null,
};

export type UseUserActivationPopupReturn = {
  show: boolean,
  setShow: (show: boolean) => void,
  setData: ReactStateUpdaterFromOriginal<UserActivationPopupState>,
  data: UserActivationDataAtClient | null,
  showActivation: (data: UserActivationDataAtClient) => void,
};
