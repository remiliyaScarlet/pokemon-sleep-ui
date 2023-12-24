import React from 'react';

import {useSession} from 'next-auth/react';


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
