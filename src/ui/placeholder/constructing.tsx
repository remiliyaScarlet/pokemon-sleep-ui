import React from 'react';

import WrenchIcon from '@heroicons/react/24/solid/WrenchIcon';

import {Flex} from '@/components/layout/flex';


export const Constructing = () => {
  return (
    <Flex direction="col" center className="h-full">
      <div className="h-80 w-80">
        <WrenchIcon/>
      </div>
    </Flex>
  );
};
