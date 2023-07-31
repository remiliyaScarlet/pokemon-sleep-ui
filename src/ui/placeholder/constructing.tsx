import React from 'react';

import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';

import {Flex} from '@/components/layout/flex';


export const Constructing = () => {
  return (
    <Flex direction="col" center className="h-full">
      <div className="h-80 w-80">
        <XCircleIcon/>
      </div>
    </Flex>
  );
};
