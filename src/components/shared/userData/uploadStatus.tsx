import React from 'react';

import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import CloudArrowUpIcon from '@heroicons/react/24/outline/CloudArrowUpIcon';
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon';

import {Flex} from '@/components/layout/flex';


type Props = {
  success: boolean,
};

export const UserDataUploadStatus = ({success}: Props) => {
  return (
    <Flex direction="row" className="gap-1.5">
      <div className="relative h-8 w-8">
        <CloudArrowUpIcon/>
      </div>
      <div className="relative h-8 w-8">
        {success ? <CheckCircleIcon/> : <ExclamationTriangleIcon/>}
      </div>
    </Flex>
  );
};
