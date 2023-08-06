import {useSession} from 'next-auth/react';

import {UpdateUserData, UpdateUserDataOpts} from '@/types/userData';


// Wrapping `update()` of `useSession()` to make sure the input object is in the expected type
export const useUpdateUserData = (): UpdateUserData => {
  const {update} = useSession();

  return (opts: UpdateUserDataOpts) => update(opts);
};
