import {UserActivationDataAtClient} from '@/types/mongo/activation';
import {ReactStateUpdaterFromOriginal} from '@/types/react';


export type UserActivationPopupState = {
  show: boolean,
  data: UserActivationDataAtClient,
};

export type UseUserActivationPopupReturn = {
  show: boolean,
  setShow: (show: boolean) => void,
  setData: ReactStateUpdaterFromOriginal<UserActivationPopupState>,
  data: UserActivationDataAtClient,
  showActivation: (data: UserActivationDataAtClient) => void,
};
