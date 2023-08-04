import React from 'react';

import {Flex} from '@/components/layout/flex';
import {classNames} from '@/utils/react';


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
      <Flex direction="col" center className={classNames(
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
