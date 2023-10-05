import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';


type Props = {
  icon: React.ReactNode,
};

export const PokemonProducingStatsItemLayout = ({icon, children}: React.PropsWithChildren<Props>) => {
  return (
    <Flex direction="row" stretch className="items-center">
      <Flex center noFullWidth className="button-bg rounded-l-lg">
        <div className="relative h-10 w-10">
          {icon}
        </div>
      </Flex>
      <Flex className={clsx(
        'border-button-clickable place-content-end gap-1.5 rounded-r-lg border-y-2 border-r-2 py-2 pr-2',
      )}>
        {children}
      </Flex>
    </Flex>
  );
};
