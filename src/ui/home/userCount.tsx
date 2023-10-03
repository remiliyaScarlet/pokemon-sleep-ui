import React from 'react';

import UsersIcon from '@heroicons/react/24/outline/UsersIcon';

import {Flex} from '@/components/layout/flex/common';
import {formatInt} from '@/utils/number';


type Props = {
  userCount: number,
};

export const HomeUserCount = ({userCount}: Props) => {
  return (
    <Flex direction="row" className="gap-2">
      <div className="h-6 w-6">
        <UsersIcon/>
      </div>
      <div>{formatInt(userCount)}</div>
    </Flex>
  );
};
