import React from 'react';

import {useSession} from 'next-auth/react';

import {UseUserDataActorReturn} from '@/hooks/userData/actor/type';
import {UserLazyLoadedData} from '@/types/userData/main';


export type UserDataLazyLoadCommonProps = {
  sessionOverride?: ReturnType<typeof useSession>,
  smallLoading?: boolean,
} & ({
  actDeps: React.DependencyList,
  toAct: () => boolean,
} | {
  actDeps?: never,
  toAct?: never,
});

export type UserDataLazyLoadRenderOpts = {
  data: UserLazyLoadedData | null,
  session: ReturnType<typeof useSession>,
  actorReturn: UseUserDataActorReturn,
};
