import {UserActivationDataAtClient} from '@/ui/admin/activation/type';


export type UserActivationPopupState = {
  show: boolean,
  data: UserActivationDataAtClient | null,
};

export type UseUserActivationPopupReturn = {
  show: boolean,
  setShow: (show: boolean) => void,
  data: UserActivationDataAtClient | null,
  showActivation: (data: UserActivationDataAtClient) => void,
};
