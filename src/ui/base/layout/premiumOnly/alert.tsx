import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {PremiumOnlyNotice} from '@/components/static/premium/notice';


export const PremiumOnlyPageAlert = () => {
  return (
    <Flex center className="h-[80vh] text-xl text-rose-600 dark:text-rose-500">
      <PremiumOnlyNotice
        hideIcon
        className="markdown rounded-lg p-3 shadow-border shadow-rose-600 dark:shadow-rose-500"
      />
    </Flex>
  );
};
