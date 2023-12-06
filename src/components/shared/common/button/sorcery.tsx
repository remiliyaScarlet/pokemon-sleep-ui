import React from 'react';

import BeakerIcon from '@heroicons/react/24/outline/BeakerIcon';
import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';


type Props = {
  onClick: () => void,
};

export const ButtonToStartTheSorcery = ({onClick}: Props) => {
  return (
    <button onClick={onClick} className={clsx(
      'button-base button-bg-hover w-full p-1',
      'bg-purple-400/50 hover:bg-purple-400 dark:bg-purple-600/50 dark:hover:bg-purple-600',
    )}>
      <Flex center>
        <BeakerIcon className="h-9 w-9"/>
      </Flex>
    </button>
  );
};
