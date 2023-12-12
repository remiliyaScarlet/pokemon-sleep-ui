import React from 'react';

import {Session} from 'next-auth';


export const useUserActivation = (session?: Session | null) => {
  return React.useMemo(() => ({
    isAdsFree: session?.user.activation?.adsFree ?? false,
    isPremium: session?.user.activation?.premium ?? false,
  }), [session]);
};
