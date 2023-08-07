import React from 'react';

import {useSession} from 'next-auth/react';

import {UseUploadUserDataReturn, UploadUserDataOpts, UserDataUploader, UserDataUploadStatus} from '@/types/userData';


export const useUploadUserData = (): UseUploadUserDataReturn => {
  const [status, setStatus] = React.useState<UserDataUploadStatus>('waiting');
  const {data, update} = useSession();

  const userDataUploader: UserDataUploader = (opts: UploadUserDataOpts) => {
    setStatus('updating');
    update(opts)
      .then(() => setStatus('completed'))
      .catch((err) => {
        console.error(`Failed to upload user data of [${opts.type}]`, err);
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
    upload: data ? userDataUploader : null,
    status,
  };
};
