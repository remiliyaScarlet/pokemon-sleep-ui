import React from 'react';

import {useSession} from 'next-auth/react';

import {UserDataUploadStatus} from '@/components/shared/userData/uploadStatus';
import {useOverridableSession} from '@/hooks/session';
import {
  UserDataActionStatus,
  UserDataActor,
  UserDataActorAsync,
  UserDataActorAsyncReturn,
} from '@/types/userData/main';
import {showToast} from '@/utils/toast';


type UseUserDataActorOpts = {
  override?: ReturnType<typeof useSession>,
  statusToast?: boolean,
  statusNoReset?: boolean,
};

type UseUserDataActorReturn = {
  actAsync: UserDataActorAsync | null,
  act: UserDataActor | null,
  status: UserDataActionStatus,
  session: ReturnType<typeof useSession>,
};

export const useUserDataActor = (opts?: UseUserDataActorOpts): UseUserDataActorReturn => {
  const [status, setStatus] = React.useState<UserDataActionStatus>('waiting');
  const session = useOverridableSession(opts?.override);

  const userDataActorAsync: UserDataActorAsync = async ({getStatusOnCompleted, ...action}) => {
    setStatus('processing');

    const onError = (): UserDataActorAsyncReturn => {
      const status = 'failed';

      setStatus(status);
      return {updated: null, status};
    };

    try {
      const updated = await session.update(action);

      const errorOnUpdate = updated?.user.errorOnUpdate;
      if (!!errorOnUpdate) {
        console.error(`Error occurred on update for [${action.action}] of [${action.options.type}]`);
        return onError();
      }

      const status = getStatusOnCompleted ? getStatusOnCompleted(updated) : 'completed';

      setStatus(status);
      return {updated, status};
    } catch (err) {
      console.error(`Failed to [${action.action}] user data of [${action.options.type}]`, err);
      return onError();
    }
  };

  const userDataActor: UserDataActor = ({getStatusOnCompleted, ...action}) => {
    void userDataActorAsync(action);
  };

  React.useEffect(() => {
    if (status !== 'completed' && status !== 'failed') {
      return;
    }

    if (status === 'completed' && opts?.statusToast) {
      showToast({content: <UserDataUploadStatus success/>});
    }

    if (status === 'failed') {
      showToast({content: <UserDataUploadStatus success={false}/>});
    }

    if (opts?.statusNoReset) {
      return undefined;
    }

    const timeoutId = setTimeout(() => setStatus('waiting'), 2500);

    return () => clearTimeout(timeoutId);
  }, [status]);

  return {
    actAsync: session.data ? userDataActorAsync : null,
    act: session.data ? userDataActor : null,
    status,
    session,
  };
};
