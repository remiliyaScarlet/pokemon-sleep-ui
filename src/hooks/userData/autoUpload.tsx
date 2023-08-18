import React from 'react';

import {useUserDataActor} from '@/hooks/userData/actor';
import {UserDataUploadOpts} from '@/types/userData/upload';


type Props = {
  opts: UserDataUploadOpts,
  triggerDeps: React.DependencyList,
};

export const useAutoUpload = ({opts, triggerDeps}: Props) => {
  const {act, status} = useUserDataActor();

  React.useEffect(() => {
    if (!act || status === 'processing') {
      return;
    }

    const timeoutId = setTimeout(() => (
      act({
        action: 'upload',
        options: opts,
      })
    ), 500);

    return () => clearTimeout(timeoutId);
  }, triggerDeps);
};
