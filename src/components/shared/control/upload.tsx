import React from 'react';

import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import CloudArrowUpIcon from '@heroicons/react/24/outline/CloudArrowUpIcon';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';

import {LoadingSvg} from '@/components/icons/loading';
import {InputRow} from '@/components/input/filter/row';
import {Flex} from '@/components/layout/flex';
import {useUploadUserData} from '@/hooks/userData/upload';
import {UploadUserDataOpts, UserDataUploadStatus} from '@/types/userData/upload';


const statusIcon: {[status in UserDataUploadStatus]: React.ReactNode} = {
  waiting: <CloudArrowUpIcon/>,
  updating: <LoadingSvg/>,
  completed: <CheckCircleIcon/>,
  failed: <XCircleIcon/>,
};

type Props = {
  opts: UploadUserDataOpts,
};

export const UserDataUploadButton = ({opts}: Props) => {
  const {upload, status} = useUploadUserData();

  return (
    <button
      className="enabled:button-clickable-bg disabled:button-disabled relative h-8 w-14"
      disabled={!upload || status === 'updating'} onClick={() => upload ? upload(opts) : undefined}
    >
      <Flex direction="col" center>
        <div className="h-7 w-7">
          {statusIcon[status]}
        </div>
      </Flex>
    </button>
  );
};

export const UserDataUploadControlRow = ({opts}: Props) => {
  return (
    <InputRow>
      <Flex direction="col" className="items-end">
        <UserDataUploadButton opts={opts}/>
      </Flex>
    </InputRow>
  );
};
