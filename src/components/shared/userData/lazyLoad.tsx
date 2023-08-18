'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {Failed} from '@/components/icons/failed';
import {LoadingFullScreen} from '@/components/icons/loading';
import {AuthProvider} from '@/contexts/auth';
import {useUserDataActor} from '@/hooks/userData';
import {UserLazyLoadedDataType} from '@/types/userData/lazyLoaded';
import {UserLazyLoadedData} from '@/types/userData/main';


type Props = {
  type: UserLazyLoadedDataType,
  content: (data: UserLazyLoadedData | null | undefined) => React.ReactNode,
};

const UserDataLazyLoadInner = ({type, content}: Props) => {
  const {act, status: actStatus} = useUserDataActor();
  const {data, status} = useSession();
  const [loaded, setLoaded] = React.useState(actStatus === 'completed');

  React.useEffect(() => {
    if (actStatus === 'completed') {
      setLoaded(true);
    }
  }, [actStatus]);

  if (!loaded) {
    if (status === 'loading') {
      return <LoadingFullScreen text="User"/>;
    }

    if (status === 'unauthenticated') {
      return <>{content(null)}</>;
    }

    if (actStatus === 'waiting') {
      if (act) {
        act({action: 'load', options: {type}});
        return <></>;
      }

      return <Failed text="User"/>;
    }

    if (actStatus === 'processing') {
      return <LoadingFullScreen text="Team"/>;
    }

    if (actStatus === 'failed') {
      return <Failed text="Team"/>;
    }
  }

  return <>{content(data?.user.lazyLoaded)}</>;
};

export const UserDataLazyLoad = (props: Props) => (
  <AuthProvider>
    <UserDataLazyLoadInner {...props}/>
  </AuthProvider>
);
