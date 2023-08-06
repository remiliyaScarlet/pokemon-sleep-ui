import React from 'react';

import {useSession} from 'next-auth/react';

import {UpdateUserData, UpdateUserDataOpts} from '@/types/userData';


// Wrapping `update()` of `useSession()` to make sure the input object is in the expected type
export const useUpdateUserData = (opts: UpdateUserDataOpts): UpdateUserData => {
  const {update} = useSession();

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      update(opts)
        .catch((error) => console.error(`Failed to update user data of type ${opts.type}`, error));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [opts.data]);

  return (opts: UpdateUserDataOpts) => update(opts);
};
