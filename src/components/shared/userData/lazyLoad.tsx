import React from 'react';

import {useSession} from 'next-auth/react';

import {Failed} from '@/components/icons/failed';
import {Loading, LoadingText} from '@/components/icons/loading';
import {useUserDataActor} from '@/hooks/userData/actor';
import {UserDataLoadingOpts} from '@/types/userData/load';
import {UserLazyLoadedData} from '@/types/userData/main';


type Props = {
  options: UserDataLoadingOpts,
  loadingText: string,
  content: (data: UserLazyLoadedData | null | undefined, session: ReturnType<typeof useSession>) => React.ReactNode,
  sessionOverride?: ReturnType<typeof useSession>,
  smallLoading?: boolean,
} & ({
  actDeps: React.DependencyList,
  toAct: () => boolean,
} | {
  actDeps?: never,
  toAct?: never,
});

export const UserDataLazyLoad = ({
  options,
  loadingText,
  content,
  sessionOverride,
  smallLoading,
  actDeps,
  toAct,
}: Props) => {
  const {act, status, session} = useUserDataActor({
    override: sessionOverride,
    statusNoReset: true,
  });
  // This is needed because `status` can't be used for evaluating if the data is loaded
  // > `status` can be `waiting` on init or after data is loaded
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (actDeps && !toAct()) {
      return;
    }

    if (!loaded && act && session.status === 'authenticated' && status === 'waiting') {
      act({action: 'load', options});
    }
  }, [session.status, ...(actDeps ?? [])]);

  React.useEffect(() => {
    if (status === 'completed') {
      setLoaded(true);
    }
  }, [status]);

  // Needs to check if the data is `loaded` because data upload will set `session.status` to `loading`
  if (!loaded) {
    // Loading data through `update()` of the session sets the status to `loading`
    // So this has to be placed before `session.status === `loading` to show correct loading text
    if (status === 'processing') {
      if (smallLoading) {
        return <LoadingText text={loadingText} dimension="h-4 w-4"/>;
      }

      return <Loading text={loadingText}/>;
    }

    if (session.status === 'loading') {
      if (smallLoading) {
        return <LoadingText text="User" dimension="h-4 w-4"/>;
      }

      return <Loading text="User"/>;
    }

    if (session.status === 'unauthenticated') {
      return content(null, session);
    }

    if (status === 'failed') {
      return <Failed text={loadingText}/>;
    }

    // If not loaded but got an action to run later, don't show anything to prevent the UI blink
    // between the gap of user getting authenticated and the action starts
    if (status === 'waiting' && act) {
      return null;
    }

    // There will be a gap where `status` is `completed` but `loaded` is still `false`
    // Therefore rendering empty content and wait for the `useEffect()` hook to set `loaded` to true
    if (status === 'completed') {
      return null;
    }

    console.warn(`Uncaught lazy load status: Session: ${session.status} / User data action: ${status}`);
  }

  return content(session.data?.user.lazyLoaded, session);
};
