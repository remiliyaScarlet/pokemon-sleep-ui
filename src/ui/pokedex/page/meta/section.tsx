import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex';


type Props = {
  title: string,
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
    <Flex direction="col" className="gap-1 p-1.5 md:flex-row md:p-0">
      <Flex direction="col" center className={clsx(
        'whitespace-nowrap text-sm text-slate-500 md:w-32', titleClassName,
      )}>
        {title}
      </Flex>
      <Flex direction="col" center className={contentClassName}>
        {children}
      </Flex>
    </Flex>
  );
};
