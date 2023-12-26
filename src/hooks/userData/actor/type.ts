import {useSession} from 'next-auth/react';

import {UserDataActionStatus, UserDataActor, UserDataActorAsync, UserLazyLoadedData} from '@/types/userData/main';


export type UserDataActorState = {
  status: UserDataActionStatus,
  lazyLoaded: UserLazyLoadedData,
};

export type UseUserDataActorReturn = UserDataActorState & {
  actAsync: UserDataActorAsync | null,
  act: UserDataActor | null,
  session: ReturnType<typeof useSession>,
};
