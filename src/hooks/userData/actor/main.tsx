import React from 'react';

import {useSession} from 'next-auth/react';

import {UserDataUploadStatus} from '@/components/shared/userData/uploadStatus';
import {useOverridableSession} from '@/hooks/session';
import {UserDataActorState} from '@/hooks/userData/actor/type';
import {UserDataActor, UserDataActorAsync, UserDataActorAsyncReturn} from '@/types/userData/main';
import {cloneMerge} from '@/utils/object/cloneMerge';
import {showToast} from '@/utils/toast';


type UseUserDataActorOpts = {
  override?: ReturnType<typeof useSession>,
  statusToast?: boolean,
  statusNoReset?: boolean,
};

type UseUserDataActorReturn = UserDataActorState & {
  actAsync: UserDataActorAsync | null,
  act: UserDataActor | null,
  session: ReturnType<typeof useSession>,
};

export const useUserDataActor = (opts?: UseUserDataActorOpts): UseUserDataActorReturn => {
  const [state, setState] = React.useState<UserDataActorState>({
    status: 'waiting',
    // `lazyLoaded` has to be cached locally
    // > `next-auth`will not cache it in-between different pages under the same session
    // https://github.com/RaenonX-PokemonSleep/pokemon-sleep-ui/issues/489
    lazyLoaded: {},
  });
  const session = useOverridableSession(opts?.override);

  const userDataActorAsync: UserDataActorAsync = async ({getStatusOnCompleted, ...action}) => {
    setState((original) => ({
      ...original,
      status: 'processing',
    }));

    const onError = (): UserDataActorAsyncReturn => {
      const status = 'failed';

      setState((original) => ({
        ...original,
        status,
      }));
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

      setState((original) => ({
        status,
        lazyLoaded: cloneMerge(original.lazyLoaded, updated?.user.lazyLoaded),
      }));
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
    const {status} = state;

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

    const timeoutId = setTimeout(
      () => setState((original) => ({
        ...original,
        status: 'waiting',
      })),
      2500,
    );

    return () => clearTimeout(timeoutId);
  }, [state]);

  return {
    ...state,
    actAsync: session.data ? userDataActorAsync : null,
    act: session.data ? userDataActor : null,
    session,
  };
};
