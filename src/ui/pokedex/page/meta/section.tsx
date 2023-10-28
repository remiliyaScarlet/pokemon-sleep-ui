import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';


type Props = {
  title: React.ReactNode,
  titleClassName?: string,
  contentClassName?: string,
};

export const PokemonMetaSection = ({
  title,
  titleClassName,
  contentClassName,
  children,
}: React.PropsWithChildren<Props>) => {
  return (
    <Flex className="gap-1 p-1.5 md:flex-row md:p-0">
      <Flex center className={clsx(
        'whitespace-nowrap p-1 text-sm text-slate-500 md:w-32', titleClassName,
      )}>
        {title}
      </Flex>
      <Flex center className={contentClassName}>
        {children}
      </Flex>
    </Flex>
  );
};
