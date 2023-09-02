import React from 'react';

import {useSession} from 'next-auth/react';

import {UserDataUploadStatus} from '@/components/shared/userData/uploadStatus';
import {useOverridableSession} from '@/hooks/session';
import {UserDataActionStatus, UserDataActor} from '@/types/userData/main';
import {showToast} from '@/utils/toast';


type UseUserDataActorOpts = {
  override?: ReturnType<typeof useSession>,
  showStatusToast?: boolean,
};

type UseUserDataActorReturn = {
  act: UserDataActor | null,
  status: UserDataActionStatus,
  session: ReturnType<typeof useSession>,
};

export const useUserDataActor = (opts?: UseUserDataActorOpts): UseUserDataActorReturn => {
  const [status, setStatus] = React.useState<UserDataActionStatus>('waiting');
  const session = useOverridableSession(opts?.override);

  const userDataActor: UserDataActor = (action) => {
    setStatus('processing');
    session.update(action)
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

    if (status === 'completed' && opts?.showStatusToast) {
      showToast({content: <UserDataUploadStatus success/>});
    }

    if (status === 'failed') {
      showToast({content: <UserDataUploadStatus success={false}/>});
    }

    const timeoutId = setTimeout(() => setStatus('waiting'), 2500);

    return () => clearTimeout(timeoutId);
  }, [status]);

  return {
    act: session.data ? userDataActor : null,
    status,
    session,
  };
};
