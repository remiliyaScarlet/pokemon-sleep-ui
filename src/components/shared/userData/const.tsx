import React from 'react';

import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import CloudArrowUpIcon from '@heroicons/react/24/outline/CloudArrowUpIcon';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';

import {LoadingSvg} from '@/components/icons/loading';
import {UserDataActionStatus} from '@/types/userData/main';


export const actionStatusIcon: {[status in UserDataActionStatus]: React.ReactNode} = {
  waiting: <CloudArrowUpIcon/>,
  processing: <LoadingSvg/>,
  completed: <CheckCircleIcon/>,
  failed: <XCircleIcon/>,
};
