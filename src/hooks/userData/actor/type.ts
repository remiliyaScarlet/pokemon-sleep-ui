import {UserDataActionStatus, UserLazyLoadedData} from '@/types/userData/main';


export type UserDataActorState = {
  status: UserDataActionStatus,
  lazyLoaded: UserLazyLoadedData,
};
