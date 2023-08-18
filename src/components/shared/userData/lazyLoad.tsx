import React from 'react';

import {useSession} from 'next-auth/react';

import {Failed} from '@/components/icons/failed';
import {Loading} from '@/components/icons/loading';
import {AuthProvider} from '@/contexts/auth';
import {useUserDataActor} from '@/hooks/userData/actor';
import {UserLazyLoadedDataType} from '@/types/userData/lazyLoaded';
import {UserLazyLoadedData} from '@/types/userData/main';


type Props = {
  type: UserLazyLoadedDataType,
  loadingText: string,
  content: (data: UserLazyLoadedData | null | undefined) => React.ReactNode,
  sessionOverride?: ReturnType<typeof useSession>,
} & ({
  actDeps: React.DependencyList,
  toAct: () => boolean,
} | {
  actDeps?: never,
  toAct?: never,
});

const UserDataLazyLoadInner = ({type, loadingText, content, sessionOverride, actDeps, toAct}: Props) => {
  const {act, status, session} = useUserDataActor(sessionOverride);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (actDeps && !toAct()) {
      return;
    }

    if (!loaded && act && session.status === 'authenticated' && status === 'waiting') {
      act({action: 'load', options: {type}});
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
      return <Loading text={loadingText}/>;
    }

    if (session.status === 'loading') {
      return <Loading text="User"/>;
    }

    if (session.status === 'unauthenticated') {
      return <>{content(null)}</>;
    }

    if (status === 'failed') {
      return <Failed text={loadingText}/>;
    }

    // If not loaded but got an action to run later, don't show anything to prevent the UI blink
    // between the gap of user getting authenticated and the action starts
    if (status === 'waiting' && act) {
      return <></>;
    }
  }

  return <>{content(session.data?.user.lazyLoaded)}</>;
};

export const UserDataLazyLoad = (props: Props) => (
  <AuthProvider>
    <UserDataLazyLoadInner {...props}/>
  </AuthProvider>
);
