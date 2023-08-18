import React from 'react';

import {useSession} from 'next-auth/react';

import {UserDataActionStatus, UserDataActor} from '@/types/userData/main';


type UseUserDataActorReturn = {
  act: UserDataActor | null,
  status: UserDataActionStatus,
};

export const useUserDataActor = (): UseUserDataActorReturn => {
  const [status, setStatus] = React.useState<UserDataActionStatus>('waiting');
  const {data, update} = useSession();

  const userDataActor: UserDataActor = (action) => {
    setStatus('processing');
    update(action)
      .then(() => setStatus('completed'))
      .catch((err) => {
        console.error(`Failed to [${action.action}] user data of [${action.options.type}]`, err);
        setStatus('failed');
      });
  };

  React.useEffect(() => {
    if (status !== 'completed' && status !== 'failed') {
      return;
    }

    const timeoutId = setTimeout(() => setStatus('waiting'), 2500);

    return () => clearTimeout(timeoutId);
  }, [status]);

  return {
    act: data ? userDataActor : null,
    status,
  };
};
