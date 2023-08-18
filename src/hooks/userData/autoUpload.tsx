import React from 'react';

import {useUserDataActor} from '@/hooks/userData/actor';
import {UserDataUploadOpts} from '@/types/userData/upload';


type Props = {
  opts: UserDataUploadOpts,
  triggerDeps: React.DependencyList,
  delay?: number,
};

export const useAutoUpload = ({opts, triggerDeps, delay}: Props) => {
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
    ), delay ?? 500);

    return () => clearTimeout(timeoutId);
  }, triggerDeps);
};
