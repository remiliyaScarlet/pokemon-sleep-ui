import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';


type Props = {
  title: React.ReactNode,
  className?: string,
};

export const PokemonTitledLayout = ({title, className, children}: React.PropsWithChildren<Props>) => {
  return (
    <Flex center className="info-section">
      <Flex center className="shrink-0 whitespace-nowrap p-1 text-slate-500">
        {title}
      </Flex>
      <Flex noFullWidth center className={clsx('grow', className)}>
        {children}
      </Flex>
    </Flex>
  );
};
